import type { BubbleAIQuality, BubbleAIState, RingConfig } from "./types";
import { getRandomNumber } from "@nathanhfoster/resurrection";

/**
 * Default ring configurations for different themes
 * Each theme has light and dark mode variants
 */
export const RING_THEMES = {
  nebula: {
    light: [
      { color: "#8b5cf6", rotationSpeed: 1, glowIntensity: 0.8, opacity: 0.9 },
      { color: "#3b82f6", rotationSpeed: -1.2, glowIntensity: 0.6, opacity: 0.7 },
      { color: "#1e293b", rotationSpeed: 0.8, glowIntensity: 0.4, opacity: 0.5 },
    ],
    dark: [
      { color: "#a855f7", rotationSpeed: 1, glowIntensity: 0.8, opacity: 0.9 },
      { color: "#22d3ee", rotationSpeed: -1.2, glowIntensity: 0.6, opacity: 0.7 },
      { color: "#f8fafc", rotationSpeed: 0.8, glowIntensity: 0.4, opacity: 0.5 },
    ],
  },
  emerald: {
    light: [
      { color: "#065f46", rotationSpeed: 1, glowIntensity: 0.8, opacity: 0.9 },
      { color: "#10b981", rotationSpeed: -1.2, glowIntensity: 0.6, opacity: 0.7 },
      { color: "#a7f3d0", rotationSpeed: 0.8, glowIntensity: 0.4, opacity: 0.5 },
    ],
    dark: [
      { color: "#10b981", rotationSpeed: 1, glowIntensity: 0.8, opacity: 0.9 },
      { color: "#34d399", rotationSpeed: -1.2, glowIntensity: 0.6, opacity: 0.7 },
      { color: "#d1fae5", rotationSpeed: 0.8, glowIntensity: 0.4, opacity: 0.5 },
    ],
  },
  sunset: {
    light: [
      { color: "#991b1b", rotationSpeed: 1, glowIntensity: 0.8, opacity: 0.9 },
      { color: "#f97316", rotationSpeed: -1.2, glowIntensity: 0.6, opacity: 0.7 },
      { color: "#fbbf24", rotationSpeed: 0.8, glowIntensity: 0.4, opacity: 0.5 },
    ],
    dark: [
      { color: "#f97316", rotationSpeed: 1, glowIntensity: 0.8, opacity: 0.9 },
      { color: "#fb923c", rotationSpeed: -1.2, glowIntensity: 0.6, opacity: 0.7 },
      { color: "#fef3c7", rotationSpeed: 0.8, glowIntensity: 0.4, opacity: 0.5 },
    ],
  },
  ocean: {
    light: [
      { color: "#0e7490", rotationSpeed: 1, glowIntensity: 0.8, opacity: 0.9 },
      { color: "#06b6d4", rotationSpeed: -1.2, glowIntensity: 0.6, opacity: 0.7 },
      { color: "#67e8f9", rotationSpeed: 0.8, glowIntensity: 0.4, opacity: 0.5 },
    ],
    dark: [
      { color: "#22d3ee", rotationSpeed: 1, glowIntensity: 0.8, opacity: 0.9 },
      { color: "#06b6d4", rotationSpeed: -1.2, glowIntensity: 0.6, opacity: 0.7 },
      { color: "#a5f3fc", rotationSpeed: 0.8, glowIntensity: 0.4, opacity: 0.5 },
    ],
  },
  royal: {
    light: [
      { color: "#581c87", rotationSpeed: 1, glowIntensity: 0.8, opacity: 0.9 },
      { color: "#7c3aed", rotationSpeed: -1.2, glowIntensity: 0.6, opacity: 0.7 },
      { color: "#c4b5fd", rotationSpeed: 0.8, glowIntensity: 0.4, opacity: 0.5 },
    ],
    dark: [
      { color: "#7c3aed", rotationSpeed: 1, glowIntensity: 0.8, opacity: 0.9 },
      { color: "#a855f7", rotationSpeed: -1.2, glowIntensity: 0.6, opacity: 0.7 },
      { color: "#e9d5ff", rotationSpeed: 0.8, glowIntensity: 0.4, opacity: 0.5 },
    ],
  },
  monochrome: {
    light: [
      { color: "#1f2937", rotationSpeed: 1, glowIntensity: 0.8, opacity: 0.9 },
      { color: "#6b7280", rotationSpeed: -1.2, glowIntensity: 0.6, opacity: 0.7 },
      { color: "#9ca3af", rotationSpeed: 0.8, glowIntensity: 0.4, opacity: 0.5 },
    ],
    dark: [
      { color: "#6b7280", rotationSpeed: 1, glowIntensity: 0.8, opacity: 0.9 },
      { color: "#9ca3af", rotationSpeed: -1.2, glowIntensity: 0.6, opacity: 0.7 },
      { color: "#f8fafc", rotationSpeed: 0.8, glowIntensity: 0.4, opacity: 0.5 },
    ],
  },
  cyber: {
    light: [
      { color: "#a855f7", rotationSpeed: 1, glowIntensity: 0.8, opacity: 0.9 },
      { color: "#8b5cf6", rotationSpeed: -1.2, glowIntensity: 0.6, opacity: 0.7 },
      { color: "#06b6d4", rotationSpeed: 0.8, glowIntensity: 0.4, opacity: 0.5 },
    ],
    dark: [
      { color: "#c084fc", rotationSpeed: 1, glowIntensity: 0.8, opacity: 0.9 },
      { color: "#a855f7", rotationSpeed: -1.2, glowIntensity: 0.6, opacity: 0.7 },
      { color: "#22d3ee", rotationSpeed: 0.8, glowIntensity: 0.4, opacity: 0.5 },
    ],
  },
  earth: {
    light: [
      { color: "#78350f", rotationSpeed: 1, glowIntensity: 0.8, opacity: 0.9 },
      { color: "#d97706", rotationSpeed: -1.2, glowIntensity: 0.6, opacity: 0.7 },
      { color: "#fef3c7", rotationSpeed: 0.8, glowIntensity: 0.4, opacity: 0.5 },
    ],
    dark: [
      { color: "#d97706", rotationSpeed: 1, glowIntensity: 0.8, opacity: 0.9 },
      { color: "#f59e0b", rotationSpeed: -1.2, glowIntensity: 0.6, opacity: 0.7 },
      { color: "#fde68a", rotationSpeed: 0.8, glowIntensity: 0.4, opacity: 0.5 },
    ],
  },
} as const;

/**
 * Quality settings mapping to particle counts and performance
 */
export const QUALITY_SETTINGS: Record<BubbleAIQuality, { particles: number; smoothness: string }> = {
  low: { particles: 25, smoothness: "will-change-auto" },
  medium: { particles: 100, smoothness: "will-change-transform" },
  high: { particles: 250, smoothness: "will-change-transform" },
};

/**
 * State-specific animation configurations
 */
export const STATE_ANIMATIONS: Record<
  BubbleAIState,
  {
    ringSpeedMultiplier: number;
    particleSpeedMultiplier: number;
    pulseIntensity: number;
    description: string;
  }
> = {
  idle: {
    ringSpeedMultiplier: 0.5,
    particleSpeedMultiplier: 0.3,
    pulseIntensity: 0.2,
    description: "Peaceful meditation - BubbleAI is at rest",
  },
  listening: {
    ringSpeedMultiplier: 0.8,
    particleSpeedMultiplier: 0.5,
    pulseIntensity: 0.4,
    description: "Attentive awareness - BubbleAI is receiving input",
  },
  thinking: {
    ringSpeedMultiplier: 1.5,
    particleSpeedMultiplier: 1.2,
    pulseIntensity: 0.6,
    description: "Active processing - BubbleAI is working",
  },
  speaking: {
    ringSpeedMultiplier: 1.2,
    particleSpeedMultiplier: 1.0,
    pulseIntensity: 0.5,
    description: "Communicative flow - BubbleAI is responding",
  },
  navigating: {
    ringSpeedMultiplier: 1.8,
    particleSpeedMultiplier: 1.5,
    pulseIntensity: 0.7,
    description: "Directional movement - BubbleAI is guiding",
  },
};

/**
 * Get default ring configuration based on theme
 * Generates the requested number of rings, creating additional rings if needed
 */
export function getDefaultRings(
  theme: "light" | "dark" = "light",
  count: number = 3
): RingConfig[] {
  const baseRings: RingConfig[] = RING_THEMES.nebula[theme].map(ring => ({ ...ring }));
  const requestedCount = Math.max(1, Math.min(5, count));
  
  if (requestedCount <= baseRings.length) {
    return baseRings.slice(0, requestedCount);
  }
  
  // Generate additional rings by creating variations of the base rings
  const rings: RingConfig[] = [...baseRings];
  while (rings.length < requestedCount) {
    const ringIndex = rings.length % baseRings.length;
    const baseRing = baseRings[ringIndex];
    if (!baseRing) break; // Safety check
    
    const variationIndex = Math.floor(rings.length / baseRings.length);
    
    // Create variations with slightly different properties
    const newRing: RingConfig = {
      color: baseRing.color,
      rotationSpeed: (baseRing.rotationSpeed ?? 1) * (variationIndex % 2 === 0 ? 1 : -1) * (0.8 + variationIndex * 0.1),
      glowIntensity: Math.max(0.3, (baseRing.glowIntensity ?? 0.6) - variationIndex * 0.1),
      opacity: Math.max(0.3, (baseRing.opacity ?? 0.8) - variationIndex * 0.1),
      size: 1 - (rings.length * 0.12), // Progressively smaller
    };
    rings.push(newRing);
  }
  
  return rings;
}

/**
 * Generate particles for the nebula effect
 */
export function generateParticles(count: number, size: number): Array<{
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  age: number;
  lifetime: number;
  personality: "curious" | "calm" | "energetic" | "explorer";
  orbitRadius?: number;
  orbitSpeed?: number;
  orbitAngle?: number;
  energyBurst?: number;
}> {
  const particles = [];
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.1; // Start closer to center

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radius;
    const maxOpacity = getRandomNumber(50, 100) / 100; // 0.5 to 1.0
    const lifetime = getRandomNumber(2000, 5000); // 2-5 seconds lifetime
    
    // Assign personality traits - makes particles feel more alive
    const personalityRoll = getRandomNumber(1, 100);
    let personality: "curious" | "calm" | "energetic" | "explorer";
    if (personalityRoll <= 25) {
      personality = "curious"; // 25% - explore more, move toward edges
    } else if (personalityRoll <= 50) {
      personality = "calm"; // 25% - slower, more stable
    } else if (personalityRoll <= 75) {
      personality = "energetic"; // 25% - faster, more erratic
    } else {
      personality = "explorer"; // 25% - orbit around center
    }
    
    // Personality-based speed
    let baseSpeed: number;
    if (personality === "calm") {
      baseSpeed = getRandomNumber(15, 35) / 100; // Slower
    } else if (personality === "energetic") {
      baseSpeed = getRandomNumber(60, 100) / 100; // Faster
    } else if (personality === "curious") {
      baseSpeed = getRandomNumber(40, 80) / 100; // Medium-fast
    } else {
      baseSpeed = getRandomNumber(25, 50) / 100; // Medium for orbiters
    }
    
    const speedDirectionX = getRandomNumber(0, 1) === 0 ? -1 : 1;
    const speedDirectionY = getRandomNumber(0, 1) === 0 ? -1 : 1;
    
    // Explorer particles orbit around center
    const orbitRadius = personality === "explorer" 
      ? getRandomNumber(30, 80) / 100 * (size * 0.3) 
      : undefined;
    const orbitSpeed = personality === "explorer"
      ? (getRandomNumber(50, 150) / 1000) * (getRandomNumber(0, 1) === 0 ? 1 : -1)
      : undefined;
    const orbitAngle = personality === "explorer" ? angle : undefined;
    
    // Energy burst chance (for energetic particles)
    const energyBurst = personality === "energetic" 
      ? getRandomNumber(1000, 3000) // When to burst
      : undefined;
    
    particles.push({
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance,
      size: getRandomNumber(10, 40) / 10, // 1.0 to 4.0
      speedX: (Math.random() - 0.5) * baseSpeed * speedDirectionX,
      speedY: (Math.random() - 0.5) * baseSpeed * speedDirectionY,
      opacity: maxOpacity, // Start at full opacity
      maxOpacity,
      age: 0,
      lifetime,
      personality,
      orbitRadius,
      orbitSpeed,
      orbitAngle,
      energyBurst,
    });
  }

  return particles;
}

/**
 * Regenerate a single particle in the center
 */
export function regenerateParticle(size: number): {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  age: number;
  lifetime: number;
  personality: "curious" | "calm" | "energetic" | "explorer";
  orbitRadius?: number;
  orbitSpeed?: number;
  orbitAngle?: number;
  energyBurst?: number;
} {
  const centerX = size / 2;
  const centerY = size / 2;
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * (size * 0.05); // Very close to center
  const maxOpacity = getRandomNumber(50, 100) / 100;
  const lifetime = getRandomNumber(2000, 5000);
  
  // Assign personality traits
  const personalityRoll = getRandomNumber(1, 100);
  let personality: "curious" | "calm" | "energetic" | "explorer";
  if (personalityRoll <= 25) {
    personality = "curious";
  } else if (personalityRoll <= 50) {
    personality = "calm";
  } else if (personalityRoll <= 75) {
    personality = "energetic";
  } else {
    personality = "explorer";
  }
  
  // Personality-based speed
  let baseSpeed: number;
  if (personality === "calm") {
    baseSpeed = getRandomNumber(15, 35) / 100;
  } else if (personality === "energetic") {
    baseSpeed = getRandomNumber(60, 100) / 100;
  } else if (personality === "curious") {
    baseSpeed = getRandomNumber(40, 80) / 100;
  } else {
    baseSpeed = getRandomNumber(25, 50) / 100;
  }
  
  const speedDirectionX = getRandomNumber(0, 1) === 0 ? -1 : 1;
  const speedDirectionY = getRandomNumber(0, 1) === 0 ? -1 : 1;
  
  // Explorer particles orbit
  const orbitRadius = personality === "explorer" 
    ? getRandomNumber(30, 80) / 100 * (size * 0.3) 
    : undefined;
  const orbitSpeed = personality === "explorer"
    ? (getRandomNumber(50, 150) / 1000) * (getRandomNumber(0, 1) === 0 ? 1 : -1)
    : undefined;
  const orbitAngle = personality === "explorer" ? angle : undefined;
  
  const energyBurst = personality === "energetic" 
    ? getRandomNumber(1000, 3000)
    : undefined;

  return {
    x: centerX + Math.cos(angle) * distance,
    y: centerY + Math.sin(angle) * distance,
    size: getRandomNumber(10, 40) / 10,
    speedX: (Math.random() - 0.5) * baseSpeed * speedDirectionX,
    speedY: (Math.random() - 0.5) * baseSpeed * speedDirectionY,
    opacity: maxOpacity,
    maxOpacity,
    age: 0,
    lifetime,
    personality,
    orbitRadius,
    orbitSpeed,
    orbitAngle,
    energyBurst,
  };
}

