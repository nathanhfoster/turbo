export interface NewsletterPost {
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

export interface NewsletterPostWithContent extends NewsletterPost {
  content: string; // Raw MDX content string for RSC MDXRemote
}

export interface NewsletterCategory {
  name: string;
  slug: string;
  count: number;
}

export interface NewsletterTag {
  name: string;
  slug: string;
  count: number;
}
