"use client";

import { combineClassNames } from "@nathanhfoster/utils";
import Box from "../../atoms/Box";
import Input from "../../atoms/Input";
import InputGroup from "../InputGroup";
import { TAILWIND_SIZES } from "../../../constants";
import type { FormControlProps, FormControlInputProps } from "./types";

const FormControl = ({
	size = "md",
	className,
	children,
	...props
}: FormControlProps) => {
	return (
		<Box className={combineClassNames("flex flex-col gap-2", className)} {...props}>
			{children}
		</Box>
	);
};

const FormControlInputGroup = ({
	size = "md",
	tone = "solid",
	className,
	children,
	...props
}: FormControlProps & { tone?: "transparent" | "solid" }) => {
	return (
		<InputGroup size={size} tone={tone} className={className} {...props}>
			{children}
		</InputGroup>
	);
};

const FormControlInput = ({
	leftIcon,
	rightIcon,
	tone = "solid",
	className,
	...props
}: FormControlInputProps) => {
	const toneClasses =
		tone === "transparent"
			? "bg-transparent border-transparent focus:border-transparent"
			: "";

	return (
		<Box className="relative flex items-center">
			{leftIcon && (
				<Box className="absolute left-3 z-10 pointer-events-none">
					{leftIcon}
				</Box>
			)}
			<Input
				className={combineClassNames(
					leftIcon ? "pl-10" : "",
					rightIcon ? "pr-10" : "",
					toneClasses,
					className,
				)}
				{...props}
			/>
			{rightIcon && (
				<Box className="absolute right-3 z-10 pointer-events-none">
					{rightIcon}
				</Box>
			)}
		</Box>
	);
};

FormControl.InputGroup = FormControlInputGroup;
FormControl.Input = FormControlInput;

export default FormControl;

