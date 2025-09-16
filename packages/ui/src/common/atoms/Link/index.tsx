import Typography from './../Typography';
import withBaseTheme from './../../hocs/withBaseTheme';
import withForwardRef from './../../hocs/withForwardRef';
import React from 'react';
import { LinkProps } from './types';

const Link: React.FC<LinkProps> = ({ href, disabled, children, ...props }) => {
  return (
    <Typography variant="a" href={href} disabled={disabled} aria-disabled={disabled} {...props}>
      {children}
    </Typography>
  );
};

export default withForwardRef(withBaseTheme(Link));
