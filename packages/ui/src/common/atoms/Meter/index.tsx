import { useMemo } from 'react';
import Box from '../Box';
import Typography from '../Typography';
import { combineClassNames } from '@nathanhfoster/utils';
import type { MeterProps } from './types';
import {
  METER_STYLES,
  getMeterThreshold,
  DEFAULT_THRESHOLDS,
  DEFAULT_GET_LABEL,
} from './constants';
import { isFunction } from '@nathanhfoster/utils';

const Meter: React.FC<MeterProps> = ({
  value,
  max = 100,
  min = 0,
  showValue = true,
  thresholds = DEFAULT_THRESHOLDS,
  label = DEFAULT_GET_LABEL,
  className,
  height = 8,
  width = '100%',
  ...props
}) => {
  const percentage = useMemo(
    () => Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100)),
    [value, min, max]
  );
  const threshold = useMemo(
    () => getMeterThreshold(percentage, thresholds),
    [percentage, thresholds]
  );

  const renderLabel = useMemo(() => {
    if (isFunction(label)) {
      return label(percentage, threshold);
    }
    return label ?? value;
  }, [label, value, percentage, threshold]);

  return (
    <Box className={combineClassNames(METER_STYLES.container, className)} {...props}>
      <Box
        className={combineClassNames(METER_STYLES.track)}
        style={{
          height,
          width,
        }}
      >
        <Box
          fullHeight
          rounded="rounded-full"
          className={combineClassNames('transition-all duration-300', threshold.color)}
          style={{ width: `${percentage}%` }}
        />
      </Box>
      {showValue && (
        <Typography variant="label" className={METER_STYLES.value}>
          {renderLabel}
        </Typography>
      )}
    </Box>
  );
};

export default Meter;
