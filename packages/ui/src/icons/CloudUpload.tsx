import BaseSvg from "./BaseSvg";
import type { BaseProps } from "./BaseSvg";

const CloudUpload = ({ className, ...props }: BaseProps = {}) => (
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
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 16v-6m0 0l-3 3m3-3l3 3"
    />
  </BaseSvg>
);

export default CloudUpload;

