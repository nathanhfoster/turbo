import type { BaseBoxProps } from "./../../atoms/Box/types";
import type { ButtonProps } from "./../../atoms/Button/types";
import type { CheckboxProps } from "./../../atoms/Checkbox/types";
import type { InputProps } from "./../../atoms/Input/types";
import type { SwitchProps } from "./../../atoms/Switch/types";
import type { TextAreaProps } from "./../../atoms/TextArea/types";
import type { BaseTypographyProps } from "./../../atoms/Typography/types";

export interface FormProps
  extends Omit<BaseBoxProps, "onSubmit">,
    Pick<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {}

export interface FormFieldProps extends BaseBoxProps {}

export interface FormLabelProps extends BaseTypographyProps {}

export interface FormInputProps extends InputProps {}

export interface FormTextAreaProps extends TextAreaProps {}

export interface FormButtonProps extends ButtonProps {}

export interface FormCheckboxProps extends CheckboxProps {}

export interface FormSwitchProps extends SwitchProps {}

export interface FormComponent {
  (props: FormProps): React.ReactElement;
  Field: React.ComponentType<FormFieldProps>;
  Label: React.ComponentType<FormLabelProps>;
  Input: React.ComponentType<FormInputProps>;
  TextArea: React.ComponentType<FormTextAreaProps>;
  Checkbox: React.ComponentType<FormCheckboxProps>;
  Switch: React.ComponentType<FormSwitchProps>;
  Button: React.ComponentType<FormButtonProps>;
}
