"use client";

import { IconShield, Form } from "@nathanhfoster/ui";
import {
  useDeviceDispatch,
  useDeviceSelector,
  deviceContextActions,
} from "../context";
import type { DeviceContextState } from "../types";

const CookieConsentForm = () => {
  const dispatch = useDeviceDispatch();
  const necessary = useDeviceSelector(
    (state: DeviceContextState) => state.cookieSettings.necessary,
  );
  const analytics = useDeviceSelector(
    (state: DeviceContextState) => state.cookieSettings.analytics,
  );
  const marketing = useDeviceSelector(
    (state: DeviceContextState) => state.cookieSettings.marketing,
  );
  const preferences = useDeviceSelector(
    (state: DeviceContextState) => state.cookieSettings.preferences,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name as keyof DeviceContextState["cookieSettings"];
    dispatch(deviceContextActions.ToggleCookieSettings({ key }));
  };

  return (
    <Form>
      <Form.Label className="flex items-center gap-2">
        <span className="h-4 w-4">
          <IconShield />
        </span>
        Customize Settings
      </Form.Label>
      <Form.Field>
        <Form.Switch
          name="necessary"
          label="Necessary Cookies"
          disabled
          checked={necessary}
          onChange={handleChange}
        />
        <Form.Switch
          name="analytics"
          label="Analytics Cookies"
          checked={analytics}
          onChange={handleChange}
        />
        <Form.Switch
          name="marketing"
          label="Marketing Cookies"
          checked={marketing}
          onChange={handleChange}
        />
        <Form.Switch
          name="preferences"
          label="Preferences Cookies"
          checked={preferences}
          onChange={handleChange}
        />
      </Form.Field>
    </Form>
  );
};

export default CookieConsentForm;
