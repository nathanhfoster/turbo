import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { InstallPromptProvider } from "@nathanhfoster/pwa";
import {
  DeviceContextProvider,
  CookieConsentModal,
  KEY_COOKIE_CONSENT_SETTINGS_ANALYTICS,
  KEY_COOKIE_CONSENT_SETTINGS_MARKETING,
  KEY_COOKIE_CONSENT_SETTINGS_NECESSARY,
  KEY_COOKIE_CONSENT_SETTINGS_PREFERENCES,
  KEY_COOKIE_HAS_SCROLLED,
} from "@nathanhfoster/pwa/device";
import { CookieManager } from "@nathanhfoster/cookies";
import { Box, ThemeProvider } from "@nathanhfoster/ui";
import { Navbar } from "./components/Navbar";
import "./globals.css";

const APP_NAME = "AgentNate - Portfolio & Consultancy";
const APP_SHORT_NAME = "AgentNate";
const APP_DESCRIPTION =
  "Portfolio and consultancy services showcasing projects, newsletter posts, and professional services";

export const metadata: Metadata = {
  metadataBase: new URL("https://agentnate.dev"),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_SHORT_NAME}`,
  },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_SHORT_NAME,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_NAME,
      template: `%s | ${APP_SHORT_NAME}`,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_NAME,
      template: `%s | ${APP_SHORT_NAME}`,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0077c5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get cookies using individual CookieManager instances
  const themeCookieManager = new CookieManager<"light" | "dark">({ name: "theme" });
  const initialTheme = themeCookieManager.getObject() || "light";

  const hasScrolledManager = new CookieManager<boolean>({ name: KEY_COOKIE_HAS_SCROLLED });
  const hasScrolled = hasScrolledManager.getObject() === true;

  const userAgent = (await headers()).get("user-agent") || "";

  const necessaryManager = new CookieManager<boolean>({ name: KEY_COOKIE_CONSENT_SETTINGS_NECESSARY });
  const analyticsManager = new CookieManager<boolean>({ name: KEY_COOKIE_CONSENT_SETTINGS_ANALYTICS });
  const marketingManager = new CookieManager<boolean>({ name: KEY_COOKIE_CONSENT_SETTINGS_MARKETING });
  const preferencesManager = new CookieManager<boolean>({ name: KEY_COOKIE_CONSENT_SETTINGS_PREFERENCES });

  const necessary = necessaryManager.getObject() !== false;
  const analytics = analyticsManager.getObject() !== false;
  const marketing = marketingManager.getObject() !== false;
  const preferences = preferencesManager.getObject() !== false;

  return (
    <html lang="en" className={initialTheme} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/ios/180.png" />
      </head>
      <body id="portal-root">
        <ThemeProvider initialTheme={initialTheme}>
          <InstallPromptProvider>
            <DeviceContextProvider
              initialState={{
                userAgent,
                hasScrolled,
                cookieSettings: {
                  necessary,
                  analytics,
                  marketing,
                  preferences,
                },
              }}
            >
              <CookieConsentModal />
              <Navbar />
              <Box className="pt-16 pb-16 md:pb-0" variant="main">{children}</Box>
            </DeviceContextProvider>
          </InstallPromptProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
