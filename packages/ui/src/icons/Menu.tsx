import BaseSvg from "./BaseSvg";
import type { BaseProps } from "./BaseSvg";

const Menu = ({ className, ...props }: BaseProps = {}) => (
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
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </BaseSvg>
);

export default Menu;
