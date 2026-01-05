import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // @ts-expect-error - safelist exists but may not be in type definition
  safelist: [
    // Navbar positioning utilities
    "fixed",
    "top-0",
    "bottom-0",
    "left-0",
    "right-0",
    "z-50",
    // Navbar background and styling
    "bg-white",
    "shadow-sm",
    "border-gray-200",
    "dark:bg-gray-900",
    "dark:bg-gray-800",
    "dark:border-gray-800",
    "dark:border-gray-700",
    // Navbar transform utilities for scroll animations
    "translate-y-0",
    "-translate-y-full",
    "translate-y-full",
    "transition-transform",
    "duration-300",
  ],
  // Theme is defined in CSS @theme blocks, not here
  // See packages/ui/src/index.css
};

export default config;

