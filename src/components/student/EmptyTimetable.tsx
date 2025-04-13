
import { CalendarXIcon } from 'lucide-react';

interface EmptyTimetableProps {
  selectedDay: string;
  message?: string;
  submessage?: string;
  icon?: React.ReactNode;
  className?: string;
}

const EmptyTimetable = ({ 
  selectedDay, 
  message, 
  submessage,
  icon,
  className 
}: EmptyTimetableProps) => {
  const defaultMessage = `No classes scheduled for ${selectedDay === 'all' ? 'this week' : selectedDay}`;
  const defaultSubmessage = "Try selecting a different day or check back later";

  return (
    <div className={`text-center py-12 flex flex-col items-center ${className}`}>
      {icon || <CalendarXIcon className="h-16 w-16 text-gray-300 mb-4" />}
      <p className="text-gray-500 font-medium text-lg">{message || defaultMessage}</p>
      <p className="text-gray-400 mt-2">{submessage || defaultSubmessage}</p>
    </div>
  );
};

export default EmptyTimetable;
