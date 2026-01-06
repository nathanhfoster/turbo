"use client";

import {
  AppFooter,
  IconGithub,
  IconLinkedin,
} from "@nathanhfoster/ui";
import type { FooterLink, SocialLink } from "@nathanhfoster/ui";

const FOOTER_LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Apps", href: "/apps" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Services", href: "/services" },
  { label: "Settings", href: "/settings" },
  { label: "Cookies", href: "/cookies" },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/nathanhfoster",
    Icon: <IconGithub />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nathanhfoster/",
    Icon: <IconLinkedin />,
  },
];

export default function Footer() {
  return (
    <AppFooter
      brandName="AgentNate"
      brandDescription="Full-stack developer and technical consultant specializing in modern web applications, PWAs, and scalable architectures."
      footerLinks={FOOTER_LINKS}
      socialLinks={SOCIAL_LINKS}
    />
  );
}
