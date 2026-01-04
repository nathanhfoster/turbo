import type { HTMLAttributes, ReactNode } from "react";

export interface Threshold {
  value: number;
  color: string;
  label?: string;
  labelColor?: string;
}

export interface MeterProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  min?: number;
  showValue?: boolean;
  thresholds?: Threshold[];
  label?: ReactNode | ((percentage: number, threshold: Threshold) => ReactNode);
  height?: string | number;
  width?: string | number;
}
