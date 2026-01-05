import type { Config } from "tailwindcss";
import preset from "./packages/tailwind/preset";

/**
 * Root Tailwind CSS Configuration (Authoritative)
 *
 * This is the single source of truth for Tailwind CSS in this monorepo.
 * All builds using PostCSS will use this configuration.
 *
 * - Apps use this via root PostCSS config
 * - Libraries contribute class usage (no configs needed)
 * - Design tokens are inherited via the preset
 * - This config produces the only production CSS
 */
const config: Config = {
  presets: [preset],
  content: [
    // Apps
    "./apps/**/*.{ts,tsx,js,jsx,mdx}",

    // UI library source
    "./packages/ui/src/**/*.{ts,tsx,js,jsx,mdx}",

    // UI stories (for Storybook if using root PostCSS)
    "./packages/ui/src/**/*.stories.{ts,tsx,js,jsx,mdx}",

    // PWA package (contains CookieConsentModal and other components)
    "./packages/pwa/src/**/*.{ts,tsx,js,jsx,mdx}",
  ],
};

export default config;
