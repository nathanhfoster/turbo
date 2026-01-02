/**
 * Fixes URL schema by adding https:// if no protocol is present
 */
const fixUrlSchema = (url: string): string => {
  if (!url) return url;

  // Check if URL already has a protocol
  if (/^https?:\/\//.test(url)) {
    return url;
  }

  // Add https:// if no protocol is present
  return `https://${url}`;
};

export default fixUrlSchema;
