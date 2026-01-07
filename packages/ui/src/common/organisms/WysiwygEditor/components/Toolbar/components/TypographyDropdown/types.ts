import type { Editor } from "@tiptap/core";
import type { Level } from "@tiptap/extension-heading";

export interface TypographyDropdownProps {
  editor: Editor;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export type HeadingLevel = Level;
