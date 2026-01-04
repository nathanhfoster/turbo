export default function dataURItoBlob(dataURI: string) {
  const parts = dataURI.split(",");
  const byteString = Buffer.from(parts[1] || "", "base64").toString("binary");
  const mimeString = parts[0]?.split(":")[1]?.split(";")[0] || "";

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}
