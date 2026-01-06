import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, handling conditional classes,
 * removing duplicates, and intelligently merging conflicting Tailwind CSS classes.
 * Similar to the `cx` utility from other repos, this uses `tailwind-merge` to resolve
 * conflicts (e.g., `text-red-500` and `text-blue-500` will result in only `text-blue-500`).
 *
 * @example
 * combineClassNames(
 *   'text-blue-500',
 *   isActive && 'bg-blue-100',
 *   'text-blue-500', // Duplicate will be removed
 *   'text-red-500', // This will override text-blue-500
 *   className
 * )
 * // Result: 'bg-blue-100 text-red-500' (if isActive is true)
 *
 * @param classes - Class names to combine. Can be strings, undefined, null, or false
 * @returns Combined class names as a single string with duplicates removed and conflicts resolved
 */
const combineClassNames = (
  ...classes: (string | undefined | null | boolean | number)[]
): string => {
  // Filter out falsy values and convert to strings
  const validClasses = classes
    .filter((cls): cls is string => Boolean(cls))
    .map((cls) => String(cls));

  // Join all classes into a single string
  const combined = validClasses.join(" ");

  // Use tailwind-merge to intelligently merge conflicting Tailwind classes
  return twMerge(combined);
};

export default combineClassNames;
