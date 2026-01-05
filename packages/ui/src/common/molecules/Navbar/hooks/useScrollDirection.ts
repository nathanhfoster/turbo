"use client";

import { useEffect, useRef, useState } from "react";

export const useScrollDirection = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
            // Scrolling down & past threshold
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY.current) {
            // Scrolling up
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array - only set up listener once

  return isVisible;
};
