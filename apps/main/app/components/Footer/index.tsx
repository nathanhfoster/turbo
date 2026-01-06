"use client";

import { AppFooter } from "@nathanhfoster/ui";
import {
  BRAND_DESCRIPTION,
  BRAND_NAME,
  FOOTER_LINKS,
  SOCIAL_LINKS,
} from "./constants";

export default function Footer() {
  return (
    <AppFooter
      brandName={BRAND_NAME}
      brandDescription={BRAND_DESCRIPTION}
      footerLinks={FOOTER_LINKS}
      socialLinks={SOCIAL_LINKS}
    />
  );
}

