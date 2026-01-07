import BaseSvg from "./BaseSvg";
import type { BaseProps } from "./BaseSvg";

const Italic = ({ className, ...props }: BaseProps = {}) => (
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
      d="m8.874 19 6.143-14M6 19h6.33m-.66-14H18"
    />
  </BaseSvg>
);

export default Italic;

