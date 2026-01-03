import { combineClassNames } from '@monkey-tilt/utils';
import Box from '../Box';
import {
  BASE_STYLES,
  BORDER_STYLES,
  CARD_VARIANTS,
  HOVER_STYLES,
  PADDING_STYLES,
} from './constants';
import type { CardProps, CardVariant } from './types';

const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = false,
  bordered = true,
  padding = 'md',
  variant = 'default',
  boxVariant,
  ...props
}) => {
  const cardVariant = CARD_VARIANTS[variant as CardVariant];

  return (
    <Box
      variant={boxVariant}
      className={combineClassNames(
        BASE_STYLES,
        bordered && BORDER_STYLES,
        padding && PADDING_STYLES[padding],
        hoverable && HOVER_STYLES,
        cardVariant,
        className
      )}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;
