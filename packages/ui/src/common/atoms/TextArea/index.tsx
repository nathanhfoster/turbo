import withForwardRef from "./../../hocs/withForwardRef";
import { TAILWIND_SIZES } from "./../../../constants";
import { combineClassNames, isString } from "@nathanhfoster/utils";
import Box from "../Box";
import type { ComponentColor, Size } from "../types";
import Typography from "../Typography";
import { BASE_STYLES, COLOR_STYLES, ERROR_STYLES } from "./constants";
import type { TextAreaProps } from "./types";

const TextArea = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error = false,
  required = false,
  size = "px-4 py-2.5 text-base min-h-[44px]",
  className,
  color,
  fullWidth = true,
  fullHeight = false,
  rows = 4,
  ...props
}: TextAreaProps) => {
  const colorStyles = COLOR_STYLES[error ? "error" : (color as ComponentColor)];
  // Use size directly if provided, otherwise fallback to lookup for backward compatibility
  const sizeKey = (size as Size) || "md";
  const sizeStyles =
    typeof size === "string" && size.includes(" ")
      ? size
      : sizeKey in TAILWIND_SIZES
        ? TAILWIND_SIZES[sizeKey as keyof typeof TAILWIND_SIZES]
        : TAILWIND_SIZES.md;

  return (
    <Box fullWidth className="relative">
      {label && (
        <Typography variant="p" mb="mb-1">
          {label}
          {required ? <span className="text-error"> *</span> : null}
        </Typography>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={combineClassNames(
          BASE_STYLES,
          colorStyles?.border,
          colorStyles?.focus,
          colorStyles?.hover,
          sizeStyles,
          fullWidth && "w-full",
          fullHeight && "h-full",
          className,
        )}
        required={required}
        {...props}
      />
      {isString(error) && (
        <Typography variant="p" color="error" className={ERROR_STYLES}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default withForwardRef(TextArea);
