import Link from './../../../../atoms/Link';
import { combineClassNames } from '@monkey-tilt/utils';
import type { FooterLinkProps } from './types';

const FooterLink: React.FC<FooterLinkProps> = ({ children, className, ...props }) => {
  return (
    <Link
      color="gray"
      underline
      className={combineClassNames('hover:text-primary transition-colors', className)}
      {...props}
    >
      {children}
    </Link>
  );
};

export default FooterLink;
