export default function dataURItoBlob(dataURI: string) {
  const parts = dataURI.split(",");
  const base64Data = parts[1] || "";
  const mimeString = parts[0]?.split(":")[1]?.split(";")[0] || "";

  // Use atob() which is available in browsers and Node.js 18+
  // Avoid any reference to Buffer to prevent bundler from including it in client code
  if (typeof atob === "undefined") {
    throw new Error(
      "atob is not available. This function requires a browser environment or Node.js 18+",
    );
  }

  const binaryString = atob(base64Data);

  const ab = new ArrayBuffer(binaryString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < binaryString.length; i++) {
    ia[i] = binaryString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}
