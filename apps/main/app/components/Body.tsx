"use client";

import { CookieConsentModal } from "@nathanhfoster/pwa/device";
import GoogleTagManageIframe from "./GoogleTagManageIframe";

interface BodyProps {
  children: React.ReactNode;
  className?: string;
}

export function Body({ children }: BodyProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <script
        dangerouslySetInnerHTML={{
          __html: "window.dataLayer = window.dataLayer || [];",
        }}
      />
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `,
            }}
          />
          <noscript>
            <GoogleTagManageIframe />
          </noscript>
        </>
      )}
      <CookieConsentModal />
      {children}
    </div>
  );
}

