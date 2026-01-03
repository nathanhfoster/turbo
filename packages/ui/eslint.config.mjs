import { config } from "@monkey-tilt/eslint-config/react-internal";
import storybook from "eslint-plugin-storybook";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,
  // For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
  ...storybook.configs["flat/recommended"],
];
