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
import Box from "../../atoms/Box";
import type { NovelEditorProps } from "./types";

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
}: {
  value?: string;
  initialHTML?: string;
  editable: boolean;
  onChange?: (html: string, json: JSONContent) => void;
  onUpdate?: (props: { editor: any }) => void;
}) => {
  const { editor } = useEditor();
  const isUpdatingFromProps = useRef(false);
  const hasSetInitialHTML = useRef(false);

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
    [onChange, onUpdate],
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

  // Set initial HTML content if provided
  React.useEffect(() => {
    if (editor && initialHTML !== undefined && !hasSetInitialHTML.current) {
      const currentHTML = editor.getHTML();
      if (
        currentHTML !== initialHTML &&
        (currentHTML === "<p></p>" || !currentHTML.trim())
      ) {
        isUpdatingFromProps.current = true;
        editor.commands.setContent(initialHTML, false);
        hasSetInitialHTML.current = true;
      }
    }
  }, [editor, initialHTML]);

  // Update content when value prop changes (controlled mode)
  React.useEffect(() => {
    if (value !== undefined && editor) {
      const currentHTML = editor.getHTML();
      // Only update if content actually changed
      if (currentHTML !== value) {
        isUpdatingFromProps.current = true;
        editor.commands.setContent(value, false); // false = don't emit update event
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

const NovelEditor = ({
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
  ...props
}: NovelEditorProps) => {
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
    [onChange, onUpdate],
  );

  return (
    <Box className={combineClassNames("w-full", className)} {...props}>
      <EditorRoot>
        <EditorContent
          extensions={[
            StarterKit.configure({
              // Configure starter kit extensions
            }),
            Placeholder.configure({
              placeholder,
            }),
          ]}
          initialContent={initialEditorContent}
          editable={editable}
          onUpdate={handleUpdate}
          editorProps={{
            attributes: {
              class: combineClassNames(
                "prose dark:prose-invert prose-headings:font-title focus:outline-none max-w-full",
                editorClassName,
              ),
            },
          }}
          className={combineClassNames(
            "min-h-[400px] p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus-within:ring-2 focus-within:ring-primary",
            editorClassName,
          )}
        />
        <EditorController
          value={value}
          initialHTML={initialHTMLContent}
          editable={editable}
          onChange={onChange}
          onUpdate={onUpdate}
        />
        <BubbleMenuContent
          showBubbleMenu={showBubbleMenu}
          editable={editable}
        />
      </EditorRoot>
    </Box>
  );
};

export default NovelEditor;
