import { Box, Card, Typography } from "@nathanhfoster/ui";

export const metadata = {
  title: "Portfolio",
  description:
    "Showcase of projects, case studies, and applications",
};

export default function PortfolioPage() {
  return (
    <Box className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Box className="mb-12 text-center">
        <Typography
          variant="h1"
          className="mb-4"
          size="text-5xl"
          weight="font-bold"
        >
          Portfolio
        </Typography>
        <Typography
          variant="p"
          className="text-xl text-gray-600 dark:text-gray-400"
        >
          Showcase of projects, case studies, and applications
        </Typography>
      </Box>

      <Box className="mb-12">
        <Typography
          variant="h2"
          className="mb-8"
          size="text-3xl"
          weight="font-bold"
        >
          Apps
        </Typography>
        <Box className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card
            href="/astralpoet"
            padding="p-5 sm:p-6 md:p-8"
            hoverable
            className="hover:shadow-lg transition-all border-2 border-primary/20 hover:border-primary group"
          >
            <Typography
              variant="h3"
              className="mb-2 group-hover:text-primary transition-colors"
              size="text-xl"
              weight="font-semibold"
            >
              Astral Poet
            </Typography>
            <Typography
              variant="p"
              className="text-gray-600 dark:text-gray-400 group-hover:text-primary/80 transition-colors"
            >
              A modern PWA diary/journal application with offline support,
              IndexedDB storage, and beautiful UI
            </Typography>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

