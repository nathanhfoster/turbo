"use client";

import { useRef, useState } from "react";
import ReactDOM from "react-dom";
import type { PortalProps } from "./types";
import { useIsomorphicLayoutEffect } from "@nathanhfoster/react-hooks";
import { DEFAULT_PORTAL_ID, GET_ELEMENT_BY_ID_LIMIT } from "./constants";

const Portal = ({
  id = DEFAULT_PORTAL_ID,
  isOpen = true,
  className,
  children,
  unmountDelay = 400, // Match the animation duration
}: PortalProps) => {
  const getElementByIdCount = useRef(0);
  const [parentNode, setParentNode] = useState<HTMLElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useIsomorphicLayoutEffect(() => {
    if (!parentNode && getElementByIdCount.current < GET_ELEMENT_BY_ID_LIMIT) {
      const node = document.getElementById(id);
      setParentNode(node);
      getElementByIdCount.current++;
    }
  }, [parentNode, id]);

  useIsomorphicLayoutEffect(() => {
    if (parentNode && className) {
      parentNode.className = className;
    }
  }, [parentNode, className]);

  useIsomorphicLayoutEffect(() => {
    if (isOpen) {
      // Mount immediately when opening
      setShouldRender(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } else {
      // Delay unmounting when closing
      timeoutRef.current = setTimeout(() => {
        setShouldRender(false);
      }, unmountDelay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, unmountDelay]);

  if (!shouldRender) return null;

  return parentNode ? ReactDOM.createPortal(children, parentNode, id) : null;
};

export default Portal;
