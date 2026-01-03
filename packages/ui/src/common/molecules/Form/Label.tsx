import { combineClassNames } from "@nathanhfoster/utils";
import dynamic from "next/dynamic";
import React from "react";
import type { FormLabelProps } from "./types";

const Typography = dynamic(() => import("../../atoms/Typography"));

const Label = ({ mb = "mb-1", className = "", children, ...props }) => {
  return (
    <Typography
      variant="p"
      className={combineClassNames(className)}
      mb={mb}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default Label;
