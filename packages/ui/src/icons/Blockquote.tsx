import BaseSvg from "./BaseSvg";
import type { BaseProps } from "./BaseSvg";

const Blockquote = ({ className, ...props }: BaseProps = {}) => (
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
      d="M10 11V8a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1Zm0 0v2a4 4 0 0 1-4 4H5m14-6V8a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1Zm0 0v2a4 4 0 0 1-4 4h-1"
    />
  </BaseSvg>
);

export default Blockquote;
