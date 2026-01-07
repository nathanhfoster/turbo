"use client";

import { useState, useMemo, useEffect } from "react";
import { combineClassNames } from "@nathanhfoster/utils";
import Box from "../../atoms/Box";
import Button from "../../atoms/Button";
import Dropdown from "../../molecules/Dropdown";
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
  showYearSelector = true,
  showMonthSelector = true,
  renderDayContent,
  renderDay,
  yearRange = [1900, 2100],
  value,
  defaultMonth,
  ...props
}: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [currentMonth, setCurrentMonth] = useState(defaultMonth || new Date());

  // Sync selectedDate with value prop
  useEffect(() => {
    if (value !== undefined) {
      setSelectedDate(value);
    }
  }, [value]);

  // Sync currentMonth with defaultMonth prop
  useEffect(() => {
    if (defaultMonth) {
      setCurrentMonth(defaultMonth);
    }
  }, [defaultMonth]);

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
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate year options
  const yearOptions = useMemo(() => {
    const [startYear, endYear] = yearRange;
    const years: number[] = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  }, [yearRange]);

  // Generate month options
  const monthOptions = useMemo(() => {
    return monthNames.map((name, index) => ({
      label: name,
      value: index,
    }));
  }, []);

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
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const handleYearChange = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
  };

  const handleMonthChange = (monthIndex: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
  };

  const currentYear = currentMonth.getFullYear();
  const currentMonthIndex = currentMonth.getMonth();
  const monthName = monthNames[currentMonthIndex];

  return (
    <Box
      className={combineClassNames(
        "bg-white dark:bg-gray-800 p-2 sm:p-4",
        radiusClasses[radius],
        shadowClasses[shadow],
        bordered && "border border-gray-200 dark:border-gray-700",
        className,
      )}
      {...props}
    >
      {/* Header with navigation and selectors */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2 sm:gap-4">
        {/* Previous/Next buttons - hidden on mobile when selectors are shown */}
        <div className={combineClassNames(
          "flex items-center gap-2",
          (showYearSelector || showMonthSelector) && "hidden sm:flex"
        )}>
          <Button
            onClick={goToPreviousMonth}
            variant="text"
            size="sm"
            className="p-1 sm:p-2"
            aria-label="Previous month"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>

        {/* Month and Year Selectors */}
        <div className="flex items-center gap-2 flex-1 justify-center sm:justify-start">
          {showMonthSelector ? (
            <Dropdown>
              <Dropdown.Trigger>
                <Button
                  variant="text"
                  size="sm"
                  className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 min-w-[100px] sm:min-w-[120px]"
                >
                  {monthName}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                {monthOptions.map((month) => (
                  <Dropdown.Item
                    key={month.value}
                    onClick={() => handleMonthChange(month.value)}
                    className={currentMonthIndex === month.value ? "bg-blue-50 dark:bg-blue-900" : ""}
                  >
                    {month.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Content>
            </Dropdown>
          ) : (
            <h3 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
              {monthName}
            </h3>
          )}

          {showYearSelector ? (
            <Dropdown>
              <Dropdown.Trigger>
                <Button
                  variant="text"
                  size="sm"
                  className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 min-w-[70px] sm:min-w-[80px]"
                >
                  {currentYear}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Content className="max-h-[200px] overflow-y-auto">
                {yearOptions.map((year) => (
                  <Dropdown.Item
                    key={year}
                    onClick={() => handleYearChange(year)}
                    className={currentYear === year ? "bg-blue-50 dark:bg-blue-900" : ""}
                  >
                    {year}
                  </Dropdown.Item>
                ))}
              </Dropdown.Content>
            </Dropdown>
          ) : (
            <h3 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
              {currentYear}
            </h3>
          )}
        </div>

        {/* Previous/Next buttons - shown on mobile when selectors are hidden */}
        <div className={combineClassNames(
          "flex items-center gap-2",
          (!showYearSelector && !showMonthSelector) && "flex sm:flex"
        )}>
          <Button
            onClick={goToPreviousMonth}
            variant="text"
            size="sm"
            className="p-1 sm:p-2"
            aria-label="Previous month"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
          <Button
            onClick={goToNextMonth}
            variant="text"
            size="sm"
            className="p-1 sm:p-2"
            aria-label="Next month"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Week day headers */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 py-1 sm:py-2"
          >
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.substring(0, 1)}</span>
          </div>
        ))}
        {/* Day tiles */}
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="p-1 sm:p-2" />;
          }
          const disabled = isDateDisabled(date);
          const green = isGreenDate(date);
          const selected = isSelected(date);
          const dayNumber = date.getDate();

          // Use custom renderDay if provided
          if (renderDay) {
            return (
              <div key={date.toISOString()}>
                {renderDay(date, dayNumber, disabled, selected, green)}
              </div>
            );
          }

          // Default day tile rendering
          return (
            <button
              key={date.toISOString()}
              onClick={() => handleDateClick(date)}
              disabled={disabled}
              className={combineClassNames(
                "relative p-1 sm:p-2 text-center rounded-md transition-colors min-h-[32px] sm:min-h-[44px] flex flex-col items-center justify-center",
                horizontalBorders && "border-t border-gray-200 dark:border-gray-700",
                verticalBorders && "border-l border-gray-200 dark:border-gray-700",
                disabled
                  ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer",
                green && !disabled && "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
                selected && !disabled && "bg-blue-500 dark:bg-blue-600 text-white",
              )}
            >
              <span className={combineClassNames(
                "text-xs sm:text-sm font-medium",
                selected && !disabled && "text-white"
              )}>
                {dayNumber}
              </span>
              {/* Custom day content */}
              {renderDayContent && !disabled && (
                <div className="mt-0.5 sm:mt-1 text-[8px] sm:text-[10px]">
                  {renderDayContent(date)}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </Box>
  );
};

export default Calendar;
