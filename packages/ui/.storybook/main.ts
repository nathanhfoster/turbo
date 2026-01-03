import type { StorybookConfig } from "@storybook/nextjs-vite";
import { resolve } from "path";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },

  async viteFinal(cfg) {
    cfg.resolve = cfg.resolve || {};
    cfg.resolve.alias = {
      ...cfg.resolve.alias,
      "@nathanhfoster/utils": resolve(__dirname, "../../utils/src"),
      "@ui": resolve(__dirname, "../src"),
    };

    // 🔑 tell Vite to use the package PostCSS config
    cfg.css ||= {};
    cfg.css.postcss = resolve(__dirname, "../postcss.config.mjs");

    return cfg;
  },
};

export default config;
