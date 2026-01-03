/**
 * Design System Types
 *
 * Type definitions for all design tokens to ensure type safety
 * and consistent usage across the platform.
 */

/**
 * Color Scale - Standard color palette with optional variants
 * Supports both standard scale (50-950) and custom variants (10-60, DEFAULT, etc)
 */
export interface ColorScale {
  [key: string]: string | undefined;
  DEFAULT?: string;
  10?: string;
  20?: string;
  30?: string;
  40?: string;
  50?: string;
  60?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
  950?: string;
}

/**
 * Background Color Variants
 */
export interface BackgroundColors {
  DEFAULT: string;
  light: string;
  dark: string;
}

/**
 * Foreground Color Variants
 */
export interface ForegroundColors {
  DEFAULT: string;
  dark: string;
  light: string;
}

/**
 * Complete Color System
 */
export interface ColorSystem {
  primary: ColorScale;
  secondary: ColorScale;
  neutral: ColorScale;
  accent: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  background: BackgroundColors;
  foreground: ForegroundColors;
}

/**
 * Font Size with optional line height configuration
 */
export type FontSize = [string, { lineHeight?: string }];

/**
 * Font Size Scale
 */
export interface FontSizeScale {
  xs: FontSize;
  sm: FontSize;
  base: FontSize;
  lg: FontSize;
  xl: FontSize;
  "2xl": FontSize;
  "3xl": FontSize;
  "4xl": FontSize;
  "5xl": FontSize;
  "6xl": FontSize;
  "7xl": FontSize;
  "8xl": FontSize;
  // Custom numeric sizes
  28: FontSize;
  32: FontSize;
  40: FontSize;
  56: FontSize;
  64: FontSize;
}

/**
 * Font Family Definitions
 */
export interface FontFamilySystem {
  volkhov: string[];
  inter: string[];
  staatliches: string[];
  rubik: string[];
  poppins: string[];
  "dharma-gothic-bold": string[];
}

/**
 * Line Height Scale
 */
export interface LineHeightScale {
  [key: string]: string;
  120: string;
  140: string;
  155: string;
}

/**
 * Letter Spacing Scale
 */
export interface LetterSpacingScale {
  [key: string]: string;
  1.2: string;
  1.4: string;
}

/**
 * Spacing Scale with semantic and numeric values
 */
export interface SpacingScale {
  [key: string]: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  // Custom numeric values
  4.5: string;
  15: string;
  18: string;
  84: string;
  100: string;
  329: string;
  358: string;
  400: string;
  422: string;
  460: string;
  552: string;
  640: string;
}

/**
 * Border Radius Scale
 */
export interface BorderRadiusScale {
  [key: string]: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  full: string;
  // Custom numeric values
  10: string;
  11: string;
  19: string;
  20: string;
  26: string;
  27: string;
  28: string;
  32: string;
}

/**
 * Box Shadow System
 */
export interface BoxShadowSystem {
  [key: string]: string;
  rankShadow: string;
  gameCardAnimation: string;
  "toast-card": string;
  "search-input": string;
  "dark-shadow": string;
  "real-play": string;
}

/**
 * Background Image/Gradient System
 */
export interface BackgroundImageSystem {
  "interactive-BG": string;
  "interactive-BGHover": string;
  "casino-list": string;
  "sports-list": string;
  modelBgBorderGradient: string;
  modelsYellowGradient: string;
  logoutYellowModelGradient: string;
  "noise-right": string;
  "gradient-conic": string;
  "gradient-live-wins-left": string;
  "gradient-live-wins-right": string;
  "gradient-reply-feature": string;
}

/**
 * Breakpoint System
 */
export interface BreakpointSystem {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "1xl": string;
  "2xl": string;
  "3xl": string;
}

/**
 * Backdrop Blur Scale
 */
export interface BackdropBlurScale {
  xs: string;
  6: string;
}

/**
 * Z-Index Scale
 */
export interface ZIndexScale {
  201: number;
}

/**
 * Animation Definitions
 */
export interface AnimationSystem {
  "spin-slow": string;
  fadeIn: string;
  "marquee-on-overflow": string;
}

/**
 * Keyframe Definition
 */
export interface KeyframeDefinition {
  [key: string]: {
    [property: string]: string | number;
  };
}

/**
 * Keyframe System
 */
export interface KeyframeSystem {
  fadeIn: KeyframeDefinition;
  marquee: KeyframeDefinition;
}

/**
 * Aspect Ratio System
 */
export interface AspectRatioSystem {
  "4/3": string;
  "3/4": string;
}

/**
 * Container Configuration
 */
export interface ContainerConfig {
  padding: {
    DEFAULT: string;
    xs: string;
    md: string;
    xl: string;
  };
  maxWidth: {
    DEFAULT: string;
    xl: string;
  };
}

/**
 * Complete Design Token System
 */
export interface DesignTokens {
  colors: ColorSystem;
  fontFamily: FontFamilySystem;
  fontSize: FontSizeScale;
  lineHeight: LineHeightScale;
  letterSpacing: LetterSpacingScale;
  spacing: SpacingScale;
  borderRadius: BorderRadiusScale;
  boxShadow: BoxShadowSystem;
  backgroundImage: BackgroundImageSystem;
  screens: BreakpointSystem;
  backdropBlur: BackdropBlurScale;
  zIndex: ZIndexScale;
  animation: AnimationSystem;
  keyframes: KeyframeSystem;
  aspectRatio: AspectRatioSystem;
  container: ContainerConfig;
}
