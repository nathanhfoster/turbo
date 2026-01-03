import type { ComponentColor } from "./../../atoms/types";
import type { ComposableComponent, DataComponent } from "../../../types";

export type LabelPosition = "up" | "down" | "left" | "right";

export interface Step {
  label: string;
  description?: string;
  completed?: boolean;
  active?: boolean;
  labelPosition?: LabelPosition;
}

export interface StepperProps extends DataComponent<Step>, ComposableComponent {
  currentStep: number;
  orientation?: "horizontal" | "vertical";
  color?: ComponentColor;
  inactiveColor?: ComponentColor;
  completedColor?: ComponentColor;
}

export interface StepperItemProps {
  text: string;
  border: string;
  background: string;
}

export interface StepperItemStatus {
  active: StepperItemProps;
  inactive: StepperItemProps;
  completed: Omit<StepperItemProps, "border">;
}
