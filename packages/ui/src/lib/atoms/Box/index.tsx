import { FC } from 'react';
import { combineClassNames } from '../../../utils';
import type { BoxProps } from './types';

const Box: FC<BoxProps> = ({
  variant,
  width,
  height,
  bg,
  className,
  children,
  ...restOfProps
}) => {
  const classes = combineClassNames(
    variant && `variant-${variant}`,
    width,
    height,
    bg && `bg-${bg}`,
    className
  );

  return (
    <div className={classes} {...restOfProps}>
      {children}
    </div>
  );
};

export default Box;

