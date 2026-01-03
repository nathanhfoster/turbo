import dynamic from "next/dynamic";
import type { FormSwitchProps } from "./types";

const Switch = dynamic(() => import("../../atoms/Switch"));

const FormSwitch = (props: FormSwitchProps) => {
  return <Switch {...props} />;
};

export default FormSwitch;
