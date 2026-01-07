/**
 * Newsletter library - MDX parsing and post utilities
 * Split into focused modules for better maintainability
 */

// Re-export all functions for convenience
export { getAllPosts, getPostBySlug } from "./mdxParser";
export { getPostsByCategory, getPostsByTag } from "./postFilters";
export { getAllCategories, getAllTags } from "./postMetadata";
export { getAdjacentPosts, getRelatedPosts } from "./postRelations";
