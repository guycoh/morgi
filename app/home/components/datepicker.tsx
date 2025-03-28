// components/DatePicker.tsx


interface DatePickerProps {
  value: string; // Selected date in "YYYY-MM-DD" format
  onChange: (date: string) => void; // Function to handle date change
  className?: string; // Additional Tailwind classes
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default DatePicker;
