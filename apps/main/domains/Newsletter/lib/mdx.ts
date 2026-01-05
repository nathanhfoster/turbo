import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { NewsletterPost, NewsletterPostWithContent } from "../model/types";

const postsDirectory = path.join(process.cwd(), "app/newsletter/posts");

/**
 * Get all newsletter posts sorted by date (newest first)
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
 * Get a single newsletter post by slug with HTML content
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

/**
 * Get next and previous posts based on date order
 */
export function getAdjacentPosts(currentSlug: string): {
  next: NewsletterPost | null;
  previous: NewsletterPost | null;
} {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) {
    return { next: null, previous: null };
  }

  return {
    next: currentIndex > 0 ? (allPosts[currentIndex - 1] ?? null) : null,
    previous:
      currentIndex < allPosts.length - 1
        ? (allPosts[currentIndex + 1] ?? null)
        : null,
  };
}

/**
 * Get related posts based on categories and tags
 * Returns up to 3 related posts, prioritizing same categories, then same tags
 */
export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3,
): NewsletterPost[] {
  const allPosts = getAllPosts();
  const currentPost = allPosts.find((post) => post.slug === currentSlug);

  if (!currentPost) {
    return [];
  }

  // Score posts based on shared categories and tags
  const scoredPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      let score = 0;

      // Higher weight for shared categories
      const sharedCategories = post.categories.filter((cat) =>
        currentPost.categories.some(
          (currentCat) => currentCat.toLowerCase() === cat.toLowerCase(),
        ),
      );
      score += sharedCategories.length * 3;

      // Lower weight for shared tags
      const sharedTags = post.tags.filter((tag) =>
        currentPost.tags.some(
          (currentTag) => currentTag.toLowerCase() === tag.toLowerCase(),
        ),
      );
      score += sharedTags.length;

      return { post, score };
    })
    .filter((item) => item.score > 0) // Only include posts with some relation
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .slice(0, limit)
    .map((item) => item.post);

  return scoredPosts;
}
