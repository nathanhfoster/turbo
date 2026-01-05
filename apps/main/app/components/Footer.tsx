"use client";

import Link from "next/link";
import { Box, Typography, IconGithub, IconLinkedin } from "@nathanhfoster/ui";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Services", href: "/services" },
  { label: "Settings", href: "/settings" },
  { label: "Cookies", href: "/cookies" },
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/nathanhfoster",
    Icon: IconGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nathanhfoster/",
    Icon: IconLinkedin,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box variant="footer" className="w-full border-t border-border mt-auto">
      <Box className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <Box className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <Box className="flex flex-col gap-4">
            <Typography className="text-xl font-bold text-primary">
              AgentNate
            </Typography>
            <Typography className="text-sm text-foreground-muted">
              Full-stack developer and technical consultant specializing in
              modern web applications, PWAs, and scalable architectures.
            </Typography>
            {/* Social Links */}
            <Box className="flex gap-4">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-muted hover:text-primary transition-colors"
                  aria-label={label}
                >
                  <Box className="w-6 h-6">
                    <Icon />
                  </Box>
                </Link>
              ))}
            </Box>
          </Box>

          {/* Navigation Links */}
          <Box className="flex flex-col gap-4 md:col-span-2">
            <Typography className="text-sm font-semibold text-foreground">
              Quick Links
            </Typography>
            <Box className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {FOOTER_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-foreground-muted hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Copyright */}
        <Box className="mt-8 border-t border-border pt-6">
          <Typography className="text-center text-sm text-foreground-muted">
            &copy; {currentYear} Nathan Foster. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
