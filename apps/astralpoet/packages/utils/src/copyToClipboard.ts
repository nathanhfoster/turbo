/**
 * Copy text to clipboard
 * 
 * Local implementation to avoid ESM import issues with Next.js 14
 * For new code, use @nathanhfoster/utils directly
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
