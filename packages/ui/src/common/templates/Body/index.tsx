"use client";

// import CookieConsentModal from '@/contexts/DeviceContext/components/CookieConsentModal';
import dynamic from "next/dynamic";
import GoogleTagManageIframe from "./components/GoogleTagManageIframe";
import { useShowFooter } from "./hooks";
import { BodyProps } from "./types";
const Footer = dynamic(() => import("../../molecules/Footer"));

const Body = ({ children, className = "" }: BodyProps) => {
  const showFooter = useShowFooter();

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: "window.dataLayer = window.dataLayer || [];",
        }}
      />
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
      {/* <CookieConsentModal /> */}
      {children}
      {showFooter ? <Footer /> : null}
    </>
  );
};

export default Body;
