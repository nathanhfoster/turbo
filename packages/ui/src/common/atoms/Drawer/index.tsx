"use client";

import { useMemo, useState } from "react";
import type { DrawerProps } from "./types";
import { combineClassNames } from "@nathanhfoster/utils";
import Box from "../Box";
import {
  DRAWER_POSITION_CLASSES,
  DRAWER_TRANSFORM_CLASSES,
  DRAWER_TRANSITION_DELAY,
} from "./constants";
import { useIsomorphicLayoutEffect } from "@nathanhfoster/resurrection";
import Portal from "../Portal";

const Drawer = ({
  className,
  isOpen,
  onClose,
  position = "left",
  width = "w-80",
  height = "h-80",
  children,
}: DrawerProps) => {
  // Separate state for animation to ensure smooth slide-in
  const [isAnimating, setIsAnimating] = useState(false);
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key press and prevent layout shift from scrollbar
  useIsomorphicLayoutEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Hide scrollbar and compensate for its width
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen, onClose]);

  // Track when component is mounted to DOM and trigger animation
  useIsomorphicLayoutEffect(() => {
    if (isOpen) {
      // Start with drawer off-screen (not animating)
      setIsAnimating(false);
      // Use a small delay to ensure Portal has rendered and CSS is available
      // This fixes the issue where classes aren't available on first render
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsAnimating(true);
          });
        });
      }, 10); // Small delay to ensure DOM and CSS are ready
      
      return () => clearTimeout(timeoutId);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  const sizeClasses = useMemo(() => {
    return {
      left: width,
      right: width,
      top: height,
      bottom: height,
    };
  }, [width, height]);

  return (
    <Portal isOpen={isOpen} unmountDelay={DRAWER_TRANSITION_DELAY}>
      <Box
        bg={
          isOpen
            ? "bg-black/50 opacity-100"
            : "pointer-events-none bg-black/0 opacity-0"
        }
        className={combineClassNames(
          "fixed inset-0 z-[60] flex items-center justify-center transition-all duration-400 ease-in-out",
          !isOpen && "invisible",
        )}
        onClick={handleBackdropClick}
      >
        <Box
          variant="aside"
          style={{
            backgroundColor: "var(--color-background-DEFAULT)",
            color: "var(--color-foreground-DEFAULT)",
          }}
          className={combineClassNames(
            "bg-background text-foreground fixed shadow-lg transition-transform duration-400 ease-out",
            DRAWER_POSITION_CLASSES[position],
            sizeClasses[position],
            (position === "left" || position === "right") && "h-full",
            (position === "top" || position === "bottom") && "w-full",
            isOpen && isAnimating
              ? "translate-x-0 translate-y-0"
              : DRAWER_TRANSFORM_CLASSES[position],
            className,
          )}
        >
          {children}
        </Box>
      </Box>
    </Portal>
  );
};

export default Drawer;
