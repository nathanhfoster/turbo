"use client";

// CSS is imported in app's globals.css via @import '@nathanhfoster/ui/index.css'
// This prevents Next.js errors about global CSS imports outside _app.tsx
export * from "./common";
export * from "./icons";
export type {
  ComposableComponent,
  DataComponent,
  ExtendableComponent,
  ClickableComponent,
  PolyMorphicComponent,
} from "./types";
