import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpenIcon, UsersIcon, CalendarIcon, ClipboardIcon, CheckCircle2, Clock, Award, FileText } from 'lucide-react';
import NavBar from '@/components/NavBar';
import StudentDashboard from '@/components/StudentDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUser } from '@/contexts/UserContext';

// Sample hardcoded data
const studentCourses = [
  { id: 1, name: "Advanced Mathematics", progress: 75, instructor: "Dr. Robert Chen", nextClass: "Tomorrow, 9:00 AM" },
  { id: 2, name: "Introduction to Physics", progress: 60, instructor: "Prof. Sarah Williams", nextClass: "Wednesday, 11:30 AM" },
  { id: 3, name: "World Literature", progress: 85, instructor: "Dr. Emily Parker", nextClass: "Today, 2:00 PM" },
];

const studentAssignments = [
  { id: 1, name: "Mathematics Problem Set", course: "Advanced Mathematics", dueDate: "Apr 15", status: "pending" },
  { id: 2, name: "Physics Lab Report", course: "Introduction to Physics", dueDate: "Apr 18", status: "pending" },
  { id: 3, name: "Essay on Modern Literature", course: "World Literature", dueDate: "Apr 20", status: "pending" },
];

const teacherClasses = [
  { id: 1, name: "Introduction to Physics", students: 32, time: "MWF 11:30 AM", upcoming: "Wednesday, 11:30 AM" },
  { id: 2, name: "Advanced Physics", students: 18, time: "TR 2:00 PM", upcoming: "Thursday, 2:00 PM" },
  { id: 3, name: "Physics Lab", students: 24, time: "F 1:00 PM", upcoming: "Friday, 1:00 PM" },
];

const gradingTasks = [
  { id: 1, assignment: "Wave Mechanics Problem Set", course: "Advanced Physics", submissions: 16, deadline: "Apr 16" },
  { id: 2, assignment: "Lab Report: Pendulum", course: "Physics Lab", submissions: 22, deadline: "Apr 17" },
  { id: 3, assignment: "Forces Quiz", course: "Introduction to Physics", submissions: 30, deadline: "Apr 18" },
];

const studentPerformance = [
  { course: "Introduction to Physics", average: 82, highest: 97, lowest: 65 },
  { course: "Advanced Physics", average: 78, highest: 95, lowest: 62 },
  { course: "Physics Lab", average: 88, highest: 100, lowest: 72 },
];

const Dashboard = () => {
  const { isAuthenticated, userRole, userName, studentId, teacherId } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the dashboard.",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [isAuthenticated, navigate, toast]);
  
  return (
    <div className="min-h-screen flex flex-col bg-edu-background">
      <NavBar userRole={userRole || 'student'} userName={userName || 'User'} />
      
      <div className="bg-white p-6 shadow-md border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-edu-primary">
                {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'Student'} Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {userName || 'User'}! Here's your education portal overview.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button variant="outline" className="text-edu-primary border-edu-primary hover:bg-edu-primary/10">
                <CalendarIcon className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {isAuthenticated && userRole && (
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-edu-primary shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <BookOpenIcon className="h-5 w-5 mr-2 text-edu-primary" />
                    My Courses
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-2xl font-bold">{userRole === 'student' ? '5' : '4'}</p>
                  <p className="text-sm text-gray-500">Active courses</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="text-edu-primary hover:bg-edu-primary/10 px-0">
                    View all courses →
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-l-4 border-l-edu-secondary shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <ClipboardIcon className="h-5 w-5 mr-2 text-edu-secondary" />
                    {userRole === 'student' ? 'Assignments' : 'To Grade'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-2xl font-bold">{userRole === 'student' ? '3' : '15'}</p>
                  <p className="text-sm text-gray-500">Due this week</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="text-edu-secondary hover:bg-edu-secondary/10 px-0">
                    View all {userRole === 'student' ? 'assignments' : 'submissions'} →
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <UsersIcon className="h-5 w-5 mr-2 text-purple-500" />
                    Attendance
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-2xl font-bold">{userRole === 'student' ? '92%' : '88%'}</p>
                  <p className="text-sm text-gray-500">
                    {userRole === 'student' ? 'Current attendance rate' : 'Average class attendance'}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="text-purple-500 hover:bg-purple-500/10 px-0">
                    View attendance details →
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      )}
      
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {userRole === 'student' && studentId && (
            <div className="animate-fadeIn">
              <div className="mb-6">
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle>My Courses Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {studentCourses.map(course => (
                        <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-lg text-edu-primary">{course.name}</h3>
                              <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                            </div>
                            <span className="bg-edu-primary/10 text-edu-primary text-xs font-medium px-2.5 py-0.5 rounded-full">
                              Next: {course.nextClass}
                            </span>
                          </div>
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-edu-primary h-2 rounded-full" 
                                style={{width: `${course.progress}%`}}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="ml-auto">View All Courses</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="mb-6">
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle>Upcoming Assignments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {studentAssignments.map(assignment => (
                        <div key={assignment.id} className="flex items-start p-3 border-l-4 border-l-amber-500 bg-amber-50 rounded">
                          <Clock className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium">{assignment.name}</h4>
                            <p className="text-sm text-gray-600">{assignment.course}</p>
                            <div className="flex items-center mt-1">
                              <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">
                                Due: {assignment.dueDate}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="ml-auto">View All Assignments</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <StudentDashboard studentId={studentId} />
            </div>
          )}
          
          {userRole === 'teacher' && teacherId && (
            <div className="animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <Card className="border shadow-sm h-full">
                    <CardHeader>
                      <CardTitle>My Classes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {teacherClasses.map(cls => (
                          <div key={cls.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <h3 className="font-medium text-lg text-edu-primary">{cls.name}</h3>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <UsersIcon className="h-4 w-4 mr-2 text-gray-400" />
                                <span>{cls.students} Students</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                <span>{cls.time}</span>
                              </div>
                              <div className="flex items-center text-sm font-medium text-edu-primary">
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                <span>Next class: {cls.upcoming}</span>
                              </div>
                            </div>
                            <div className="mt-4 flex space-x-2">
                              <Button variant="outline" size="sm">Take Attendance</Button>
                              <Button variant="secondary" size="sm">Class Details</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="ml-auto">Manage All Classes</Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div>
                  <Card className="border shadow-sm h-full">
                    <CardHeader>
                      <CardTitle>Pending Grading</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {gradingTasks.map(task => (
                          <div key={task.id} className="flex items-start p-3 border-l-4 border-l-red-500 bg-red-50 rounded">
                            <FileText className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium">{task.assignment}</h4>
                              <p className="text-sm text-gray-600">{task.course}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full">
                                  Due: {task.deadline}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {task.submissions} submissions
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="ml-auto">View All Tasks</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
              
              <div className="mb-6">
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle>Student Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {studentPerformance.map((perf, idx) => (
                        <div key={idx} className="border rounded-lg p-4">
                          <h3 className="font-medium text-edu-primary">{perf.course}</h3>
                          <div className="mt-3 grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">{perf.average}%</div>
                              <div className="text-xs text-gray-500">Class Average</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-edu-primary">{perf.highest}%</div>
                              <div className="text-xs text-gray-500">Highest Score</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-amber-600">{perf.lowest}%</div>
                              <div className="text-xs text-gray-500">Lowest Score</div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{width: `${perf.average}%`}}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="ml-auto">View Full Analytics</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="mb-6">
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle>Teaching Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 border-l-2 border-l-edu-primary bg-edu-primary/5 rounded">
                        <CalendarIcon className="h-5 w-5 text-edu-primary mr-3" />
                        <div>
                          <h4 className="font-medium">Introduction to Physics</h4>
                          <p className="text-sm text-gray-600">Wednesday, 11:30 AM - 1:00 PM</p>
                          <p className="text-xs text-gray-500">Room: Science Building 305</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 border-l-2 border-l-edu-primary bg-edu-primary/5 rounded">
                        <CalendarIcon className="h-5 w-5 text-edu-primary mr-3" />
                        <div>
                          <h4 className="font-medium">Quantum Mechanics</h4>
                          <p className="text-sm text-gray-600">Thursday, 10:00 AM - 11:30 AM</p>
                          <p className="text-xs text-gray-500">Room: Science Building 401</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 border-l-2 border-l-amber-500 bg-amber-50 rounded">
                        <Award className="h-5 w-5 text-amber-500 mr-3" />
                        <div>
                          <h4 className="font-medium">Faculty Meeting</h4>
                          <p className="text-sm text-gray-600">Thursday, 3:00 PM - 4:30 PM</p>
                          <p className="text-xs text-gray-500">Room: Admin Building, Conference Room B</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="ml-auto">View Full Calendar</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
          
          {userRole === 'admin' && (
            <div className="animate-fadeIn">
              <div className="mb-6">
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle>Administration Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="border rounded-lg p-4 text-center">
                        <h3 className="text-2xl font-bold text-edu-primary">1,250</h3>
                        <p className="text-sm text-gray-600">Total Students</p>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <h3 className="text-2xl font-bold text-edu-secondary">48</h3>
                        <p className="text-sm text-gray-600">Faculty Members</p>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <h3 className="text-2xl font-bold text-purple-500">120</h3>
                        <p className="text-sm text-gray-600">Active Courses</p>
                      </div>
                      <div className="border rounded-lg p-4 text-center">
                        <h3 className="text-2xl font-bold text-green-500">94%</h3>
                        <p className="text-sm text-gray-600">Attendance Rate</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="ml-auto">View Detailed Reports</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <AdminDashboard />
            </div>
          )}
          
          {!userRole && (
            <div className="p-6 bg-white rounded-lg shadow-sm border text-center">
              <p className="text-lg text-gray-600">Please log in to access your dashboard.</p>
              <Button 
                variant="default" 
                className="mt-4 bg-edu-primary hover:bg-edu-primary/90"
                onClick={() => navigate('/login')}
              >
                Go to Login
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;