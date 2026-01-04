import withForwardRef from "./../../hocs/withForwardRef";
import { TAILWIND_SIZES } from "./../../../constants";
import { combineClassNames, isString } from "@nathanhfoster/utils";
import Box from "../Box";
import type { ComponentColor, Size } from "../types";
import Typography from "../Typography";
import ClearButton from "./components/ClearButton";
import InputLabel from "./components/Label";
import { BASE_STYLES, COLOR_STYLES, ERROR_STYLES } from "./constants";
import type { InputProps } from "./types";

const Input = ({
  type = "text",
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
  ...props
}: InputProps) => {
  const colorStyles = COLOR_STYLES[error ? "error" : (color as ComponentColor)];
  // Use size directly if provided, otherwise fallback to lookup for backward compatibility
  const sizeStyles = typeof size === "string" && size.includes(" ") 
    ? size 
    : TAILWIND_SIZES[(size as Size) || "md"];

  return (
    <Box fullWidth className="relative">
      {label && <InputLabel name={name} label={label} required={required} />}
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={combineClassNames(
            BASE_STYLES,
            colorStyles?.border,
            colorStyles?.focus,
            colorStyles?.hover,
            sizeStyles,
            fullWidth && "w-full",
            fullHeight && "h-full",
            className,
            "pr-8",
          )}
          required={required}
          {...props}
        />
        <ClearButton 
          onChange={onChange} 
          size={typeof size === "string" && !size.includes(" ") ? (size as Size) : "md"} 
          value={value} 
        />
      </div>
      {isString(error) && (
        <Typography variant="p" color="error" className={ERROR_STYLES}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default withForwardRef(Input);
