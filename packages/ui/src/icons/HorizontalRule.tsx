import BaseSvg from "./BaseSvg";
import type { BaseProps } from "./BaseSvg";

const HorizontalRule = ({ className, ...props }: BaseProps = {}) => (
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
      d="M5 12h14"
    />
    <path
      strokeLinecap="round"
      d="M6 9.5h12m-12-2h12m-12-2h12m-12 13h12m-12-2h12m-12-2h12"
    />
  </BaseSvg>
);

export default HorizontalRule;

