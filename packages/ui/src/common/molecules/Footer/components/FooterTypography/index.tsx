import Typography from './../../../../atoms/Typography';
import type { FooterTypographyProps } from './types';

const FooterTypography: React.FC<FooterTypographyProps> = ({
  color = 'white',
  variant = 'p',
  children,
  ...props
}) => {
  return (
    <Typography color={color} variant={variant} {...props}>
      {children}
    </Typography>
  );
};

export default FooterTypography;
