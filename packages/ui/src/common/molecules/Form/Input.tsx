import dynamic from "next/dynamic";
import type { FormInputProps } from "./types";

const Input = dynamic(() => import("../../atoms/Input"));

const FormInput = (props: FormInputProps) => {
  return <Input {...props} />;
};

export default FormInput;
