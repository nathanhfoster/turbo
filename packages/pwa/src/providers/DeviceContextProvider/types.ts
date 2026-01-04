import { ContextStore, Ensure, ProviderProps } from "@nathanhfoster/resurrection";

export type CookieConsentKey = "necessary" | "analytics" | "marketing" | "preferences";

export type CookieSettings = Record<CookieConsentKey, boolean>;

export type LocalStorageKey = `cookie_consent_settings_${CookieConsentKey}`;

export interface BatteryStatus {
  supported: boolean;
  charging: boolean;
  level: number; // 0 to 100
  chargingTime: number; // seconds
  dischargingTime: number; // seconds
  isReliable: boolean;
  lastUpdated: Date | null;
}

export interface DeviceState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  innerWidth: number;
  innerHeight: number;
  orientation: "portrait" | "landscape";
  userAgent: string;
  isPWAInstalled: boolean;
  hasScrolled: boolean;
  isCookieModalOpen: boolean;
  cookieSettings: CookieSettings;
  batteryStatus: BatteryStatus;
}

export type DeviceServerProps = Pick<
  DeviceContextState,
  "userAgent" | "hasScrolled" | "cookieSettings"
>;

export type DeviceContextProviderProps = Ensure<
  ProviderProps<DeviceContextState, DeviceServerProps>,
  "initialState"
>;

export type DeviceContextState = ContextStore<DeviceState>;
