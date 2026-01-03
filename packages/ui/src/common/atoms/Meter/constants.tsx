import Typography from "../Typography";
import type { Threshold } from "./types";

export const DEFAULT_THRESHOLDS: Threshold[] = [
  { value: 38, color: "bg-error/80", label: "C", labelColor: "text-error/80" },
  { value: 52, color: "bg-error", label: "B-", labelColor: "text-error" },
  {
    value: 58,
    color: "bg-warning/80",
    label: "B",
    labelColor: "text-warning/80",
  },
  { value: 64, color: "bg-warning", label: "B+", labelColor: "text-warning" },
  {
    value: 80,
    color: "bg-success/80",
    label: "A-",
    labelColor: "text-success/80",
  },
  {
    value: 90,
    color: "bg-success/90",
    label: "A",
    labelColor: "text-success/90",
  },
  { value: 98, color: "bg-success", label: "A+", labelColor: "text-success" },
];

export const getMeterThreshold = (
  percentage: number,
  thresholds: Threshold[] = DEFAULT_THRESHOLDS,
): Threshold => {
  // Sort thresholds by value to ensure proper order
  const sortedThresholds = [...thresholds].sort((a, b) => a.value - b.value);

  // Find the threshold with the smallest difference from the percentage
  const closestThreshold = sortedThresholds.reduce((closest, current) => {
    const currentDiff = Math.abs(current.value - percentage);
    const closestDiff = Math.abs(closest.value - percentage);
    return currentDiff < closestDiff ? current : closest;
  });

  return closestThreshold;
};

export const METER_STYLES = {
  container: "flex items-center gap-2",
  track: "overflow-hidden rounded-full bg-neutral-200",
  value: "text-sm font-medium",
};

export const DEFAULT_GET_LABEL = (percentage: number) => {
  return (
    <Typography variant="caption" font="font-inter">
      {percentage.toFixed(0)}%
    </Typography>
  );
};
