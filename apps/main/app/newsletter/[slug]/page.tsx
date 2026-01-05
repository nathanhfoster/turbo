import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/domains/Newsletter/lib/mdx";
import { Box, Typography, Button } from "@nathanhfoster/ui";

// Generate static pages for all newsletter posts at build time
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// Revalidate every hour (3600 seconds) for ISR
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function NewsletterPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Box className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Back link */}
      <Typography
        variant="a"
        href="/newsletter"
        className="mb-8 inline-flex items-center text-primary hover:underline"
      >
        ← Back to Newsletter
      </Typography>

      {/* Header */}
      <Box variant="header" className="mb-8">
        <Box className="mb-4 flex flex-wrap gap-2">
          {post.categories.map((category) => (
            <Link
              key={category}
              href={`/newsletter/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Button
                variant="contained"
                color="primary"
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            </Link>
          ))}
        </Box>

        <Typography
          variant="h1"
          className="mb-4"
          size="text-5xl"
          weight="font-bold"
        >
          {post.title}
        </Typography>

        <Box className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
          <Typography variant="span">By {post.author}</Typography>
          <Typography variant="span">•</Typography>
          <Typography variant="time" dateTime={post.date}>
            {new Date(post.date).toLocaleDateString()}
          </Typography>
          {post.readingTime && (
            <>
              <Typography variant="span">•</Typography>
              <Typography variant="span">{post.readingTime}</Typography>
            </>
          )}
        </Box>

        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={384}
            className="mt-8 h-96 w-full rounded-lg object-cover"
          />
        )}
      </Box>

      {/* Content */}
      <Box
        variant="article"
        className="prose prose-lg dark:prose-invert max-w-none"
      >
        <MDXRemote source={post.content} />
      </Box>

      {/* Tags */}
      {post.tags.length > 0 && (
        <Box className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
          <Typography
            variant="h3"
            className="mb-4"
            size="text-lg"
            weight="font-semibold"
          >
            Tags
          </Typography>
          <Box className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/newsletter/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Button
                  variant="outlined"
                  size="sm"
                  className="rounded-full border-gray-300 hover:border-primary hover:bg-primary hover:text-black dark:border-gray-700"
                >
                  #{tag}
                </Button>
              </Link>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
