import BaseSvg from "./BaseSvg";
import type { BaseProps } from "./BaseSvg";

const ListOrdered = ({ className, ...props }: BaseProps = {}) => (
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
      d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4"
    />
  </BaseSvg>
);

export default ListOrdered;
