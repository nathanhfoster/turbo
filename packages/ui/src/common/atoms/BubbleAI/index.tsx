"use client";

import React, { useMemo, useEffect, useRef, useState } from "react";
import { combineClassNames } from "@nathanhfoster/utils";
import { getRandomNumber } from "@nathanhfoster/utils";
import { useEventListener } from "@nathanhfoster/react-hooks";
import withBaseTheme from "../../hocs/withBaseTheme";
import withForwardRef from "../../hocs/withForwardRef";
import withBaseTailwindProps from "../../hocs/withBaseTailwindProps";
import { useTheme } from "../../Theme";
import {
  getDefaultRings,
  QUALITY_SETTINGS,
  STATE_ANIMATIONS,
  generateParticles,
  regenerateParticle,
} from "./constants";
import type { BubbleAIProps, BubbleAIState, RingConfig } from "./types";

const BubbleAI = ({
  size = 200,
  state = "idle",
  quality = "medium",
  ringCount = 3,
  rings,
  particleCount,
  particleSize = 1,
  particleSpeed = 1,
  opacity = 1,
  respectReducedMotion = true,
  className = "",
  onClick,
  onHover,
  "aria-label": ariaLabel = "BubbleAI animated indicator",
  ...props
}: BubbleAIProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<ReturnType<typeof generateParticles>>([]);
  const mediaQueryRef = useRef<MediaQueryList | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const previousStateRef = useRef<BubbleAIState>(state);
  const stateChangeTimeRef = useRef<number>(0);
  const [isMounted, setIsMounted] = useState(false);
  const ringVariationsRef = useRef<Array<{ speedVariation: number; animationDelay: number }>>([]);
  
  // Use theme from ThemeProvider - component will re-render when theme changes
  const { theme } = useTheme();

  // Detect state changes and trigger reactions
  useEffect(() => {
    if (previousStateRef.current !== state) {
      stateChangeTimeRef.current = performance.now();
      // Trigger particle burst on state change
      if (particlesRef.current.length > 0 && !reducedMotion) {
        // Give some particles a burst of energy
        particlesRef.current.forEach((particle, index) => {
          if (index % 3 === 0) { // Every 3rd particle
            particle.speedX *= 2;
            particle.speedY *= 2;
            // Reset after a short time
            setTimeout(() => {
              if (particlesRef.current[index]) {
                particle.speedX /= 2;
                particle.speedY /= 2;
              }
            }, 300);
          }
        });
      }
      previousStateRef.current = state;
    }
  }, [state, reducedMotion]);

  // Initialize media query and set initial state
  useEffect(() => {
    if (respectReducedMotion && typeof window !== "undefined") {
      mediaQueryRef.current = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQueryRef.current.matches);
    }
  }, [respectReducedMotion]);

  // Listen for reduced motion preference changes
  useEffect(() => {
    const mediaQuery = mediaQueryRef.current;
    if (!mediaQuery) return;

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [respectReducedMotion]);

  // Determine actual rings configuration with theme support
  const ringConfigs = useMemo<RingConfig[]>(() => {
    if (rings && rings.length > 0) {
      return rings;
    }
    return getDefaultRings(theme, ringCount);
  }, [rings, ringCount, theme]);

  // Initialize random variations on client only to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    // Generate stable random variations for rings (only on client)
    if (ringVariationsRef.current.length !== ringConfigs.length) {
      ringVariationsRef.current = ringConfigs.map(() => ({
        speedVariation: getRandomNumber(70, 130) / 100,
        animationDelay: getRandomNumber(0, 2000) / 1000,
      }));
    }
  }, [ringConfigs.length]);

  // Determine particle count
  const actualParticleCount = useMemo(() => {
    if (particleCount !== undefined) {
      return Math.max(0, Math.min(500, particleCount));
    }
    return QUALITY_SETTINGS[quality].particles;
  }, [particleCount, quality]);

  // Get state animation config
  const stateConfig = STATE_ANIMATIONS[state];

  // Initialize particles
  useEffect(() => {
    if (canvasRef.current && actualParticleCount > 0) {
      particlesRef.current = generateParticles(actualParticleCount, size);
    }
  }, [actualParticleCount, size]);

  // Animate particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || actualParticleCount === 0 || reducedMotion) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;
    const maxRadius = size * 0.45;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      ctx.clearRect(0, 0, size, size);
      ctx.globalCompositeOperation = "screen";

      particlesRef.current.forEach((particle, index) => {
        // Update age
        particle.age += deltaTime;

        // Calculate fade based on age and distance
        const ageProgress = particle.age / particle.lifetime;
        const dx = particle.x - centerX;
        const dy = particle.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const distanceProgress = distance / maxRadius;

        // Fade out as particle ages and moves away
        // Opacity decreases both with age and distance
        const fadeFactor = Math.max(0, 1 - ageProgress - distanceProgress * 0.5);
        particle.opacity = particle.maxOpacity * fadeFactor;

        // Regenerate particle if it's faded out or moved too far
        if (particle.opacity <= 0.01 || distance > maxRadius * 1.2 || particle.age >= particle.lifetime) {
          particlesRef.current[index] = regenerateParticle(size);
          return;
        }

        // Personality-based behaviors - makes particles feel alive!
        let effectiveSpeed = 1;
        let moveX = particle.speedX;
        let moveY = particle.speedY;

        if (particle.personality === "explorer" && particle.orbitRadius && particle.orbitSpeed && particle.orbitAngle !== undefined) {
          // Orbital movement - particles orbit around center
          // Apply particleSpeed to orbital speed
          const orbitalSpeedMultiplier = particleSpeed * stateConfig.particleSpeedMultiplier;
          const newAngle = (particle.orbitAngle || 0) + particle.orbitSpeed * deltaTime * 0.1 * orbitalSpeedMultiplier;
          particle.orbitAngle = newAngle;
          const targetX = centerX + Math.cos(newAngle) * particle.orbitRadius;
          const targetY = centerY + Math.sin(newAngle) * particle.orbitRadius;
          // Use a smoother interpolation that respects particleSpeed
          const interpolationSpeed = 0.1 * orbitalSpeedMultiplier;
          moveX = (targetX - particle.x) * interpolationSpeed;
          moveY = (targetY - particle.y) * interpolationSpeed;
          effectiveSpeed = 1; // Already applied in orbital calculation
        } else if (particle.personality === "curious") {
          // Curious particles explore edges - attracted to boundaries
          const edgeAttraction = distance > maxRadius * 0.7 ? 1.3 : 0.8;
          const angleToEdge = Math.atan2(dy, dx);
          // Use original speed values but apply edge attraction
          moveX = Math.cos(angleToEdge) * Math.abs(particle.speedX) * edgeAttraction;
          moveY = Math.sin(angleToEdge) * Math.abs(particle.speedY) * edgeAttraction;
          effectiveSpeed = 1.2; // Curious particles move faster
        } else if (particle.personality === "energetic") {
          // Energetic particles have bursts and erratic movement
          if (particle.energyBurst && particle.age >= particle.energyBurst && particle.age < particle.energyBurst + 200) {
            // Energy burst!
            effectiveSpeed = 2.5;
            moveX *= 1.5;
            moveY *= 1.5;
            // Reset burst timer
            if (particle.age >= particle.energyBurst + 200) {
              particle.energyBurst = particle.age + getRandomNumber(1000, 3000);
            }
          } else {
            // Erratic movement
            const erraticFactor = Math.sin(particle.age / 200) * 0.5 + 1;
            effectiveSpeed = erraticFactor * 1.3;
          }
        } else if (particle.personality === "calm") {
          // Calm particles move slowly and smoothly
          effectiveSpeed = 0.6;
          const smoothModulation = Math.sin(particle.age / 800) * 0.1 + 1;
          effectiveSpeed *= smoothModulation;
        }

        // Add organic speed variation - particles can pause, slow down, or speed up
        // Use age-based modulation to create natural speed changes
        const speedModulation = Math.sin(particle.age / 500) * 0.3 + 1; // Oscillates between 0.7x and 1.3x
        // Add occasional pauses (5% chance when age is a multiple of certain values)
        const pauseChance = particle.age % 1000 < 50 ? 0.95 : 1;
        effectiveSpeed = effectiveSpeed * speedModulation * pauseChance;

        // Gravitational pull toward center (subtle, makes it feel alive)
        const gravityStrength = 0.0002 * (1 - distance / maxRadius);
        const gravityX = -dx * gravityStrength;
        const gravityY = -dy * gravityStrength;

        // Update position with personality-based movement
        // For explorer particles, speed is already applied in orbital calculation
        if (particle.personality === "explorer" && particle.orbitRadius) {
          particle.x += moveX;
          particle.y += moveY;
        } else {
          // For other personalities, apply particleSpeed and multipliers
          particle.x +=
            (moveX + gravityX) *
            particleSpeed *
            stateConfig.particleSpeedMultiplier *
            effectiveSpeed;
          particle.y +=
            (moveY + gravityY) *
            particleSpeed *
            stateConfig.particleSpeedMultiplier *
            effectiveSpeed;
        }

        // Draw particle with theme-aware color
        // Apply particleSize multiplier to make size changes more noticeable
        const finalParticleSize = Math.max(0.5, particle.size * particleSize);
        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          finalParticleSize,
          0,
          Math.PI * 2,
        );
        // Use theme-aware particle colors
        // Light mode: darker particles, Dark mode: lighter particles
        const particleColor = theme === "dark" 
          ? `rgba(248, 250, 252, ${particle.opacity * opacity})` // Light gray for dark mode
          : `rgba(30, 41, 59, ${particle.opacity * opacity})`; // Dark gray for light mode
        ctx.fillStyle = particleColor;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    size,
    actualParticleCount,
    particleSize,
    particleSpeed,
    stateConfig,
    opacity,
    reducedMotion,
    theme, // Restart animation when theme changes to update particle colors
  ]);

  // Calculate ring sizes and positions with organic variation
  const ringElements = useMemo(() => {
    return ringConfigs.map((ring, index) => {
      const ringSize = ring.size ?? 1 - index * 0.15;
      const actualSize = size * ringSize;
      
      // Use pre-generated variations to avoid hydration mismatch
      // On server or before mount, use deterministic values
      const variation = ringVariationsRef.current[index] || {
        speedVariation: 1, // Default to no variation on server
        animationDelay: 0, // Default to no delay on server
      };
      
      const rotationSpeed =
        (ring.rotationSpeed ?? 1) *
        stateConfig.ringSpeedMultiplier *
        variation.speedVariation *
        (reducedMotion ? 0 : 1);
      
      const glowIntensity = ring.glowIntensity ?? 0.6;
      const ringOpacity = (ring.opacity ?? 0.8) * opacity;

      return {
        size: actualSize,
        color: ring.color,
        rotationSpeed,
        glowIntensity,
        opacity: ringOpacity,
        index,
        animationDelay: variation.animationDelay, // Store delay for use in rendering
      };
    });
  }, [ringConfigs, size, stateConfig, opacity, reducedMotion, isMounted]);

  // Breathing effect - makes it feel alive
  const breathingAnimation = useMemo(() => {
    if (reducedMotion) return undefined;
    // Subtle breathing based on state - more active states breathe faster
    const breathingSpeed = stateConfig.pulseIntensity > 0.5 ? 3 : 4; // Faster breathing when active
    return `bubbleBreathe ${breathingSpeed}s ease-in-out infinite`;
  }, [stateConfig.pulseIntensity, reducedMotion]);

  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    opacity,
    perspective: `${size * 2}px`,
    perspectiveOrigin: "50% 50%",
    transformStyle: "preserve-3d",
    ...(breathingAnimation ? { animation: breathingAnimation } : {}),
  };

  return (
    <div
      className={combineClassNames(
        "relative inline-flex items-center justify-center",
        QUALITY_SETTINGS[quality].smoothness,
        className,
      )}
      style={containerStyle}
      onClick={onClick}
      onMouseEnter={onHover}
      role={onClick ? "button" : "img"}
      aria-label={ariaLabel}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      {...props}
    >
      <svg
        width={size}
        height={size}
        className="absolute inset-0"
        style={{ overflow: "visible" }}
      >
        <defs>
          {ringElements.map((ring, index) => {
            const center = size / 2;
            // Create 3D radial gradient for depth effect
            const gradientId = `ring-gradient-${index}`;
            // Parse color to RGB for gradient variations
            const hexToRgb = (hex: string) => {
              const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
              if (result && result[1] && result[2] && result[3]) {
                return {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
                };
              }
              return { r: 139, g: 92, b: 246 }; // Default purple
            };
            const rgb = hexToRgb(ring.color || "#8b5cf6");
            // Create lighter and darker variants for 3D effect
            const lighterRgb = {
              r: Math.min(255, rgb.r + 40),
              g: Math.min(255, rgb.g + 40),
              b: Math.min(255, rgb.b + 40),
            };
            const darkerRgb = {
              r: Math.max(0, rgb.r - 40),
              g: Math.max(0, rgb.g - 40),
              b: Math.max(0, rgb.b - 40),
            };
            const lighterColor = `rgb(${lighterRgb.r}, ${lighterRgb.g}, ${lighterRgb.b})`;
            const darkerColor = `rgb(${darkerRgb.r}, ${darkerRgb.g}, ${darkerRgb.b})`;

            return (
              <React.Fragment key={`defs-${index}`}>
                {/* Enhanced 3D filter with depth */}
                <filter id={`glow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation={ring.glowIntensity * 4} />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope={ring.glowIntensity} />
                  </feComponentTransfer>
                  {/* Add drop shadow for depth */}
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation={ring.glowIntensity * 2}
                    floodColor={ring.color}
                    floodOpacity={ring.glowIntensity * 0.5}
                  />
                </filter>
                {/* 3D radial gradient for ring depth */}
                <radialGradient id={gradientId} cx="50%" cy="50%">
                  <stop offset="0%" stopColor={lighterColor} stopOpacity={ring.opacity} />
                  <stop offset="30%" stopColor={ring.color} stopOpacity={ring.opacity} />
                  <stop offset="70%" stopColor={ring.color} stopOpacity={ring.opacity} />
                  <stop offset="100%" stopColor={darkerColor} stopOpacity={ring.opacity * 0.8} />
                </radialGradient>
              </React.Fragment>
            );
          })}
        </defs>
        {ringElements.map((ring, index) => {
          const center = size / 2;
          const radius = ring.size / 2;
          const rotationDuration = reducedMotion
            ? 0
            : Math.abs(20 / ring.rotationSpeed);
          const rippleDuration = 2; // 2 seconds for ripple animation
          
          // Use deterministic variations based on index to avoid hydration mismatch
          // These create organic variation while being consistent between server and client
          const baseVibrationDuration = 0.8 + index * 0.1;
          // Use a simple hash of index for pseudo-random but deterministic variation
          const vibrationHash = ((index * 7 + 13) % 61) / 61; // 0-1 range
          const vibrationVariation = 0.6 + vibrationHash * 0.6; // 0.6 to 1.2
          const vibrationDuration = baseVibrationDuration * vibrationVariation;
          
          // Deterministic sphere rotation variation
          const baseSphereDuration = 8 + index * 2;
          const sphereHash = ((index * 11 + 17) % 51) / 51; // 0-1 range
          const sphereVariation = 0.75 + sphereHash * 0.5; // 0.75 to 1.25
          const sphereRotationDuration = baseSphereDuration * sphereVariation;
          
          const gradientId = `ring-gradient-${index}`;
          
          // Choose vibration animation based on ring index for variety
          const vibrationAnimation = index % 3 === 0 
            ? "bubbleVibrate" 
            : index % 3 === 1 
            ? "bubbleVibratePhase1" 
            : "bubbleVibratePhase2";
          
          // Choose 3D sphere rotation based on ring index for variety
          // Each ring rotates on different axes to create sphere effect
          const sphereAnimation = index % 3 === 0
            ? `bubbleSphereRotateXY ${sphereRotationDuration}s linear infinite`
            : index % 3 === 1
            ? `bubbleSphereRotateXZ ${sphereRotationDuration * 1.2}s linear infinite`
            : `bubbleSphereRotateYZ ${sphereRotationDuration * 0.8}s linear infinite`;

          // Include delay in animation shorthand to avoid mixing shorthand and non-shorthand
          // CSS animation format: name duration timing-function delay iteration-count
          const delayValue = reducedMotion ? "0s" : `${ring.animationDelay}s`;
          // Insert delay after timing-function (linear) and before iteration-count (infinite)
          const sphereAnimationWithDelay = reducedMotion 
            ? "none" 
            : sphereAnimation.replace(/\s+(linear|ease|ease-in|ease-out|ease-in-out)\s+(infinite|\d+)/, ` $1 ${delayValue} $2`);
          
          const circleAnimationWithDelay = reducedMotion
            ? "none"
            : `${ring.rotationSpeed > 0 ? "bubbleRotateCW" : "bubbleRotateCCW"} ${rotationDuration}s linear ${delayValue} infinite, ${vibrationAnimation} ${vibrationDuration}s ease-in-out ${delayValue} infinite`;

          return (
            <g 
              key={`ring-group-${index}`}
              style={{
                transformOrigin: `${center}px ${center}px`,
                animation: sphereAnimationWithDelay,
              }}
            >
              {/* Main ring with 3D gradient and vibration */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth={size * 0.025}
                opacity={ring.opacity}
                filter={`url(#glow-${index})`}
                style={{
                  transformOrigin: `${center}px ${center}px`,
                  animation: circleAnimationWithDelay,
                }}
              />
              {/* Ripple effects - 3 waves per ring with 3D gradients */}
              {!reducedMotion && (
                <>
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    strokeWidth={size * 0.018}
                    opacity={0}
                    filter={`url(#glow-${index})`}
                    style={{
                      transformOrigin: `${center}px ${center}px`,
                      transformStyle: "preserve-3d",
                      "--bubble-ripple-start-opacity": ring.opacity * 0.8,
                      "--bubble-ripple-mid-opacity": ring.opacity * 0.4,
                      animation: `bubbleRipple ${rippleDuration}s ease-out infinite, ${ring.rotationSpeed > 0 ? "bubbleRotateCW" : "bubbleRotateCCW"} ${rotationDuration}s linear infinite`,
                    } as React.CSSProperties}
                  />
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    strokeWidth={size * 0.018}
                    opacity={0}
                    filter={`url(#glow-${index})`}
                    style={{
                      transformOrigin: `${center}px ${center}px`,
                      transformStyle: "preserve-3d",
                      "--bubble-ripple-start-opacity": ring.opacity * 0.8,
                      "--bubble-ripple-mid-opacity": ring.opacity * 0.4,
                      animation: `bubbleRippleDelay1 ${rippleDuration}s ease-out infinite ${rippleDuration * 0.33}s, ${ring.rotationSpeed > 0 ? "bubbleRotateCW" : "bubbleRotateCCW"} ${rotationDuration}s linear infinite`,
                    } as React.CSSProperties}
                  />
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    strokeWidth={size * 0.018}
                    opacity={0}
                    filter={`url(#glow-${index})`}
                    style={{
                      transformOrigin: `${center}px ${center}px`,
                      transformStyle: "preserve-3d",
                      "--bubble-ripple-start-opacity": ring.opacity * 0.8,
                      "--bubble-ripple-mid-opacity": ring.opacity * 0.4,
                      animation: `bubbleRippleDelay2 ${rippleDuration}s ease-out infinite ${rippleDuration * 0.66}s, ${ring.rotationSpeed > 0 ? "bubbleRotateCW" : "bubbleRotateCCW"} ${rotationDuration}s linear infinite`,
                    } as React.CSSProperties}
                  />
                </>
              )}
            </g>
          );
        })}
      </svg>
      {actualParticleCount > 0 && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ mixBlendMode: "screen" }}
        />
      )}
      {/* Pulse effect for active states */}
      {stateConfig.pulseIntensity > 0.3 && !reducedMotion && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: `0 0 ${size * 0.3}px ${ringElements[0]?.color ?? "#8b5cf6"}40`,
            "--bubble-pulse-min-opacity": stateConfig.pulseIntensity * 0.5,
            "--bubble-pulse-max-opacity": stateConfig.pulseIntensity,
            animation: "bubblePulse 2s ease-in-out infinite",
            opacity: stateConfig.pulseIntensity * opacity,
          } as React.CSSProperties}
        />
      )}
    </div>
  );
};

export default withForwardRef(withBaseTheme(withBaseTailwindProps(BubbleAI)));

