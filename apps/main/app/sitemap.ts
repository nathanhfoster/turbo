import type { MetadataRoute } from "next";
import { getAllPosts } from "@/domains/Blog/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://agentnate.dev";

  // Static routes
  const routes = ["", "/blog", "/portfolio", "/contact", "/services"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }),
  );

  // Dynamic blog posts
  const posts = getAllPosts();
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...blogPosts];
}
