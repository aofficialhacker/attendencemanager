
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs components
import { CalendarDaysIcon } from 'lucide-react'; // Use a more relevant icon

interface TimetableHeaderProps {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  daysOfWeek: string[];
}

const TimetableHeader = ({ selectedDay, setSelectedDay, daysOfWeek }: TimetableHeaderProps) => {
  // Filter out 'all' if it exists in daysOfWeek, as we'll have a dedicated "All Days" tab
  const actualDays = daysOfWeek.filter(day => day.toLowerCase() !== 'all');

  return (
    // Add padding and remove default CardHeader spacing if needed
    <CardHeader className="p-4 sm:p-6"> 
      {/* Use Tabs for day selection */}
      <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-7"> 
          {/* Adjust grid columns based on number of days + 'All' */}
          <TabsTrigger value="all">All Days</TabsTrigger>
          {actualDays.map((day) => (
            <TabsTrigger key={day} value={day}>
              {/* Optionally shorten day names for smaller screens if needed */}
              {day} 
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {/* Optional: Keep description or remove if Tabs make it redundant */}
      {/* <CardDescription className="mt-4 text-center sm:text-left">
        Select a day to view your schedule.
      </CardDescription> */}
    </CardHeader>
  );
};

export default TimetableHeader;
