import type { Editor } from "@tiptap/core";

export interface FontFamilyDropdownProps {
  editor: Editor;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export interface FontFamily {
  label: string;
  value: string;
}
