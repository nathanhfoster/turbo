"use client";

import { useState } from "react";
import { combineClassNames } from "@nathanhfoster/utils";
import Box from "../../atoms/Box";
import type { CalendarProps } from "./types";

const Calendar = ({
	bordered = true,
	disabledDates = [],
	greenDates = [],
	disabledWeekends = false,
	horizontalBorders = true,
	minDate,
	maxDate,
	radius = "md",
	shadow = "md",
	size = "md",
	verticalBorders = true,
	onChange,
	className,
	...props
}: CalendarProps) => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [currentMonth, setCurrentMonth] = useState(new Date());

	const handleDateClick = (date: Date) => {
		if (isDateDisabled(date)) return;
		setSelectedDate(date);
		onChange?.(date);
	};

	const isDateDisabled = (date: Date): boolean => {
		if (disabledWeekends && (date.getDay() === 0 || date.getDay() === 6)) {
			return true;
		}
		if (minDate && date < minDate) return true;
		if (maxDate && date > maxDate) return true;
		return disabledDates.some(
			(d) =>
				d.getDate() === date.getDate() &&
				d.getMonth() === date.getMonth() &&
				d.getFullYear() === date.getFullYear(),
		);
	};

	const isGreenDate = (date: Date): boolean => {
		return greenDates.some(
			(d) =>
				d.getDate() === date.getDate() &&
				d.getMonth() === date.getMonth() &&
				d.getFullYear() === date.getFullYear(),
		);
	};

	const isSelected = (date: Date): boolean => {
		if (!selectedDate) return false;
		return (
			date.getDate() === selectedDate.getDate() &&
			date.getMonth() === selectedDate.getMonth() &&
			date.getFullYear() === selectedDate.getFullYear()
		);
	};

	const getDaysInMonth = (date: Date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();

		const days: (Date | null)[] = [];
		for (let i = 0; i < startingDayOfWeek; i++) {
			days.push(null);
		}
		for (let i = 1; i <= daysInMonth; i++) {
			days.push(new Date(year, month, i));
		}
		return days;
	};

	const days = getDaysInMonth(currentMonth);
	const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	const radiusClasses = {
		none: "rounded-none",
		sm: "rounded-sm",
		md: "rounded-md",
		lg: "rounded-lg",
		xl: "rounded-xl",
		full: "rounded-full",
	};

	const shadowClasses = {
		none: "",
		sm: "shadow-sm",
		md: "shadow-md",
		lg: "shadow-lg",
		xl: "shadow-xl",
		"2xl": "shadow-2xl",
	};

	const goToPreviousMonth = () => {
		setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
	};

	const goToNextMonth = () => {
		setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
	};

	const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

	return (
		<Box
			className={combineClassNames(
				"bg-white p-4",
				radiusClasses[radius],
				shadowClasses[shadow],
				bordered && "border border-gray-200",
				className,
			)}
			{...props}
		>
			<div className="flex items-center justify-between mb-4">
				<button
					onClick={goToPreviousMonth}
					className="p-2 rounded-md hover:bg-gray-100 transition-colors"
					aria-label="Previous month"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
				<h3 className="text-lg font-semibold text-gray-900">{monthName}</h3>
				<button
					onClick={goToNextMonth}
					className="p-2 rounded-md hover:bg-gray-100 transition-colors"
					aria-label="Next month"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
			<div className="grid grid-cols-7 gap-1">
				{weekDays.map((day) => (
					<div
						key={day}
						className="text-center text-sm font-semibold text-gray-700 py-2"
					>
						{day}
					</div>
				))}
				{days.map((date, index) => {
					if (!date) {
						return <div key={`empty-${index}`} className="p-2" />;
					}
					const disabled = isDateDisabled(date);
					const green = isGreenDate(date);
					const selected = isSelected(date);

					return (
						<button
							key={date.toISOString()}
							onClick={() => handleDateClick(date)}
							disabled={disabled}
							className={combineClassNames(
								"p-2 text-center rounded-md transition-colors",
								horizontalBorders && "border-t border-gray-200",
								verticalBorders && "border-l border-gray-200",
								disabled
									? "text-gray-300 cursor-not-allowed"
									: "hover:bg-gray-100 cursor-pointer",
								green && !disabled && "bg-green-100 text-green-800",
								selected && !disabled && "bg-blue-500 text-white",
							)}
						>
							{date.getDate()}
						</button>
					);
				})}
			</div>
		</Box>
	);
};

export default Calendar;

