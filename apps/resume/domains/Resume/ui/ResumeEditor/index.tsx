"use client";

import React, { useState } from "react";
import { Box, TextArea, Typography, WysiwygEditor } from "@nathanhfoster/ui";
import { stripHtml } from "./utils";
import type { ResumeEditorProps } from "./types";

export function ResumeEditor({
  resume,
  content,
  isDirty,
  onContentChange,
  onSave,
  onReset,
  className,
  isEditing: externalIsEditing,
  showPlainText: externalShowPlainText,
  onEdit: externalOnEdit,
  onTogglePlainText: externalOnTogglePlainText,
  onCancel: externalOnCancel,
  showTitle = true,
}: ResumeEditorProps) {
  const [internalIsEditing, setInternalIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [internalShowPlainText, setInternalShowPlainText] = useState(false);

  // Use external state if provided, otherwise use internal state
  const isEditing = externalIsEditing !== undefined ? externalIsEditing : internalIsEditing;
  const showPlainText = externalShowPlainText !== undefined ? externalShowPlainText : internalShowPlainText;

  // Update editContent when content changes externally
  React.useEffect(() => {
    if (!isEditing) {
      setEditContent(content);
    }
  }, [content, isEditing]);

  // Sync internal state with external state when provided
  React.useEffect(() => {
    if (externalIsEditing !== undefined && externalIsEditing !== internalIsEditing) {
      if (externalIsEditing) {
        setEditContent(content);
      }
      setInternalIsEditing(externalIsEditing);
    }
  }, [externalIsEditing]);

  React.useEffect(() => {
    if (externalShowPlainText !== undefined && externalShowPlainText !== internalShowPlainText) {
      setInternalShowPlainText(externalShowPlainText);
    }
  }, [externalShowPlainText]);

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
    if (externalOnEdit) {
      externalOnEdit();
    } else {
      setInternalIsEditing(true);
    }
  };

  const handleSave = () => {
    onContentChange(editContent);
    if (externalOnCancel) {
      // External control - state will be managed externally via onCancel
      externalOnCancel();
    } else {
      setInternalIsEditing(false);
    }
    onSave();
  };

  const handleCancel = () => {
    setEditContent(content);
    if (externalOnCancel) {
      externalOnCancel();
    } else {
      setInternalIsEditing(false);
    }
  };

  const handleTogglePlainText = (checked: boolean) => {
    if (externalOnTogglePlainText) {
      externalOnTogglePlainText(checked);
    } else {
      setInternalShowPlainText(checked);
    }
  };

  return (
    <Box className={`${className} w-full max-w-full min-w-0`}>
      {showTitle && (
        <Box className="mb-4">
          <Typography variant="h2" size="text-2xl" weight="font-bold">
            {resume.name}
          </Typography>
        </Box>
      )}

      {isEditing ? (
        <TextArea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          placeholder="Edit resume content (HTML supported)"
          fullHeight
          className="min-h-[600px] font-mono text-sm w-full"
        />
      ) : showPlainText ? (
        <Box className="min-h-[400px] p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 w-full">
          <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">
            {stripHtml(content)}
          </pre>
        </Box>
      ) : (
        <WysiwygEditor
          value={content}
          onChange={(html) => {
            onContentChange(html);
          }}
          placeholder="Start editing your resume..."
          editable={true}
          showToolbar={true}
          className="w-full"
        />
      )}
    </Box>
  );
}
