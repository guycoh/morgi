"use client"


import { useState } from "react";
import Link from "next/link";


const SchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const getTomorrowDate = (): string => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const day = String(tomorrow.getDate()).padStart(2, "0");
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const year = tomorrow.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const isSaturday = (date: string): boolean => {
    const [day, month, year] = date.split("/").map(Number);
    const parsedDate = new Date(year, month - 1, day);
    return parsedDate.getDay() === 6; // Saturday
  };

  const getAvailableTimes = (date: string): string[] => {
    if (!date || isSaturday(date)) return [];

    const [day, month, year] = date.split("/").map(Number);
    const parsedDate = new Date(year, month - 1, day);
    const dayOfWeek = parsedDate.getDay();
    const times = [];
    let startHour = 9;
    let endHour = dayOfWeek === 5 ? 12 : 19; // Friday: 12:00, Sunday-Thursday: 19:00

    for (let hour = startHour; hour <= endHour; hour++) {
      times.push(`${hour.toString().padStart(2, "0")}:00`);
      if (hour < endHour) {
        times.push(`${hour.toString().padStart(2, "0")}:30`);
      }
    }

    return times;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = e.target.value.split("-").map(Number);
    setSelectedDate(`${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`);
    setSelectedTime(""); // Reset time when date changes
  };

  return (
    <div className=" min-h-screen flex flex-col items-center  bg-gray-100 p-4" >
      <h1 className="text-2xl font-bold mb-4">בחר תאריך ושעה</h1>
    <form>
      {/* Date Picker */}
      <div className="mb-4 w-full max-w-md">
        <label htmlFor="date" className="block text-lg font-medium mb-2">
          בחר תאריך:
        </label>
        <input
       
          type="date"
          
          name="date"
          min={new Date().toISOString().split("T")[0]}
          onChange={handleDateChange}
          className="p-2 border rounded-md w-full text-right"
        />
      </div>

      {/* Time Picker */}
      {selectedDate && !isSaturday(selectedDate) && (
        <div className="mb-4 w-full max-w-md">
          <label htmlFor="time" className="block text-lg font-medium mb-2">
            בחר שעה:
          </label>
          <select
            id="time"
            name="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="p-2 border rounded-md w-full text-right"
          >
            <option value="" disabled>
              בחר שעה
            </option>
            {getAvailableTimes(selectedDate).map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      )}

      {isSaturday(selectedDate) && (
        <p className="text-red-500">לא ניתן לקבוע פגישה ביום שבת.</p>
      )}

      {/* Selected Date and Time */}
      {selectedDate && selectedTime && (
        <div className="mt-4 p-4 bg-white rounded-md shadow w-full max-w-md text-right">
          <p className="text-lg font-medium">
            תאריך שנבחר: {selectedDate}
          </p>
          <p className="text-lg font-medium">שעה שנבחרה: {selectedTime}</p>
        </div>
      )}
       
       </form>
    </div>
  );
};

export default SchedulePage;
