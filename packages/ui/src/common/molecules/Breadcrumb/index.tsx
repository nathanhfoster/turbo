import Box from "./../../atoms/Box";
import Typography from "./../../atoms/Typography";
import { combineClassNames } from "@nathanhfoster/utils";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import Link from "../../atoms/Link";
import { BreadcrumbProps } from "./types";

const Breadcrumb = ({
  data = [],
  className,
  showChevron = true,
  size = "text-md",
}) => {
  return (
    <Box
      variant="nav"
      display="flex"
      px="px-5"
      py="py-3"
      className={combineClassNames(
        "rounded-lg border border-gray-200 bg-gray-50 text-gray-700",
        className,
      )}
      aria-label="Breadcrumb"
    >
      <Box
        variant="ol"
        display="inline-flex"
        items="items-center"
        className="space-x-1 md:space-x-2 rtl:space-x-reverse"
      >
        {data.map(
          ({ label, href, isActive, icon, className, ...props }, index) => (
            <Typography
              key={index}
              variant="li"
              display="inline-flex"
              items="items-center"
            >
              {index > 0 && showChevron && (
                <ChevronRightIcon className="mx-1 size-3 text-gray-400" />
              )}
              {icon}
              {isActive ? (
                <Typography
                  size={size}
                  className={combineClassNames(
                    "ms-1 font-medium text-gray-500 md:ms-2",
                    className,
                  )}
                  {...props}
                >
                  {label}
                </Typography>
              ) : (
                <Link
                  href={href || "#"}
                  display="inline-flex"
                  items="items-center"
                  size={size}
                  className={combineClassNames(
                    "text-gray-700 hover:text-blue-600",
                    className,
                  )}
                  {...props}
                >
                  {label}
                </Link>
              )}
            </Typography>
          ),
        )}
      </Box>
    </Box>
  );
};

export default Breadcrumb;
