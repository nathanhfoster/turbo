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
import type { ReactNode } from "react";

export interface AppConfig {
  name: string;
  shortName: string;
  description: string;
  baseUrl: string;
  themeColor?: string;
}

export interface RootLayoutProps {
  children: ReactNode;
  appConfig: AppConfig;
  additionalProviders?: ReactNode;
  bodyContent?: ReactNode;
}

/**
 * Parse cookie value with type safety
 */
export function parseCookie<T>(
  cookieStore: ReturnType<typeof cookies>,
  name: string,
  defaultValue: T,
): T {
  try {
    const value = cookieStore.get(name)?.value;
    return value ? JSON.parse(value) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Create metadata for Next.js app
 */
export function createAppMetadata(config: AppConfig): Metadata {
  return {
    metadataBase: new URL(config.baseUrl),
    title: {
      default: config.name,
      template: `%s | ${config.shortName}`,
    },
    description: config.description,
    applicationName: config.name,
    appleWebApp: {
      capable: true,
      title: config.shortName,
      statusBarStyle: "black-translucent",
    },
    formatDetection: {
      telephone: false,
    },
    openGraph: {
      type: "website",
      siteName: config.name,
      title: {
        default: config.name,
        template: `%s | ${config.shortName}`,
      },
      description: config.description,
    },
    twitter: {
      card: "summary_large_image",
      title: {
        default: config.name,
        template: `%s | ${config.shortName}`,
      },
      description: config.description,
    },
  };
}

/**
 * Create viewport configuration
 */
export function createAppViewport(themeColor: string = "#0077c5"): Viewport {
  return {
    themeColor,
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  };
}

/**
 * Get initial state from cookies and headers
 */
export async function getInitialAppState() {
  const cookieStore = await cookies();
  const userAgent = (await headers()).get("user-agent") || "";

  const initialTheme = parseCookie<"light" | "dark">(
    cookieStore,
    "theme",
    "light",
  );
  const hasScrolled = parseCookie<boolean>(
    cookieStore,
    KEY_COOKIE_HAS_SCROLLED,
    false,
  );
  const necessary = parseCookie<boolean>(
    cookieStore,
    KEY_COOKIE_CONSENT_SETTINGS_NECESSARY,
    true,
  );
  const analytics = parseCookie<boolean>(
    cookieStore,
    KEY_COOKIE_CONSENT_SETTINGS_ANALYTICS,
    true,
  );
  const marketing = parseCookie<boolean>(
    cookieStore,
    KEY_COOKIE_CONSENT_SETTINGS_MARKETING,
    true,
  );
  const preferences = parseCookie<boolean>(
    cookieStore,
    KEY_COOKIE_CONSENT_SETTINGS_PREFERENCES,
    true,
  );

  return {
    initialTheme,
    userAgent,
    hasScrolled,
    cookieSettings: {
      necessary,
      analytics,
      marketing,
      preferences,
    },
  };
}

/**
 * Shared root layout component structure
 * Use this as a base for app-specific layouts
 */
export async function createRootLayout({
  children,
  appConfig,
  additionalProviders,
  bodyContent,
}: RootLayoutProps) {
  const initialState = await getInitialAppState();

  return (
    <html
      lang="en"
      className={initialState.initialTheme}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/ios/180.png" />
      </head>
      <body id="portal-root" className="min-h-screen">
        <ThemeProvider initialTheme={initialState.initialTheme}>
          <InstallPromptProvider>
            <DeviceContextProvider
              initialState={{
                userAgent: initialState.userAgent,
                hasScrolled: initialState.hasScrolled,
                cookieSettings: initialState.cookieSettings,
              }}
            >
              {additionalProviders}
              {bodyContent || children}
            </DeviceContextProvider>
          </InstallPromptProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
