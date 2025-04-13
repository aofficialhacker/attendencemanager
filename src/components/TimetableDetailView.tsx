
import { useState } from 'react';
import { ScheduledClass } from '@/lib/supabase';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDateTime, getDayFromDateTime } from "@/utils/dateTimeUtils";
import { UserIcon, MapPinIcon, ClockIcon, CalendarIcon, BookOpenIcon } from 'lucide-react';

interface TimetableDetailViewProps {
  classItem: ScheduledClass;
  children: React.ReactNode;
}

const TimetableDetailView = ({ classItem, children }: TimetableDetailViewProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{classItem.subject}</DialogTitle>
          <DialogDescription>
            Class details and information
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 mr-3 text-edu-primary" />
            <div>
              <p className="font-medium">Day</p>
              <p className="text-sm text-gray-500">{getDayFromDateTime(classItem.start_time)}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 mr-3 text-edu-primary" />
            <div>
              <p className="font-medium">Time</p>
              <p className="text-sm text-gray-500">
                {formatDateTime(classItem.start_time)} - {formatDateTime(classItem.end_time)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <MapPinIcon className="h-5 w-5 mr-3 text-edu-primary" />
            <div>
              <p className="font-medium">Location</p>
              <p className="text-sm text-gray-500">Room {classItem.room}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <UserIcon className="h-5 w-5 mr-3 text-edu-primary" />
            <div>
              <p className="font-medium">Teacher</p>
              <p className="text-sm text-gray-500">{classItem.teacherName}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <BookOpenIcon className="h-5 w-5 mr-3 text-edu-primary" />
            <div>
              <p className="font-medium">Class ID</p>
              <p className="text-sm text-gray-500">{classItem.class_id}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TimetableDetailView;
