import BaseSvg from "./BaseSvg";
import type { BaseProps } from "./BaseSvg";

const Undo = ({ className, ...props }: BaseProps = {}) => (
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
      strokeWidth={1.5}
      d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"
    />
  </BaseSvg>
);

export default Undo;

