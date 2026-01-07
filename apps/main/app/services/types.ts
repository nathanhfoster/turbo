import type { ComponentType } from "react";

/**
 * Service offering type
 */
export interface Service {
  icon: ComponentType;
  title: string;
  description: string;
  features: string[];
}
