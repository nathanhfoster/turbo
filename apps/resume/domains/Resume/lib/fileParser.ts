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

    // Set worker source - use CDN URL (most reliable, works with any basePath)
    if (typeof window !== "undefined") {
      // Use the official CDN worker URL from pdfjs-dist
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
    }

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    // Extract all pages in parallel to eliminate waterfall
    const pagePromises = Array.from({ length: pdf.numPages }, (_, i) =>
      pdf.getPage(i + 1).then((page) => page.getTextContent())
    );
    const allTextContents = await Promise.all(pagePromises);

    let fullText = "";

    // Process text from all pages with formatting preserved
    for (let pageNum = 0; pageNum < allTextContents.length; pageNum++) {
      const textContent = allTextContents[pageNum];

      // Skip if textContent is undefined or missing items
      if (!textContent?.items) continue;

      // Process text items to preserve structure using positions
      const lines: Array<{
        y: number;
        items: Array<{ x: number; text: string }>;
      }> = [];

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
          lastX = item.x + item.text.length * 5; // Approximate width
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
 * Preserves structure without inline styles that cause rendering issues
 */
function convertTextToHtml(text: string): string {
  const lines = text.split("\n");
  const htmlParts: string[] = [];
  let currentParagraph: string[] = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) {
      // Empty line - flush current paragraph and close list if needed
      if (currentParagraph.length > 0) {
        const paraText = currentParagraph.join(" ").trim();
        if (paraText) {
          htmlParts.push(`<p>${escapeHtml(paraText)}</p>`);
        }
        currentParagraph = [];
      }
      if (inList) {
        htmlParts.push("</ul>");
        inList = false;
      }
      continue;
    }

    const trimmed = line.trim();
    if (!trimmed) continue;

    // Detect indentation (but don't use inline styles)
    const indentMatch = line.match(/^(\s*)/);
    const indent = indentMatch?.[1]?.length || 0;
    const isIndented = indent > 2;

    // Check if it looks like a heading (all caps, short, or starts with #)
    const isHeading =
      trimmed.length < 100 &&
      (trimmed === trimmed.toUpperCase() ||
        trimmed.startsWith("#") ||
        /^[A-Z][a-z]+(\s+[A-Z][a-z]+)*$/.test(trimmed));

    // Check if it looks like a bullet point
    const isBullet =
      /^[•\-\*\+]\s/.test(trimmed) || /^\d+[\.\)]\s/.test(trimmed);

    // Flush current paragraph if structure changes
    if (currentParagraph.length > 0 && (isHeading || isBullet || isIndented)) {
      const paraText = currentParagraph.join(" ").trim();
      if (paraText) {
        htmlParts.push(`<p>${escapeHtml(paraText)}</p>`);
      }
      currentParagraph = [];
    }

    if (isHeading) {
      const level = trimmed.startsWith("#")
        ? trimmed.match(/^#+/)?.[0]?.length || 1
        : 2;
      const headingText = trimmed.replace(/^#+\s*/, "");
      htmlParts.push(`<h${level}>${escapeHtml(headingText)}</h${level}>`);
    } else if (isBullet) {
      if (!inList) {
        htmlParts.push("<ul>");
        inList = true;
      }
      const bulletText = trimmed.replace(/^[•\-\*\+\d+[\.\)]\s*/, "");
      htmlParts.push(`<li>${escapeHtml(bulletText)}</li>`);
    } else {
      // Regular text - just add to current paragraph (no inline styles)
      currentParagraph.push(escapeHtml(trimmed));
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
  if (inList) {
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
