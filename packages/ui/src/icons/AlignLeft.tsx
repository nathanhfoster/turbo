import BaseSvg from "./BaseSvg";
import type { BaseProps } from "./BaseSvg";

const AlignLeft = ({ className, ...props }: BaseProps = {}) => (
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
      d="M6 6h8m-8 4h12M6 14h8m-8 4h12"
    />
  </BaseSvg>
);

export default AlignLeft;

