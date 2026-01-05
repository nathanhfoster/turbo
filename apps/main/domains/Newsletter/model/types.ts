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
  content: string; // HTML content string for RichText component
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
