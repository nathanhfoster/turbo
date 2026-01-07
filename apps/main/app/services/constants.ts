import {
  IconBriefcase,
  IconRocketLaunch,
  IconShield,
  IconSwatchbook,
  IconUsers,
  IconRoadmap,
  IconKey,
} from "@nathanhfoster/ui";
import type { Service } from "./types";

/**
 * Services offered for consultancy
 */
export const SERVICES: Service[] = [
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
