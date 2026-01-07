"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useEditor } from "novel";
import { isClientSide } from "@nathanhfoster/utils";
import { useClickOutside } from "@nathanhfoster/react-hooks";
import Box from "../../../../atoms/Box";
import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconStrikethrough,
  IconHighlight,
  IconCode,
  IconLink,
  IconLinkOff,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconListBullet,
  IconListOrdered,
  IconBlockquote,
  IconHorizontalRule,
  IconImage,
  IconVideo,
  IconUndo,
  IconRedo,
} from "@nathanhfoster/ui";
import type { WysiwygToolbarProps, ToolbarConfig } from "./types";
import { DEFAULT_TOOLBAR_CONFIG, HIGHLIGHT_COLOR } from "./constants";
import { ToolbarButton } from "./utils";
import { ToolbarDivider } from "./components/ToolbarDivider";

// Dynamically import conditionally rendered dropdown components
const TextSizeDropdown = dynamic<import("./components/TextSizeDropdown/types").TextSizeDropdownProps>(
  // @ts-ignore - Next.js handles module resolution for dynamic imports without extensions
  () => import("./components/TextSizeDropdown").then((mod) => ({ default: mod.TextSizeDropdown })),
  { ssr: false }
);

const TextColorDropdown = dynamic<import("./components/TextColorDropdown/types").TextColorDropdownProps>(
  // @ts-ignore - Next.js handles module resolution for dynamic imports without extensions
  () => import("./components/TextColorDropdown").then((mod) => ({ default: mod.TextColorDropdown })),
  { ssr: false }
);

const FontFamilyDropdown = dynamic<import("./components/FontFamilyDropdown/types").FontFamilyDropdownProps>(
  // @ts-ignore - Next.js handles module resolution for dynamic imports without extensions
  () => import("./components/FontFamilyDropdown").then((mod) => ({ default: mod.FontFamilyDropdown })),
  { ssr: false }
);

const TypographyDropdown = dynamic<import("./components/TypographyDropdown/types").TypographyDropdownProps>(
  // @ts-ignore - Next.js handles module resolution for dynamic imports without extensions
  () => import("./components/TypographyDropdown").then((mod) => ({ default: mod.TypographyDropdown })),
  { ssr: false }
);

export const WysiwygToolbar: React.FC<WysiwygToolbarProps> = ({ config = {} }) => {
  const { editor } = useEditor();
  const [showTextSizeDropdown, setShowTextSizeDropdown] = useState(false);
  const [showTextColorDropdown, setShowTextColorDropdown] = useState(false);
  const [showFontFamilyDropdown, setShowFontFamilyDropdown] = useState(false);
  const [showTypographyDropdown, setShowTypographyDropdown] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useClickOutside(toolbarRef, showTextSizeDropdown, () => setShowTextSizeDropdown(false));
  useClickOutside(toolbarRef, showTextColorDropdown, () => setShowTextColorDropdown(false));
  useClickOutside(toolbarRef, showFontFamilyDropdown, () => setShowFontFamilyDropdown(false));
  useClickOutside(toolbarRef, showTypographyDropdown, () => setShowTypographyDropdown(false));

  // Wait for editor to be available
  if (!editor) {
    return null;
  }

  const toolbarConfig: Required<ToolbarConfig> = { ...DEFAULT_TOOLBAR_CONFIG, ...config };

  return (
    <div ref={toolbarRef}>
      <Box className="p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex flex-wrap items-center gap-1">
          {/* Text Formatting */}
          {toolbarConfig.showBold && (
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive("bold")}
              title="Bold"
            >
              <IconBold className="w-5 h-5" />
            </ToolbarButton>
          )}

          {toolbarConfig.showItalic && (
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive("italic")}
              title="Italic"
            >
              <IconItalic className="w-5 h-5" />
            </ToolbarButton>
          )}

          {toolbarConfig.showUnderline && (
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive("underline")}
              title="Underline"
            >
              <IconUnderline className="w-5 h-5" />
            </ToolbarButton>
          )}

          {toolbarConfig.showStrike && (
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive("strike")}
              title="Strikethrough"
            >
              <IconStrikethrough className="w-5 h-5" />
            </ToolbarButton>
          )}

          {toolbarConfig.showHighlight && (
            <ToolbarButton
              onClick={() => {
                const isHighlighted = editor.isActive("highlight");
                if (isHighlighted) {
                  editor.chain().focus().unsetHighlight().run();
                } else {
                  editor.chain().focus().setHighlight({ color: HIGHLIGHT_COLOR }).run();
                }
              }}
              isActive={editor.isActive("highlight")}
              title="Highlight"
            >
              <IconHighlight className="w-5 h-5" />
            </ToolbarButton>
          )}

          {toolbarConfig.showCode && (
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              isActive={editor.isActive("code")}
              title="Code"
            >
              <IconCode className="w-5 h-5" />
            </ToolbarButton>
          )}

          {toolbarConfig.showLink && (
            <>
              <ToolbarButton
                onClick={() => {
                  if (!isClientSide()) return;
                  const url = window.prompt("Enter URL:", "https://");
                  if (url) {
                    editor.chain().focus().toggleLink({ href: url }).run();
                  }
                }}
                isActive={editor.isActive("link")}
                title="Add Link"
              >
                <IconLink className="w-5 h-5" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().unsetLink().run()}
                title="Remove Link"
              >
                <IconLinkOff className="w-5 h-5" />
              </ToolbarButton>
            </>
          )}

          <ToolbarDivider />

          {/* Text Size */}
          {toolbarConfig.showTextSize && (
            <TextSizeDropdown
              editor={editor}
              isOpen={showTextSizeDropdown}
              onToggle={() => setShowTextSizeDropdown(!showTextSizeDropdown)}
              onClose={() => setShowTextSizeDropdown(false)}
            />
          )}

          {/* Text Color */}
          {toolbarConfig.showTextColor && (
            <TextColorDropdown
              editor={editor}
              isOpen={showTextColorDropdown}
              onToggle={() => setShowTextColorDropdown(!showTextColorDropdown)}
              onClose={() => setShowTextColorDropdown(false)}
            />
          )}

          {/* Font Family */}
          {toolbarConfig.showFontFamily && (
            <FontFamilyDropdown
              editor={editor}
              isOpen={showFontFamilyDropdown}
              onToggle={() => setShowFontFamilyDropdown(!showFontFamilyDropdown)}
              onClose={() => setShowFontFamilyDropdown(false)}
            />
          )}

          <ToolbarDivider />

          {/* Alignment */}
          {toolbarConfig.showAlignment && (
            <>
              <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                isActive={editor.isActive({ textAlign: "left" })}
                title="Align Left"
              >
                <IconAlignLeft className="w-5 h-5" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
                isActive={editor.isActive({ textAlign: "center" })}
                title="Align Center"
              >
                <IconAlignCenter className="w-5 h-5" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
                isActive={editor.isActive({ textAlign: "right" })}
                title="Align Right"
              >
                <IconAlignRight className="w-5 h-5" />
              </ToolbarButton>
            </>
          )}

          {/* Typography */}
          {toolbarConfig.showTypography && (
            <TypographyDropdown
              editor={editor}
              isOpen={showTypographyDropdown}
              onToggle={() => setShowTypographyDropdown(!showTypographyDropdown)}
              onClose={() => setShowTypographyDropdown(false)}
            />
          )}

          {/* Lists */}
          {toolbarConfig.showLists && (
            <>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive("bulletList")}
                title="Bullet List"
              >
                <IconListBullet className="w-5 h-5" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive("orderedList")}
                title="Numbered List"
              >
                <IconListOrdered className="w-5 h-5" />
              </ToolbarButton>
            </>
          )}

          {toolbarConfig.showBlockquote && (
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive("blockquote")}
              title="Blockquote"
            >
              <IconBlockquote className="w-5 h-5" />
            </ToolbarButton>
          )}

          {toolbarConfig.showHorizontalRule && (
            <ToolbarButton
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              title="Horizontal Rule"
            >
              <IconHorizontalRule className="w-5 h-5" />
            </ToolbarButton>
          )}

          {toolbarConfig.showImage && (
            <ToolbarButton
              onClick={() => {
                if (!isClientSide()) return;
                const url = window.prompt("Enter image URL:", "https://placehold.co/600x400");
                if (url) {
                  editor.chain().focus().setImage({ src: url }).run();
                }
              }}
              title="Add Image"
            >
              <IconImage className="w-5 h-5" />
            </ToolbarButton>
          )}

          {toolbarConfig.showVideo && (
            <ToolbarButton
              onClick={() => {
                if (!isClientSide()) return;
                const url = window.prompt("Enter YouTube URL:", "https://www.youtube.com/watch?v=");
                if (url) {
                  editor.commands.setYoutubeVideo({
                    src: url,
                    width: 640,
                    height: 480,
                  });
                }
              }}
              title="Add Video"
            >
              <IconVideo className="w-5 h-5" />
            </ToolbarButton>
          )}

          {toolbarConfig.showUndoRedo && (
            <>
              <ToolbarDivider />
              <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                title="Undo"
              >
                <IconUndo className="w-5 h-5" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                title="Redo"
              >
                <IconRedo className="w-5 h-5" />
              </ToolbarButton>
            </>
          )}
        </div>
      </Box>
    </div>
  );
};

