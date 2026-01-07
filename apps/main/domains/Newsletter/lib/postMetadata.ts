import { getAllPosts } from "./mdxParser";

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
