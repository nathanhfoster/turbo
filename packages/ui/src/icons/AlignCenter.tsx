import BaseSvg from "./BaseSvg";
import type { BaseProps } from "./BaseSvg";

const AlignCenter = ({ className, ...props }: BaseProps = {}) => (
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
      d="M8 6h8M6 10h12M8 14h8M6 18h12"
    />
  </BaseSvg>
);

export default AlignCenter;

