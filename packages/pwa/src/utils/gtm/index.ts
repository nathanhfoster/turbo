'use client';

import { KEY_COOKIE_CONSENT_SETTINGS_ANALYTICS } from '../../providers/DeviceContextProvider/constants';
import { MAX_RETRIES, RETRY_DELAY } from './constants';
import type { EventId, GTMBaseEventPayload, GTMEvent } from './types';
import { getEventPayload, startEventEngagement } from './utils';

// Extend Window interface for dataLayer
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const pushClientEvent = async (
  event: GTMEvent,
  payload: GTMBaseEventPayload,
  eventId: EventId,
  retryCount = 0
): Promise<void> => {
  try {
    if (!window.dataLayer) {
      if (retryCount < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return pushClientEvent(event, payload, eventId, retryCount + 1);
      }
      console.warn('[GTM] dataLayer not available after retries.');
      return;
    }

    // Add a small delay to allow for some engagement time
    await new Promise(resolve => setTimeout(resolve, 100));

    const eventPayload = getEventPayload(event, payload, eventId);

    window.dataLayer.push(eventPayload);
  } catch (error) {
    console.error('[GTM] Client push error:', error);
  }
};

export const pushGTMEvent = async (event: GTMEvent, payload: GTMBaseEventPayload = {}) => {
  const canPushGTMEvent = localStorage.getItem(KEY_COOKIE_CONSENT_SETTINGS_ANALYTICS) === 'true';

  if (!canPushGTMEvent) {
    return;
  }

  // Start tracking engagement time when the event is initiated
  const eventId = startEventEngagement(event);

  await pushClientEvent(event, payload, eventId);
};

