import { Box, Card, Typography } from "@nathanhfoster/ui";
import { SERVICES } from "./constants";

export const metadata = {
  title: "Services",
  description: "Consultancy services for web applications and architecture",
};

export default function ServicesPage() {
  return (
    <Box className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Box className="mb-12 text-center">
        <Typography
          variant="h1"
          className="mb-4"
          size="text-5xl"
          weight="font-bold"
        >
          Services
        </Typography>
        <Typography
          variant="p"
          className="mb-8 text-xl text-gray-700 dark:text-gray-400"
        >
          Consultancy services for web applications and architecture
        </Typography>
        <Typography
          variant="p"
          className="mx-auto max-w-3xl text-lg text-gray-800 dark:text-gray-300"
        >
          A visionary software engineer on the vanguard of AI-powered web
          development, with nearly a decade of experience architecting
          high-performance, scalable platforms. Expert in React, Next.js,
          TypeScript, monorepo architectures, and AI-enhanced development
          workflows. Principal Front-End Engineer with proven track record
          building platforms handling 50M+ monthly users.
        </Typography>
      </Box>

      <Box className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => {
          const IconComponent = service.icon;
          return (
            <Card
              key={service.title}
              padding="p-6 sm:p-8"
              hoverable
              className="hover:shadow-lg transition-all border-2 border-primary/20 hover:border-primary group"
            >
              <Box className="mb-4 flex items-center gap-3">
                <Box className="rounded-lg bg-primary/10 p-2 group-hover:bg-primary transition-colors flex items-center justify-center">
                  <Box className="h-6 w-6 text-primary group-hover:text-black transition-colors flex items-center justify-center">
                    <IconComponent />
                  </Box>
                </Box>
                <Typography
                  variant="h3"
                  className="group-hover:text-primary transition-colors"
                  size="text-xl"
                  weight="font-semibold"
                >
                  {service.title}
                </Typography>
              </Box>
              <Typography
                variant="p"
                className="mb-4 text-gray-800 dark:text-gray-400 group-hover:text-primary/80 transition-colors"
              >
                {service.description}
              </Typography>
              <Box className="space-y-2">
                {service.features.map((feature, index) => (
                  <Box key={index} className="flex items-start gap-2">
                    <Box className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary dark:bg-primary" />
                    <Typography
                      variant="span"
                      className="text-sm text-gray-900 dark:text-gray-300"
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          );
        })}
      </Box>

      <Box className="mt-16 rounded-lg border-2 border-primary/20 bg-primary/5 p-8 text-center">
        <Typography
          variant="h2"
          className="mb-4"
          size="text-3xl"
          weight="font-bold"
        >
          Ready to Get Started?
        </Typography>
        <Typography
          variant="p"
          className="mb-6 text-lg text-gray-800 dark:text-gray-300"
        >
          Let's discuss how I can help with your project. Whether you need
          development, architecture guidance, or team training, I'm here to
          help.
        </Typography>
        <Typography variant="p" className="text-gray-700 dark:text-gray-400">
          Contact me to discuss your project requirements and how we can work
          together.
        </Typography>
      </Box>
    </Box>
  );
}
