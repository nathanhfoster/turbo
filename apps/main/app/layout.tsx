import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { InstallPromptProvider } from "@nathanhfoster/pwa";
import { ThemeProvider, Box } from "@nathanhfoster/ui";
import { InstallButton } from "./components/InstallButton";
import { SettingsMenu } from "./components/SettingsMenu";
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
  // Read theme from cookie on server side
  const cookieStore = await cookies();
  // Note: Using string literal instead of constant due to Next.js issue
  const themeCookie = cookieStore.get("theme");

  let initialTheme: "light" | "dark" = "light";
  if (themeCookie?.value) {
    try {
      const parsed = JSON.parse(themeCookie.value);
      if (parsed === "dark" || parsed === "light") {
        initialTheme = parsed;
      }
    } catch (e) {
      // If parsing fails, use default
    }
  }

  return (
    <html lang="en" className={initialTheme} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/ios/180.png" />
      </head>
      <body>
        <ThemeProvider initialTheme={initialTheme}>
          <InstallPromptProvider>
            <Box className="fixed top-4 right-4 z-50 flex flex-row gap-2 items-center">
              <InstallButton />
              <SettingsMenu />
            </Box>
            {children}
          </InstallPromptProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
