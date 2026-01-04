"use client";

import { combineClassNames } from "@nathanhfoster/utils";
import Box from "../Box";
import { BLUR_CLASSES } from "./constants";
import type { OverlayProps } from "./types";

const Overlay = ({
	className,
	onClick,
	blur = "none",
	children,
	...props
}: OverlayProps) => {
	return (
		<Box
			className={combineClassNames(
				"fixed inset-0 bg-black/50 z-40",
				BLUR_CLASSES[blur],
				className,
			)}
			onClick={onClick}
			{...props}
		>
			{children}
		</Box>
	);
};

export default Overlay;

