import React from "react";
import { combineClassNames } from "@nathanhfoster/utils";
import type { RichTextProps } from "./types";
import { RICH_TEXT_SIZES, RICH_TEXT_VARIANTS, parseHtml } from "./constants";
import Box from "../Box";
import withBaseTheme from "../../hocs/withBaseTheme";
import withForwardRef from "../../hocs/withForwardRef";
import withBaseTailwindProps from "../../hocs/withBaseTailwindProps";

const RichText: React.FC<RichTextProps> = ({
  size = "md",
  variant = "default",
  className,
  children,
  ...props
}) => {
  const sizeClass = RICH_TEXT_SIZES[size];
  const variantClass = RICH_TEXT_VARIANTS[variant];

  return (
    <Box
      variant="div"
      className={combineClassNames(
        "prose dark:prose-invert max-w-none text-foreground",
        sizeClass,
        variantClass,
        className,
      )}
      {...(props as React.ComponentProps<typeof Box>)}
    >
      {parseHtml(children)}
    </Box>
  );
};

export default withForwardRef(withBaseTheme(withBaseTailwindProps(RichText)));


