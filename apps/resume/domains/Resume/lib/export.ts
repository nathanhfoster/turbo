/**
 * Resume export utilities
 * Following FSD pattern - domain-specific utilities
 */

import { copyToClipboard } from "@nathanhfoster/utils";
import type { Resume } from "../model/types";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * Export resume as HTML file
 */
export function exportResumeAsHTML(resume: Resume): void {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resume.name}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.6;
    }
    h1, h2, h3 {
      color: #333;
    }
  </style>
</head>
<body>
  ${resume.content}
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${resume.name.replace(/[^a-z0-9]/gi, "_")}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export resume as plain text
 */
export function exportResumeAsText(resume: Resume): void {
  // Strip HTML tags for plain text export
  const textContent = resume.content
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();

  const blob = new Blob([textContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${resume.name.replace(/[^a-z0-9]/gi, "_")}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copy resume content to clipboard
 */
export async function copyResumeToClipboard(resume: Resume): Promise<boolean> {
  // Strip HTML tags for plain text version
  const textContent = resume.content
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();

  // Use the generic copyToClipboard utility
  return await copyToClipboard(textContent, resume.content);
}

/**
 * Export resume as PDF
 */
export async function exportResumeAsPDF(resume: Resume): Promise<void> {
  // Create a temporary container element
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.width = "210mm"; // A4 width
  container.style.padding = "20mm";
  container.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif";
  container.style.fontSize = "12pt";
  container.style.lineHeight = "1.6";
  container.style.color = "#000";
  container.style.backgroundColor = "#fff";
  container.innerHTML = resume.content;

  // Append to body temporarily
  document.body.appendChild(container);

  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(container, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    // Calculate PDF dimensions (A4: 210mm x 297mm)
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");
    let position = 0;

    // Add first page
    pdf.addImage(
      canvas.toDataURL("image/png"),
      "PNG",
      0,
      position,
      imgWidth,
      imgHeight,
    );
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight,
      );
      heightLeft -= pageHeight;
    }

    // Save PDF
    pdf.save(`${resume.name.replace(/[^a-z0-9]/gi, "_")}.pdf`);
  } catch (error) {
    console.error("Error exporting PDF:", error);
    throw new Error(
      `Failed to export PDF: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  } finally {
    // Clean up
    document.body.removeChild(container);
  }
}
