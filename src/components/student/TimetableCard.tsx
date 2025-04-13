
import { ScheduledClass } from '@/lib/supabase';
import { BookOpenIcon, ClockIcon, MapPinIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TimetableDetailView from '@/components/TimetableDetailView';

interface TimetableCardProps {
  classItem: ScheduledClass;
  formatDateTime: (dateTimeStr: string) => string;
  getDayFromDateTime: (dateTimeStr: string) => string;
}

const TimetableCard = ({ classItem, formatDateTime, getDayFromDateTime }: TimetableCardProps) => {
  return (
    // Enhance hover effect: increase shadow, add scale, smooth transition
    <Card className="timetable-cell transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.02] dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{classItem.subject}</CardTitle> {/* Adjusted font weight */}
        <CardDescription>{getDayFromDateTime(classItem.start_time)}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <ClockIcon className="h-4 w-4 mr-2 text-edu-secondary" />
            <span>
              {formatDateTime(classItem.start_time)} - {formatDateTime(classItem.end_time)}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <MapPinIcon className="h-4 w-4 mr-2 text-edu-secondary" />
            <span>Room {classItem.room}</span>
          </div>
          <div className="flex items-center text-sm">
            <BookOpenIcon className="h-4 w-4 mr-2 text-edu-secondary" />
            <span>{classItem.teacherName}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <TimetableDetailView classItem={classItem}>
          <Button variant="outline" className="w-full text-edu-primary border-edu-primary hover:bg-edu-primary hover:text-white">
            View Details
          </Button>
        </TimetableDetailView>
      </CardFooter>
    </Card>
  );
};

export default TimetableCard;
