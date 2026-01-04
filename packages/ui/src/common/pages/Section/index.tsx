import Box from "./../../atoms/Box";
import { combineClassNames } from "@nathanhfoster/utils";
import type { SectionProps } from "./types";

const Section = ({ className, children, ...props }: SectionProps) => {
  return (
    <Box
      variant="section"
      className={combineClassNames(
        className,
        "mx-auto p-4 sm:p-6 lg:p-8 xl:p-12",
      )}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Section;
