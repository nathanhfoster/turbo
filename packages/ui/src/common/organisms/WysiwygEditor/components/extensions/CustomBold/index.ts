import Bold from "@tiptap/extension-bold";

/**
 * Custom Bold extension that works with other marks
 * Allows bold to be combined with other formatting marks without exclusion
 */
export const CustomBold = Bold.extend({
  excludes: "",
});
