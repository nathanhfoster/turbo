import type { MetadataRoute } from "next";
import { createManifest } from "@nathanhfoster/pwa/utils";

export default function manifest(): MetadataRoute.Manifest {
  return createManifest<MetadataRoute.Manifest>({
    name: "AI Resume Builder",
    short_name: "Resume Builder",
    description:
      "AI-powered resume builder with inline editing and job-specific customization",
    id: "resume-builder",
    start_url: "/apps/resume/?source=pwa",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#0077c5",
    orientation: "portrait",
    dir: "ltr",
    scope: "/apps/resume/",
    lang: "en-US",
    categories: ["productivity", "business", "professional"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
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
        src: "/icons/ios/180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  });
}
