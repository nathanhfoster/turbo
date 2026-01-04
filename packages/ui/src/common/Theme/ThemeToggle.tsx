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
      {isDark ? (
        <>
          <IconSun />
          {showLabel && <span className="ml-2">{lightLabel}</span>}
        </>
      ) : (
        <>
          <IconMoon />
          {showLabel && <span className="ml-2">{darkLabel}</span>}
        </>
      )}
    </Button>
  );
}
