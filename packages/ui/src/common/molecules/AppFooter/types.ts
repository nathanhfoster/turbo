import type { ReactNode } from "react";

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  Icon: ReactNode;
}

export interface AppFooterProps {
  brandName: string;
  brandDescription: string;
  footerLinks: FooterLink[];
  socialLinks?: SocialLink[];
  copyrightText?: string;
}

