/**
 * Tailwind CSS Theme Configuration
 *
 * This module exports MonkeyTilt design tokens in Tailwind CSS format.
 * Use this in your tailwind.config.js to ensure consistency with the design system.
 *
 * @example
 * ```js
 * import { theme } from '@monkey-tilt/theme/tailwind'
 *
 * export default {
 *   theme: {
 *     extend: theme
 *   }
 * }
 * ```
 */

import * as tokens from './tokens.js';

/**
 * Tailwind theme object ready to be used in tailwind.config.js
 */
export const theme = {
  screens: tokens.screens,
  colors: {
    primary: tokens.colors.primary,
    secondary: tokens.colors.secondary,
    neutral: tokens.colors.neutral,
    accent: tokens.colors.accent,
    error: tokens.colors.error,
    success: tokens.colors.success,
    warning: tokens.colors.warning,
    info: tokens.colors.info,
    background: tokens.colors.background,
    foreground: tokens.colors.foreground,
  },
  fontFamily: tokens.fontFamily,
  fontSize: tokens.fontSize,
  lineHeight: tokens.lineHeight,
  letterSpacing: tokens.letterSpacing,
  spacing: tokens.spacing,
  borderRadius: tokens.borderRadius,
  boxShadow: tokens.boxShadow,
  backgroundImage: tokens.backgroundImage,
  backdropBlur: tokens.backdropBlur,
  zIndex: tokens.zIndex,
  animation: tokens.animation,
  keyframes: tokens.keyframes,
  aspectRatio: tokens.aspectRatio,
};

/**
 * Container configuration for Tailwind
 */
export const containerConfig = tokens.container;

/**
 * Tailwind plugins for custom utilities and variants
 */
export const tailwindPlugins = [
  function ({ addComponents, addVariant, addUtilities }: any) {
    // Container query variants
    addVariant('c-md', ':merge(main[data-container-768="true"]) &');
    addVariant('c-lg', ':merge(main[data-container-1024="true"]) &');
    addVariant('c-xl', ':merge(main[data-container-1280="true"]) &');

    // No scrollbar utility
    const newUtilities = {
      '.no-scrollbar': {
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none', // IE and Edge
        'scrollbar-width': 'none', // Firefox
      },
    };

    addUtilities(newUtilities);

    // Container component
    addComponents({
      '.container': {
        transition: 'all 0.3s ease-in-out',
        maxWidth: '100%',
        '@screen xl': {
          maxWidth: tokens.container.maxWidth.xl,
        },
      },
    });
  },
];

/**
 * Generate Tailwind v4 @theme CSS variables
 * Use this for packages using Tailwind v4's CSS-first configuration
 */
export function generateTailwindV4Theme(): string {
  const lines: string[] = [];

  // Colors
  lines.push('  /* Brand Colors */');
  lines.push(`  --color-primary: ${tokens.colors.primary.DEFAULT};`);
  lines.push(`  --color-accent: ${tokens.colors.accent};`);
  lines.push(`  --color-secondary: ${tokens.colors.secondary[500]};`);
  lines.push(`  --color-error: ${tokens.colors.error};`);
  lines.push(`  --color-success: ${tokens.colors.success};`);
  lines.push(`  --color-warning: ${tokens.colors.warning};`);
  lines.push(`  --color-info: ${tokens.colors.info};`);
  lines.push('');

  // Background colors
  lines.push('  /* Background Colors */');
  lines.push(`  --color-background-DEFAULT: ${tokens.colors.background.DEFAULT};`);
  lines.push(`  --color-background-light: ${tokens.colors.background.light};`);
  lines.push(`  --color-background-dark: ${tokens.colors.background.dark};`);
  lines.push('');

  // Foreground colors
  lines.push('  /* Foreground Colors */');
  lines.push(`  --color-foreground-DEFAULT: ${tokens.colors.foreground.DEFAULT};`);
  lines.push(`  --color-foreground-dark: ${tokens.colors.foreground.dark};`);
  lines.push(`  --color-foreground-light: ${tokens.colors.foreground.light};`);
  lines.push('');

  // Font families
  lines.push('  /* Font Families */');
  lines.push(`  --font-family-volkhov: ${tokens.fontFamily.volkhov.join(', ')};`);
  lines.push(`  --font-family-inter: ${tokens.fontFamily.inter.join(', ')};`);
  lines.push('');

  // Font sizes with line heights
  lines.push('  /* Font Sizes with Line Heights */');
  Object.entries(tokens.fontSize).forEach(([key, value]) => {
    const [size, config] = value as [string, { lineHeight?: string }];
    lines.push(`  --font-size-${key}: ${size};`);
    if (typeof config === 'object' && config.lineHeight) {
      lines.push(`  --font-size-${key}--line-height: ${config.lineHeight};`);
    }
  });

  return lines.join('\n');
}

export default theme;
