/**
 * Calendar utility functions
 * Following FSD pattern - domain-level utilities
 */

/**
 * Check if a date is disabled
 */
export function isDateDisabled(
  date: Date,
  disabledDates: Date[],
  disabledWeekends: boolean,
  minDate?: Date,
  maxDate?: Date,
): boolean {
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
}

/**
 * Check if a date is a green/highlighted date
 */
export function isGreenDate(date: Date, greenDates: Date[]): boolean {
  return greenDates.some(
    (d) =>
      d.getDate() === date.getDate() &&
      d.getMonth() === date.getMonth() &&
      d.getFullYear() === date.getFullYear(),
  );
}

/**
 * Check if a date is selected
 */
export function isSelected(date: Date, selectedDate: Date | null): boolean {
  if (!selectedDate) return false;
  return (
    date.getDate() === selectedDate.getDate() &&
    date.getMonth() === selectedDate.getMonth() &&
    date.getFullYear() === selectedDate.getFullYear()
  );
}

/**
 * Get all days in a month as an array, with nulls for empty cells
 */
export function getDaysInMonth(date: Date): (Date | null)[] {
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
}

/**
 * Generate year options for year selector
 */
export function generateYearOptions(yearRange: [number, number]): number[] {
  const [startYear, endYear] = yearRange;
  const years: number[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years;
}

/**
 * Generate month options for month selector
 */
export function generateMonthOptions(monthNames: string[]) {
  return monthNames.map((name, index) => ({
    label: name,
    value: index,
  }));
}
