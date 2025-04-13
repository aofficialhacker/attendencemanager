
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCwIcon, BookOpenIcon, UsersIcon, ClipboardIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTeacherTimetable } from "@/hooks/useTeacherTimetable";
import { formatDateTime, getDayFromDateTime, daysOfWeek } from "@/utils/dateTimeUtils";
import TimetableHeader from "./student/TimetableHeader";
import TimetableCard from "./student/TimetableCard";
import LoadingSpinner from "./student/LoadingSpinner";
import ErrorAlert from "./student/ErrorAlert";
import EmptyTimetable from "./student/EmptyTimetable";

interface TeacherDashboardProps {
  teacherId: string;
}

const TeacherDashboard = ({ teacherId }: TeacherDashboardProps) => {
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const { timetable, loading, error, fetchTimetable } = useTeacherTimetable(teacherId);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      navigate('/login');
      
    } catch (err) {
      console.error('Error logging out:', err);
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem logging you out.",
      });
    }
  };

  const filteredTimetable = selectedDay === 'all' 
    ? timetable 
    : timetable.filter(cls => getDayFromDateTime(cls.start_time) === selectedDay);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-edu-primary">Teacher Dashboard</h1>
          <p className="text-gray-600">View your class schedule and manage your students</p>
        </div>
        
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            onClick={fetchTimetable}
            disabled={loading}
            className="flex items-center"
          >
            <RefreshCwIcon className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button 
            variant="destructive" 
            onClick={handleLogout}
            className="flex items-center"
          >
            Logout
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="bg-edu-primary/10 rounded-t-lg">
            <CardTitle className="flex items-center text-edu-primary text-lg">
              <BookOpenIcon className="h-5 w-5 mr-2" />
              My Classes
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-600">You have {timetable.length} scheduled classes</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Classes</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="bg-edu-primary/10 rounded-t-lg">
            <CardTitle className="flex items-center text-edu-primary text-lg">
              <UsersIcon className="h-5 w-5 mr-2" />
              Students
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-600">You have 45 active students across all classes</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Manage Students</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="bg-edu-primary/10 rounded-t-lg">
            <CardTitle className="flex items-center text-edu-primary text-lg">
              <ClipboardIcon className="h-5 w-5 mr-2" />
              Gradebook
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-gray-600">Update student grades and assessments</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Open Gradebook</Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card className="mb-6">
        <TimetableHeader 
          selectedDay={selectedDay} 
          setSelectedDay={setSelectedDay} 
          daysOfWeek={daysOfWeek} 
        />
        
        <CardContent>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorAlert error={error} />
          ) : filteredTimetable.length === 0 ? (
            <EmptyTimetable selectedDay={selectedDay} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTimetable.map((classItem) => (
                <TimetableCard
                  key={classItem.class_id}
                  classItem={classItem}
                  formatDateTime={formatDateTime}
                  getDayFromDateTime={getDayFromDateTime}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard;
