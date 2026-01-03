import dynamic from "next/dynamic";
import type { FormTextAreaProps } from "./types";

const TextArea = dynamic(() => import("../../atoms/TextArea"));

const FormTextArea = (props: FormTextAreaProps) => {
  return <TextArea {...props} />;
};

export default FormTextArea;
