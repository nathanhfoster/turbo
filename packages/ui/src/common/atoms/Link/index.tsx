import Typography from "./../Typography";
import withBaseTheme from "./../../hocs/withBaseTheme";
import withForwardRef from "./../../hocs/withForwardRef";
import React from "react";
import { LinkProps } from "./types";

const Link = ({ href, disabled, children, ...props }: LinkProps) => {
  return (
    <Typography
      variant="a"
      href={href}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default withForwardRef(withBaseTheme(Link));
