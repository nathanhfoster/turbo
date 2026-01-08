/**
 * Copy text or HTML content to clipboard
 *
 * Uses the modern Clipboard API with fallback for older browsers.
 *
 * @param text - Plain text content to copy
 * @param html - Optional HTML content to copy (will try HTML first, fallback to text)
 * @returns Promise that resolves to true if successful, false otherwise
 *
 * @example
 * ```ts
 * import { copyToClipboard } from '@nathanhfoster/utils';
 *
 * // Copy plain text
 * await copyToClipboard('Hello, world!');
 *
 * // Copy HTML with text fallback
 * await copyToClipboard('Plain text version', '<p>HTML version</p>');
 * ```
 */
async function copyToClipboard(text: string, html?: string): Promise<boolean> {
  // Modern approach using Clipboard API
  if (navigator?.clipboard && window.isSecureContext) {
    try {
      // If HTML is provided, try to copy as HTML first
      if (html) {
        try {
          const htmlBlob = new Blob([html], { type: "text/html" });
          const htmlData = [new ClipboardItem({ "text/html": htmlBlob })];
          await navigator.clipboard.write(htmlData);
          return true;
        } catch {
          // Fallback to plain text if HTML copy fails
          await navigator.clipboard.writeText(text);
          return true;
        }
      } else {
        // Just copy plain text
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
      console.warn("Failed to copy using Clipboard API:", err);
      // Fall through to fallback method
    }
  }

  // Fallback for older browsers or when Clipboard API fails
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    const successful = document.execCommand("copy");
    textArea.remove();
    return successful;
  } catch (err) {
    console.warn("Failed to copy using fallback method:", err);
    return false;
  }
}

export default copyToClipboard;
