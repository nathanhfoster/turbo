import dynamic from "next/dynamic";
import type { FormButtonProps } from "./types";

const Button = dynamic(() => import("../../atoms/Button"));

const FormButton = ({ children, ...props }: FormButtonProps) => {
  return <Button {...props}>{children}</Button>;
};

export default FormButton;
