/**
 * Panda CSS Theme Configuration
 *
 * This module exports MonkeyTilt design tokens in Panda CSS format.
 * Use this in your panda.config.ts to ensure consistency with the design system.
 *
 * @example
 * ```ts
 * import { defineConfig } from '@pandacss/dev'
 * import { pandaTheme } from '@monkey-tilt/theme/panda'
 *
 * export default defineConfig({
 *   theme: {
 *     extend: pandaTheme
 *   }
 * })
 * ```
 */

import * as tokens from './tokens.js';

/**
 * Convert color objects to Panda token format
 */
function convertColorsToPandaTokens(colors: Record<string, any>): any {
  const result: any = {};

  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === 'string') {
      result[key] = { value };
    } else if (typeof value === 'object' && value !== null) {
      result[key] = {};
      for (const [subKey, subValue] of Object.entries(value)) {
        result[key][subKey] = { value: subValue as string };
      }
    }
  }

  return result;
}

/**
 * Convert spacing/sizing values to Panda token format
 */
function convertValuesToPandaTokens(
  values: Record<string, string | number>
): Record<string, { value: string }> {
  const result: any = {};
  for (const [key, value] of Object.entries(values)) {
    result[key] = { value: String(value) };
  }
  return result;
}

/**
 * Panda CSS theme tokens
 */
export const pandaTheme = {
  tokens: {
    colors: convertColorsToPandaTokens(tokens.colors),
    spacing: convertValuesToPandaTokens(tokens.spacing as Record<string, string>),
    radii: convertValuesToPandaTokens(tokens.borderRadius as Record<string, string>),
    fontSizes: (() => {
      const result: any = {};
      for (const [key, value] of Object.entries(tokens.fontSize)) {
        const [size] = value as [string, any];
        result[key] = { value: size };
      }
      return result;
    })(),
    lineHeights: convertValuesToPandaTokens(tokens.lineHeight as Record<string, string>),
    letterSpacings: convertValuesToPandaTokens(tokens.letterSpacing as Record<string, string>),
    shadows: convertValuesToPandaTokens(tokens.boxShadow as Record<string, string>),
    zIndex: (() => {
      const result: any = {};
      for (const [key, value] of Object.entries(tokens.zIndex)) {
        result[key] = { value: value.toString() };
      }
      return result;
    })(),
  },
  semanticTokens: {
    colors: {
      // Semantic color aliases for easier theming
      brand: {
        primary: { value: '{colors.primary.DEFAULT}' },
        secondary: { value: '{colors.secondary.500}' },
      },
      ui: {
        accent: { value: '{colors.accent}' },
        error: { value: '{colors.error}' },
        success: { value: '{colors.success}' },
        warning: { value: '{colors.warning}' },
        info: { value: '{colors.info}' },
      },
      bg: {
        default: { value: '{colors.background.DEFAULT}' },
        light: { value: '{colors.background.light}' },
        dark: { value: '{colors.background.dark}' },
      },
      fg: {
        default: { value: '{colors.foreground.DEFAULT}' },
        dark: { value: '{colors.foreground.dark}' },
        light: { value: '{colors.foreground.light}' },
      },
    },
  },
};

/**
 * Breakpoints for Panda CSS
 */
export const pandaBreakpoints = {
  xs: tokens.screens.xs,
  sm: tokens.screens.sm,
  md: tokens.screens.md,
  lg: tokens.screens.lg,
  xl: tokens.screens.xl,
  '1xl': tokens.screens['1xl'],
  '2xl': tokens.screens['2xl'],
  '3xl': tokens.screens['3xl'],
};

/**
 * Full Panda configuration preset
 * Use this for a complete Panda config with all MonkeyTilt design tokens
 */
export const pandaPreset = {
  theme: {
    extend: pandaTheme,
    breakpoints: pandaBreakpoints,
  },
};

export default pandaTheme;
