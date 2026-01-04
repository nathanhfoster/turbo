"use client";

import { IconButton, IconSun, IconMoon, useTheme } from "@nathanhfoster/ui";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <IconButton
      icon={isDark ? <IconSun /> : <IconMoon />}
      onClick={toggleTheme}
      variant="ghost"
      size="md"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="!text-gray-900 dark:!text-white"
    />
  );
}
