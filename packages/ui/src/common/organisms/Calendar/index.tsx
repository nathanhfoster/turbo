"use client";

import { useState, useMemo, useEffect } from "react";
import { combineClassNames } from "@nathanhfoster/utils";
import Box from "../../atoms/Box";
import Button from "../../atoms/Button";
import Dropdown from "../../molecules/Dropdown";
import { IconChevronLeft, IconChevronRight, IconChevronDown } from "../../../icons";
import type { CalendarProps } from "./types";
import { RADIUS_CLASSES, SHADOW_CLASSES, WEEK_DAYS, MONTH_NAMES } from "./constants";
import {
  isDateDisabled,
  isGreenDate,
  isSelected,
  getDaysInMonth,
  generateYearOptions,
  generateMonthOptions,
} from "./utils";

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
    if (isDateDisabled(date, disabledDates, disabledWeekends, minDate, maxDate)) return;
    setSelectedDate(date);
    onChange?.(date);
  };

  const days = getDaysInMonth(currentMonth);

  // Generate year options
  const yearOptions = useMemo(() => {
    return generateYearOptions(yearRange);
  }, [yearRange]);

  // Generate month options
  const monthOptions = useMemo(() => {
    return generateMonthOptions(MONTH_NAMES);
  }, []);

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
  const monthName = MONTH_NAMES[currentMonthIndex];

  return (
    <Box
      className={combineClassNames(
        "bg-white dark:bg-gray-800 p-2 sm:p-4",
        RADIUS_CLASSES[radius],
        SHADOW_CLASSES[shadow],
        bordered && "border border-gray-200 dark:border-gray-700",
        className,
      )}
      {...props}
    >
      {/* Header with navigation and selectors */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2 sm:gap-4 min-w-0 w-full">
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
            <IconChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            onClick={goToNextMonth}
            variant="text"
            size="sm"
            className="p-1 sm:p-2"
            aria-label="Next month"
          >
            <IconChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>

        {/* Month and Year Selectors */}
        <div className="flex items-center gap-2 flex-1 justify-center sm:justify-start min-w-0">
          {showMonthSelector ? (
            <Dropdown>
              <Dropdown.Trigger>
                <Button
                  variant="text"
                  size="sm"
                  className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 min-w-[80px] sm:min-w-[100px] max-w-full truncate"
                >
                  {monthName}
                  <IconChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                {monthOptions.map((month) => (
                  <Dropdown.Item
                    key={month.value}
                    onClick={() => handleMonthChange(month.value)}
                    className={currentMonthIndex === month.value ? "bg-primary/10 dark:bg-primary/20" : ""}
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
                  className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 min-w-[60px] sm:min-w-[70px] max-w-full truncate"
                >
                  {currentYear}
                  <IconChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Content className="max-h-[200px] overflow-y-auto">
                {yearOptions.map((year) => (
                  <Dropdown.Item
                    key={year}
                    onClick={() => handleYearChange(year)}
                    className={currentYear === year ? "bg-primary/10 dark:bg-primary/20" : ""}
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
          (!showYearSelector && !showMonthSelector) ? "flex sm:hidden" : "hidden"
        )}>
          <Button
            onClick={goToPreviousMonth}
            variant="text"
            size="sm"
            className="p-1 sm:p-2"
            aria-label="Previous month"
          >
            <IconChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            onClick={goToNextMonth}
            variant="text"
            size="sm"
            className="p-1 sm:p-2"
            aria-label="Next month"
          >
            <IconChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Week day headers */}
        {WEEK_DAYS.map((day) => (
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
          const disabled = isDateDisabled(date, disabledDates, disabledWeekends, minDate, maxDate);
          const green = isGreenDate(date, greenDates);
          const selected = isSelected(date, selectedDate);
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
                // Selected state takes priority over green state - must be checked first
                selected && !disabled && "bg-primary text-foreground-inverted",
                // Green state only applies when NOT selected
                !selected && green && !disabled && "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
              )}
            >
              <span className={combineClassNames(
                "text-xs sm:text-sm font-medium",
                selected && !disabled && "text-foreground-inverted"
              )}>
                {dayNumber}
              </span>
              {/* Custom day content */}
              {renderDayContent && !disabled && (
                <div className={combineClassNames(
                  "mt-0.5 sm:mt-1 text-[8px] sm:text-[10px]",
                  selected && !disabled && "text-foreground-inverted"
                )}>
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
