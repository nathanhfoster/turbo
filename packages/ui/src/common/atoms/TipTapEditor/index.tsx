"use client";

import React, { useCallback, useMemo, useRef } from "react";
import {
  EditorRoot,
  EditorContent,
  EditorBubble,
  EditorBubbleItem,
  type JSONContent,
  StarterKit,
  Placeholder,
  useEditor,
} from "novel";
import { combineClassNames } from "@nathanhfoster/utils";
import Box from "../Box";
import type { TipTapEditorProps } from "./types";

// Internal component to access editor from context
const BubbleMenuContent = ({
  showBubbleMenu,
  editable,
}: {
  showBubbleMenu: boolean;
  editable: boolean;
}) => {
  const { editor } = useEditor();

  if (!showBubbleMenu || !editable || !editor) {
    return null;
  }

  return (
    <EditorBubble
      tippyOptions={{
        placement: "top",
      }}
    >
      <EditorBubbleItem
        onSelect={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        Bold
      </EditorBubbleItem>
      <EditorBubbleItem
        onSelect={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        Italic
      </EditorBubbleItem>
      <EditorBubbleItem
        onSelect={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        Strike
      </EditorBubbleItem>
    </EditorBubble>
  );
};

// Internal component to handle editor updates and value syncing
const EditorController = ({
  value,
  initialHTML,
  editable,
  onChange,
  onUpdate,
  resetKey,
}: {
  value?: string;
  initialHTML?: string;
  editable: boolean;
  onChange?: (html: string, json: JSONContent) => void;
  onUpdate?: (props: { editor: any }) => void;
  resetKey?: string | number;
}) => {
  const { editor } = useEditor();
  const isUpdatingFromProps = useRef(false);
  const hasSetInitialHTML = useRef(false);
  const lastValueRef = useRef<string | undefined>(undefined);
  const lastResetKeyRef = useRef<string | number | undefined>(undefined);

  // Reset state when resetKey changes (e.g., resume ID changes)
  React.useEffect(() => {
    if (resetKey !== undefined && resetKey !== lastResetKeyRef.current) {
      hasSetInitialHTML.current = false;
      lastValueRef.current = undefined;
      lastResetKeyRef.current = resetKey;
    }
  }, [resetKey]);

  // Handle editor updates
  const handleUpdate = useCallback(
    ({ editor: ed }: { editor: any }) => {
      if (isUpdatingFromProps.current) {
        isUpdatingFromProps.current = false;
        return;
      }

      if (onUpdate) {
        onUpdate({ editor: ed });
      }
      if (onChange) {
        const html = ed.getHTML();
        const json = ed.getJSON();
        onChange(html, json);
      }
    },
    [onChange, onUpdate]
  );

  // Set up update handler
  React.useEffect(() => {
    if (editor && editor.on) {
      editor.on("update", handleUpdate);
      return () => {
        editor.off("update", handleUpdate);
      };
    }
  }, [editor, handleUpdate]);

  // Set initial HTML content if provided (only once when editor is first created)
  React.useEffect(() => {
    if (editor && initialHTML !== undefined && !hasSetInitialHTML.current) {
      const currentHTML = editor.getHTML();
      // Set initial content if editor is empty or just has default paragraph
      const isEmpty = currentHTML === "<p></p>" || !currentHTML.trim() || currentHTML === "<p><br></p>";
      if (isEmpty && initialHTML && initialHTML.trim()) {
        isUpdatingFromProps.current = true;
        editor.commands.setContent(initialHTML, false);
        hasSetInitialHTML.current = true;
        lastValueRef.current = initialHTML;
      } else if (isEmpty) {
        // Editor is empty but no initial HTML, mark as set
        hasSetInitialHTML.current = true;
      }
    }
  }, [editor, initialHTML]);

  // Update content when value prop changes (controlled mode)
  // This handles both initial load and subsequent updates
  React.useEffect(() => {
    if (value !== undefined && editor) {
      const currentHTML = editor.getHTML();
      // Normalize HTML for comparison (remove whitespace differences)
      const normalizeHTML = (html: string) => {
        const normalized = html.trim().replace(/\s+/g, " ").replace(/>\s+</g, "><");
        return normalized;
      };
      const normalizedCurrent = normalizeHTML(currentHTML);
      const normalizedValue = normalizeHTML(value || "");
      
      // Check if editor is essentially empty (just default paragraph)
      const isEmpty = normalizedCurrent === "<p></p>" || normalizedCurrent === "" || normalizedCurrent === "<p><br></p>" || normalizedCurrent === "<p></p>";
      
      // Check if value actually has content
      const hasContent = normalizedValue && normalizedValue !== "<p></p>" && normalizedValue !== "";
      
      // Update if:
      // 1. Content actually changed (and it's not just whitespace differences), OR
      // 2. Editor is empty and we have content to set, OR
      // 3. We haven't set initial HTML yet and have content
      const shouldUpdate = 
        (normalizedCurrent !== normalizedValue && normalizedValue !== "") ||
        (isEmpty && hasContent) ||
        (!hasSetInitialHTML.current && hasContent);
      
      if (shouldUpdate) {
        isUpdatingFromProps.current = true;
        editor.commands.setContent(value || "", false); // false = don't emit update event
        hasSetInitialHTML.current = true;
        lastValueRef.current = value;
      } else if (value === "" && !isEmpty) {
        // If value is explicitly empty, clear the editor
        isUpdatingFromProps.current = true;
        editor.commands.setContent("", false);
        hasSetInitialHTML.current = true;
        lastValueRef.current = value;
      }
    }
  }, [value, editor]);

  // Update editable state
  React.useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editable, editor]);

  return null;
};

const TipTapEditor = ({
  initialContent,
  defaultValue,
  value,
  onChange,
  onUpdate,
  placeholder = "Start typing...",
  editable = true,
  className,
  editorClassName,
  showBubbleMenu = true,
  extensions,
  skipEditorRoot = false,
  toolbar,
  resetKey,
  ...props
}: TipTapEditorProps) => {
  // Determine the initial content - prefer initialContent (JSON), then value/defaultValue (HTML)
  const initialEditorContent = useMemo(() => {
    if (initialContent) {
      return initialContent;
    }
    // For HTML strings, we'll set them via the controller after editor creation
    return undefined;
  }, [initialContent]);

  // Get the HTML content to set initially (if not using JSONContent)
  const initialHTMLContent = useMemo(() => {
    if (initialContent) {
      return undefined; // Using JSONContent
    }
    if (value !== undefined) {
      return value;
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return "";
  }, [value, defaultValue, initialContent]);

  // Default extensions if none provided
  const defaultExtensions = useMemo(() => {
    if (extensions) {
      return extensions;
    }
    return [
      StarterKit.configure({
        // Configure starter kit extensions
      }),
      Placeholder.configure({
        placeholder,
      }),
    ];
  }, [extensions, placeholder]);

  // Handle editor updates (for initial setup)
  const handleUpdate = useCallback(
    ({ editor: ed }: { editor: any }) => {
      if (onUpdate) {
        onUpdate({ editor: ed });
      }
      if (onChange) {
        const html = ed.getHTML();
        const json = ed.getJSON();
        onChange(html, json);
      }
    },
    [onChange, onUpdate]
  );

  const editorContent = (
    <EditorContent
      extensions={defaultExtensions}
      initialContent={initialEditorContent}
      editable={editable}
      onUpdate={handleUpdate}
      editorProps={{
        attributes: {
          class: combineClassNames(
            "prose dark:prose-invert prose-headings:font-title focus:outline-none max-w-full",
            editorClassName
          ),
        },
      }}
      className={combineClassNames(
        "relative min-h-[400px] px-4 pb-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus-within:ring-2 focus-within:ring-primary pt-20",
        editorClassName
      )}
    >
      <div className="absolute top-0 left-0 right-0 z-10">
        {toolbar}
      </div>
      <EditorController
        value={value}
        initialHTML={initialHTMLContent}
        editable={editable}
        onChange={onChange}
        onUpdate={onUpdate}
        resetKey={resetKey}
      />
      <BubbleMenuContent showBubbleMenu={showBubbleMenu} editable={editable} />
    </EditorContent>
  );

  return (
    <Box className={combineClassNames("w-full", className)} {...props}>
      {skipEditorRoot ? (
        editorContent
      ) : (
        <EditorRoot>{editorContent}</EditorRoot>
      )}
    </Box>
  );
};

export default TipTapEditor;

