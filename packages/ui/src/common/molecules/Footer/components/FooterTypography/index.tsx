import Typography from "./../../../../atoms/Typography";
import type { FooterTypographyProps } from "./types";

const FooterTypography = ({
  color = "white",
  variant = "p",
  children,
  ...props
}: FooterTypographyProps) => {
  return (
    <Typography color={color} variant={variant} {...props}>
      {children}
    </Typography>
  );
};

export default FooterTypography;
