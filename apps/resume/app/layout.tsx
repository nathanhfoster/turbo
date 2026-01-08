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
import { ResumeLayoutContent } from "./components/ResumeLayoutContent";
import "./globals.css";

const APP_NAME = "AI Resume Builder";
const APP_SHORT_NAME = "Resume Builder";
const APP_DESCRIPTION =
  "AI-powered resume builder with inline editing and job-specific customization";

export const metadata: Metadata = {
  metadataBase: new URL("https://agentnate.dev/resume"),
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
  const cookieStore = await cookies();
  const userAgent = (await headers()).get("user-agent") || "";

  const parseCookie = <T,>(name: string, defaultValue: T): T => {
    try {
      const value = cookieStore.get(name)?.value;
      return value ? JSON.parse(value) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const initialTheme = parseCookie<"light" | "dark">("theme", "light");
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
              <ResumeLayoutContent>{children}</ResumeLayoutContent>
            </DeviceContextProvider>
          </InstallPromptProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
