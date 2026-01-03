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

        <Box className="flex flex-wrap justify-center gap-4">
          <Button
            href="/blog"
            variant="contained"
            color="primary"
            size="lg"
            className="px-8"
          >
            Read Blog
          </Button>
          <Button
            href="/portfolio"
            variant="outlined"
            color="primary"
            size="lg"
            className="px-8"
          >
            View Portfolio
          </Button>
          <Button
            href="/contact"
            variant="outlined"
            size="lg"
            className="px-8 border-gray-300 hover:border-primary dark:border-gray-700"
          >
            Get in Touch
          </Button>
        </Box>

        <Box className="mt-16 grid gap-8 md:grid-cols-3">
          <Card padding="md">
            <Typography
              variant="h3"
              className="mb-2"
              size="text-xl"
              weight="font-semibold"
            >
              Blog
            </Typography>
            <Typography
              variant="p"
              className="text-gray-600 dark:text-gray-400"
            >
              Technical insights, tutorials, and thoughts on modern web
              development
            </Typography>
          </Card>
          <Card padding="md">
            <Typography
              variant="h3"
              className="mb-2"
              size="text-xl"
              weight="font-semibold"
            >
              Portfolio
            </Typography>
            <Typography
              variant="p"
              className="text-gray-600 dark:text-gray-400"
            >
              Showcase of projects, case studies, and applications
            </Typography>
          </Card>
          <Card padding="md">
            <Typography
              variant="h3"
              className="mb-2"
              size="text-xl"
              weight="font-semibold"
            >
              Services
            </Typography>
            <Typography
              variant="p"
              className="text-gray-600 dark:text-gray-400"
            >
              Consultancy services for web applications and architecture
            </Typography>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
