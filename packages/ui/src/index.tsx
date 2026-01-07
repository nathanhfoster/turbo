"use client";

// CSS is imported in app's globals.css via @import '@nathanhfoster/ui/index.css'
// This prevents Next.js errors about global CSS imports outside _app.tsx
export * from "./common";
export * from "@nathanhfoster/react-hooks";
export * from "./icons";
// Explicitly export Switch to ensure it's available
export { Switch } from "./common/atoms";
export type {
  ComposableComponent,
  DataComponent,
  ExtendableComponent,
  ClickableComponent,
  PolyMorphicComponent,
  // Re-export types needed by react-hooks and other packages
  GenericFunction,
  SomeCallback,
  CallbackSetter,
  DispatchMaybeWithAction,
  ReducerMaybeWithAction,
  ContextStoreActionCallback,
  PayloadActionType,
  ContextStoreInitializer,
  Thunk,
  ActionCreatorWithPayload,
  PayloadActionCreator,
  PayloadAction,
} from "./types";
