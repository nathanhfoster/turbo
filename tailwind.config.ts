import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./apps/**/*.{ts,tsx,js,jsx}",
    "./packages/ui/src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        success: "var(--color-success)",
        error: "var(--color-error)",
        warning: "var(--color-warning)",
        info: "var(--color-info)",
      },
    },
  },
  plugins: [],
} satisfies Config;
