"use client";

import React, { useState } from "react";
import { useIsomorphicLayoutEffect } from "@nathanhfoster/resurrection";
import { RichText, Box, Button, TextArea, Typography, Switch } from "@nathanhfoster/ui";
import type { ResumeEditorProps } from "./types";

/**
 * Strip HTML tags and decode HTML entities to get plain text
 */
function stripHtml(html: string): string {
  if (typeof window === "undefined") {
    // Server-side: basic HTML stripping
    return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
  }
  
  // Client-side: use DOM to properly decode
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

export function ResumeEditor({
  resume,
  content,
  isDirty,
  onContentChange,
  onSave,
  onReset,
  className,
}: ResumeEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [showPlainText, setShowPlainText] = useState(false);
  const contentEditableRef = React.useRef<HTMLDivElement>(null);
  const lastContentRef = React.useRef<string>(content);
  const isUserTypingRef = React.useRef<boolean>(false);

  // Update editContent when content changes externally
  React.useEffect(() => {
    if (!isEditing) {
      setEditContent(content);
    }
  }, [content, isEditing]);

  // Initialize contentEditable with content on mount
  useIsomorphicLayoutEffect(() => {
    if (contentEditableRef.current && !isEditing && !showPlainText) {
      // Only set initial content if element is empty or content changed externally
      if (!contentEditableRef.current.innerHTML || (content !== lastContentRef.current && !isUserTypingRef.current)) {
        contentEditableRef.current.innerHTML = content;
        lastContentRef.current = content;
      }
    }
  }, [isEditing, showPlainText]);

  // Handle external content changes (e.g., loading different resume)
  useIsomorphicLayoutEffect(() => {
    if (!isEditing && !showPlainText && contentEditableRef.current) {
      // Only update if content changed from external source (not from user input)
      if (content !== lastContentRef.current && !isUserTypingRef.current) {
        // Save current cursor position before updating
        const selection = window.getSelection();
        let savedRange: Range | null = null;
        if (selection && selection.rangeCount > 0 && contentEditableRef.current.contains(selection.anchorNode)) {
          savedRange = selection.getRangeAt(0).cloneRange();
        }

        // Update content
        contentEditableRef.current.innerHTML = content;
        lastContentRef.current = content;

        // Restore cursor position synchronously (useLayoutEffect runs before paint)
        if (savedRange && selection && contentEditableRef.current) {
          try {
            // Try to restore the exact position
            selection.removeAllRanges();
            selection.addRange(savedRange);
          } catch (e) {
            // If restoring fails, place cursor at end
            const range = document.createRange();
            range.selectNodeContents(contentEditableRef.current);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
      }
    }
  }, [content, isEditing, showPlainText]);

  if (!resume) {
    return (
      <Box className={className}>
        <p className="text-gray-500 dark:text-gray-400">
          No resume selected. Please load or create a resume.
        </p>
      </Box>
    );
  }

  const handleEdit = () => {
    setEditContent(content);
    setIsEditing(true);
  };

  const handleSave = () => {
    onContentChange(editContent);
    setIsEditing(false);
    onSave();
  };

  const handleCancel = () => {
    setEditContent(content);
    setIsEditing(false);
  };

  return (
    <Box className={className}>
      <Box className="mb-4 flex items-center justify-between">
        <Typography variant="h2" size="text-2xl" weight="font-bold">
          {resume.name}
        </Typography>
        <Box className="flex items-center gap-4">
          {!isEditing && (
            <Box className="flex items-center gap-2">
              <Typography variant="small" className="text-gray-600 dark:text-gray-400">
                Plain Text
              </Typography>
              <Switch
                checked={showPlainText}
                onChange={(e) => setShowPlainText(e.target.checked)}
                name="plain-text-toggle"
              />
            </Box>
          )}
          <Box className="flex gap-2">
            {!isEditing ? (
              <>
                <Button onClick={handleEdit} variant="outlined" color="primary">
                  Edit
                </Button>
                {isDirty && (
                  <>
                    <Button onClick={onSave} variant="contained" color="primary">
                      Save Changes
                    </Button>
                    <Button onClick={onReset} variant="text" color="inherit">
                      Reset
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Button onClick={handleSave} variant="contained" color="primary">
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outlined" color="inherit">
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>

      {isEditing ? (
        <TextArea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          placeholder="Edit resume content (HTML supported)"
          fullHeight
          className="min-h-[600px] font-mono text-sm"
        />
      ) : showPlainText ? (
        <Box className="min-h-[400px] p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
          <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">
            {stripHtml(content)}
          </pre>
        </Box>
      ) : (
        <div
          ref={contentEditableRef}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => {
            isUserTypingRef.current = true;
            const newContent = e.currentTarget.innerHTML;
            lastContentRef.current = newContent;
            if (newContent !== content) {
              onContentChange(newContent);
            }
            // Reset flag after a short delay to allow for external updates
            setTimeout(() => {
              isUserTypingRef.current = false;
            }, 100);
          }}
          onBlur={(e) => {
            const newContent = e.currentTarget.innerHTML;
            if (newContent !== content) {
              onContentChange(newContent);
            }
            isUserTypingRef.current = false;
          }}
          onKeyDown={(e) => {
            // Prevent Enter from creating new paragraphs in contentEditable
            if (e.key === "Enter" && e.shiftKey === false) {
              e.preventDefault();
              document.execCommand("insertHTML", false, "<br>");
            }
          }}
          onFocus={() => {
            // Ensure cursor is at the end when focusing if content is empty
            if (contentEditableRef.current && !contentEditableRef.current.textContent?.trim()) {
              const selection = window.getSelection();
              const range = document.createRange();
              range.selectNodeContents(contentEditableRef.current);
              range.collapse(false);
              selection?.removeAllRanges();
              selection?.addRange(range);
            }
          }}
          className="prose dark:prose-invert max-w-none min-h-[400px] p-4 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary cursor-text"
        />
      )}
    </Box>
  );
}

