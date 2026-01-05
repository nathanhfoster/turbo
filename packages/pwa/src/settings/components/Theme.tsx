"use client";

import { Card, Typography, Box, ThemeToggle } from "@nathanhfoster/ui";
import type { ThemeProps } from "../types";

export function Theme({ className = "", renderButton }: ThemeProps = {}) {
  return (
    <Card
      className={
        className ||
        "rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
      }
    >
      <Typography
        variant="h3"
        className="mb-2 text-xl font-semibold text-gray-900 dark:text-white"
      >
        Theme
      </Typography>
      <Typography variant="p" className="mb-4 text-gray-600 dark:text-gray-400">
        Choose between light and dark mode
      </Typography>
      {renderButton ? (
        renderButton({})
      ) : (
        <ThemeToggle variant="outlined" showLabel />
      )}
    </Card>
  );
}
