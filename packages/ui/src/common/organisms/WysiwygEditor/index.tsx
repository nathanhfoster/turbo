"use client";

import React, { useMemo } from "react";
import {
  StarterKit,
  Placeholder,
  TiptapUnderline,
  TiptapLink,
  Youtube,
  TiptapImage,
  HorizontalRule,
} from "novel";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { combineClassNames } from "@nathanhfoster/utils";
import Box from "../../atoms/Box";
import TipTapEditor from "../../atoms/TipTapEditor";
import type { WysiwygEditorProps } from "./types";
import { WysiwygToolbar } from "./components/Toolbar";
import { CustomBold } from "./components/extensions/CustomBold";
import { FontSize } from "./components/extensions/FontSize";

const WysiwygEditor = ({
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
  toolbarConfig,
  ...props
}: WysiwygEditorProps) => {
  // Configure extensions
  const extensions = useMemo(() => {
    return [
      StarterKit.configure({
        bold: false,
      }),
      CustomBold,
      TextStyle,
      FontSize,
      Color,
      FontFamily,
      Highlight.configure({
        multicolor: true,
      }),
      TiptapUnderline,
      Subscript,
      Superscript,
      TiptapLink.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TiptapImage.configure({
        inline: true,
        allowBase64: true,
      }),
      Youtube.configure({
        nocookie: true,
        modestBranding: true,
      }),
      HorizontalRule,
      Placeholder.configure({
        placeholder,
      }),
    ];
  }, [placeholder]);

  return (
    <Box className={combineClassNames("w-full", className)} {...props}>
      <TipTapEditor
        initialContent={initialContent}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onUpdate={onUpdate}
        placeholder={placeholder}
        editable={editable}
        editorClassName={editorClassName}
        showBubbleMenu={showBubbleMenu}
        extensions={extensions}
        toolbar={<WysiwygToolbar config={toolbarConfig} />}
      />
    </Box>
  );
};

export default WysiwygEditor;

