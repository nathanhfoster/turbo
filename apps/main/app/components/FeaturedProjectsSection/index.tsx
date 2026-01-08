import { Button, Card, Typography, Box } from "@nathanhfoster/ui";
import { getMainAppUrl } from "../../../../shared/utils/getMainAppUrl";

export function FeaturedProjectsSection() {
  const mainAppUrl = getMainAppUrl();

  return (
    <Box className="w-full bg-gray-50 dark:bg-gray-900/50 py-16">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Box className="mb-12 text-center">
          <Typography
            variant="h2"
            className="mb-4 text-gray-900 dark:text-foreground"
            size="text-4xl"
            weight="font-bold"
          >
            Featured Projects
          </Typography>
          <Typography
            variant="p"
            className="text-lg text-gray-700 dark:text-gray-400"
          >
            Modern applications built with cutting-edge technologies
          </Typography>
        </Box>
        <Box className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <Card
            href={`${mainAppUrl}/apps/astralpoet`}
            padding="p-6 md:p-8"
            hoverable
            className="hover:shadow-xl transition-all border-2 border-primary/20 hover:border-primary group"
          >
            <Typography
              variant="h3"
              className="mb-3 text-gray-900 dark:text-foreground group-hover:text-primary transition-colors"
              size="text-2xl"
              weight="font-semibold"
            >
              Astral Poet
            </Typography>
            <Typography
              variant="p"
              className="text-gray-700 dark:text-gray-400 group-hover:text-primary/80 transition-colors"
            >
              A modern PWA diary/journal application with offline support,
              IndexedDB storage, and beautiful UI. Built with Next.js, React,
              and TypeScript.
            </Typography>
          </Card>
          <Card
            href={`${mainAppUrl}/apps/resume`}
            padding="p-6 md:p-8"
            hoverable
            className="hover:shadow-xl transition-all border-2 border-primary/20 hover:border-primary group"
          >
            <Typography
              variant="h3"
              className="mb-3 text-gray-900 dark:text-foreground group-hover:text-primary transition-colors"
              size="text-2xl"
              weight="font-semibold"
            >
              AI Resume Builder
            </Typography>
            <Typography
              variant="p"
              className="text-gray-700 dark:text-gray-400 group-hover:text-primary/80 transition-colors"
            >
              AI-powered resume builder with inline editing, job-specific
              customization, and offline support. Leverages OpenAI for
              intelligent resume enhancement.
            </Typography>
          </Card>
        </Box>
        <Box className="mt-8 text-center">
          <Button
            href="/apps"
            variant="outlined"
            color="inherit"
          >
            View All Projects
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

