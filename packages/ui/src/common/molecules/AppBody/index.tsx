"use client";

import { Box } from "../../atoms";
import GoogleTagManageIframe from "./GoogleTagManageIframe";
import type { AppBodyProps } from "./types";

export function AppBody({ 
  children, 
  className,
  enableGoogleTagManager = false,
  consentModal,
}: AppBodyProps) {
  return (
    <Box className={`flex min-h-screen flex-col ${className || ""}`}>
      {enableGoogleTagManager && (
        <>
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
        </>
      )}
      {consentModal}
      {children}
    </Box>
  );
}

