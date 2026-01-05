/**
 * Mock for next/dynamic in Storybook
 * Since Storybook doesn't run in a Next.js environment, we provide
 * a simple mock that synchronously imports the component
 */

import React, { lazy, Suspense, type ComponentType } from "react";

// Mock dynamic import - use React.lazy for code splitting in Storybook
const dynamic = <P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> } | ComponentType<P>>,
  options?: any
): ComponentType<P> => {
  // Use React.lazy which works in Storybook
  const LazyComponent = lazy(async () => {
    const module = await importFn();
    return {
      default: ("default" in module ? module.default : module) as ComponentType<P>,
    };
  });

  // Return a wrapper that handles loading/error states
  const WrappedComponent = (props: P) => {
    const fallback = options?.loading || null;
    
    return React.createElement(
      Suspense,
      { fallback },
      React.createElement(LazyComponent, props)
    );
  };

  return WrappedComponent as ComponentType<P>;
};

export default dynamic;

