import dynamic from "next/dynamic";
import type { FormCheckboxProps } from "./types";

const Checkbox = dynamic(() => import("../../atoms/Checkbox"));

const FormCheckbox = (props: FormCheckboxProps) => {
  return <Checkbox {...props} />;
};

export default FormCheckbox;
