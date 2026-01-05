/**
 * Resume file parsing utilities
 * Following FSD pattern - domain-specific utilities
 */

/**
 * Parse a file (PDF, DOCX, TXT, HTML) and extract text content
 */
export async function parseResumeFile(file: File): Promise<string> {
  const fileExtension = file.name.split(".").pop()?.toLowerCase();

  switch (fileExtension) {
    case "txt":
      return await parseTextFile(file);
    case "html":
    case "htm":
      return await parseHtmlFile(file);
    case "pdf":
      return await parsePdfFile(file);
    case "doc":
    case "docx":
      return await parseDocxFile(file);
    default:
      throw new Error(`Unsupported file type: ${fileExtension}`);
  }
}

/**
 * Parse a plain text file
 */
async function parseTextFile(file: File): Promise<string> {
  const text = await file.text();
  return convertTextToHtml(text);
}

/**
 * Parse an HTML file
 */
async function parseHtmlFile(file: File): Promise<string> {
  return await file.text();
}

/**
 * Parse a PDF file using pdf.js
 */
async function parsePdfFile(file: File): Promise<string> {
  try {
    // Dynamically import pdfjs-dist to avoid SSR issues
    const pdfjsLib = await import("pdfjs-dist");
    
    // Set worker source - use local worker file (more reliable than CDN)
    if (typeof window !== "undefined") {
      // Use local worker file from public folder (accounts for basePath)
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/resume/pdf.worker.min.mjs";
    }

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    let fullText = "";

    // Extract text from all pages with formatting preserved
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Process text items to preserve structure using positions
      const lines: Array<{ y: number; items: Array<{ x: number; text: string }> }> = [];
      
      // Group items by Y position (same line)
      for (const item of textContent.items) {
        // Type guard: only process TextItem (has str and transform)
        if (!("str" in item) || !("transform" in item)) continue;
        
        const transform = item.transform || [1, 0, 0, 1, 0, 0];
        const x = transform[4]; // X position
        const y = transform[5]; // Y position
        const text = item.str || "";
        
        if (!text.trim()) continue;
        
        // Find or create line for this Y position (with tolerance)
        let line = lines.find((l) => Math.abs(l.y - y) < 3);
        if (!line) {
          line = { y, items: [] };
          lines.push(line);
        }
        
        line.items.push({ x, text });
      }
      
      // Sort lines by Y position (top to bottom)
      lines.sort((a, b) => b.y - a.y);
      
      // Build text preserving structure
      let pageText = "";
      let lastY = -1;
      
      for (const line of lines) {
        if (!line || line.items.length === 0) continue;
        
        // Sort items in line by X position (left to right)
        line.items.sort((a, b) => a.x - b.x);
        
        // Add line break if significant Y change
        if (lastY !== -1 && Math.abs(line.y - lastY) > 10) {
          pageText += "\n";
        }
        
        // Build line text with spacing
        let lineText = "";
        let lastX = -1;
        
        for (const item of line.items) {
          // Add space if items are far apart (likely separate words)
          if (lastX !== -1 && item.x > lastX + 10) {
            lineText += " ";
          }
          lineText += item.text;
          lastX = item.x + (item.text.length * 5); // Approximate width
        }
        
        // Detect indentation and add appropriate spacing
        const firstItem = line.items[0];
        if (firstItem && firstItem.x > 50) {
          // Indented line - add some visual spacing
          const indentLevel = Math.floor(firstItem.x / 30);
          pageText += "  ".repeat(Math.min(indentLevel, 4));
        }
        
        pageText += lineText.trim() + "\n";
        lastY = line.y;
      }
      
      fullText += pageText + "\n";
    }

    return convertTextToHtml(fullText.trim());
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error(
      `Failed to parse PDF file: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Parse a DOCX file using mammoth
 */
async function parseDocxFile(file: File): Promise<string> {
  try {
    const mammoth = await import("mammoth");
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    return result.value;
  } catch (error) {
    console.error("Error parsing DOCX:", error);
    throw new Error(
      `Failed to parse DOCX file: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Convert plain text to HTML format for RichText component
 * Preserves indentation and structure
 */
function convertTextToHtml(text: string): string {
  const lines = text.split("\n").filter((line) => line.trim().length > 0);
  const htmlParts: string[] = [];
  let currentParagraph: string[] = [];
  let currentIndent = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    
    const trimmed = line.trim();
    
    // Detect indentation level (leading spaces)
    const indentMatch = line.match(/^(\s*)/);
    const indent = indentMatch?.[1]?.length || 0;
    const indentLevel = Math.floor(indent / 2); // Every 2 spaces = 1 indent level
    
    // Check if it looks like a heading
    const isHeading =
      trimmed.length < 100 &&
      (trimmed === trimmed.toUpperCase() ||
        trimmed.startsWith("#") ||
        /^[A-Z][a-z]+(\s+[A-Z][a-z]+)*$/.test(trimmed));
    
    // Check if it looks like a bullet point
    const isBullet = /^[•\-\*\+]\s/.test(trimmed) || /^\d+[\.\)]\s/.test(trimmed);
    
    // Flush current paragraph if structure changes
    if (
      currentParagraph.length > 0 &&
      (isHeading ||
        isBullet ||
        indentLevel !== currentIndent ||
        (i > 0 && Math.abs(indentLevel - currentIndent) > 1))
    ) {
      if (currentParagraph.length > 0) {
        const paraText = currentParagraph.join(" ").trim();
        if (paraText) {
          htmlParts.push(`<p>${escapeHtml(paraText)}</p>`);
        }
        currentParagraph = [];
      }
    }
    
    if (isHeading) {
      const level = trimmed.startsWith("#")
        ? (trimmed.match(/^#+/)?.[0]?.length || 1)
        : 2;
      const headingText = trimmed.replace(/^#+\s*/, "");
      htmlParts.push(`<h${level}>${escapeHtml(headingText)}</h${level}>`);
    } else if (isBullet) {
      // Start a list if not already in one
      if (htmlParts.length === 0 || !htmlParts[htmlParts.length - 1]?.startsWith("<ul")) {
        htmlParts.push("<ul>");
      }
      const bulletText = trimmed.replace(/^[•\-\*\+\d+[\.\)]\s*/, "");
      htmlParts.push(`<li>${escapeHtml(bulletText)}</li>`);
    } else {
      // Regular text - preserve indentation with CSS
      if (indentLevel > 0) {
        currentParagraph.push(`<span style="margin-left: ${indentLevel * 1.5}em; display: block;">${escapeHtml(trimmed)}</span>`);
      } else {
        currentParagraph.push(escapeHtml(trimmed));
      }
      currentIndent = indentLevel;
    }
  }
  
  // Flush remaining paragraph
  if (currentParagraph.length > 0) {
    const paraText = currentParagraph.join(" ").trim();
    if (paraText) {
      htmlParts.push(`<p>${escapeHtml(paraText)}</p>`);
    }
  }
  
  // Close any open lists
  if (htmlParts.length > 0 && htmlParts[htmlParts.length - 1]?.startsWith("<li")) {
    htmlParts.push("</ul>");
  }

  return htmlParts.join("\n");
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Generate a unique resume ID
 */
export function generateResumeId(): string {
  return `resume_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
