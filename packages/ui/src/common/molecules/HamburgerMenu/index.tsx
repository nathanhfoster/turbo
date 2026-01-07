"use client";

import Box from "../../atoms/Box";
import Button from "../../atoms/Button";
import Drawer from "../../atoms/Drawer";
import Typography from "../../atoms/Typography";
import { useBooleanToggler } from "@nathanhfoster/react-hooks";
import { MENU_ITEM_CLASSES, DEFAULT_MENU_ITEMS } from "./constants";
import type { HamburgerMenuProps } from "./types";

const HamburgerMenu = ({
  position = "right",
  menuItems = DEFAULT_MENU_ITEMS,
  icon,
  footer,
  className,
}: HamburgerMenuProps) => {
  const [isOpen, toggleIsOpen] = useBooleanToggler(false);

  return (
    <Box className={className}>
      <Button onClick={toggleIsOpen} color="primary" variant="text">
        {icon || (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </Button>
      <Drawer isOpen={isOpen} onClose={toggleIsOpen} position={position}>
        <Box className="flex flex-col gap-4 p-6">
          {menuItems.map(({ label, href, icon }) => (
            <Box key={href} className="flex items-center gap-2">
              {icon && <span>{icon}</span>}
              <Typography
                href={href}
                className={MENU_ITEM_CLASSES}
                onClick={toggleIsOpen}
              >
                {label}
              </Typography>
            </Box>
          ))}
          {footer && <Box className="mt-4">{footer}</Box>}
        </Box>
      </Drawer>
    </Box>
  );
};

export default HamburgerMenu;
