"use client";

import Link from "next/link";
import { Box, Typography } from "@nathanhfoster/ui";

const FOOTER_LINKS = [
  { label: "Home", href: "/apps/resume" },
  { label: "Settings", href: "/apps/resume/settings" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box variant="footer" className="w-full border-t border-border mt-auto">
      <Box className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <Box className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Brand Section */}
          <Box className="flex flex-col gap-4">
            <Typography className="text-xl font-bold text-primary">
              Resume Builder
            </Typography>
            <Typography className="text-sm text-foreground-muted">
              AI-powered resume builder with inline editing and job-specific
              customization.
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box className="flex flex-col gap-4">
            <Typography className="text-sm font-semibold text-foreground">
              Quick Links
            </Typography>
            <Box className="grid grid-cols-2 gap-2">
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
            &copy; {currentYear} Resume Builder. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

