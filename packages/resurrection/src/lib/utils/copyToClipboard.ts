/**
 * Copies the provided text to the clipboard using the Clipboard API.
 *
 * Note: This is a simple implementation. For more features (HTML support, fallback),
 * use @nathanhfoster/utils instead.
 *
 * @param text - The text string to be copied to the clipboard.
 * @returns A promise that resolves to true when the text is successfully copied, false otherwise.
 *
 * @example
 * ```typescript
 * copyToClipboard('Hello, world!')
 *   .then((success) => {
 *     if (success) {
 *       console.log('Text successfully copied!');
 *     }
 *   });
 * ```
 */
async function copyToClipboard(text: string): Promise<boolean> {
  if (!navigator?.clipboard) {
    console.error("Clipboard API not available");
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy text to clipboard:", error);
    return false;
  }
}

export default copyToClipboard;
