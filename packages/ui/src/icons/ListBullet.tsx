import BaseSvg from "./BaseSvg";
import type { BaseProps } from "./BaseSvg";

const ListBullet = ({ className, ...props }: BaseProps = {}) => (
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
      d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"
    />
  </BaseSvg>
);

export default ListBullet;
