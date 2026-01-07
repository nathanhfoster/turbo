import BaseSvg from "./BaseSvg";
import type { BaseProps } from "./BaseSvg";

const Underline = ({ className, ...props }: BaseProps = {}) => (
  <BaseSvg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    className={className}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeWidth={2}
      d="M6 19h12M8 5v9a4 4 0 0 0 8 0V5M6 5h4m4 0h4"
    />
  </BaseSvg>
);

export default Underline;

