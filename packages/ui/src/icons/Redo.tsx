import BaseSvg from "./BaseSvg";
import type { BaseProps } from "./BaseSvg";

const Redo = ({ className, ...props }: BaseProps = {}) => (
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
      d="M21 9H8a5 5 0 0 0 0 10h9m4-10-4-4m4 4-4 4"
    />
  </BaseSvg>
);

export default Redo;

