import type { FooterLink, SocialLink } from "@nathanhfoster/ui";
import { IconGithub, IconLinkedin } from "@nathanhfoster/ui";

export const FOOTER_LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Apps", href: "/apps" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Services", href: "/services" },
  { label: "Settings", href: "/settings" },
  { label: "Cookies", href: "/cookies" },
];

export const SOCIAL_LINKS: SocialLink[] = [
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

export const BRAND_NAME = "AgentNate";

export const BRAND_DESCRIPTION =
  "Full-stack developer and technical consultant specializing in modern web applications, PWAs, and scalable architectures.";

