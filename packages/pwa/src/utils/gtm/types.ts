export type PWAEvent =
  | 'pwa_install_prompt_shown'
  | 'pwa_install_attempt'
  | 'pwa_install_success'
  | 'pwa_install_error'
  | 'pwa_push_subscribe'
  | 'pwa_push_unsubscribe'
  | 'pwa_push_permission_denied'
  | 'pwa_service_worker_update_available'
  | 'pwa_service_worker_update_accepted'
  | 'pwa_service_worker_update_declined'
  | 'pwa_service_worker_error'
  | 'pwa_dark_mode_toggle'
  | 'pwa_push_sent'
  | 'pwa_push_error';

export type GTMEvent = PWAEvent | 'subscribe' | 'server_test';

export interface GTMBaseEventPayload {
  email?: string;
  text?: string;
  userId?: string;

  // GA4 Standard parameters
  page_path?: string;
  page_location?: string;
  page_title?: string;
  screen_resolution?: string;
  device_type?: string;
  browser?: string;
  os?: string;
  isPWAInstalled?: string;

  // Custom event attributes
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  timestamp?: string;

  // UTM tracking
  utm_id?: string;
  utm_source?: string;
  utm_campaign?: string;
}

export type EventId = string | null;

