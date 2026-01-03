/**
 * @monkey-tilt/theme
 *
 * MonkeyTilt Design System Theme Package
 *
 * This package provides a centralized design system with tokens that can be
 * consumed by both Tailwind CSS and Panda CSS implementations across the monorepo.
 *
 * @example Tailwind CSS
 * ```js
 * import { theme } from '@monkey-tilt/theme/tailwind'
 *
 * export default {
 *   theme: {
 *     extend: theme
 *   }
 * }
 * ```
 *
 * @example Panda CSS
 * ```ts
 * import { pandaTheme } from '@monkey-tilt/theme/panda'
 *
 * export default defineConfig({
 *   theme: {
 *     extend: pandaTheme
 *   }
 * })
 * ```
 *
 * @example Direct token access
 * ```ts
 * import { colors, spacing } from '@monkey-tilt/theme/tokens'
 *
 * console.log(colors.primary.DEFAULT) // '#FFE500'
 * ```
 */

export * from './types.js';
export * from './tokens.js';
export * from './tailwind.js';
export * from './panda.js';
