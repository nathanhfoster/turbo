import { Button, Typography, Box } from "@nathanhfoster/ui";

export function HeroSection() {
  return (
    <Box className="flex flex-1 flex-col items-center justify-center p-8 pt-20 pb-12 md:pb-8">
      <Box className="max-w-4xl text-center">
        <Typography
          variant="h1"
          className="mb-6 text-6xl md:text-7xl"
          size="text-6xl"
          weight="font-bold"
        >
          Nathan Foster
        </Typography>
        <Typography
          variant="p"
          className="mb-4 text-2xl md:text-3xl text-gray-800 dark:text-gray-400"
        >
          Portfolio & Consultancy
        </Typography>
        <Typography
          variant="p"
          className="mb-8 text-lg md:text-xl text-gray-800 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Full-stack developer and technical consultant specializing in modern
          web applications, PWAs, and scalable architectures.
        </Typography>
        <Box className="flex flex-wrap gap-4 justify-center">
          <Button
            href="/apps"
            variant="contained"
            color="primary"
            size="lg"
          >
            View My Work
          </Button>
          <Button
            href="/newsletter"
            variant="outlined"
            color="inherit"
            size="lg"
          >
            Read Articles
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

