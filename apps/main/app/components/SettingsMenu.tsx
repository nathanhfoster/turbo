"use client";

import Link from "next/link";
import {
  Dropdown,
  IconButton,
  IconSliders,
  IconSun,
  IconMoon,
} from "@nathanhfoster/ui";
import { useTheme } from "@nathanhfoster/ui";

export function SettingsMenu() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <IconButton
          icon={<IconSliders />}
          variant="default"
          size="md"
          aria-label="Settings menu"
          className="!text-gray-900 dark:!text-white"
        />
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item onClick={toggleTheme}>
          <div className="flex items-center gap-2">
            {isDark ? <IconSun /> : <IconMoon />}
            <span>{isDark ? "Light mode" : "Dark mode"}</span>
          </div>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          <Link href="/settings" className="flex items-center gap-2">
            <IconSliders />
            <span>Settings</span>
          </Link>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}
