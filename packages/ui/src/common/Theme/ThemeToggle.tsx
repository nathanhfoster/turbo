"use client";

import { useTheme } from "./ThemeProvider";
import { Button } from "../atoms";
import { IconSun, IconMoon } from "../../icons";
import type { ButtonProps } from "../atoms/Button/types";

export interface ThemeToggleProps
  extends Omit<ButtonProps, "onClick" | "children" | "href"> {
  showLabel?: boolean;
  lightLabel?: string;
  darkLabel?: string;
}

export function ThemeToggle({
  showLabel = false,
  lightLabel = "Light",
  darkLabel = "Dark",
  variant = "text",
  size = "md",
  className,
  ...props
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={className}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      {...props}
    >
      {showLabel ? (
        <div className="flex items-center gap-2">
          {isDark ? <IconSun /> : <IconMoon />}
          <span>{isDark ? lightLabel : darkLabel}</span>
        </div>
      ) : (
        isDark ? <IconSun /> : <IconMoon />
      )}
    </Button>
  );
}
