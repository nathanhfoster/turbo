import BaseSvg from "./BaseSvg";
import type { BaseProps } from "./BaseSvg";

const AlignRight = ({ className, ...props }: BaseProps = {}) => (
  <BaseSvg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    className={className}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 6h-8m8 4H6m12 4h-8m8 4H6"
    />
  </BaseSvg>
);

export default AlignRight;

