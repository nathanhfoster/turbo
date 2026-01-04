import { Children, isValidElement, cloneElement } from "react";
import { combineClassNames } from "@nathanhfoster/utils";
import withBaseTheme from "./../../hocs/withBaseTheme";
import withForwardRef from "./../../hocs/withForwardRef";
import type { ButtonGroupProps } from "./types";
import Box from "./../../atoms/Box";

const ButtonGroup = ({
  display = "flex",
  justify,
  className = "",
  children,
  ...buttonProps
}: ButtonGroupProps) => {
  const childrenArray = Children.toArray(children);

  return (
    <Box display={display} justify={justify} role="group" className={className}>
      {Children.map(childrenArray, (child, index) => {
        if (!isValidElement<{ className?: string }>(child)) return null;

        const isFirst = index === 0;
        const isLast = index === childrenArray.length - 1;

        return cloneElement(child, {
          ...child.props,
          className: combineClassNames(
            child.props.className,
            "rounded-none",
            isFirst && "rounded-s-md",
            !isFirst && !isFirst && "border-l-0",
            isLast && "rounded-e-md",
          ),
          ...buttonProps,
        });
      })}
    </Box>
  );
};

export default withForwardRef(withBaseTheme(ButtonGroup));
export type { ButtonGroupProps } from "./types";
