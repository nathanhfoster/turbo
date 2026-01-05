"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CookieManager } from "@nathanhfoster/cookies";
import { THEME_COOKIE_NAME } from "./constants";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  initialTheme,
  cookieName = THEME_COOKIE_NAME,
}: {
  children: React.ReactNode;
  initialTheme?: Theme;
  cookieName?: string;
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Use initialTheme from server-side if provided
    if (initialTheme) {
      return initialTheme;
    }

    // Client-side fallback
    if (typeof window !== "undefined") {
      const cookieManager = new CookieManager<Theme>({ name: cookieName });
      const stored = cookieManager.getObject();
      if (stored && (stored === "light" || stored === "dark")) {
        return stored;
      }

      // Fall back to system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }

    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Save to cookie
    const cookieManager = new CookieManager<Theme>({ name: cookieName });
    cookieManager.setObject(theme, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });
  }, [theme, cookieName]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

