"use client";

import React, { useState } from "react";
import { useIsomorphicLayoutEffect } from "@nathanhfoster/resurrection";
import { RichText, Box, Button, TextArea, Typography, Switch, IconDocument, IconCode } from "@nathanhfoster/ui";
import type { ResumeEditorProps } from "./types";

/**
 * Convert HTML to markdown-style plain text
 * Creates readable, printable plain text with proper formatting
 * Handles both regular HTML and escaped HTML entities (like &lt; &gt;)
 */
function stripHtml(html: string): string {
  if (!html || typeof html !== "string") {
    return "";
  }

  if (typeof window === "undefined") {
    // Server-side: basic fallback
    let decoded = html
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'");
    
    return decoded
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }
  
  // Client-side: Convert HTML to clean, formatted plain text
  // Step 1: Remove script and style tags
  let cleanedHtml = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
  
  // Step 2: Decode HTML entities
  const decodeDiv = document.createElement("div");
  decodeDiv.innerHTML = cleanedHtml;
  const decodedHtml = decodeDiv.innerHTML;
  
  // Step 3: Parse DOM and build formatted plain text
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = decodedHtml;
  
  const lines: string[] = [];
  
  function getIndentFromStyle(style: string): number {
    const marginMatch = style.match(/margin-left:\s*([\d.]+)(em|px)/);
    if (marginMatch) {
      const value = parseFloat(marginMatch[1]);
      const unit = marginMatch[2];
      if (unit === "em") {
        // 1.5em = 0 spaces, 3em = 2 spaces, 4.5em = 4 spaces
        return Math.max(0, Math.round((value - 1.5) / 1.5) * 2);
      } else if (unit === "px") {
        // 24px ≈ 1.5em, so 48px = 2 spaces, 72px = 4 spaces
        return Math.max(0, Math.round((value - 24) / 24) * 2);
      }
    }
    return 0;
  }
  
  function processNode(node: Node, currentIndent: number = 0, isInList: boolean = false): void {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent?.trim();
        if (text && !isInList) {
          // Check if text contains multiple bullet points that should be split
          const bulletPattern = /([●•\-\*])\s/g;
          const bulletMatches = text.match(bulletPattern);
          
          // Check if there are block siblings - if so, ignore this text node
          // as block elements handle their own text
          const parent = child.parentElement;
          if (parent) {
            const siblings = Array.from(parent.childNodes);
            const hasBlockSibling = siblings.some(sibling => {
              if (sibling.nodeType === Node.ELEMENT_NODE) {
                const el = sibling as HTMLElement;
                const style = el.getAttribute("style") || "";
                return style.includes("display: block") || 
                       ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li"].includes(el.tagName.toLowerCase());
              }
              return false;
            });
            
            // Only add text node if there are no block siblings
            if (!hasBlockSibling) {
              const indentStr = " ".repeat(currentIndent);
              
              // If text has multiple bullet points, split them
              if (bulletMatches && bulletMatches.length > 1) {
                const parts = text.split(/(?=[●•\-\*]\s)/);
                parts.forEach(part => {
                  const trimmed = part.trim();
                  if (trimmed) {
                    lines.push(indentStr + trimmed);
                  }
                });
              } else {
                lines.push(indentStr + text);
              }
            }
          } else {
            const indentStr = " ".repeat(currentIndent);
            
            // If text has multiple bullet points, split them
            if (bulletMatches && bulletMatches.length > 1) {
              const parts = text.split(/(?=[●•\-\*]\s)/);
              parts.forEach(part => {
                const trimmed = part.trim();
                if (trimmed) {
                  lines.push(indentStr + trimmed);
                }
              });
            } else {
              lines.push(indentStr + text);
            }
          }
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const element = child as HTMLElement;
        const tagName = element.tagName.toLowerCase();
        const style = element.getAttribute("style") || "";
        const isBlock = style.includes("display: block");
        
        // Calculate indentation
        let indent = currentIndent;
        const styleIndent = getIndentFromStyle(style);
        if (styleIndent > 0) {
          indent = styleIndent;
        }
        
        // Get text content (this automatically strips all nested HTML tags)
        const elementText = element.textContent?.trim() || "";
        
        if (tagName === "h1" || tagName === "h2" || tagName === "h3" || 
            tagName === "h4" || tagName === "h5" || tagName === "h6") {
          if (elementText) {
            if (lines.length > 0 && lines[lines.length - 1] !== "") {
              lines.push(""); // Blank line before heading
            }
            lines.push(elementText);
            lines.push(""); // Blank line after heading
          }
        } else if (tagName === "p") {
          if (elementText) {
            lines.push(elementText);
            lines.push(""); // Blank line after paragraph
          }
        } else if (tagName === "ul" || tagName === "ol") {
          if (lines.length > 0 && lines[lines.length - 1] !== "") {
            lines.push(""); // Blank line before list
          }
          processNode(element, indent, true);
          if (lines.length > 0 && lines[lines.length - 1] !== "") {
            lines.push(""); // Blank line after list
          }
        } else if (tagName === "li") {
          // Process list item content more carefully
          const listItemLines: string[] = [];
          const baseIndent = 2;
          const totalIndent = baseIndent + indent;
          const indentStr = " ".repeat(totalIndent);
          
          // Process children to handle nested content properly
          for (const child of Array.from(element.childNodes)) {
            if (child.nodeType === Node.TEXT_NODE) {
              const text = child.textContent?.trim();
              if (text) {
                listItemLines.push(text);
              }
            } else if (child.nodeType === Node.ELEMENT_NODE) {
              const childEl = child as HTMLElement;
              const childText = childEl.textContent?.trim();
              if (childText) {
                // Check if this child element contains multiple bullet points
                const bulletMatches = childText.match(/[●•\-\*]\s/g);
                if (bulletMatches && bulletMatches.length > 1) {
                  // Split by bullet points
                  const parts = childText.split(/(?=[●•\-\*]\s)/);
                  parts.forEach(part => {
                    const trimmed = part.trim();
                    if (trimmed) {
                      listItemLines.push(trimmed);
                    }
                  });
                } else {
                  listItemLines.push(childText);
                }
              }
            }
          }
          
          // Join list item content, handling multiple lines
          if (listItemLines.length > 0) {
            const itemText = listItemLines.join(" ").trim();
            if (itemText) {
              // Check if the text contains multiple bullet points that should be split
              const bulletPattern = /([●•\-\*])\s/g;
              const hasMultipleBullets = (itemText.match(bulletPattern) || []).length > 1;
              
              if (hasMultipleBullets) {
                // Split by bullet points and create separate list items
                const parts = itemText.split(/(?=[●•\-\*]\s)/);
                parts.forEach(part => {
                  const trimmed = part.trim();
                  if (trimmed) {
                    // Ensure it starts with a bullet
                    const bulletChar = trimmed.match(/^([●•\-\*])/)?.[1] || "•";
                    const textWithoutBullet = trimmed.replace(/^[●•\-\*]\s*/, "").trim();
                    if (textWithoutBullet) {
                      lines.push(indentStr + bulletChar + " " + textWithoutBullet);
                    }
                  }
                });
              } else {
                // Single list item
                // Ensure it has a bullet point
                const hasBullet = /^[●•\-\*]/.test(itemText);
                if (hasBullet) {
                  lines.push(indentStr + itemText);
                } else {
                  lines.push(indentStr + "• " + itemText);
                }
              }
            }
          }
        } else if (isBlock && tagName === "span") {
          // Block span - each one gets its own line
          if (elementText) {
            const trimmedText = elementText.trim();
            // Check if the text contains bullet points
            const bulletPattern = /([●•\-\*])\s/g;
            const bulletMatches = trimmedText.match(bulletPattern);
            
            if (bulletMatches && bulletMatches.length > 0) {
              // Split by bullet points to ensure each gets its own line
              const parts = trimmedText.split(/(?=[●•\-\*]\s)/);
              const minIndent = 2;
              const totalIndent = Math.max(minIndent, indent);
              const indentStr = " ".repeat(totalIndent);
              
              parts.forEach(part => {
                const trimmed = part.trim();
                if (trimmed) {
                  // Ensure it starts with a bullet
                  const hasBullet = /^[●•\-\*]/.test(trimmed);
                  if (hasBullet) {
                    lines.push(indentStr + trimmed);
                  } else {
                    // Add bullet if missing
                    lines.push(indentStr + "• " + trimmed);
                  }
                }
              });
            } else {
              // Regular text - use style indent
              const indentStr = " ".repeat(indent);
              lines.push(indentStr + trimmedText);
            }
          }
        } else if (isBlock) {
          // Other block elements - process children with proper indent
          processNode(element, indent, isInList);
        } else {
          // Inline elements - process children with current indent
          processNode(element, currentIndent, isInList);
        }
      }
    }
  }
  
  processNode(tempDiv);
  
  // Clean up the lines and ensure NO HTML tags remain
  let text = lines.join("\n");
  
  // Aggressive HTML tag removal - multiple passes to catch everything
  // This ensures we remove ALL HTML tags, even if they somehow got into the text
  text = text
    // Remove ALL HTML tags (including nested, malformed, etc.)
    .replace(/<[^>]*>/g, "")
    // Remove any remaining HTML entities
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    // Remove multiple consecutive blank lines (max 2)
    .replace(/\n{3,}/g, "\n\n")
    // Remove trailing whitespace from each line
    .split("\n")
    .map(line => {
      // Remove any HTML tags that might still be in the line
      let cleanLine = line.replace(/<[^>]*>/g, "");
      // Remove trailing whitespace
      return cleanLine.replace(/\s+$/, "");
    })
    // Split lines that contain multiple bullet points
    .flatMap(line => {
      // Check if line contains multiple bullet points (not already indented separately)
      const bulletPattern = /([●•\-\*])\s/g;
      const bulletMatches = line.match(bulletPattern);
      
      // If line has multiple bullets and doesn't start with whitespace (meaning it's not already a list item)
      if (bulletMatches && bulletMatches.length > 1 && !/^\s/.test(line)) {
        // Split by bullet points, preserving the bullet character
        const parts = line.split(/(?=[●•\-\*]\s)/);
        return parts
          .map(part => part.trim())
          .filter(part => part.length > 0)
          .map(part => {
            // Ensure each part has proper indentation (2 spaces for bullet points)
            const hasBullet = /^[●•\-\*]/.test(part);
            if (hasBullet) {
              return "  " + part;
            } else {
              return "  • " + part;
            }
          });
      }
      // If line has multiple bullets but is already indented, try to split it
      else if (bulletMatches && bulletMatches.length > 1 && /^\s+/.test(line)) {
        // Extract the existing indentation
        const indentMatch = line.match(/^(\s+)/);
        const existingIndent = indentMatch ? indentMatch[1] : "  ";
        // Split by bullet points
        const parts = line.split(/(?=[●•\-\*]\s)/);
        return parts
          .map(part => part.trim())
          .filter(part => part.length > 0)
          .map(part => {
            const hasBullet = /^[●•\-\*]/.test(part);
            if (hasBullet) {
              return existingIndent + part;
            } else {
              return existingIndent + "• " + part;
            }
          });
      }
      return [line];
    })
    .join("\n")
    .trim();
  
  // Final safety check: if we still see HTML tags or entities, use textContent
  if (text.includes("<") || text.includes(">") || text.includes("&lt;") || text.includes("&gt;")) {
    // Use textContent which automatically strips ALL HTML
    const fallbackDiv = document.createElement("div");
    fallbackDiv.innerHTML = decodedHtml;
    text = fallbackDiv.textContent || fallbackDiv.innerText || "";
    
    // One more aggressive pass
    text = text
      .replace(/<[^>]*>/g, "")
      .replace(/&lt;/g, "")
      .replace(/&gt;/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'");
  }
  
  // Final cleanup
  text = text
    .replace(/\n{3,}/g, "\n\n")
    .split("\n")
    .map(line => line.trimEnd())
    .join("\n")
    .trim();
  
  return text;
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
              <IconDocument 
                className={`w-5 h-5 transition-opacity ${showPlainText ? 'opacity-40' : 'opacity-100'}`}
              />
              <Switch
                checked={showPlainText}
                onChange={(e) => setShowPlainText(e.target.checked)}
                name="plain-text-toggle"
              />
              <IconCode 
                className={`w-5 h-5 transition-opacity ${showPlainText ? 'opacity-100' : 'opacity-40'}`}
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

