"use client";

import { Box, Button, Modal, Typography, ButtonGroup } from "@nathanhfoster/ui";
import {
  useDeviceDispatch,
  useDeviceSelector,
  deviceContextActions,
} from "../context";
import CookieConsentForm from "./CookieConsentForm";

interface CookieModalProps {}

const CookieConsentModal = (_props: CookieModalProps) => {
  const dispatch = useDeviceDispatch();
  const open = useDeviceSelector((state) => state.isCookieModalOpen);

  return (
    <Modal
      open={open}
      closeOnOutsideClick={false}
      onClose={() =>
        dispatch(deviceContextActions.ToggleCookieModalOpen(false))
      }
      className="p-6"
      aria-label="Cookie consent"
    >
      <Typography variant="h4" className="mb-4">
        Cookie Settings
      </Typography>
      <Typography variant="p" className="mb-4">
        We use cookies to enhance your browsing experience, serve personalized
        ads or content, and analyze our traffic. By clicking &quot;Accept
        All&quot;, you consent to our use of cookies.
      </Typography>
      <ButtonGroup variant="outlined" className="flex justify-center">
        <Button
          color="success"
          onClick={() => dispatch(deviceContextActions.AcceptAllCookies())}
        >
          Accept All Cookies
        </Button>
        <Button
          color="error"
          onClick={() => dispatch(deviceContextActions.RejectAllCookies())}
        >
          Reject All
        </Button>
      </ButtonGroup>
      <Box className="mt-4">
        <CookieConsentForm />
      </Box>
      <Box className="flex justify-end">
        <Button
          color="primary"
          variant="outlined"
          onClick={() =>
            dispatch(deviceContextActions.ToggleCookieModalOpen(false))
          }
        >
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

export default CookieConsentModal;
