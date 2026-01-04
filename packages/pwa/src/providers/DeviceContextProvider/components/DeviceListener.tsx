"use client";

import { FC, useCallback, useEffect } from "react";
import { isPwaInstalled, useEventListener } from "@nathanhfoster/resurrection";
import { deviceContextActions, useDeviceDispatch } from "../context";
import { KEY_COOKIE_CONSENT_MODAL_OPEN, MOBILE_BREAKPOINT, TABLET_BREAKPOINT, COOKIE_MODAL_OPEN_DELAY } from "../constants";

const DeviceListener: FC<React.PropsWithChildren> = ({ children }) => {
  const dispatch = useDeviceDispatch();

  useEventListener("scroll", () => {
    dispatch(deviceContextActions.SetHasScrolled(true));
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (typeof localStorage !== "undefined") {
        const isCookieModalOpen = localStorage.getItem(KEY_COOKIE_CONSENT_MODAL_OPEN) ?? "true";
        dispatch(deviceContextActions.ToggleCookieModalOpen(isCookieModalOpen === "true"));
      }
    }, COOKIE_MODAL_OPEN_DELAY);
    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { innerHeight, scrollY } = window;
      const hasScrolled = scrollY > 0;
      dispatch(deviceContextActions.SetHasScrolled(hasScrolled));
    }
  }, [dispatch]);

  // Update PWA status when display mode changes
  useEffect(() => {
    dispatch(deviceContextActions.UpdatePwaStatus({ isPWAInstalled: isPwaInstalled() }));
  }, [dispatch]);

  const updateDeviceInfo = useCallback(() => {
    if (typeof window !== "undefined") {
      const { innerWidth, innerHeight } = window;

      dispatch(deviceContextActions.UpdateScreenSize({ innerWidth, innerHeight }));

      dispatch(
        deviceContextActions.UpdateDeviceType({
          isMobile: innerWidth < MOBILE_BREAKPOINT,
          isTablet: innerWidth >= MOBILE_BREAKPOINT && innerWidth < TABLET_BREAKPOINT,
          isDesktop: innerWidth >= TABLET_BREAKPOINT,
        })
      );
    }
  }, [dispatch]);

  // Initial update
  useEffect(() => {
    updateDeviceInfo();
  }, [updateDeviceInfo]);

  useEventListener("resize", updateDeviceInfo);

  return <>{children}</>;
};

export default DeviceListener;
