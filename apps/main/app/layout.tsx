import type { Metadata, Viewport } from "next";
import { InstallPromptProvider } from "@nathanhfoster/pwa";
import "./globals.css";

const APP_NAME = "AgentNate - Portfolio & Consultancy";
const APP_SHORT_NAME = "AgentNate";
const APP_DESCRIPTION =
  "Portfolio and consultancy services showcasing projects, blog posts, and professional services";

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
  themeColor: "#FFE500",
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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/ios/180.png" />
      </head>
      <body>
        <InstallPromptProvider>{children}</InstallPromptProvider>
      </body>
    </html>
  );
}
