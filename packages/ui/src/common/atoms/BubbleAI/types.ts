import type { BaseTailwindProps } from "../types";

export type BubbleAIState = "idle" | "listening" | "thinking" | "speaking" | "navigating";

export type BubbleAIQuality = "low" | "medium" | "high";

export interface RingConfig {
  color: string;
  rotationSpeed?: number;
  glowIntensity?: number;
  opacity?: number;
  size?: number; // Percentage of base size (0-1)
}

export interface BubbleAIProps extends BaseTailwindProps {
  /**
   * Size of the BubbleAI component in pixels
   * @default 200
   */
  size?: number;

  /**
   * Current animation state
   * @default "idle"
   */
  state?: BubbleAIState;

  /**
   * Quality setting affecting particle count and animation smoothness
   * @default "medium"
   */
  quality?: BubbleAIQuality;

  /**
   * Number of rings (1-5)
   * @default 3
   */
  ringCount?: number;

  /**
   * Configuration for each ring. If provided, overrides ringCount
   */
  rings?: RingConfig[];

  /**
   * Number of particles (25-500)
   * @default 100
   */
  particleCount?: number;

  /**
   * Particle size multiplier
   * @default 1
   */
  particleSize?: number;

  /**
   * Particle speed multiplier
   * @default 1
   */
  particleSpeed?: number;

  /**
   * Overall opacity
   * @default 1
   */
  opacity?: number;

  /**
   * Enable reduced motion (respects prefers-reduced-motion)
   * @default true
   */
  respectReducedMotion?: boolean;

  /**
   * Custom className for the container
   */
  className?: string;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Hover handler
   */
  onHover?: () => void;

  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;
}

