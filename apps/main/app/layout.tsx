import type { Metadata, Viewport } from 'next';
import { InstallPromptProvider } from '@/core/pwa/contexts/InstallPromptContext';
import manifest from '@/public/manifest.json';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://agentnate.dev'),
  manifest: '/manifest.json',
  title: {
    default: manifest.name,
    template: `%s | ${manifest.short_name}`,
  },
  description: manifest.description,
  applicationName: manifest.name,
  appleWebApp: {
    capable: true,
    title: manifest.short_name,
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: manifest.name,
    title: {
      default: manifest.name,
      template: `%s | ${manifest.short_name}`,
    },
    description: manifest.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: manifest.name,
      template: `%s | ${manifest.short_name}`,
    },
    description: manifest.description,
  },
};

export const viewport: Viewport = {
  themeColor: manifest.theme_color,
  width: 'device-width',
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
