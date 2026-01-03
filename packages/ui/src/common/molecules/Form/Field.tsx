import React from "react";
import dynamic from "next/dynamic";
import type { FormFieldProps } from "./types";
import { combineClassNames } from "@nathanhfoster/utils";
import { FIELD_STYLES } from "./constants";

const Box = dynamic(() => import("../../atoms/Box"));

const Field = ({ children, className = "", ...props }) => {
  return (
    <Box className={combineClassNames(FIELD_STYLES, className)} {...props}>
      {children}
    </Box>
  );
};

export default Field;
