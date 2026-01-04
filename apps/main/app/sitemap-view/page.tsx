import { Box, Card, Typography, Button } from "@nathanhfoster/ui";
import Link from "next/link";
import { getAllSitemapData } from "./utils";
import { BASE_URL } from "./constants";

export const metadata = {
  title: "Sitemap",
  description: "Visual sitemap of all pages and newsletter posts",
};

// Revalidate every hour (3600 seconds) for ISR
export const revalidate = 3600;

export default function SitemapViewPage() {
  const sitemaps = getAllSitemapData();
  const totalUrls = sitemaps.reduce((sum, sitemap) => sum + sitemap.count, 0);

  return (
    <Box className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Box className="mb-12 text-center">
        <Typography
          variant="h1"
          className="mb-4"
          size="text-5xl"
          weight="font-bold"
        >
          Sitemap
        </Typography>
        <Typography
          variant="p"
          className="mb-8 text-xl text-gray-600 dark:text-gray-400"
        >
          Visual sitemap of all pages and newsletter posts
        </Typography>
        <Typography
          variant="p"
          className="mb-6 text-lg text-gray-700 dark:text-gray-300"
        >
          Total URLs: {totalUrls.toLocaleString()} across {sitemaps.length}{" "}
          sitemap
          {sitemaps.length !== 1 ? "s" : ""}
        </Typography>
        <Box className="flex flex-wrap justify-center gap-3">
          <Link
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border-2 border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-black focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            View XML Sitemap Index
          </Link>
          {sitemaps.map((sitemap) => (
            <Link
              key={sitemap.id}
              href={`/sitemap/${sitemap.id}.xml`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border-2 border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-black focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Sitemap {sitemap.id}.xml
            </Link>
          ))}
        </Box>
      </Box>

      {sitemaps.map((sitemap) => (
        <Card key={sitemap.id} className="mb-8 p-6" hoverable>
          <Box className="mb-6 flex items-center justify-between">
            <Typography variant="h2" size="text-3xl" weight="font-bold">
              Sitemap {sitemap.id}
            </Typography>
            <Typography
              variant="p"
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              {sitemap.count.toLocaleString()} URLs
            </Typography>
          </Box>

          <Box className="space-y-6">
            {/* Static Routes Section */}
            {sitemap.id === 0 && (
              <Box>
                <Typography
                  variant="h3"
                  size="text-xl"
                  weight="font-semibold"
                  className="mb-4"
                >
                  Static Routes (
                  {sitemap.entries.filter((e) => e.type === "static").length})
                </Typography>
                <Box className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {sitemap.entries
                    .filter((entry) => entry.type === "static")
                    .map((entry) => (
                      <Card
                        key={entry.url}
                        href={entry.url}
                        padding="p-4"
                        hoverable
                        className="hover:border-primary group"
                      >
                        <Typography
                          variant="p"
                          className="mb-2 font-semibold text-primary group-hover:text-primary transition-colors"
                        >
                          {entry.url.replace(BASE_URL, "") || "/"}
                        </Typography>
                        <Typography
                          variant="p"
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          Priority: {entry.priority} • {entry.changeFrequency}
                        </Typography>
                      </Card>
                    ))}
                </Box>
              </Box>
            )}

            {/* Newsletter Posts Section */}
            {sitemap.entries.filter((e) => e.type === "newsletter").length >
              0 && (
              <Box>
                <Typography
                  variant="h3"
                  size="text-xl"
                  weight="font-semibold"
                  className="mb-4"
                >
                  Newsletter Posts (
                  {
                    sitemap.entries.filter((e) => e.type === "newsletter")
                      .length
                  }
                  )
                </Typography>
                <Box className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {sitemap.entries
                    .filter((entry) => entry.type === "newsletter")
                    .map((entry) => (
                      <Card
                        key={entry.url}
                        href={entry.url}
                        padding="p-4"
                        hoverable
                        className="hover:border-primary group"
                      >
                        <Typography
                          variant="p"
                          className="mb-2 font-semibold text-primary group-hover:text-primary transition-colors"
                        >
                          {entry.url.replace(BASE_URL, "")}
                        </Typography>
                        <Typography
                          variant="p"
                          className="text-sm text-gray-600 dark:text-gray-400"
                        >
                          {new Date(entry.lastModified).toLocaleDateString()} •
                          Priority: {entry.priority}
                        </Typography>
                      </Card>
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
