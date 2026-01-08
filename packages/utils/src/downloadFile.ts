/**
 * Downloads a file from a string or Blob with the specified filename and MIME type.
 *
 * @param data - The file content as a string or Blob
 * @param filename - The name to save the downloaded file as (e.g., "entries.json")
 * @param mimeType - The MIME type of the file (e.g., "application/json", "text/csv")
 *
 * @remarks
 * This function creates a Blob from the data, generates a temporary download URL,
 * creates an anchor element to trigger the download, and cleans up afterward.
 * It properly handles URL.revokeObjectURL to prevent memory leaks.
 *
 * @example
 * ```ts
 * downloadFile(JSON.stringify(data), "entries.json", "application/json");
 * downloadFile(csvString, "entries.csv", "text/csv");
 * ```
 */
const downloadFile = (
  data: string | Blob,
  filename: string,
  mimeType: string,
): void => {
  if (!data) {
    console.warn("No data provided to downloadFile");
    return;
  }

  const blob = data instanceof Blob ? data : new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export default downloadFile;
