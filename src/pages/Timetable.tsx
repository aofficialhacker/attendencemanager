import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  RefreshCwIcon, 
  CalendarIcon, 
  BookOpenIcon, 
  ClockIcon,
  MapPinIcon,
  UserIcon
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useTimetable } from "@/hooks/useTimetable";
import { useTeacherTimetable } from "@/hooks/useTeacherTimetable";
import { formatDateTime, getDayFromDateTime, daysOfWeek } from "@/utils/dateTimeUtils";
import TimetableHeader from "@/components/student/TimetableHeader";
import LoadingSpinner from "@/components/student/LoadingSpinner";
import ErrorAlert from "@/components/student/ErrorAlert";
import EmptyTimetable from "@/components/student/EmptyTimetable";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample hardcoded timetable data
const SAMPLE_STUDENT_TIMETABLE = [
  {
    class_id: 'c1001',
    subject: 'Mathematics',
    subject_code: 'MATH101',
    start_time: '2025-04-14T09:00:00',
    end_time: '2025-04-14T10:30:00',
    location: 'Room A102',
    teacher: 'Dr. Jane Smith',
    color: 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300',
    type: 'Lecture',
    materials: ['Calculus Textbook', 'Scientific Calculator'],
    upcoming_assignments: 'Problem Set 7 due Friday'
  },
  {
    class_id: 'c1002',
    subject: 'Computer Science',
    subject_code: 'CS201',
    start_time: '2025-04-14T11:00:00',
    end_time: '2025-04-14T12:30:00',
    location: 'Lab 203',
    teacher: 'Prof. Michael Johnson',
    color: 'bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900/30 dark:border-purple-700 dark:text-purple-300',
    type: 'Lab',
    materials: ['Laptop', 'USB Drive'],
    upcoming_assignments: 'Programming Project due next Monday'
  },
  {
    class_id: 'c1003',
    subject: 'History',
    subject_code: 'HIST105',
    start_time: '2025-04-14T14:00:00',
    end_time: '2025-04-14T15:30:00',
    location: 'Lecture Hall B',
    teacher: 'Dr. Emily Chen',
    color: 'bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-300',
    type: 'Seminar',
    materials: ['History Textbook', 'Notebook'],
    upcoming_assignments: 'Essay outline due Thursday'
  },
  {
    class_id: 'c1004',
    subject: 'Physics',
    subject_code: 'PHYS202',
    start_time: '2025-04-15T09:00:00',
    end_time: '2025-04-15T11:00:00',
    location: 'Physics Lab',
    teacher: 'Prof. Robert Davis',
    color: 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300',
    type: 'Lab',
    materials: ['Lab Manual', 'Safety Goggles'],
    upcoming_assignments: 'Lab Report due in two weeks'
  },
  {
    class_id: 'c1005',
    subject: 'Literature',
    subject_code: 'LIT110',
    start_time: '2025-04-15T13:00:00',
    end_time: '2025-04-15T14:30:00',
    location: 'Room C105',
    teacher: 'Dr. Sarah Wilson',
    color: 'bg-red-100 border-red-300 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-300',
    type: 'Lecture',
    materials: ['Novel: "Great Expectations"', 'Analysis Handout'],
    upcoming_assignments: 'Character analysis due Friday'
  },
  {
    class_id: 'c1006',
    subject: 'Psychology',
    subject_code: 'PSYC101',
    start_time: '2025-04-16T10:00:00',
    end_time: '2025-04-16T11:30:00',
    location: 'Room D301',
    teacher: 'Prof. Alex Thompson',
    color: 'bg-teal-100 border-teal-300 text-teal-800 dark:bg-teal-900/30 dark:border-teal-700 dark:text-teal-300',
    type: 'Discussion',
    materials: ['Psychology Textbook', 'Research Papers'],
    upcoming_assignments: 'Group presentation next Wednesday'
  }
];

const SAMPLE_TEACHER_TIMETABLE = [
  {
    class_id: 't1001',
    subject: 'Advanced Physics',
    subject_code: 'PHYS401',
    start_time: '2025-04-14T09:00:00',
    end_time: '2025-04-14T11:00:00',
    location: 'Physics Lab 3',
    students: 18,
    color: 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300',
    type: 'Lecture',
    notes: 'Bring demonstration equipment',
    upcoming_deadlines: 'Grade midterms by Wednesday'
  },
  {
    class_id: 't1002',
    subject: 'Quantum Mechanics',
    subject_code: 'PHYS405',
    start_time: '2025-04-14T13:00:00',
    end_time: '2025-04-14T15:00:00',
    location: 'Lecture Hall A',
    students: 24,
    color: 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300',
    type: 'Lecture',
    notes: 'Chapter 7-8 presentation',
    upcoming_deadlines: 'Prepare test questions'
  },
  {
    class_id: 't1003',
    subject: 'Physics Lab',
    subject_code: 'PHYS202L',
    start_time: '2025-04-15T10:00:00',
    end_time: '2025-04-15T13:00:00',
    location: 'Physics Lab 1',
    students: 15,
    color: 'bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-300',
    type: 'Lab',
    notes: 'Set up oscilloscope experiment',
    upcoming_deadlines: 'Order new equipment by Thursday'
  },
  {
    class_id: 't1004',
    subject: 'Faculty Meeting',
    subject_code: 'ADMIN',
    start_time: '2025-04-15T15:00:00',
    end_time: '2025-04-15T16:30:00',
    location: 'Conference Room 2',
    students: 0,
    color: 'bg-gray-100 border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300',
    type: 'Meeting',
    notes: 'Bring curriculum proposals',
    upcoming_deadlines: 'Submit department budget request'
  },
  {
    class_id: 't1005',
    subject: 'Office Hours',
    subject_code: 'OFFICE',
    start_time: '2025-04-16T13:00:00',
    end_time: '2025-04-16T15:00:00',
    location: 'Office 425B',
    students: null,
    color: 'bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900/30 dark:border-purple-700 dark:text-purple-300',
    type: 'Office Hours',
    notes: 'Student consultations',
    upcoming_deadlines: 'Research proposal deadline'
  }
];

// Enhanced TimetableCard component
const EnhancedTimetableCard = ({ classItem, userRole }) => {
  return (
    <div 
      className={`rounded-lg border p-4 shadow-md transition-all duration-300 hover:shadow-lg ${classItem.color} animate-fadeIn`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg">{classItem.subject}</h3>
          <p className="text-sm opacity-75">{classItem.subject_code}</p>
        </div>
        <Badge variant="outline" className="font-medium">
          {classItem.type}
        </Badge>
      </div>
      
      <div className="space-y-2 mt-3">
        <div className="flex items-center gap-2 text-sm">
          <ClockIcon className="h-4 w-4 opacity-70" />
          <span>
            {new Date(classItem.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
            {new Date(classItem.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <CalendarIcon className="h-4 w-4 opacity-70" />
          <span>{new Date(classItem.start_time).toLocaleDateString([], {weekday: 'long', month: 'short', day: 'numeric'})}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <MapPinIcon className="h-4 w-4 opacity-70" />
          <span>{classItem.location}</span>
        </div>
        
        {userRole === 'student' ? (
          <div className="flex items-center gap-2 text-sm">
            <UserIcon className="h-4 w-4 opacity-70" />
            <span>{classItem.teacher}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm">
            <UserIcon className="h-4 w-4 opacity-70" />
            <span>{classItem.students !== null ? `${classItem.students} Students` : 'Varies'}</span>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-3 border-t">
        <div className="flex items-center gap-2 text-sm">
          <BookOpenIcon className="h-4 w-4 opacity-70" />
          <span className="font-medium">
            {userRole === 'student' ? classItem.upcoming_assignments : classItem.upcoming_deadlines}
          </span>
        </div>
      </div>
    </div>
  );
};

const Timetable = () => {
  // Maintain the original state variables
  const [userRole, setUserRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [userName] = useState('John Doe');
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [studentId] = useState('s12345');
  const [teacherId] = useState('t12345');
  const [viewMode, setViewMode] = useState('grid');
  
  // Get the hooks from the original code
  const studentTimetable = useTimetable(studentId);
  const teacherTimetable = useTeacherTimetable(teacherId);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Use timetableData based on role like in the original code
  const timetableData = userRole === 'teacher' 
    ? teacherTimetable 
    : studentTimetable;
  
  // For demo purposes, we'll use sample data but maintain the original structure
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Simulate fetching data while maintaining original hook structure
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTimetable(userRole === 'teacher' ? SAMPLE_TEACHER_TIMETABLE : SAMPLE_STUDENT_TIMETABLE);
      setLoading(false);
    }, 800);
  }, [userRole]);
  
  // Update the fetchTimetable function to work with our sample data
  const fetchTimetable = () => {
    setLoading(true);
    setTimeout(() => {
      setTimetable(userRole === 'teacher' ? SAMPLE_TEACHER_TIMETABLE : SAMPLE_STUDENT_TIMETABLE);
      setLoading(false);
      toast({
        title: "Timetable Updated",
        description: "Your timetable has been refreshed successfully.",
      });
    }, 800);
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  const filteredTimetable = selectedDay === 'all' 
    ? timetable 
    : timetable.filter(cls => getDayFromDateTime(cls.start_time) === selectedDay);

  // Group classes by day for timeline view
  const groupedByDay = {};
  filteredTimetable.forEach(cls => {
    const day = new Date(cls.start_time).toLocaleDateString([], {weekday: 'long', month: 'short', day: 'numeric'});
    if (!groupedByDay[day]) {
      groupedByDay[day] = [];
    }
    groupedByDay[day].push(cls);
  });
  
  Object.keys(groupedByDay).forEach(day => {
    groupedByDay[day].sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <NavBar userRole={userRole} userName={userName} onLogout={handleLogout} />
      
      {/* Enhanced Header Section */}
      <div className="bg-white dark:bg-gray-800 p-4 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-edu-primary dark:text-edu-primary-light">
                Your Timetable
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {userRole === 'student' ? 'Spring Semester 2025' : 'Faculty Schedule - Spring 2025'}
              </p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={fetchTimetable}
              disabled={loading}
              className="flex items-center"
            >
              <RefreshCwIcon className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          
          {/* Day selection tabs and view mode switcher */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <TimetableHeader 
              selectedDay={selectedDay} 
              setSelectedDay={setSelectedDay} 
              daysOfWeek={daysOfWeek} 
            />
            
            <Tabs 
              defaultValue="grid" 
              value={viewMode} 
              onValueChange={setViewMode}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid w-full sm:w-auto grid-cols-2">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="timeline">Timeline View</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 max-w-7xl mx-auto w-full">
        {loading ? (
          <LoadingSpinner />
        ) : timetableData.error ? (
          <ErrorAlert error={timetableData.error} />
        ) : filteredTimetable.length === 0 ? (
          <EmptyTimetable selectedDay={selectedDay} />
        ) : viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300 ease-in-out">
            {filteredTimetable.map((classItem) => (
              <EnhancedTimetableCard
                key={classItem.class_id}
                classItem={classItem}
                userRole={userRole}
              />
            ))}
          </div>
        ) : (
          // Timeline View
          <div className="space-y-8">
            {Object.keys(groupedByDay).map(day => (
              <Card key={day} className="shadow-md overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 border-b border-gray-200 dark:border-gray-600">
                  <h3 className="font-semibold text-lg">{day}</h3>
                </div>
                
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600" />
                    
                    {groupedByDay[day].map((classItem) => (
                      <div key={classItem.class_id} className="relative pl-10 pr-4 py-4 border-b last:border-0 border-gray-200 dark:border-gray-700">
                        {/* Timeline dot */}
                        <div className={`absolute left-4 w-4 h-4 rounded-full -translate-x-1/2 top-6 ${classItem.color}`} />
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-grow">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{classItem.subject}</h4>
                              <Badge variant="outline" className="font-medium">
                                {classItem.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{classItem.subject_code}</p>
                            <div className="mt-1 flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <ClockIcon className="h-3 w-3 opacity-70" />
                                {new Date(classItem.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                                {new Date(classItem.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPinIcon className="h-3 w-3 opacity-70" />
                                {classItem.location}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            {userRole === 'student' ? (
                              <div className="flex items-center gap-1">
                                <UserIcon className="h-3 w-3 opacity-70" />
                                {classItem.teacher}
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <UserIcon className="h-3 w-3 opacity-70" />
                                {classItem.students !== null ? `${classItem.students} Students` : 'Varies'}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      {/* Footer with summary */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-inner">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
          <p>You have {filteredTimetable.length} {filteredTimetable.length === 1 ? 'class' : 'classes'} 
            {selectedDay !== 'all' ? ` on ${selectedDay}` : ' in your schedule'}.
          </p>
          {userRole === 'teacher' && (
            <p className="mt-1">
              Total teaching hours this week: {timetable.reduce((total, cls) => {
                const start = new Date(cls.start_time);
                const end = new Date(cls.end_time);
                const hours = (end - start) / (1000 * 60 * 60);
                return total + hours;
              }, 0).toFixed(1)}
            </p>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Timetable;