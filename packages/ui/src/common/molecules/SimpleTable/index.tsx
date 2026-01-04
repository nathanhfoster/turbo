"use client";

import { combineClassNames } from "@nathanhfoster/utils";
import Box from "../../atoms/Box";
import { RADIUS_CLASSES, SIZE_CLASSES } from "./constants";
import type {
	TableProps,
	TableRowProps,
	TableCellProps,
} from "./types";

const Table = ({
	headerColor = "gray",
	outerBorders = true,
	radius = "md",
	size = "md",
	className,
	children,
	...props
}: TableProps) => {
	return (
		<table
			className={combineClassNames(
				"w-full border-collapse",
				RADIUS_CLASSES[radius],
				SIZE_CLASSES[size],
				outerBorders && "border border-gray-200",
				className,
			)}
			{...props}
		>
			{children}
		</table>
	);
};

const Thead = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => {
	return (
		<thead className={combineClassNames("bg-gray-50", className)} {...props}>
			{children}
		</thead>
	);
};

const Tbody = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => {
	return (
		<tbody className={combineClassNames(className)} {...props}>
			{children}
		</tbody>
	);
};

const Tfoot = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => {
	return (
		<tfoot className={combineClassNames("bg-gray-50", className)} {...props}>
			{children}
		</tfoot>
	);
};

const Tr = ({ className, children, ...props }: TableRowProps) => {
	return (
		<tr
			className={combineClassNames(
				"border-b border-gray-200 hover:bg-gray-50",
				className,
			)}
			{...props}
		>
			{children}
		</tr>
	);
};

const Th = ({
	align = "left",
	className,
	children,
	...props
}: TableCellProps) => {
	const alignClasses = {
		left: "text-left",
		center: "text-center",
		right: "text-right",
	};

	return (
		<th
			className={combineClassNames(
				"px-4 py-3 font-semibold",
				alignClasses[align],
				className,
			)}
			{...props}
		>
			{children}
		</th>
	);
};

const Td = ({
	align = "left",
	className,
	children,
	...props
}: TableCellProps) => {
	const alignClasses = {
		left: "text-left",
		center: "text-center",
		right: "text-right",
	};

	return (
		<td
			className={combineClassNames(
				"px-4 py-3",
				alignClasses[align],
				className,
			)}
			{...props}
		>
			{children}
		</td>
	);
};

Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Tfoot = Tfoot;
Table.Tr = Tr;
Table.Th = Th;
Table.Td = Td;

export default Table;

