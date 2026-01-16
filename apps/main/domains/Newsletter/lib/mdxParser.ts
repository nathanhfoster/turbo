import { cache } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { NewsletterPost, NewsletterPostWithContent } from "../model/types";

const postsDirectory = path.join(process.cwd(), "app/newsletter/posts");

/**
 * Get all newsletter posts sorted by date (newest first)
 * Wrapped with React.cache() for per-request deduplication
 */
export const getAllPosts = cache((): NewsletterPost[] => {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const files = fs.readdirSync(postsDirectory);
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

    const posts = mdxFiles
      .map((file) => {
        const slug = file.replace(/\.mdx$/, "");
        const fullPath = path.join(postsDirectory, file);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title || "Untitled",
          description: data.description || "",
          date: data.date || new Date().toISOString(),
          author: data.author || "Anonymous",
          categories: data.categories || [],
          tags: data.tags || [],
          image: data.image,
          readingTime: data.readingTime,
        } as NewsletterPost;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error("Error getting all posts:", error);
    return [];
  }
});

/**
 * Get a single newsletter post by slug with HTML content
 * Wrapped with React.cache() for per-request deduplication
 */
export const getPostBySlug = cache(async (
  slug: string,
): Promise<NewsletterPostWithContent | null> => {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML using marked
    let htmlContent = await marked.parse(content);
    const htmlString =
      typeof htmlContent === "string" ? htmlContent : String(htmlContent);

    // Remove the first H1 tag since the title is already displayed in the page header
    // This prevents duplicate titles
    const contentWithoutFirstH1 = htmlString
      .replace(/<h1[^>]*>.*?<\/h1>/is, "")
      .trim();

    return {
      slug,
      title: data.title || "Untitled",
      description: data.description || "",
      date: data.date || new Date().toISOString(),
      author: data.author || "Anonymous",
      categories: data.categories || [],
      tags: data.tags || [],
      image: data.image,
      readingTime: data.readingTime,
      content: contentWithoutFirstH1,
    };
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    return null;
  }
});
