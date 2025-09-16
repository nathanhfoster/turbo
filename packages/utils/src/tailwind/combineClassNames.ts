/**
 * Combines multiple class names into a single string, handling conditional classes
 * and removing duplicates. Useful for combining Tailwind CSS classes.
 *
 * @example
 * combineClassNames(
 *   'text-blue-500',
 *   isActive && 'bg-blue-100',
 *   'text-blue-500', // Duplicate will be removed
 *   className
 * )
 *
 * @param classes - Class names to combine. Can be strings, undefined, null, or false
 * @returns Combined class names as a single string with duplicates removed
 */
const combineClassNames = (
  ...classes: (string | undefined | null | boolean | number)[]
): string => {
  return [
    ...new Set(
      classes
        .filter(Boolean) // Remove falsy values
        .join(' ') // Join with space
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim() // Remove leading/trailing spaces
        .split(' ') // Split into array
    ),
  ].join(' '); // Convert Set back to array and join with spaces
};

export default combineClassNames;
