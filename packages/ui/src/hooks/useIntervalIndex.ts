'use client';

import { isArray } from '@nathanhfoster/utils';
import { useEffect, useState } from 'react';

const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export interface UseIntervalParams {
  interval: number | [number, number] | false;
  maxIndex: number;
  repeat?: boolean;
}

const useIntervalIndex = (params: UseIntervalParams) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (params.interval === false) {
      return;
    }

    const timer = setInterval(
      () => {
        setIndex((prevIndex) => {
          if (prevIndex === params.maxIndex - 1) {
            return params.repeat !== false ? 0 : prevIndex;
          }

          return prevIndex + 1;
        });
      },
      isArray(params?.interval)
        ? getRandomNumber(...params.interval)
        : params.interval,
    );

    return () => clearInterval(timer);
  }, [params.maxIndex, params?.interval, params.repeat]);

  return { index, setIndex };
};

export default useIntervalIndex;
