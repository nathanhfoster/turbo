import { Button, Typography, Box } from "@nathanhfoster/ui";

export function CallToActionSection() {
  return (
    <Box className="w-full bg-primary/10 dark:bg-primary/20 py-16">
      <Box className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <Typography
          variant="h2"
          className="mb-4 text-gray-900 dark:text-foreground text-3xl md:text-4xl"
          size="text-3xl"
          weight="font-bold"
        >
          Let's Build Something Great Together
        </Typography>
        <Typography
          variant="p"
          className="mb-8 text-lg text-gray-700 dark:text-gray-300"
        >
          Looking for a technical consultant or developer for your next project?
          I specialize in modern web applications, PWAs, and scalable
          architectures.
        </Typography>
        <Button href="/services" variant="contained" color="primary" size="lg">
          View Services
        </Button>
      </Box>
    </Box>
  );
}
