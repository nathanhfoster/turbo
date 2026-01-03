import { Box, Card, Typography } from "@nathanhfoster/ui";
import Link from "next/link";
import { getAllSitemapData } from "./utils";
import { BASE_URL } from "./constants";

export const metadata = {
  title: "Sitemap - AgentNate",
  description: "Visual sitemap of all pages and blog posts",
};

// Revalidate every hour (3600 seconds) for ISR
export const revalidate = 3600;

export default function SitemapViewPage() {
  const sitemaps = getAllSitemapData();
  const totalUrls = sitemaps.reduce((sum, sitemap) => sum + sitemap.count, 0);

  return (
    <Box className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Box className="mb-8">
        <Typography
          variant="h1"
          className="mb-4"
          size="text-4xl"
          weight="font-bold"
        >
          Sitemap
        </Typography>
        <Typography variant="p" className="text-lg text-gray-600 dark:text-gray-400">
          Total URLs: {totalUrls.toLocaleString()} across {sitemaps.length} sitemap
          {sitemaps.length !== 1 ? "s" : ""}
        </Typography>
        <Box className="mt-4 flex gap-4">
          <Link
            href="/sitemap.xml"
            className="text-primary hover:underline"
            target="_blank"
          >
            View XML Sitemap Index
          </Link>
          {sitemaps.map((sitemap) => (
            <Link
              key={sitemap.id}
              href={`/sitemap/${sitemap.id}.xml`}
              className="text-primary hover:underline"
              target="_blank"
            >
              Sitemap {sitemap.id}.xml
            </Link>
          ))}
        </Box>
      </Box>

      {sitemaps.map((sitemap) => (
        <Card key={sitemap.id} className="mb-8 p-6">
          <Box className="mb-4 flex items-center justify-between">
            <Typography
              variant="h2"
              size="text-2xl"
              weight="font-semibold"
            >
              Sitemap {sitemap.id}
            </Typography>
            <Typography variant="p" className="text-gray-600 dark:text-gray-400">
              {sitemap.count.toLocaleString()} URLs
            </Typography>
          </Box>

          <Box className="space-y-4">
            {/* Static Routes Section */}
            {sitemap.id === 0 && (
              <Box>
                <Typography
                  variant="h3"
                  size="text-lg"
                  weight="font-semibold"
                  className="mb-3"
                >
                  Static Routes ({sitemap.entries.filter((e) => e.type === "static").length})
                </Typography>
                <Box className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {sitemap.entries
                    .filter((entry) => entry.type === "static")
                    .map((entry) => (
                      <Link
                        key={entry.url}
                        href={entry.url}
                        className="rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary hover:bg-primary/10 dark:border-gray-700"
                      >
                        <Typography
                          variant="p"
                          className="font-medium text-primary"
                        >
                          {entry.url.replace(BASE_URL, "") || "/"}
                        </Typography>
                        <Typography
                          variant="p"
                          className="mt-1 text-xs text-gray-500 dark:text-gray-400"
                        >
                          Priority: {entry.priority} • {entry.changeFrequency}
                        </Typography>
                      </Link>
                    ))}
                </Box>
              </Box>
            )}

            {/* Blog Posts Section */}
            {sitemap.entries.filter((e) => e.type === "blog").length > 0 && (
              <Box>
                <Typography
                  variant="h3"
                  size="text-lg"
                  weight="font-semibold"
                  className="mb-3"
                >
                  Blog Posts ({sitemap.entries.filter((e) => e.type === "blog").length})
                </Typography>
                <Box className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {sitemap.entries
                    .filter((entry) => entry.type === "blog")
                    .map((entry) => (
                      <Link
                        key={entry.url}
                        href={entry.url}
                        className="rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary hover:bg-primary/10 dark:border-gray-700"
                      >
                        <Typography
                          variant="p"
                          className="font-medium text-primary"
                        >
                          {entry.url.replace(BASE_URL, "")}
                        </Typography>
                        <Typography
                          variant="p"
                          className="mt-1 text-xs text-gray-500 dark:text-gray-400"
                        >
                          {new Date(entry.lastModified).toLocaleDateString()} • Priority: {entry.priority}
                        </Typography>
                      </Link>
                    ))}
                </Box>
              </Box>
            )}
          </Box>
        </Card>
      ))}
    </Box>
  );
}

