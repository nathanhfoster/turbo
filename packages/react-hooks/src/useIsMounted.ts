"use client";

import { useEffect, useState } from "react";

const useIsMounted = (initialValue = false): boolean => {
  const [mounted, setMounted] = useState(initialValue);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  return mounted;
};

export default useIsMounted;
