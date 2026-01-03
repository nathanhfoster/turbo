import Box from "./../../atoms/Box";
import Typography from "./../../atoms/Typography";
import { combineClassNames } from "@nathanhfoster/utils";
import React, { useCallback, useMemo } from "react";
import { STEP_COLORS } from "./constants";
import type { StepperProps } from "./types";

const Stepper = ({
  data = [],
  currentStep,
  className,
  color = "inherit",
  inactiveColor = "inherit",
  completedColor = "inherit",
  orientation = "vertical",
}) => {
  const activeColors = STEP_COLORS[color];
  const inactiveColors = STEP_COLORS[inactiveColor];
  const completedColors = STEP_COLORS[completedColor];

  const orientationClasses = useMemo(() => {
    if (orientation === "horizontal") {
      return "items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse";
    }
    return "relative border-s border-gray-200 text-gray-500";
  }, [orientation]);

  const getStepClasses = useCallback(
    (index: number) => {
      if (orientation === "horizontal") {
        return combineClassNames(
          "flex items-center space-x-2.5 rtl:space-x-reverse",
          index <= currentStep
            ? activeColors.active.text
            : inactiveColors.inactive.text,
        );
      }
      return combineClassNames(
        "mb-10 ms-6",
        index === data.length - 1 && "mb-0",
      );
    },
    [orientation, currentStep, data, activeColors, inactiveColors],
  );

  const getStepIndicatorClasses = useCallback(
    (isCompleted: boolean, isActive: boolean) => {
      if (orientation === "horizontal") {
        return combineClassNames(
          "flex items-center justify-center w-8 h-8 border rounded-full shrink-0",
          isCompleted
            ? completedColors.completed.background
            : isActive
              ? activeColors.active.border
              : inactiveColors.inactive.border,
        );
      }
      return combineClassNames(
        "absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white",
        isCompleted
          ? completedColors.completed.background
          : isActive
            ? activeColors.active.background
            : inactiveColors.inactive.background,
      );
    },
    [orientation, activeColors, completedColors, inactiveColors],
  );

  return (
    <Box
      variant="ol"
      className={combineClassNames(orientationClasses, className)}
    >
      {data.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <li key={index} className={getStepClasses(index)}>
            <div className={getStepIndicatorClasses(isCompleted, isActive)}>
              {isCompleted ? (
                <svg
                  className={combineClassNames(
                    orientation === "horizontal" ? "h-4 w-4" : "h-3.5 w-3.5",
                    completedColors.completed.text,
                  )}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              ) : (
                <Typography
                  size="text-sm"
                  className={
                    isActive
                      ? activeColors.active.text
                      : inactiveColors.inactive.text
                  }
                >
                  {index + 1}
                </Typography>
              )}
            </div>
            <Box className="flex flex-col">
              <Typography
                variant="h6"
                className={combineClassNames(
                  "leading-tight font-medium",
                  isActive
                    ? activeColors.active.text
                    : inactiveColors.inactive.text,
                )}
              >
                {step.label}
              </Typography>
              {step.description && (
                <Typography
                  variant="p"
                  size="text-sm"
                  className={
                    isActive
                      ? activeColors.active.text
                      : inactiveColors.inactive.text
                  }
                >
                  {step.description}
                </Typography>
              )}
            </Box>
          </li>
        );
      })}
    </Box>
  );
};

export default Stepper;
