import { Button, Card, Typography, Box } from "@nathanhfoster/ui";

export default function Home() {
  return (
    <Box
      variant="main"
      className="flex min-h-screen flex-col items-center justify-center p-8"
    >
      <Box className="max-w-4xl text-center">
        <Typography
          variant="h1"
          className="mb-6"
          size="text-6xl"
          weight="font-bold"
        >
          Nathan Foster
        </Typography>
        <Typography
          variant="p"
          className="mb-8 text-2xl text-gray-600 dark:text-gray-400"
        >
          Portfolio & Consultancy
        </Typography>
        <Typography
          variant="p"
          className="mb-12 text-lg text-gray-700 dark:text-gray-300"
        >
          Full-stack developer and technical consultant specializing in modern
          web applications, PWAs, and scalable architectures.
        </Typography>
        <Box className="mt-16 grid gap-8 md:grid-cols-3">
          <Card
            href="/newsletter"
            padding="p-5 sm:p-6 md:p-8"
            hoverable
            className="hover:shadow-lg transition-all hover:border-primary group"
          >
            <Typography
              variant="h3"
              className="mb-2 group-hover:text-primary transition-colors"
              size="text-xl"
              weight="font-semibold"
            >
              Newsletter
            </Typography>
            <Typography
              variant="p"
              className="text-gray-600 dark:text-gray-400 group-hover:text-primary/80 transition-colors"
            >
              Technical insights, tutorials, and thoughts on modern web
              development
            </Typography>
          </Card>
          <Card
            href="/portfolio"
            padding="p-5 sm:p-6 md:p-8"
            hoverable
            className="hover:shadow-lg transition-all hover:border-primary group"
          >
            <Typography
              variant="h3"
              className="mb-2 group-hover:text-primary transition-colors"
              size="text-xl"
              weight="font-semibold"
            >
              Portfolio
            </Typography>
            <Typography
              variant="p"
              className="text-gray-600 dark:text-gray-400 group-hover:text-primary/80 transition-colors"
            >
              Showcase of projects, case studies, and applications
            </Typography>
          </Card>
          <Card
            href="/contact"
            padding="p-5 sm:p-6 md:p-8"
            hoverable
            className="hover:shadow-lg transition-all hover:border-primary group"
          >
            <Typography
              variant="h3"
              className="mb-2 group-hover:text-primary transition-colors"
              size="text-xl"
              weight="font-semibold"
            >
              Services
            </Typography>
            <Typography
              variant="p"
              className="text-gray-600 dark:text-gray-400 group-hover:text-primary/80 transition-colors"
            >
              Consultancy services for web applications and architecture
            </Typography>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
