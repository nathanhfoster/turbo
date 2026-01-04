import {
  Box,
  Card,
  Typography,
  IconBriefcase,
  IconRocketLaunch,
  IconShield,
  IconSwatchbook,
  IconUsers,
  IconRoadmap,
  IconKey,
} from "@nathanhfoster/ui";

export const metadata = {
  title: "Services",
  description:
    "Consultancy services for web applications and architecture",
};

const services = [
  {
    icon: IconRocketLaunch,
    title: "AI-Powered Development & Consulting",
    description:
      "Leveraging AI tools like Claude and Cursor to accelerate development velocity, reduce cycles by 40%, and establish AI-optimized documentation patterns. Expert in prompting strategies and markdown file engineering for seamless human-AI collaboration.",
    features: [
      "AI-Assisted Development Workflows",
      "Advanced Prompting Strategies",
      "Markdown Engineering for AI Context",
      "Automated Code Generation",
      "AI-Enhanced Refactoring",
    ],
  },
  {
    icon: IconShield,
    title: "Front-End Architecture & Engineering",
    description:
      "Architecting scalable monorepo infrastructures, micro-frontend architectures, and high-performance applications. Nearly a decade of experience building platforms handling 50M+ monthly users using Next.js, React, and TypeScript.",
    features: [
      "Monorepo Architecture Design",
      "Micro-Frontend Implementation",
      "Next.js & React Development",
      "TypeScript & Modern JavaScript",
      "Performance Optimization & Scalability",
    ],
  },
  {
    icon: IconKey,
    title: "State Management Solutions",
    description:
      "Author of Resurrection, a pioneering state management library. Expert in Redux, Context API, and custom state management solutions. Specializing in memoization techniques that drastically reduce DOM re-renders.",
    features: [
      "Custom State Management Libraries",
      "Redux & Context API Implementation",
      "Memoization & Performance Optimization",
      "State Architecture Design",
      "Legacy System Refactoring",
    ],
  },
  {
    icon: IconSwatchbook,
    title: "Component Library Development",
    description:
      "Building reusable component libraries with Storybook documentation. Creating design systems, atomic component architectures, and maintaining comprehensive documentation for cross-team collaboration.",
    features: [
      "Component Library Architecture",
      "Storybook Integration & Documentation",
      "Design System Creation",
      "Reusable UI Components",
      "Tailwind CSS Implementation",
    ],
  },
  {
    icon: IconRocketLaunch,
    title: "Progressive Web App (PWA) Development",
    description:
      "Expert in building PWAs with offline capability, push notifications, and app-like installation experiences. Delivered PWA prototypes for nationwide shared economy networks and gaming communities.",
    features: [
      "PWA Architecture & Implementation",
      "Offline Capability & Service Workers",
      "Push Notifications",
      "App Installation Experience",
      "Cross-Platform Compatibility",
    ],
  },
  {
    icon: IconUsers,
    title: "Technical Leadership & Mentorship",
    description:
      "Servant leadership focused on empowering teams through mentorship, fostering collaboration, and championing continuous learning. Hired and mentored engineers, conducted one-on-ones, and led company-wide training sessions.",
    features: [
      "Team Mentorship & Development",
      "Code Reviews & Pair Programming",
      "Engineering Excellence Training",
      "Agile Process Improvement",
      "Technical Knowledge Transfer",
    ],
  },
  {
    icon: IconShield,
    title: "Testing & Quality Assurance",
    description:
      "Achieving 99% code coverage through advanced testing frameworks. Expert in Cypress, React Testing Library, and comprehensive test strategy implementation. Refactored testing frameworks from Enzyme to modern solutions.",
    features: [
      "Cypress E2E Testing",
      "React Testing Library",
      "Test Coverage Optimization (99%+)",
      "Testing Framework Migration",
      "Quality Assurance Strategy",
    ],
  },
  {
    icon: IconRoadmap,
    title: "Full-Stack Development",
    description:
      "Back-end proficiency in Django, Node.js, Express, FastAPI, and GraphQL. Cloud infrastructure expertise with AWS, PostgreSQL, and deployment pipelines. Full-stack solutions from API design to database architecture.",
    features: [
      "Node.js & Django Development",
      "GraphQL & REST API Design",
      "AWS Cloud Infrastructure",
      "PostgreSQL Database Architecture",
      "Deployment Pipeline Optimization",
    ],
  },
];

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
          className="mb-8 text-xl text-gray-600 dark:text-gray-400"
        >
          Consultancy services for web applications and architecture
        </Typography>
        <Typography
          variant="p"
          className="mx-auto max-w-3xl text-lg text-gray-700 dark:text-gray-300"
        >
          A visionary software engineer on the vanguard of AI-powered web development, 
          with nearly a decade of experience architecting high-performance, scalable platforms. 
          Expert in React, Next.js, TypeScript, monorepo architectures, and AI-enhanced development 
          workflows. Principal Front-End Engineer with proven track record building platforms 
          handling 50M+ monthly users.
        </Typography>
      </Box>

      <Box className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
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
                  <Box className="h-6 w-6 text-primary group-hover:text-black transition-colors">
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
                className="mb-4 text-gray-600 dark:text-gray-400 group-hover:text-primary/80 transition-colors"
              >
                {service.description}
              </Typography>
              <Box className="space-y-2">
                {service.features.map((feature, index) => (
                  <Box key={index} className="flex items-start gap-2">
                    <Box className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                    <Typography
                      variant="span"
                      className="text-sm text-gray-700 dark:text-gray-300"
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
          className="mb-6 text-lg text-gray-700 dark:text-gray-300"
        >
          Let's discuss how I can help with your project. Whether you need
          development, architecture guidance, or team training, I'm here to
          help.
        </Typography>
        <Typography
          variant="p"
          className="text-gray-600 dark:text-gray-400"
        >
          Contact me to discuss your project requirements and how we can work
          together.
        </Typography>
      </Box>
    </Box>
  );
}

