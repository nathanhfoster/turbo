import type { ComposableComponent } from "../../../types";

export type ErrorVariant = "default" | "full" | "minimal";

export interface ErrorProps extends ComposableComponent {
  message?: string;
  title?: string;
  variant?: ErrorVariant;
}
