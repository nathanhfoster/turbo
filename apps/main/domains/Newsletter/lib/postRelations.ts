import type { NewsletterPost } from "../model/types";
import { getAllPosts } from "./mdxParser";

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
