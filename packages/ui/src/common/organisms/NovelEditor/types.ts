import type { BaseTailwindProps } from "../../atoms/types";
import type { JSONContent } from "novel";

export interface NovelEditorProps extends Omit<BaseTailwindProps, "shadow"> {
  /**
   * Initial content as JSONContent (TipTap format)
   */
  initialContent?: JSONContent;
  /**
   * Initial content as HTML string
   */
  defaultValue?: string;
  /**
   * Current content as HTML string
   */
  value?: string;
  /**
   * Callback when content changes
   * @param html - The HTML content
   * @param json - The JSONContent representation
   */
  onChange?: (html: string, json: JSONContent) => void;
  /**
   * Callback when editor is updated
   */
  onUpdate?: (props: { editor: any }) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Whether the editor is editable
   * @default true
   */
  editable?: boolean;
  /**
   * Additional className for the editor content
   */
  editorClassName?: string;
  /**
   * Whether to show the bubble menu
   * @default true
   */
  showBubbleMenu?: boolean;
}

