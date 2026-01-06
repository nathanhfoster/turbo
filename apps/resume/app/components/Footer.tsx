"use client";

import { AppFooter } from "@nathanhfoster/ui";
import type { FooterLink } from "@nathanhfoster/ui";

const FOOTER_LINKS: FooterLink[] = [
  { label: "Home", href: "/apps/resume" },
  { label: "Settings", href: "/apps/resume/settings" },
];

export default function Footer() {
  return (
    <AppFooter
      brandName="Resume Builder"
      brandDescription="AI-powered resume builder with inline editing and job-specific customization."
      footerLinks={FOOTER_LINKS}
    />
  );
}
