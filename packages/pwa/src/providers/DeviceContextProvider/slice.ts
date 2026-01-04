import { ContextStoreInitializer, createSlice } from "@nathanhfoster/resurrection";

import { setCookie } from "@nathanhfoster/cookies";
import {
  KEY_COOKIE_CONSENT_MODAL_OPEN,
  KEY_COOKIE_CONSENT_SETTINGS_ANALYTICS,
  KEY_COOKIE_CONSENT_SETTINGS_MARKETING,
  KEY_COOKIE_CONSENT_SETTINGS_NECESSARY,
  KEY_COOKIE_CONSENT_SETTINGS_PREFERENCES,
  KEY_COOKIE_HAS_SCROLLED,
} from "./constants";
import type { DeviceContextState, DeviceServerProps } from "./types";
import { isDesktop, isMobile, isTablet } from "./utils";

export const deviceInitialState: DeviceContextState = {
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  innerWidth: 0,
  innerHeight: 0,
  orientation: "portrait",
  userAgent: "",
  isPWAInstalled: false,
  hasScrolled: false,
  isCookieModalOpen: false,
  cookieSettings: {
    necessary: true, // Always true
    analytics: true,
    marketing: true,
    preferences: true,
  },
  batteryStatus: {
    supported: false,
    charging: false,
    level: 0,
    chargingTime: 0,
    dischargingTime: 0,
    isReliable: false,
    lastUpdated: null,
  },
};

export const getDeviceInitialState: ContextStoreInitializer<
  DeviceContextState,
  DeviceServerProps
> = (initialState) => {
  if (!initialState) {
    return deviceInitialState;
  }

  return {
    ...deviceInitialState,
    ...initialState,
    isMobile: isMobile(initialState.userAgent),
    isTablet: isTablet(initialState.userAgent),
    isDesktop: isDesktop(initialState.userAgent),
  };
};

export const deviceSlice = createSlice({
  name: "Device",
  initialState: deviceInitialState,
  actions: {
    SetDeviceInfo: (state, payload: Partial<DeviceContextState>) => {
      state = { ...state, ...payload };
    },
    SetBatteryStatus: (state, payload: DeviceContextState["batteryStatus"]) => {
      state.batteryStatus = payload;
    },
    UpdateScreenSize: (state, payload: Pick<DeviceContextState, "innerWidth" | "innerHeight">) => {
      state.innerWidth = payload.innerWidth;
      state.innerHeight = payload.innerHeight;
      state.orientation = payload.innerWidth > payload.innerHeight ? "landscape" : "portrait";
    },
    UpdateDeviceType: (
      state,
      payload: Pick<DeviceContextState, "isMobile" | "isTablet" | "isDesktop">
    ) => {
      state.isMobile = payload.isMobile;
      state.isTablet = payload.isTablet;
      state.isDesktop = payload.isDesktop;
    },
    UpdatePwaStatus: (state, payload: Pick<DeviceContextState, "isPWAInstalled">) => {
      state.isPWAInstalled = payload.isPWAInstalled;
    },
    SetHasScrolled: (state, hasScrolled: DeviceContextState["hasScrolled"]) => {
      state.hasScrolled = hasScrolled;

      if (typeof localStorage !== "undefined") {
        localStorage.setItem(KEY_COOKIE_HAS_SCROLLED, hasScrolled.toString());
      }
    },
    ToggleCookieModalOpen: (state, payload: boolean | undefined) => {
      const newIsCookieModalOpen = payload ?? !state.isCookieModalOpen;
      state.isCookieModalOpen = newIsCookieModalOpen;
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(KEY_COOKIE_CONSENT_MODAL_OPEN, newIsCookieModalOpen.toString());
      }
    },
    ToggleCookieSettings: (
      state,
      payload: { key: keyof DeviceContextState["cookieSettings"]; value?: boolean }
    ) => {
      const newCookieSettings = {
        ...state.cookieSettings,
        [payload.key]: payload.value ?? !state.cookieSettings[payload.key],
      };
      state.cookieSettings = newCookieSettings;

      if (typeof localStorage !== "undefined") {
        localStorage.setItem(
          KEY_COOKIE_CONSENT_SETTINGS_NECESSARY,
          newCookieSettings.necessary.toString()
        );
        localStorage.setItem(
          KEY_COOKIE_CONSENT_SETTINGS_ANALYTICS,
          newCookieSettings.analytics.toString()
        );
        localStorage.setItem(
          KEY_COOKIE_CONSENT_SETTINGS_MARKETING,
          newCookieSettings.marketing.toString()
        );
        localStorage.setItem(
          KEY_COOKIE_CONSENT_SETTINGS_PREFERENCES,
          newCookieSettings.preferences.toString()
        );
      }

      setCookie(KEY_COOKIE_CONSENT_SETTINGS_NECESSARY, newCookieSettings.necessary.toString());
      setCookie(KEY_COOKIE_CONSENT_SETTINGS_ANALYTICS, newCookieSettings.analytics.toString());
      setCookie(KEY_COOKIE_CONSENT_SETTINGS_MARKETING, newCookieSettings.marketing.toString());
      setCookie(KEY_COOKIE_CONSENT_SETTINGS_PREFERENCES, newCookieSettings.preferences.toString());
    },
    AcceptAllCookies: (state) => {
      state.cookieSettings = {
        necessary: true,
        analytics: true,
        marketing: true,
        preferences: true,
      };
      state.isCookieModalOpen = false;
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(KEY_COOKIE_CONSENT_MODAL_OPEN, "false");
      }
    },
    RejectAllCookies: (state) => {
      state.cookieSettings = {
        necessary: true, // Always true
        analytics: false,
        marketing: false,
        preferences: false,
      };
      state.isCookieModalOpen = false;
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(KEY_COOKIE_CONSENT_MODAL_OPEN, "false");
      }
    },
  },
});
