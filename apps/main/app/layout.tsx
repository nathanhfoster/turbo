import type { Metadata, Viewport } from "next";
import { cookies, headers } from "next/headers";
import { InstallPromptProvider } from "@nathanhfoster/pwa";
import {
  DeviceContextProvider,
  KEY_COOKIE_CONSENT_SETTINGS_ANALYTICS,
  KEY_COOKIE_CONSENT_SETTINGS_MARKETING,
  KEY_COOKIE_CONSENT_SETTINGS_NECESSARY,
  KEY_COOKIE_CONSENT_SETTINGS_PREFERENCES,
  KEY_COOKIE_HAS_SCROLLED,
} from "@nathanhfoster/pwa/device";
import { ThemeProvider } from "@nathanhfoster/ui";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { Body } from "./components/Body";
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
  maximumScale: 1,
  userScalable: false, // or 'no' if you prefer the string form
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get cookies using Next.js cookies() for proper server-side support
  const cookieStore = await cookies();
  const userAgent = (await headers()).get("user-agent") || "";

  // Helper to parse cookie value
  const parseCookie = <T,>(name: string, defaultValue: T): T => {
    try {
      const value = cookieStore.get(name)?.value;
      return value ? JSON.parse(value) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  // Read theme cookie
  const initialTheme = parseCookie<"light" | "dark">("theme", "light");

  // Read other cookies
  const hasScrolled = parseCookie<boolean>(KEY_COOKIE_HAS_SCROLLED, false);
  const necessary = parseCookie<boolean>(
    KEY_COOKIE_CONSENT_SETTINGS_NECESSARY,
    true,
  );
  const analytics = parseCookie<boolean>(
    KEY_COOKIE_CONSENT_SETTINGS_ANALYTICS,
    true,
  );
  const marketing = parseCookie<boolean>(
    KEY_COOKIE_CONSENT_SETTINGS_MARKETING,
    true,
  );
  const preferences = parseCookie<boolean>(
    KEY_COOKIE_CONSENT_SETTINGS_PREFERENCES,
    true,
  );

  return (
    <html lang="en" className={initialTheme} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/ios/180.png" />
      </head>
      <body id="portal-root" className="min-h-screen">
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
              <Body>
                <Navbar />
                {children}
                <Footer />
              </Body>
            </DeviceContextProvider>
          </InstallPromptProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
