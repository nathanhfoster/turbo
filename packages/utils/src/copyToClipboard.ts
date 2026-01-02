"use client";

const copyToClipboard = async (text: string): Promise<boolean> => {
  // Modern approach using Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn("Failed to copy using Clipboard API:", err);
    }
  }

  // Fallback for older browsers
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
};

export default copyToClipboard;
