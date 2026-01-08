import type { ReactNode } from "react";

export interface AppBodyProps {
  children: ReactNode;
  className?: string;
  enableGoogleTagManager?: boolean;
  consentModal?: ReactNode;
}
