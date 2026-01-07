import BaseSvg from "./BaseSvg";
import type { BaseProps } from "./BaseSvg";

const Bold = ({ className, ...props }: BaseProps = {}) => (
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
      d="M8 5h4.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0-7H6m2 7h6.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0 0H6"
    />
  </BaseSvg>
);

export default Bold;

