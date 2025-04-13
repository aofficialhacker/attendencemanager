import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  RefreshCwIcon, 
  UsersIcon, 
  BookOpenIcon, 
  Settings2Icon, 
  CalendarIcon, 
  BarChart2Icon,
  BellIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  TrendingUpIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import TimetableGeneratorPanel from './admin/TimetableGeneratorPanel';
import UserManagementPanel from './admin/UserManagementPanel';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const { toast } = useToast();
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "New Teacher Registration",
      description: "Sarah Johnson has requested an account approval",
      timestamp: "10 minutes ago",
      status: "pending"
    },
    {
      id: 2,
      title: "Timetable Conflict Resolved",
      description: "Room assignment conflict for Math 101 has been resolved",
      timestamp: "1 hour ago",
      status: "success"
    },
    {
      id: 3,
      title: "System Update Available",
      description: "New version 2.3.4 is available for installation",
      timestamp: "5 hours ago",
      status: "info"
    },
    {
      id: 4,
      title: "Storage Warning",
      description: "System storage is at 85% capacity",
      timestamp: "1 day ago",
      status: "warning"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "User Login",
      user: "Thomas Anderson (Teacher)",
      timestamp: "Just now"
    },
    {
      id: 2,
      action: "Course Created",
      user: "Admin",
      timestamp: "30 minutes ago",
      details: "Advanced Physics 301"
    },
    {
      id: 3,
      action: "Timetable Updated",
      user: "Admin",
      timestamp: "2 hours ago"
    },
    {
      id: 4,
      action: "User Registration",
      user: "Emily Parker (Student)",
      timestamp: "Yesterday"
    },
    {
      id: 5,
      action: "System Backup",
      user: "System",
      timestamp: "2 days ago",
      details: "Automatic backup completed"
    }
  ];

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

  // Sample data for the analytics chart
  const analyticsData = [
    { name: 'Mon', students: 85, teachers: 10 },
    { name: 'Tue', students: 90, teachers: 12 },
    { name: 'Wed', students: 92, teachers: 11 },
    { name: 'Thu', students: 88, teachers: 12 },
    { name: 'Fri', students: 78, teachers: 9 },
    { name: 'Sat', students: 30, teachers: 5 },
    { name: 'Sun', students: 25, teachers: 4 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-edu-secondary">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, courses, and system settings</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            size="icon"
            className="relative"
          >
            <BellIcon className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              4
            </span>
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="bg-edu-secondary/10 rounded-t-lg">
                <CardTitle className="flex items-center text-edu-secondary text-lg">
                  <UsersIcon className="h-5 w-5 mr-2" />
                  Users
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-3xl font-bold">105</p>
                    <p className="text-sm text-gray-500">Total Users</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Students: 90</p>
                    <p className="text-sm text-gray-500">Teachers: 12</p>
                    <p className="text-sm text-gray-500">Admins: 3</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">85% of capacity</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab('users')}>
                  Manage Users
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="bg-edu-secondary/10 rounded-t-lg">
                <CardTitle className="flex items-center text-edu-secondary text-lg">
                  <BookOpenIcon className="h-5 w-5 mr-2" />
                  Courses
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-3xl font-bold">24</p>
                    <p className="text-sm text-gray-500">Active Courses</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Classes: 48</p>
                    <p className="text-sm text-gray-500">Avg. Enrollment: 20</p>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Math</span>
                    <span>6 courses</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Science</span>
                    <span>8 courses</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Literature</span>
                    <span>5 courses</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Others</span>
                    <span>5 courses</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Manage Courses
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="bg-edu-secondary/10 rounded-t-lg">
                <CardTitle className="flex items-center text-edu-secondary text-lg">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Timetable
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-3xl font-bold">35</p>
                    <p className="text-sm text-gray-500">Scheduled Classes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Rooms: 12</p>
                    <p className="text-sm text-gray-500">Conflicts: 0</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-xs">Today: 7 classes</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-xs">Tomorrow: 6 classes</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                    <span className="text-xs">This week: 35 classes</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab('timetable')}>
                  Generate Timetable
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="bg-edu-secondary/10 rounded-t-lg">
                <CardTitle className="flex items-center text-edu-secondary text-lg">
                  <BarChart2Icon className="h-5 w-5 mr-2" />
                  System Activity
                </CardTitle>
                <CardDescription>Weekly system usage statistics</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-60 flex items-center justify-center border border-dashed rounded-md">
                  {/* In a real app, we'd implement an actual chart here */}
                  <div className="w-full h-full p-4">
                    <div className="flex h-full">
                      {analyticsData.map((data, index) => (
                        <div key={index} className="flex flex-col justify-end h-full flex-1 space-y-1">
                          <div 
                            className="bg-blue-500 w-full rounded-t" 
                            style={{ height: `${data.students / 2}%` }}
                          ></div>
                          <div 
                            className="bg-green-500 w-full rounded-t" 
                            style={{ height: `${data.teachers * 5}%` }}
                          ></div>
                          <div className="text-xs text-center">{data.name}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-4 space-x-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 mr-1"></div>
                        <span className="text-xs">Students</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 mr-1"></div>
                        <span className="text-xs">Teachers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-edu-secondary/10 rounded-t-lg">
                <CardTitle className="flex items-center text-edu-secondary text-lg">
                  <RefreshCwIcon className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest system events</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                      <div className="bg-edu-secondary/10 p-1 rounded">
                        <TrendingUpIcon className="h-4 w-4 text-edu-secondary" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500">
                          {activity.user} • {activity.timestamp}
                          {activity.details && ` • ${activity.details}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="bg-edu-secondary/10 rounded-t-lg">
              <CardTitle className="flex items-center text-edu-secondary text-lg">
                <Settings2Icon className="h-5 w-5 mr-2" />
                System Settings
              </CardTitle>
              <CardDescription>Configure system-wide settings</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="w-full flex justify-between items-center">
                  <span>School Information</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Updated</span>
                </Button>
                <Button variant="outline" className="w-full flex justify-between items-center">
                  <span>Term Dates</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Current</span>
                </Button>
                <Button variant="outline" className="w-full">Email Templates</Button>
                <Button variant="outline" className="w-full">User Permissions</Button>
                <Button variant="outline" className="w-full">Grading System</Button>
                <Button variant="outline" className="w-full">Attendance Tracking</Button>
                <Button variant="outline" className="w-full">Backup & Restore</Button>
                <Button variant="outline" className="w-full">Advanced Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timetable">
          <TimetableGeneratorPanel />
        </TabsContent>
        
        <TabsContent value="users">
          <UserManagementPanel />
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader className="bg-edu-secondary/10 rounded-t-lg">
              <CardTitle className="flex items-center text-edu-secondary text-lg">
                <BellIcon className="h-5 w-5 mr-2" />
                System Notifications
              </CardTitle>
              <CardDescription>Recent alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <div className="mr-3">
                      {notification.status === 'success' && <CheckCircleIcon className="h-5 w-5 text-green-500" />}
                      {notification.status === 'warning' && <AlertCircleIcon className="h-5 w-5 text-yellow-500" />}
                      {notification.status === 'pending' && <RefreshCwIcon className="h-5 w-5 text-blue-500" />}
                      {notification.status === 'info' && <BellIcon className="h-5 w-5 text-gray-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <Badge variant={
                          notification.status === 'success' ? "outline" : 
                          notification.status === 'warning' ? "destructive" : 
                          notification.status === 'pending' ? "secondary" : "outline"
                        }>
                          {notification.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{notification.description}</p>
                      <p className="text-xs text-gray-400 mt-2">{notification.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Mark All as Read</Button>
              <Button>View All Notifications</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;