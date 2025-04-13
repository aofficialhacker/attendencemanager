import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, Clock, Calendar, MapPin, BookMarked, Award, Star } from 'lucide-react';
import LoadingSpinner from "@/components/student/LoadingSpinner";

// Enhanced mock data for courses
const currentCourses = [
  {
    id: 1,
    code: "MATH101",
    name: "Introduction to Calculus",
    instructor: "Dr. Sarah Johnson",
    schedule: "Mon, Wed 10:00-11:30",
    room: "Science Building 302",
    description: "A foundational course covering limits, derivatives, and integrals with applications to real-world problems.",
    enrollmentCount: 45,
    materials: 12,
    progress: 68,
    imageColor: "from-blue-400 to-indigo-600",
    nextAssignment: "Problem Set 5 due Apr 18",
    upcomingExam: "Midterm Exam on Apr 25"
  },
  {
    id: 2,
    code: "CS205",
    name: "Data Structures & Algorithms",
    instructor: "Prof. Michael Chen",
    schedule: "Tue, Thu 13:00-14:30",
    room: "Engineering Hall 105",
    description: "Advanced programming techniques, algorithm analysis, and implementation of various data structures.",
    enrollmentCount: 38,
    materials: 24,
    progress: 72,
    imageColor: "from-green-400 to-teal-600",
    nextAssignment: "Programming Assignment 3 due Apr 20",
    upcomingExam: "Algorithm Quiz on Apr 22"
  },
  {
    id: 3,
    code: "ENG110",
    name: "Academic Writing",
    instructor: "Dr. Emily Rodriguez",
    schedule: "Wed, Fri 09:00-10:30",
    room: "Humanities Building 210",
    description: "Fundamentals of academic writing, critical thinking, and scholarly research methods.",
    enrollmentCount: 32,
    materials: 15,
    progress: 55,
    imageColor: "from-amber-400 to-orange-600",
    nextAssignment: "Essay Draft due Apr 19",
    upcomingExam: "None"
  },
  {
    id: 4,
    code: "PHY201",
    name: "Principles of Physics",
    instructor: "Dr. James Wilson",
    schedule: "Mon, Thu 14:00-15:30",
    room: "Science Building 150",
    description: "Core concepts in classical mechanics, electromagnetism, and modern physics with laboratory work.",
    enrollmentCount: 50,
    materials: 18,
    progress: 60,
    imageColor: "from-purple-400 to-pink-600",
    nextAssignment: "Lab Report 4 due Apr 21",
    upcomingExam: "Physics Quiz on Apr 23"
  }
];

const pastCourses = [
  {
    id: 101,
    code: "HIST205",
    name: "World History: Modern Era",
    instructor: "Dr. Robert Anderson",
    term: "Fall 2024",
    grade: "A-",
    credits: 3,
    imageColor: "from-slate-400 to-slate-600"
  },
  {
    id: 102,
    code: "BIO110",
    name: "Introduction to Biology",
    instructor: "Prof. Linda Martinez",
    term: "Fall 2024",
    grade: "B+",
    credits: 4,
    imageColor: "from-emerald-400 to-emerald-600"
  },
  {
    id: 103,
    code: "CHEM101",
    name: "General Chemistry",
    instructor: "Dr. Thomas Lee",
    term: "Fall 2024",
    grade: "A",
    credits: 4,
    imageColor: "from-cyan-400 to-cyan-600"
  }
];

const upcomingCourses = [
  {
    id: 201,
    code: "MATH102",
    name: "Advanced Calculus",
    instructor: "Dr. Sarah Johnson",
    schedule: "Mon, Wed 13:00-14:30",
    term: "Fall 2025",
    status: "Registration confirmed",
    prerequisites: "MATH101",
    imageColor: "from-blue-400 to-blue-600"
  },
  {
    id: 202,
    code: "CS305",
    name: "Software Engineering",
    instructor: "Prof. David Williams",
    schedule: "Tue, Thu 10:00-11:30",
    term: "Fall 2025",
    status: "Waitlist position: 3",
    prerequisites: "CS205",
    imageColor: "from-violet-400 to-violet-600"
  }
];

const Courses = () => {
  const [loading, setLoading] = useState(false);
  const [userRole] = useState<'student'>('student');
  const [userName] = useState('John Doe');
  const [activeTab, setActiveTab] = useState<string>('current');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  // Function to format date
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Current date for dashboard
  const currentDate = formatDate(new Date());
  const currentTerm = "Spring 2025";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white">
      <NavBar userRole={userRole} userName={userName} onLogout={handleLogout} />
      
      {/* Page header with additional info */}
      <div className="bg-white p-6 shadow-sm border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h1 className="text-3xl font-extrabold text-edu-primary mb-2 sm:mb-0">
              My Courses
            </h1>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{currentDate} | {currentTerm}</span>
            </div>
          </div>
          
          {/* Quick stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="bg-edu-primary/10 rounded-lg p-4 flex items-center">
              <div className="bg-edu-primary rounded-full p-2 mr-3">
                <BookMarked className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Courses</p>
                <p className="font-semibold text-lg">{currentCourses.length} Courses</p>
              </div>
            </div>
            <div className="bg-green-100 rounded-lg p-4 flex items-center">
              <div className="bg-green-500 rounded-full p-2 mr-3">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="font-semibold text-lg">{pastCourses.length} Courses</p>
              </div>
            </div>
            <div className="bg-amber-100 rounded-lg p-4 flex items-center">
              <div className="bg-amber-500 rounded-full p-2 mr-3">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="font-semibold text-lg">{upcomingCourses.length} Courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <main className="flex-grow p-6 max-w-7xl mx-auto w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-4 flex space-x-6 border-b border-gray-200">
            <TabsTrigger
              value="current"
              className="px-4 py-2 cursor-pointer border-b-2 transition-colors duration-300 focus:outline-none
              data-[state=active]:border-edu-primary data-[state=active]:text-edu-primary hover:text-edu-primary"
            >
              Current Courses
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="px-4 py-2 cursor-pointer border-b-2 transition-colors duration-300 focus:outline-none
              data-[state=active]:border-edu-primary data-[state=active]:text-edu-primary hover:text-edu-primary"
            >
              Past Courses
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="px-4 py-2 cursor-pointer border-b-2 transition-colors duration-300 focus:outline-none
              data-[state=active]:border-edu-primary data-[state=active]:text-edu-primary hover:text-edu-primary"
            >
              Upcoming Courses
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="current">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {currentCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="overflow-hidden rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200"
                  >
                    <div className={`h-3 bg-gradient-to-r ${course.imageColor}`}></div>
                    <CardHeader className="bg-edu-primary/5 rounded-t-lg px-6 py-4">
                      <div className="flex flex-col">
                        <CardTitle className="flex items-center text-edu-primary text-xl font-semibold">
                          <BookOpen className="h-6 w-6 mr-3" />
                          {course.code}: {course.name}
                        </CardTitle>
                        <CardDescription className="mt-1 text-sm text-gray-600">
                          {course.instructor}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="px-6 pt-4">
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:space-x-6">
                          <div className="flex items-start mb-3 sm:mb-0">
                            <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                            <div>
                              <p className="font-medium text-sm">Schedule</p>
                              <p className="text-sm text-gray-600">{course.schedule}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                            <div>
                              <p className="font-medium text-sm">Location</p>
                              <p className="text-sm text-gray-600">{course.room}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="mt-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-gray-700">Course Progress</span>
                            <span className="text-xs font-medium text-gray-700">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-edu-primary rounded-full h-2" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        {/* Upcoming tasks */}
                        <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                          <div className="flex items-start">
                            <div className="bg-amber-100 p-1 rounded">
                              <Clock className="h-4 w-4 text-amber-600" />
                            </div>
                            <div className="ml-2">
                              <p className="text-xs text-gray-500">Next Assignment</p>
                              <p className="text-sm font-medium">{course.nextAssignment}</p>
                            </div>
                          </div>
                          {course.upcomingExam !== "None" && (
                            <div className="flex items-start">
                              <div className="bg-red-100 p-1 rounded">
                                <Calendar className="h-4 w-4 text-red-600" />
                              </div>
                              <div className="ml-2">
                                <p className="text-xs text-gray-500">Upcoming Exam</p>
                                <p className="text-sm font-medium">{course.upcomingExam}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm text-gray-700">{course.description}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center border-t border-gray-200 px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-5 w-5 mr-2" />
                        {course.enrollmentCount} students
                      </div>
                      <Button
                        variant="outline"
                        className="transition-colors duration-300 hover:bg-edu-primary hover:text-white"
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="overflow-hidden rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg border border-gray-200"
                  >
                    <div className={`h-2 bg-gradient-to-r ${course.imageColor}`}></div>
                    <CardHeader className="bg-gray-50 px-6 py-4">
                      <CardTitle className="text-lg font-semibold text-gray-800">
                        {course.code}: {course.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {course.instructor}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-6 py-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Term</p>
                          <p className="font-medium">{course.term}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Credits</p>
                          <p className="font-medium">{course.credits}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Grade</p>
                          <div className="flex items-center">
                            <p className="font-medium">{course.grade}</p>
                            {course.grade.startsWith('A') && <Star className="h-4 w-4 text-yellow-500 ml-1" />}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="px-6 py-3 bg-gray-50 flex justify-center">
                      <Button 
                        variant="ghost" 
                        className="text-sm text-edu-primary hover:bg-edu-primary/10"
                      >
                        View Course Records
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <p>Your past courses will appear here.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upcoming">
            {upcomingCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="overflow-hidden rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg border border-gray-200"
                  >
                    <div className={`h-2 bg-gradient-to-r ${course.imageColor}`}></div>
                    <CardHeader className="bg-gray-50 px-6 py-4">
                      <CardTitle className="text-lg font-semibold text-gray-800">
                        {course.code}: {course.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {course.instructor}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-6 py-4">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                          <div>
                            <p className="font-medium text-sm">Term</p>
                            <p className="text-sm text-gray-600">{course.term}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-gray-500 mr-3" />
                          <div>
                            <p className="font-medium text-sm">Schedule</p>
                            <p className="text-sm text-gray-600">{course.schedule}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-3 ${
                            course.status.includes('confirmed') ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                          }`}>
                            {course.status.includes('confirmed') ? '✓' : '!'}
                          </div>
                          <div>
                            <p className="font-medium text-sm">Status</p>
                            <p className={`text-sm ${
                              course.status.includes('confirmed') ? 'text-green-600' : 'text-amber-600'
                            }`}>{course.status}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="px-6 py-3 bg-gray-50 flex justify-between items-center">
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Prerequisite:</span> {course.prerequisites}
                      </p>
                      <Button 
                        variant="ghost" 
                        className="text-sm text-edu-primary hover:bg-edu-primary/10"
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <p>Your upcoming courses will appear here.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Courses;