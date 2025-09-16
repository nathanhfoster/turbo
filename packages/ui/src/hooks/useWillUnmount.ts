'use client';

import { useEffect, useRef } from 'react';

import { createHandlerSetter, isFunction } from '@nathanhfoster/utils';
import type { GenericFunction } from '../types';

/**
 * Returns a callback setter for a callback to be performed when the component will unmount.
 */
const useWillUnmount = <TCallback extends GenericFunction>(
  callback?: TCallback,
) => {
  const mountRef = useRef(false);
  const [handler, setHandler] = createHandlerSetter<undefined>(callback);

  useEffect(() => {
    mountRef.current = true;

    return () => {
      if (isFunction(handler?.current) && mountRef.current) {
        handler.current();
      }
    };
  }, []);

  return setHandler;
};

export default useWillUnmount;
