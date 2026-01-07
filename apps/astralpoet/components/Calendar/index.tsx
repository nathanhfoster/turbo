"use client";

import { FC } from "react";
import { Calendar } from "@nathanhfoster/ui";
import { useEntry } from "@/domains/Entry";
import type { CalendarProps } from "./types";

export function CalendarComponent({ onChange }: CalendarProps) {
  const { entries } = useEntry();

  // Get dates that have entries (for green highlighting)
  const entryDates = entries.map((entry) => new Date(entry.date_created));

  // Custom render function for day content - show entry count or indicator
  const renderDayContent = (date: Date) => {
    const entryCount = entries.filter((entry) => {
      const entryDate = new Date(entry.date_created);
      return (
        entryDate.getDate() === date.getDate() &&
        entryDate.getMonth() === date.getMonth() &&
        entryDate.getFullYear() === date.getFullYear()
      );
    }).length;

    if (entryCount > 0) {
      return (
        <span className="text-green-600 dark:text-green-400 font-semibold">
          {entryCount > 1 ? `${entryCount}` : "•"}
        </span>
      );
    }
    return null;
  };

  return (
    <Calendar
      bordered={false}
      disabledDates={[]}
      greenDates={entryDates}
      disabledWeekends={false}
      horizontalBorders={false}
      radius="lg"
      shadow="xl"
      size="xl"
      verticalBorders={false}
      onChange={onChange}
      showYearSelector={true}
      showMonthSelector={true}
      renderDayContent={renderDayContent}
      yearRange={[2020, 2030]} // Adjust based on your needs
    />
  );
}

export default CalendarComponent;
