/**
 * Reads a File as text content.
 *
 * @param file - The File object to read
 * @returns A Promise that resolves to the file content as a string
 *
 * @remarks
 * This function uses the FileReader API to read the file content as text.
 * It returns a Promise that resolves with the file content or rejects with an error.
 *
 * @example
 * ```ts
 * const file = event.target.files?.[0];
 * if (file) {
 *   const text = await readFileAsText(file);
 *   console.log(text);
 * }
 * ```
 */
const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Validate file object
    if (!file || !(file instanceof File)) {
      reject(new Error("Invalid file object"));
      return;
    }

    // Check if file is empty
    if (file.size === 0) {
      resolve(""); // Return empty string for empty files
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const result = e.target?.result;
      // FileReader.result can be string | ArrayBuffer | null
      // For readAsText, it should be a string
      if (typeof result === "string") {
        resolve(result);
      } else if (result === null) {
        reject(new Error("Failed to read file: FileReader returned null"));
      } else {
        // This shouldn't happen with readAsText, but handle it anyway
        reject(new Error("Failed to read file: unexpected result type"));
      }
    };
    
    reader.onerror = (e) => {
      const error = e.target?.error;
      const errorMessage = error?.message || "Unknown error occurred while reading file";
      reject(new Error(`Failed to read file: ${errorMessage}`));
    };
    
    reader.onabort = () => {
      reject(new Error("File reading was aborted"));
    };
    
    try {
      reader.readAsText(file);
    } catch (error) {
      reject(new Error(`Failed to start reading file: ${error instanceof Error ? error.message : "Unknown error"}`));
    }
  });
};

export default readFileAsText;
