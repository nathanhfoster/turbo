"use client";

import Link from "next/link";
import { Box, Typography } from "../../atoms";
import type { AppFooterProps, FooterLink, SocialLink } from "./types";

export type { AppFooterProps, FooterLink, SocialLink };

export function AppFooter({
  brandName,
  brandDescription,
  footerLinks,
  socialLinks = [],
  copyrightText,
}: AppFooterProps) {
  const currentYear = new Date().getFullYear();
  const defaultCopyright = `© ${currentYear} ${brandName}. All rights reserved.`;

  return (
    <Box variant="footer" className="w-full border-t border-border mt-auto">
      <Box className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <Box
          className={`grid grid-cols-1 gap-8 ${
            socialLinks.length > 0 ? "md:grid-cols-3" : "md:grid-cols-2"
          }`}
        >
          {/* Brand Section */}
          <Box className="flex flex-col gap-4">
            <Typography className="text-xl font-bold text-primary">
              {brandName}
            </Typography>
            <Typography className="text-sm text-foreground-muted">
              {brandDescription}
            </Typography>
            {/* Social Links */}
            {socialLinks.length > 0 && (
              <Box className="flex gap-4">
                {socialLinks.map(({ label, href, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground-muted hover:text-primary transition-colors"
                    aria-label={label}
                  >
                    <Box className="w-6 h-6">{Icon}</Box>
                  </Link>
                ))}
              </Box>
            )}
          </Box>

          {/* Navigation Links */}
          <Box
            className={`flex flex-col gap-4 ${
              socialLinks.length > 0 ? "md:col-span-2" : ""
            }`}
          >
            <Typography className="text-sm font-semibold text-foreground">
              Quick Links
            </Typography>
            <Box className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {footerLinks.map(({ label, href }) => (
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
            {copyrightText || defaultCopyright}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
