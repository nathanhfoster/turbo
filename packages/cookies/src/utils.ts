// Simple client-side cookie utilities for lightweight use cases
// For more advanced use cases, use CookieManager class

export const setCookie = (
  key: string,
  value: string,
  maxAge: number = 31536000,
): void => {
  if (typeof document !== "undefined") {
    document.cookie = `${key}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
  }
};

export const deleteCookie = (key: string): void => {
  if (typeof document !== "undefined") {
    document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }
};
