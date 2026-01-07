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
        // Code block mobile responsiveness
        // Pre blocks: scroll horizontally on mobile, preserve formatting
        "prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:whitespace-pre",
        // Inline code (not in pre): allow wrapping for long strings
        "[&>:not(pre)>code]:break-words [&>:not(pre)>code]:whitespace-pre-wrap",
        "[&_p>code]:break-words [&_p>code]:whitespace-pre-wrap",
        "[&_li>code]:break-words [&_li>code]:whitespace-pre-wrap",
        // Prevent parent container overflow
        "overflow-x-hidden w-full",
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



