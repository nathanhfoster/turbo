import type { Editor } from "@tiptap/core";

export interface TextColorDropdownProps {
  editor: Editor;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}
