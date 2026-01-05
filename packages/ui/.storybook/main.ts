import type { StorybookConfig } from "@storybook/react-vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(cfg) {
    cfg.resolve = cfg.resolve || {};
    cfg.resolve.alias = {
      ...cfg.resolve.alias,
      "@nathanhfoster/utils": resolve(__dirname, "../../utils/src"),
      "@ui": resolve(__dirname, "../src"),
    };

    // 🔑 tell Vite to use the root PostCSS config (matches production)
    cfg.css ||= {};
    cfg.css.postcss = resolve(__dirname, "../../../postcss.config.mjs");

    // Ensure proper module resolution for Storybook
    cfg.optimizeDeps = cfg.optimizeDeps || {};
    cfg.optimizeDeps.include = [
      ...(cfg.optimizeDeps.include || []),
      "@storybook/react-vite",
    ];
    cfg.optimizeDeps.exclude = [
      ...(cfg.optimizeDeps.exclude || []),
      "next",
      "next/dist",
      "@vercel/turbopack-ecmascript-runtime",
    ];

    // Fix for dynamic imports - ensure proper server configuration
    cfg.server = cfg.server || {};
    cfg.server.fs = {
      ...cfg.server.fs,
      allow: [
        ...(cfg.server.fs?.allow || []),
        resolve(__dirname, "../"),
        resolve(__dirname, "../../"),
      ],
    };

    // Ensure proper handling of TypeScript/JSX files
    cfg.resolve.extensions = [
      ...(cfg.resolve.extensions || []),
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".mjs",
    ];

    // Fix for dynamic imports - ensure proper handling of story files
    cfg.plugins = cfg.plugins || [];
    
    // Ensure proper module resolution
    cfg.resolve.conditions = cfg.resolve.conditions || [];
    if (!cfg.resolve.conditions.includes("import")) {
      cfg.resolve.conditions.push("import");
    }
    if (!cfg.resolve.conditions.includes("module")) {
      cfg.resolve.conditions.push("module");
    }

    // Mock Node.js modules for Storybook (since we're in a browser environment)
    cfg.resolve.alias = {
      ...cfg.resolve.alias,
      "next/dynamic": resolve(__dirname, "./mocks/next-dynamic.ts"),
      "http": resolve(__dirname, "./mocks/http.ts"),
    };

    return cfg;
  },
};

export default config;
