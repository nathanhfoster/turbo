"use client";

import type { MouseEvent } from "react";
import withBaseTailwindProps from "../../hocs/withBaseTailwindProps";
import { combineClassNames } from "@nathanhfoster/utils";
import { useMemo } from "react";
import {
  useIsomorphicLayoutEffect,
  useLatest,
} from "@nathanhfoster/react-hooks";
import Box from "../Box";
import Portal from "../Portal";
import { MODAL_SIZE_CLASSES, MODAL_TRANSITION_DELAY } from "./constants";
import type { ModalProps } from "./types";

const Modal = ({
  className,
  open,
  onClose,
  size = "medium",
  children,
  showBackdrop = true,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  ...props
}: ModalProps) => {
  // Rule: advanced-use-latest - Store callbacks in refs for stable subscriptions
  const onCloseRef = useLatest(onClose);
  const closeOnEscapeRef = useLatest(closeOnEscape);

  const handleEscape = (e: KeyboardEvent) => {
    if (closeOnEscapeRef.current && e.key === "Escape") {
      onCloseRef.current();
    }
  };

  const handleBackdropClick = (e: MouseEvent) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  useIsomorphicLayoutEffect(() => {
    if (open) {
      if (closeOnEscapeRef.current) {
        document.addEventListener("keydown", handleEscape);
      }
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (closeOnEscapeRef.current) {
        document.removeEventListener("keydown", handleEscape);
      }
      document.body.style.overflow = "unset";
    };
  }, [open]); // Rule: advanced-event-handler-refs - stable subscription, no callback dependencies

  const backdropClasses = useMemo(() => {
    if (!showBackdrop) {
      return "fixed inset-0 z-50 flex items-center justify-center pointer-events-none";
    }

    return combineClassNames(
      "fixed inset-0 z-50 flex items-center justify-center",
      open
        ? "bg-black/50 backdrop-blur-sm pointer-events-auto"
        : "bg-transparent pointer-events-none",
    );
  }, [open, showBackdrop]);

  const modalClasses = useMemo(() => {
    return combineClassNames(
      "relative rounded-lg shadow-lg [&:not([open])]:hidden bg-white dark:bg-gray-900",
      MODAL_SIZE_CLASSES[size],
      className,
    );
  }, [open, size, className]);

  const wrapperClasses = useMemo(() => {
    return combineClassNames(
      "transition-all duration-400 ease-out origin-center",
      open
        ? "translate-y-0 scale-100 opacity-100"
        : "translate-y-2 scale-95 opacity-0",
    );
  }, [open]);

  return (
    <Portal unmountDelay={MODAL_TRANSITION_DELAY}>
      <Box
        className={backdropClasses}
        onClick={
          showBackdrop && closeOnOutsideClick ? handleBackdropClick : undefined
        }
        role="dialog"
        aria-modal="true"
        aria-labelledby={props["aria-labelledby"]}
        aria-describedby={props["aria-describedby"]}
      >
        <Box className={wrapperClasses}>
          <Box
            variant="dialog"
            role="dialog"
            className={modalClasses}
            open={open}
            {...props}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Portal>
  );
};

export default withBaseTailwindProps(Modal);
