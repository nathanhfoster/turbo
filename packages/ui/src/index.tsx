"use client";

// CSS is imported in app's globals.css via @import '@nathanhfoster/ui/index.css'
// This prevents Next.js errors about global CSS imports outside _app.tsx
export * from "./common";
export * from "./icons";
// Explicitly export Switch to ensure it's available
export { Switch } from "./common/atoms";
export type {
  ComposableComponent,
  DataComponent,
  ExtendableComponent,
  ClickableComponent,
  PolyMorphicComponent,
} from "./types";
