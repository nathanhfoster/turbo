/**
 * Design System Tokens
 *
 * This is the single source of truth for all design tokens used across
 * the platform. These tokens are consumed by both Tailwind CSS
 * and Panda CSS implementations.
 */

import type {
  ColorSystem,
  FontFamilySystem,
  FontSizeScale,
  LineHeightScale,
  LetterSpacingScale,
  SpacingScale,
  BorderRadiusScale,
  BoxShadowSystem,
  BackgroundImageSystem,
  BreakpointSystem,
  BackdropBlurScale,
  ZIndexScale,
  AnimationSystem,
  KeyframeSystem,
  AspectRatioSystem,
  ContainerConfig,
} from './types.js';

/**
 * Brand Colors
 * Primary: Yellow (#FFE500)
 */
export const colors: ColorSystem = {
  // Primary brand color (Yellow)
  // Includes both custom variants (10-60) and standard scale (50-950)
  primary: {
    DEFAULT: '#FFE500',
    // Custom brand variants
    10: '#453F02',
    20: '#6F6503',
    30: '#928403',
    40: '#C5B302',
    50: '#E5CF05',
    60: '#F4DC03',
    // Standard scale for component compatibility
    100: '#FEF9C3',  // Very light yellow
    200: '#FEF08A',  // Light yellow
    300: '#FDE047',  // Soft yellow
    400: '#FACC15',  // Medium yellow
    500: '#FFE500',  // Brand yellow (same as DEFAULT)
    600: '#F4DC03',  // Deeper yellow (same as 60)
    700: '#E5CF05',  // Richer yellow (same as 50)
    800: '#C5B302',  // Dark yellow (same as 40)
    900: '#928403',  // Very dark yellow (same as 30)
    950: '#6F6503',  // Darkest yellow (same as 20)
  },

  // Secondary colors for UI elements
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },

  // Neutral grays
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },

  // Semantic colors
  accent: '#ff906c',
  error: '#cd0c05',
  success: '#27b045',
  warning: '#ffbb00',
  info: '#f9c00e',

  // Background colors
  background: {
    DEFAULT: 'initial',
    light: '#1b1f23',
    dark: 'black',
  },

  // Foreground colors
  foreground: {
    DEFAULT: 'inherit',
    dark: 'white',
    light: '#3c3c3c',
  },
} as const;

/**
 * Typography
 */
export const fontFamily: FontFamilySystem = {
  // Package UI fonts
  volkhov: ['Volkhov', 'serif'],
  inter: ['Inter', 'sans-serif'],

  // Rewire app fonts (CSS variables expected to be defined)
  staatliches: ['var(--font-staatliches)'],
  rubik: ['var(--font-rubik)'],
  poppins: ['var(--font-poppins)'],
  'dharma-gothic-bold': ['var(--font-dharma-gothic-bold)'],
} as const;

export const fontSize: FontSizeScale = {
  xs: ['0.75rem', { lineHeight: '1rem' }],
  sm: ['0.875rem', { lineHeight: '1.25rem' }],
  base: ['1rem', { lineHeight: '1.5rem' }],
  lg: ['1.125rem', { lineHeight: '1.75rem' }],
  xl: ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  '5xl': ['3rem', { lineHeight: '1' }],
  '6xl': ['3.75rem', { lineHeight: '1' }],
  '7xl': ['4.5rem', { lineHeight: '1' }],
  '8xl': ['6rem', { lineHeight: '1' }],
  // Custom numeric sizes
  28: ['28px', { lineHeight: '1.2' }],
  32: ['32px', { lineHeight: '1.2' }],
  40: ['40px', { lineHeight: '1.2' }],
  56: ['56px', { lineHeight: '1.2' }],
  64: ['64px', { lineHeight: '1.2' }],
} as const;

export const lineHeight: LineHeightScale = {
  120: '120%',
  140: '140%',
  155: '155%',
} as const;

export const letterSpacing: LetterSpacingScale = {
  1.2: '1.2px',
  1.4: '1.4px',
} as const;

/**
 * Spacing Scale
 */
export const spacing: SpacingScale = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  // Custom numeric values
  4.5: '18px',
  15: '60px',
  18: '72px',
  84: '84px',
  100: '100px',
  329: '329px',
  358: '358px',
  400: '400px',
  422: '422px',
  460: '460px',
  552: '514px',
  640: '640px',
} as const;

/**
 * Border Radius
 */
export const borderRadius: BorderRadiusScale = {
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
  // Custom numeric values
  10: '10px',
  11: '11px',
  19: '19px',
  20: '20px',
  26: '26px',
  27: '27px',
  28: '28px',
  32: '32px',
} as const;

/**
 * Box Shadows
 */
export const boxShadow: BoxShadowSystem = {
  rankShadow: '0px 3.094px 15px -5.415px inset',
  gameCardAnimation: '0px 4px 4px 0px #00000019',
  'toast-card':
    '0px 8px 10px 0px #00000033, 0px 6px 30px 0px #0000001e, 0px 16px 24px 0px #00000023',
  'search-input': 'inset 0px 4px 12px 0px #0000007f',
  'dark-shadow': '0px 8px 12px 0px #00000099',
  'real-play': 'inset 8px 8px 8px -4px #09090bbf, inset -8px -8px 8px 0px #1a1a1a',
} as const;

/**
 * Background Images / Gradients
 */
export const backgroundImage: BackgroundImageSystem = {
  'interactive-BG':
    'linear-gradient(137.74deg, #ffffff33 1.96%, #ffffff0c 81.81%)',
  'interactive-BGHover':
    'linear-gradient(138deg, #ffffff66 1.96%, #ffffff0c 81.81%)',
  'casino-list':
    'linear-gradient(267.67deg,#0000 16.26%, #fcd70819 93.74%),radial-gradient(60.53% 100% at 50.12% 100%,#fcd70819 0%,#fcd70819 0.01%,#0000 100%)',
  'sports-list':
    'linear-gradient(267.67deg, #0000 16.26%, #fb923c19 93.74%), radial-gradient( 48.06% 79.4% at 50.12% 79.4%, #fb923c33 0%, #fb923c26 0.01%, #0000 100%)',
  modelBgBorderGradient:
    'linear-gradient(112deg,#ffffff14,#0000),linear-gradient(216deg,#0000 0.85%,#ffffff26 51.45%,#0000 99.99%)',
  modelsYellowGradient:
    'radial-gradient(200.1% 123.8% at 50% 68.9%,#0000 46.9%,#4e4724 69.3%,#4f4824 100%)',
  logoutYellowModelGradient:
    'radial-gradient(180.13% 138.75% at 50% 72.71%,#0000 39.28%,#4e4724 69.27%,#4f4824 100%)',
  'noise-right': 'linear-gradient(269deg,#09090b 0.53%,#0000 98.94%,#0000 98.95%)',
  'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  'gradient-live-wins-left': 'linear-gradient(90deg, #09090B 72.11%, #0000 100%)',
  'gradient-live-wins-right': 'linear-gradient(270deg, #09090B,#0000)',
  'gradient-reply-feature': 'linear-gradient(180deg, #0000, #0B0B0D)',
} as const;

/**
 * Breakpoints / Screens
 */
export const screens: BreakpointSystem = {
  xs: '460px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '1xl': '1440px',
  '2xl': '1536px',
  '3xl': '1920px',
} as const;

/**
 * Backdrop Blur
 */
export const backdropBlur: BackdropBlurScale = {
  xs: '2px',
  6: '6px',
} as const;

/**
 * Z-Index Scale
 */
export const zIndex: ZIndexScale = {
  201: 201,
} as const;

/**
 * Animations
 */
export const animation: AnimationSystem = {
  'spin-slow': 'spin 10s linear infinite',
  fadeIn: 'fadeIn 0.2s ease-out',
  'marquee-on-overflow': 'marquee 10s linear infinite',
} as const;

export const keyframes: KeyframeSystem = {
  fadeIn: {
    '0%': { opacity: '0', transform: 'translateY(4px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  marquee: {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' },
  },
} as const;

/**
 * Aspect Ratios
 */
export const aspectRatio: AspectRatioSystem = {
  '4/3': '4 / 3',
  '3/4': '3 / 4',
} as const;

/**
 * Container Configuration
 */
export const container: ContainerConfig = {
  padding: {
    DEFAULT: '1rem',
    xs: '1rem',
    md: '3rem',
    xl: '0px',
  },
  maxWidth: {
    DEFAULT: '100%',
    xl: '1280px',
  },
} as const;
