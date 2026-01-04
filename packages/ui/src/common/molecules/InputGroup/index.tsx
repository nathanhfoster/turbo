"use client";

import { combineClassNames } from "@nathanhfoster/utils";
import Box from "../../atoms/Box";
import Button from "../../atoms/Button";
import { TAILWIND_SIZES } from "../../../constants";
import type { InputGroupProps, InputGroupButtonProps } from "./types";

const InputGroup = ({
	size = "md",
	tone = "solid",
	className,
	children,
	...props
}: InputGroupProps) => {
	return (
		<Box
			className={combineClassNames(
				"flex items-center",
				TAILWIND_SIZES[size],
				className,
			)}
			{...props}
		>
			{children}
		</Box>
	);
};

const InputGroupButton = ({
	tone = "solid",
	className,
	children,
	onClick,
	...props
}: InputGroupButtonProps) => {
	const toneClasses =
		tone === "transparent"
			? "bg-transparent border-transparent"
			: "bg-gray-100 border-gray-200";

	return (
		<Button
			variant={tone === "transparent" ? "text" : "outlined"}
			className={combineClassNames(toneClasses, className)}
			onClick={onClick}
			{...props}
		>
			{children}
		</Button>
	);
};

InputGroup.Button = InputGroupButton;

export default InputGroup;

