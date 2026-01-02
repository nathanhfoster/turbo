/**
 * Checks if the code is running on the client side
 */
export const isClientSide = (): boolean => {
  return typeof window !== "undefined";
};

/**
 * Checks if a value is a function
 */
export const isFunction = (value: any): value is Function => {
  return typeof value === "function";
};
