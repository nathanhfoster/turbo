import Link from "./../../../../atoms/Link";
import { combineClassNames } from "@nathanhfoster/utils";
import type { FooterLinkProps } from "./types";

const FooterLink = ({
  children,
  className,
  ...props
}) => {
  return (
    <Link
      color="gray"
      underline
      className={combineClassNames(
        "hover:text-primary transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default FooterLink;
