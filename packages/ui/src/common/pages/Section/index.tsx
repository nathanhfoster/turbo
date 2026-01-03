import Box from "./../../atoms/Box";
import { combineClassNames } from "@nathanhfoster/utils";
import type { SectionProps } from "./types";

const Section = ({ className, children, ...props }: SectionProps) => {
  return (
    <Box
      variant="section"
      className={combineClassNames(className, "mx-auto p-4 md:p-6 lg:p-16")}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Section;
