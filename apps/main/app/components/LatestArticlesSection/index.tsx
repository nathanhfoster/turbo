import Link from "next/link";
import { Button, Card, Typography, Box } from "@nathanhfoster/ui";
import type { NewsletterPost } from "@/domains/Newsletter/model/types";

interface LatestArticlesSectionProps {
  posts: NewsletterPost[];
}

export function LatestArticlesSection({ posts }: LatestArticlesSectionProps) {
  if (posts.length === 0) return null;

  return (
    <Box className="w-full py-16">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Box className="mb-12 text-center">
          <Typography
            variant="h2"
            className="mb-4 text-gray-900 dark:text-foreground"
            size="text-4xl"
            weight="font-bold"
          >
            Latest Articles
          </Typography>
          <Typography
            variant="p"
            className="text-lg text-gray-700 dark:text-gray-400"
          >
            Technical insights and thoughts on modern web development
          </Typography>
        </Box>
        <Box className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {posts.map((post) => (
            <Link key={post.slug} href={`/newsletter/${post.slug}`}>
              <Card
                hoverable
                className="group h-full p-6 transition-all hover:border-primary hover:shadow-lg"
              >
                <Box className="mb-3 flex flex-wrap gap-2">
                  {post.categories.slice(0, 2).map((category) => (
                    <Box
                      key={category}
                      className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-black"
                    >
                      {category}
                    </Box>
                  ))}
                </Box>
                <Typography
                  variant="h3"
                  className="mb-2 text-xl font-semibold text-gray-900 dark:text-foreground group-hover:text-primary transition-colors"
                >
                  {post.title}
                </Typography>
                <Typography
                  variant="p"
                  className="mb-4 text-gray-700 dark:text-gray-400 line-clamp-3"
                >
                  {post.description}
                </Typography>
                <Box className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-500">
                  <Typography variant="span">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                  {post.readingTime && (
                    <Typography variant="span">{post.readingTime}</Typography>
                  )}
                </Box>
              </Card>
            </Link>
          ))}
        </Box>
        <Box className="mt-8 text-center">
          <Button
            href="/newsletter"
            variant="outlined"
            color="inherit"
          >
            Read All Articles
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

