import type { NewsletterPost } from "../model/types";
import { getAllPosts } from "./mdxParser";

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
