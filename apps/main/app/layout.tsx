import type { Metadata, Viewport } from "next";
import { InstallPromptProvider } from "@nathanhfoster/pwa";
import { ThemeProvider, ThemeToggle, Box } from "@nathanhfoster/ui";
import { InstallButton } from "./components/InstallButton";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/ios/180.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                } catch (e) {
                  // Fallback if localStorage is not available
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <InstallPromptProvider>
            <Box className="fixed top-4 right-4 z-50 flex flex-row gap-2 items-center">
              <InstallButton />
              <ThemeToggle />
            </Box>
            {children}
          </InstallPromptProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
