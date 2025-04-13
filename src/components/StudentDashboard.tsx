
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RefreshCwIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTimetable } from "@/hooks/useTimetable";
import { formatDateTime, getDayFromDateTime, daysOfWeek } from "@/utils/dateTimeUtils";
import TimetableHeader from "./student/TimetableHeader";
import TimetableCard from "./student/TimetableCard";
import LoadingSpinner from "./student/LoadingSpinner";
import ErrorAlert from "./student/ErrorAlert";
import EmptyTimetable from "./student/EmptyTimetable";

interface StudentDashboardProps {
  studentId: string;
}

const StudentDashboard = ({ studentId }: StudentDashboardProps) => {
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const { timetable, loading, error, fetchTimetable } = useTimetable(studentId);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // In a real implementation, this would call your API
      // await axios.post('/api/auth/logout');
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      // Redirect to login page
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
          <h1 className="text-3xl font-bold text-edu-primary">Your Timetable</h1>
          
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

export default StudentDashboard;
