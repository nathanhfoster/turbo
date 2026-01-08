import BaseSvg from "./BaseSvg";
import type { BaseProps } from "./BaseSvg";

const Strikethrough = ({ className, ...props }: BaseProps = {}) => (
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
      d="M7 6.2V5h12v1.2M7 19h6m.2-14-1.677 6.523M9.6 19l1.029-4M5 5l6.523 6.523M19 19l-7.477-7.477"
    />
  </BaseSvg>
);

export default Strikethrough;
