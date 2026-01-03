import { combineClassNames } from "@nathanhfoster/utils";
import Typography from "./../../../../atoms/Typography";
import type { SortArrowProps } from "./types";

const SortArrow = ({ direction }: SortArrowProps) => {
  return (
    <Typography
      className={combineClassNames(
        "ml-2 inline-block font-bold text-gray-500 transition-transform duration-200",
        direction === "DESC" && "rotate-180",
      )}
    >
      ▲
    </Typography>
  );
};

export default SortArrow;
