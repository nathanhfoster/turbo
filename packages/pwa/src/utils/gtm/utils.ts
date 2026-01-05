"use client";

import {
  isMobile,
  isTablet,
} from "../../providers/DeviceContextProvider/utils";
import { isPwaInstalled } from "@nathanhfoster/resurrection";
import { LOCAL_STORAGE_CLIENT_ID_KEY } from "./constants";
import type { EventId, GTMBaseEventPayload, GTMEvent } from "./types";

// Track engagement start times for different events
const eventStartTimes = new Map<string, number>();

// Generate a unique ID for each event instance
export const generateEventId = (event: GTMEvent): string => {
  return `${event}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

let currentEventId: EventId = null;

// Start tracking engagement time for an event
export const startEventEngagement = (event: GTMEvent): EventId => {
  currentEventId = generateEventId(event);
  eventStartTimes.set(currentEventId, Date.now());

  return currentEventId;
};

// Get engagement time for an event in milliseconds
export const getEventEngagementTime = (eventId: string | null): number => {
  if (!eventId) return 0;

  const startTime = eventStartTimes.get(eventId);

  if (!startTime) return 0;

  const engagementTime = Date.now() - startTime;
  eventStartTimes.delete(eventId); // Clean up after use

  return engagementTime;
};

export const getOrCreateClientId = (): string => {
  const existing = localStorage.getItem(LOCAL_STORAGE_CLIENT_ID_KEY);
  if (existing) return existing;

  const newId = crypto.randomUUID();
  localStorage.setItem(LOCAL_STORAGE_CLIENT_ID_KEY, newId);
  return newId;
};

export const getTrackingFields = (): Partial<GTMBaseEventPayload> => {
  const { userAgent } = window.navigator;
  const { width, height } = window.screen;
  const { location, document } = window;

  const queryParams = Object.fromEntries(new URLSearchParams(location.search));

  // Device detection
  const deviceType = isMobile(userAgent)
    ? "mobile"
    : isTablet(userAgent)
      ? "tablet"
      : "desktop";

  const browser = (() => {
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
      return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    if (userAgent.includes("MSIE") || userAgent.includes("Trident/"))
      return "IE";
    return "Other";
  })();

  const os = (() => {
    if (userAgent.includes("Windows")) return "Windows";
    if (userAgent.includes("Mac OS")) return "MacOS";
    if (userAgent.includes("Android")) return "Android";
    if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS";
    if (userAgent.includes("Linux")) return "Linux";
    return "Other";
  })();

  const isPWA = isPwaInstalled() ? "true" : "false";

  return {
    page_path: location.pathname,
    page_location: location.href,
    page_title: document.title,
    screen_resolution: `${width}x${height}`,
    device_type: deviceType,
    browser,
    os,
    isPWAInstalled: isPWA,
    timestamp: new Date().toISOString(),
    utm_id: queryParams.utm_id,
    utm_source: queryParams.utm_source,
    utm_campaign: queryParams.utm_campaign,
  };
};

export const getEventPayload = (
  event: GTMEvent,
  payload: GTMBaseEventPayload,
  eventId: EventId,
) => {
  const basePayload = getTrackingFields();
  const enriched = { ...basePayload, ...payload };

  const finalPayload = {
    event,
    ...enriched,
    engagement_time_msec: getEventEngagementTime(eventId),
    debug_mode: process.env.NODE_ENV !== "production",
  };

  return finalPayload;
};
