import type { ToolbarConfig, TextSizeOption, FontFamilyOption } from "./types";

export const DEFAULT_TOOLBAR_CONFIG: Required<ToolbarConfig> = {
  showBold: true,
  showItalic: true,
  showUnderline: true,
  showStrike: true,
  showHighlight: true,
  showCode: true,
  showLink: true,
  showTextSize: true,
  showTextColor: true,
  showFontFamily: true,
  showAlignment: true,
  showTypography: true,
  showLists: true,
  showBlockquote: true,
  showHorizontalRule: true,
  showImage: true,
  showVideo: true,
  showUndoRedo: true,
};

export const TEXT_SIZES: TextSizeOption[] = [
  { label: "16px (Default)", value: "16px" },
  { label: "12px (Tiny)", value: "12px" },
  { label: "14px (Small)", value: "14px" },
  { label: "18px (Lead)", value: "18px" },
  { label: "24px (Large)", value: "24px" },
  { label: "36px (Huge)", value: "36px" },
];

export const FONT_FAMILIES: FontFamilyOption[] = [
  { label: "Default", value: "Inter, ui-sans-serif" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Courier New", value: "'Courier New', monospace" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Times New Roman", value: "'Times New Roman', serif" },
  { label: "Verdana", value: "Verdana, sans-serif" },
];

export const TEXT_COLORS: string[] = [
  "#1A56DB",
  "#0E9F6E",
  "#FACA15",
  "#F05252",
  "#FF8A4C",
  "#0694A2",
  "#B4C6FC",
  "#8DA2FB",
  "#5145CD",
  "#771D1D",
  "#FCD9BD",
  "#99154B",
  "#7E3AF2",
  "#CABFFD",
  "#D61F69",
  "#F8B4D9",
  "#F6C196",
  "#A4CAFE",
  "#111928",
  "#4B5563",
  "#6B7280",
  "#D1D5DB",
  "#F3F4F6",
  "#F9FAFB",
];

export const HIGHLIGHT_COLOR = "#ffc078";

export const HEADING_LEVELS = [1, 2, 3, 4, 5, 6] as const;
