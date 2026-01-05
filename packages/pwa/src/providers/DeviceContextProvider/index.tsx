"use client";

import { FC } from "react";
import { Provider } from "@nathanhfoster/resurrection";
import DeviceListener from "./components/DeviceListener";
import { getDeviceInitialState, deviceSlice } from "./slice";
import type { DeviceContextProviderProps } from "./types";
import { DeviceStateContext, DeviceDispatchContext } from "./context";

export const DeviceContextProvider: FC<DeviceContextProviderProps> = ({
  children,
  ...restOfProps
}) => {
  return (
    <Provider
      {...restOfProps}
      StateContext={DeviceStateContext}
      reducer={deviceSlice.reducer}
      initializer={getDeviceInitialState}
      DispatchContext={DeviceDispatchContext}
    >
      <DeviceListener>{children as React.ReactNode}</DeviceListener>
    </Provider>
  );
};

// Export everything from context
export * from "./context";

// Export types and utilities
export * from "./types";
export * from "./constants";
export * from "./utils";

// Export components
export { default as CookieConsentModal } from "./components/CookieConsentModal";
export { default as CookieConsentForm } from "./components/CookieConsentForm";
