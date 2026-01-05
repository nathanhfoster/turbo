"use client";

import Dropdown from "../Dropdown";
import { IconButton } from "../../atoms";
import { IconSliders, IconSun, IconMoon } from "../../../icons";
import { useTheme } from "../../Theme";
import type { ReactNode } from "react";

export interface SettingsMenuItem {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
}

export interface SettingsMenuProps {
  /**
   * Custom menu items to display in the settings menu
   */
  menuItems?: SettingsMenuItem[];
  /**
   * Whether to show the theme toggle option
   * @default true
   */
  showThemeToggle?: boolean;
  /**
   * Custom icon to use for the settings button
   */
  icon?: ReactNode;
  /**
   * Additional class name for the icon button
   */
  className?: string;
}

export function SettingsMenu({
  menuItems = [],
  showThemeToggle = true,
  icon = <IconSliders />,
  className,
}: SettingsMenuProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <IconButton
          icon={icon}
          variant="default"
          size="md"
          aria-label="Settings menu"
          className={className}
        />
      </Dropdown.Trigger>
      <Dropdown.Content>
        {showThemeToggle && (
          <>
            <Dropdown.Item onClick={toggleTheme}>
              <div className="flex items-center gap-2">
                {isDark ? <IconSun /> : <IconMoon />}
                <span>{isDark ? "Light mode" : "Dark mode"}</span>
              </div>
            </Dropdown.Item>
            {menuItems.length > 0 && <Dropdown.Divider />}
          </>
        )}
        {menuItems.map((item, index) => (
          <Dropdown.Item key={index} onClick={item.onClick}>
            <div className="flex items-center gap-2">
              {item.icon}
              <span>{item.label}</span>
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
}
