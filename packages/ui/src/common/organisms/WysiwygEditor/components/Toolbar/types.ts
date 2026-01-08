export interface ToolbarConfig {
  showBold?: boolean;
  showItalic?: boolean;
  showUnderline?: boolean;
  showStrike?: boolean;
  showHighlight?: boolean;
  showCode?: boolean;
  showLink?: boolean;
  showTextSize?: boolean;
  showTextColor?: boolean;
  showFontFamily?: boolean;
  showAlignment?: boolean;
  showTypography?: boolean;
  showLists?: boolean;
  showBlockquote?: boolean;
  showHorizontalRule?: boolean;
  showImage?: boolean;
  showVideo?: boolean;
  showUndoRedo?: boolean;
}

export interface WysiwygToolbarProps {
  config?: ToolbarConfig;
}

export interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export interface TextSizeOption {
  label: string;
  value: string;
}

export interface FontFamilyOption {
  label: string;
  value: string;
}
