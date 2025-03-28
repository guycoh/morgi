// components/Calendar.tsx
import React, { useState } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameDay, isSameMonth } from "date-fns";

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // Helpers to calculate dates
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const handlePrevMonth = () => setCurrentMonth(addDays(monthStart, -1));
  const handleNextMonth = () => setCurrentMonth(addDays(monthEnd, 1));

  // Generate calendar grid
  const generateCalendarDays = () => {
    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  const days = generateCalendarDays();

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="text-gray-600 hover:text-gray-800"
        >
          &larr;
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          onClick={handleNextMonth}
          className="text-gray-600 hover:text-gray-800"
        >
          &rarr;
        </button>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-500">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-1 mt-2 text-center">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => onDateChange(day)}
            className={`w-10 h-10 rounded-full ${
              isSameMonth(day, currentMonth)
                ? isSameDay(day, selectedDate)
                  ? "bg-blue-500 text-white"
                  : "text-gray-800 hover:bg-blue-100"
                : "text-gray-400"
            }`}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
