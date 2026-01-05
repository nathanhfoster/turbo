import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPostBySlug,
  getAdjacentPosts,
  getRelatedPosts,
} from "@/domains/Newsletter/lib/mdx";
import { Box, Typography, Button, RichText } from "@nathanhfoster/ui";

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

  const { next, previous } = getAdjacentPosts(slug);
  const relatedPosts = getRelatedPosts(slug, 3);

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

        <Box className="flex items-center gap-4 text-foreground-muted">
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
      <Box variant="article">
        <RichText size="lg" variant="spacious">
          {post.content}
        </RichText>
      </Box>

      {/* Tags */}
      {post.tags.length > 0 && (
        <Box className="mt-12 border-t border-border pt-8">
          <Typography
            variant="h3"
            className="mb-4 text-foreground"
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
                  className="rounded-full border-border hover:border-primary hover:bg-primary hover:text-foreground-inverted"
                >
                  #{tag}
                </Button>
              </Link>
            ))}
          </Box>
        </Box>
      )}

      {/* Navigation */}
      {(next || previous) && (
        <Box className="mt-12 border-t border-border pt-8">
          <Box className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {previous && (
              <Link href={`/newsletter/${previous.slug}`}>
                <Box className="group rounded-lg border border-border p-4 transition-colors hover:border-primary hover:bg-background-elevated">
                  <Typography
                    variant="span"
                    className="mb-2 block text-sm text-foreground-muted"
                  >
                    ← Previous
                  </Typography>
                  <Typography
                    variant="h4"
                    className="text-foreground group-hover:text-primary"
                    size="text-lg"
                    weight="font-semibold"
                  >
                    {previous.title}
                  </Typography>
                </Box>
              </Link>
            )}
            {next && (
              <Link
                href={`/newsletter/${next.slug}`}
                className={previous ? "" : "md:col-start-2"}
              >
                <Box className="group rounded-lg border border-border p-4 transition-colors hover:border-primary hover:bg-background-elevated text-right md:text-left">
                  <Typography
                    variant="span"
                    className="mb-2 block text-sm text-foreground-muted"
                  >
                    Next →
                  </Typography>
                  <Typography
                    variant="h4"
                    className="text-foreground group-hover:text-primary"
                    size="text-lg"
                    weight="font-semibold"
                  >
                    {next.title}
                  </Typography>
                </Box>
              </Link>
            )}
          </Box>
        </Box>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Box className="mt-12 border-t border-border pt-8">
          <Typography
            variant="h3"
            className="mb-6 text-foreground"
            size="text-2xl"
            weight="font-bold"
          >
            Related Posts
          </Typography>
          <Box className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/newsletter/${relatedPost.slug}`}
              >
                <Box className="group h-full rounded-lg border border-border bg-background p-6 transition-all hover:border-primary hover:shadow-md">
                  {relatedPost.image && (
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      width={400}
                      height={200}
                      className="mb-4 h-48 w-full rounded-lg object-cover"
                    />
                  )}
                  <Typography
                    variant="h4"
                    className="mb-2 text-foreground group-hover:text-primary"
                    size="text-lg"
                    weight="font-semibold"
                  >
                    {relatedPost.title}
                  </Typography>
                  {relatedPost.description && (
                    <Typography
                      variant="p"
                      className="text-foreground-muted"
                      size="text-sm"
                    >
                      {relatedPost.description}
                    </Typography>
                  )}
                  <Box className="mt-4 flex flex-wrap gap-2">
                    {relatedPost.categories.slice(0, 2).map((category) => (
                      <Button
                        key={category}
                        variant="outlined"
                        size="sm"
                        className="rounded-full border-border text-xs"
                      >
                        {category}
                      </Button>
                    ))}
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
