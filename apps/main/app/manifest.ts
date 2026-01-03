import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AgentNate - Portfolio & Consultancy",
    short_name: "AgentNate",
    description:
      "Portfolio and consultancy services showcasing projects, blog posts, and professional services",
    id: "nf-portfolio",
    start_url: "/?source=pwa",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#0077c5",
    orientation: "portrait",
    dir: "ltr",
    scope: "/",
    lang: "en-US",
    categories: ["productivity", "business", "portfolio", "professional"],
    icons: [
      // Favicon
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      // Android Icons (Maskable for better display)
      {
        src: "/icons/android/android-launchericon-512-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/android/android-launchericon-192-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/android/android-launchericon-144-144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/icons/android/android-launchericon-96-96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/icons/android/android-launchericon-72-72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/icons/android/android-launchericon-48-48.png",
        sizes: "48x48",
        type: "image/png",
      },
      // iOS Icons
      {
        src: "/icons/ios/1024.png",
        sizes: "1024x1024",
        type: "image/png",
      },
      {
        src: "/icons/ios/512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/ios/256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/icons/ios/192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/ios/180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icons/ios/167.png",
        sizes: "167x167",
        type: "image/png",
      },
      {
        src: "/icons/ios/152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "/icons/ios/144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/icons/ios/120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        src: "/icons/ios/114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        src: "/icons/ios/100.png",
        sizes: "100x100",
        type: "image/png",
      },
      {
        src: "/icons/ios/87.png",
        sizes: "87x87",
        type: "image/png",
      },
      {
        src: "/icons/ios/80.png",
        sizes: "80x80",
        type: "image/png",
      },
      {
        src: "/icons/ios/76.png",
        sizes: "76x76",
        type: "image/png",
      },
      {
        src: "/icons/ios/72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/icons/ios/64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/icons/ios/60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        src: "/icons/ios/58.png",
        sizes: "58x58",
        type: "image/png",
      },
      {
        src: "/icons/ios/57.png",
        sizes: "57x57",
        type: "image/png",
      },
      {
        src: "/icons/ios/50.png",
        sizes: "50x50",
        type: "image/png",
      },
      {
        src: "/icons/ios/40.png",
        sizes: "40x40",
        type: "image/png",
      },
      {
        src: "/icons/ios/32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icons/ios/29.png",
        sizes: "29x29",
        type: "image/png",
      },
      {
        src: "/icons/ios/20.png",
        sizes: "20x20",
        type: "image/png",
      },
      {
        src: "/icons/ios/16.png",
        sizes: "16x16",
        type: "image/png",
      },
      // Windows11 Icons (key sizes)
      {
        src: "/icons/windows11/Square150x150Logo.scale-100.png",
        sizes: "150x150",
        type: "image/png",
      },
      {
        src: "/icons/windows11/Square44x44Logo.scale-100.png",
        sizes: "44x44",
        type: "image/png",
      },
      {
        src: "/icons/windows11/StoreLogo.scale-100.png",
        sizes: "50x50",
        type: "image/png",
      },
    ],
  };
}
