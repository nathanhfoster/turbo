import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  categories: string[];
  tags: string[];
  image?: string;
  readingTime?: string;
}

export interface BlogPostWithContent extends BlogPost {
  content: MDXRemoteSerializeResult;
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}

export interface BlogTag {
  name: string;
  slug: string;
  count: number;
}
