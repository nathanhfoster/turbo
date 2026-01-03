import Box from './../../atoms/Box';
import { combineClassNames } from '@monkey-tilt/utils';
import type { SectionProps } from './types';

const Section: React.FC<SectionProps> = ({ className, children, ...props }) => {
  return (
    <Box
      variant="section"
      className={combineClassNames(className, 'mx-auto p-4 md:p-6 lg:p-16')}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Section;
