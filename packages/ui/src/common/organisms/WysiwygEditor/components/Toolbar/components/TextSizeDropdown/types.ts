import type { Editor } from "@tiptap/core";

export interface TextSizeDropdownProps {
  editor: Editor;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export interface TextSize {
  label: string;
  value: string;
}
