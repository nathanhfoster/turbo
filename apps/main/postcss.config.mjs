/**
 * PostCSS config for main app
 * Uses root Tailwind config to ensure safelist and preset are applied
 * 
 * Note: Using relative path for Turbopack compatibility
 */
export default {
  plugins: {
    '@tailwindcss/postcss': {
      config: '../../tailwind.config.ts',
    },
    autoprefixer: {},
  },
};

