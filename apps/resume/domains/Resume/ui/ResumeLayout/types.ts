import type { Resume } from "../../model/types";
import type { LeftPaneProps } from "../LeftPane/types";
import type { RightPaneProps } from "../RightPane/types";

/**
 * Props for ResumeLayout component
 * Presentation layer that handles device-specific rendering
 */
export interface ResumeLayoutProps {
  // State
  currentResume: Resume | null;
  isLoading: boolean;
  error: string | null;
  aiError: string | null;
  content: string;

  // Editor callbacks
  onContentChange: (content: string) => void;

  // Left pane props
  leftPaneProps: Omit<LeftPaneProps, "currentResume">;

  // Right pane props
  rightPaneProps: RightPaneProps;
}
