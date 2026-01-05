import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { NewsletterPost, NewsletterPostWithContent } from "../model/types";

const postsDirectory = path.join(process.cwd(), "app/newsletter/posts");

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllPosts(): NewsletterPost[] {
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
}

/**
 * Get a single blog post by slug with MDX content
 */
export async function getPostBySlug(
  slug: string,
): Promise<NewsletterPostWithContent | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

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
      content: content, // Pass raw content string for RSC MDXRemote
    };
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    return null;
  }
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): NewsletterPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) =>
    post.categories.some((cat) => cat.toLowerCase() === category.toLowerCase()),
  );
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): NewsletterPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}

/**
 * Get all unique categories with post counts
 */
export function getAllCategories() {
  const allPosts = getAllPosts();
  const categoryMap = new Map<string, number>();

  allPosts.forEach((post) => {
    post.categories.forEach((category) => {
      const lowerCategory = category.toLowerCase();
      categoryMap.set(lowerCategory, (categoryMap.get(lowerCategory) || 0) + 1);
    });
  });

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get all unique tags with post counts
 */
export function getAllTags() {
  const allPosts = getAllPosts();
  const tagMap = new Map<string, number>();

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      const lowerTag = tag.toLowerCase();
      tagMap.set(lowerTag, (tagMap.get(lowerTag) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}
