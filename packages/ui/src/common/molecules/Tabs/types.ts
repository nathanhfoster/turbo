import type { ReactNode } from "react";
import type { DataComponent, ComposableComponent } from "../../../types";
import type { TabVariant } from "../../atoms/Tab/types";
import type { ComponentColor } from "../../atoms/types";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends DataComponent<TabItem>, ComposableComponent {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
  variant?: TabVariant;
  color?: ComponentColor;
  fullWidth?: boolean;
}
