/**
 * Converts a data URI to a Blob object.
 *
 * @param dataURI - The data URI string to be converted. It should be in the format
 *                  `data:[<mime type>][;base64],<data>`.
 * @returns A Blob object representing the binary data of the input data URI.
 *
 * @example
 * ```typescript
 * const dataURI = "data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==";
 * const blob = dataURItoBlob(dataURI);
 * console.log(blob); // Blob { size: 13, type: "text/plain" }
 * ```
 */
const dataURItoBlob = (dataURI: string) => {
  const parts = dataURI.split(",");
  const base64Data = parts[1];
  if (!base64Data) {
    throw new Error("Invalid data URI: missing data component");
  }

  const byteString = Buffer.from(base64Data, "base64").toString("binary");

  const mimeMatch = parts[0]?.split(":")[1]?.split(";")[0];
  const mimeString = mimeMatch || "application/octet-stream";

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
};

export default dataURItoBlob;
