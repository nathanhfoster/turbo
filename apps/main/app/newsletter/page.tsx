import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/domains/Newsletter/lib/mdxParser";
import { getAllCategories } from "@/domains/Newsletter/lib/postMetadata";
import { Box, Card, Typography, Button } from "@nathanhfoster/ui";

export const metadata = {
  title: "Newsletter",
  description:
    "Technical insights, tutorials, and thoughts on modern web development",
};

// Revalidate every hour (3600 seconds)
export const revalidate = 3600;

export default function NewsletterPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <Box className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Box className="mb-12 text-center">
        <Typography
          variant="h1"
          className="mb-4"
          size="text-5xl"
          weight="font-bold"
        >
          Newsletter
        </Typography>
        <Typography
          variant="p"
          className="text-xl text-gray-600 dark:text-gray-400"
        >
          Technical insights, tutorials, and thoughts on modern web development
        </Typography>
      </Box>

      {/* Categories */}
      {categories.length > 0 && (
        <Box className="mb-12">
          <Typography
            variant="h2"
            className="mb-4"
            size="text-2xl"
            weight="font-semibold"
          >
            Categories
          </Typography>
          <Box className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/newsletter/category/${category.slug}`}
              >
                <Button
                  variant="outlined"
                  size="sm"
                  className="rounded-full border-gray-300 hover:border-primary hover:bg-primary hover:text-black dark:border-gray-700"
                >
                  {category.name} ({category.count})
                </Button>
              </Link>
            ))}
          </Box>
        </Box>
      )}

      {/* Newsletter Posts */}
      <Box className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.length === 0 ? (
          <Card className="col-span-full p-12 text-center">
            <Typography
              variant="p"
              className="text-gray-600 dark:text-gray-400"
            >
              No newsletter posts yet. Check back soon!
            </Typography>
          </Card>
        ) : (
          posts.map((post) => (
            <Link key={post.slug} href={`/newsletter/${post.slug}`}>
              <Card
                hoverable
                className="group p-6 transition-all hover:border-primary"
              >
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={192}
                    className="mb-4 h-48 w-full rounded-lg object-cover"
                  />
                )}
                <Box className="mb-2 flex flex-wrap gap-2">
                  {post.categories.map((category) => (
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
                  className="mb-2 text-xl font-semibold group-hover:text-primary"
                >
                  {post.title}
                </Typography>
                <Typography
                  variant="p"
                  className="mb-4 text-gray-600 dark:text-gray-400"
                >
                  {post.description}
                </Typography>
                <Box className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                  <Typography variant="span">
                    {new Date(post.date).toLocaleDateString()}
                  </Typography>
                  {post.readingTime && (
                    <Typography variant="span">{post.readingTime}</Typography>
                  )}
                </Box>
              </Card>
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
}
