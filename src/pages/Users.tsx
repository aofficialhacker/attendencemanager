import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  SearchIcon, 
  PlusIcon, 
  UserIcon, 
  GraduationCapIcon, 
  BookOpenIcon, 
  MoreHorizontalIcon,
  FilterIcon,
  EditIcon,
  TrashIcon,
  UserPlusIcon,
  MailIcon,
  ShieldIcon,
  BadgeAlertIcon
} from 'lucide-react';
import LoadingSpinner from "@/components/student/LoadingSpinner";

// Mock data for users with additional information
const mockUsers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    role: "student",
    studentId: "S10045",
    status: "active",
    department: "Computer Science",
    joinDate: "2022-09-01",
    avatar: null,
    lastActive: "Today at 2:30 PM",
    enrolledCourses: 5
  },
  {
    id: 2,
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.johnson@example.com",
    role: "student",
    studentId: "S10046",
    status: "active",
    department: "Mathematics",
    joinDate: "2022-09-01",
    avatar: null,
    lastActive: "Yesterday at 4:15 PM",
    enrolledCourses: 4
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Williams",
    email: "michael.williams@example.com",
    role: "teacher",
    teacherId: "T1024",
    status: "active",
    department: "Physics",
    joinDate: "2020-08-15",
    avatar: null,
    lastActive: "Today at 9:45 AM",
    assignedCourses: 3
  },
  {
    id: 4,
    firstName: "Sarah",
    lastName: "Davis",
    email: "sarah.davis@example.com",
    role: "teacher",
    teacherId: "T1025",
    status: "active",
    department: "Biology",
    joinDate: "2019-01-10",
    avatar: null,
    lastActive: "2 days ago",
    assignedCourses: 2
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@example.com",
    role: "admin",
    adminId: "A102",
    status: "active",
    department: "Administration",
    joinDate: "2018-06-20",
    avatar: null,
    lastActive: "Today at 11:20 AM",
    permissions: "Full access"
  },
  {
    id: 6,
    firstName: "Jessica",
    lastName: "Miller",
    email: "jessica.miller@example.com",
    role: "student",
    studentId: "S10047",
    status: "inactive",
    department: "Chemistry",
    joinDate: "2022-09-01",
    avatar: null,
    lastActive: "1 month ago",
    enrolledCourses: 0
  },
  {
    id: 7,
    firstName: "Robert",
    lastName: "Taylor",
    email: "robert.taylor@example.com",
    role: "teacher",
    teacherId: "T1026",
    status: "on_leave",
    department: "English",
    joinDate: "2021-03-15",
    avatar: null,
    lastActive: "2 weeks ago",
    assignedCourses: 0
  },
  {
    id: 8,
    firstName: "Jennifer",
    lastName: "Anderson",
    email: "jennifer.anderson@example.com",
    role: "admin",
    adminId: "A103",
    status: "active",
    department: "IT Support",
    joinDate: "2019-11-05",
    avatar: null,
    lastActive: "Today at 10:05 AM",
    permissions: "Limited access"
  }
];

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [userRole] = useState<'admin'>('admin');
  const [userName] = useState('Admin User');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };
  
  // Get unique departments for filter
  const departments = Array.from(new Set(mockUsers.map(user => user.department)));
  
  // Filter users based on search term and filters
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.studentId && user.studentId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.teacherId && user.teacherId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.adminId && user.adminId.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter;
    
    // Also filter by active tab
    const matchesTab = activeTab === 'all' || activeTab === `${user.role}s`;
    
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment && matchesTab;
  });

  // Get icon based on user role
  const getUserRoleIcon = (role: string) => {
    switch (role) {
      case 'student':
        return <GraduationCapIcon className="h-4 w-4" />;
      case 'teacher':
        return <BookOpenIcon className="h-4 w-4" />;
      case 'admin':
        return <ShieldIcon className="h-4 w-4" />;
      default:
        return <UserIcon className="h-4 w-4" />;
    }
  };

  // Get avatar fallback (initials)
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };
  
  // Get color for avatar based on role
  const getAvatarColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-800';
      case 'teacher':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Simulate adding a new user
  const handleAddUser = () => {
    setIsAddUserDialogOpen(false);
    toast({
      title: "User added",
      description: "The new user has been successfully added.",
    });
  };
  
  // Simulate user actions
  const handleEditUser = (userId: number) => {
    toast({
      title: "Edit user",
      description: `Opening editor for user ID: ${userId}`,
    });
  };
  
  const handleDeleteUser = (userId: number) => {
    toast({
      title: "Delete user",
      description: `User ID: ${userId} has been deleted.`,
    });
  };
  
  const handleResetPassword = (userId: number) => {
    toast({
      title: "Password reset",
      description: `Password reset email sent to user ID: ${userId}`,
    });
  };

  const handleToggleStatus = (userId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    toast({
      title: "Status updated",
      description: `User ID: ${userId} status changed to ${newStatus}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar userRole={userRole} userName={userName} onLogout={handleLogout} />
      
      <div className="bg-white p-4 shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              User Management
            </h1>
            <p className="text-sm text-gray-500">Manage all system users and their access</p>
          </div>
          
          <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlusIcon className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">First Name</label>
                      <Input placeholder="First name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Last Name</label>
                      <Input placeholder="Last name" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="Email address" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role</label>
                    <Select defaultValue="student">
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Department</label>
                    <Select defaultValue="Computer Science">
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(department => (
                          <SelectItem key={department} value={department}>{department}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddUser}>
                      Add User
                    </Button>
                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <main className="flex-grow p-4 md:p-6 max-w-7xl mx-auto w-full">
        <Card className="shadow-sm border">
          <CardContent className="p-0">
            <div className="border-b p-4 md:p-6">
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="relative flex-grow">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name, email, or ID..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="student">Students</SelectItem>
                      <SelectItem value="teacher">Teachers</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on_leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(department => (
                        <SelectItem key={department} value={department}>{department}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4 md:p-6 pb-0">
              <TabsList>
                <TabsTrigger value="all" className="relative">
                  All Users
                  <Badge className="ml-2 bg-gray-200 text-gray-700 hover:bg-gray-200">{mockUsers.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="students" className="relative">
                  Students
                  <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">{mockUsers.filter(user => user.role === 'student').length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="teachers" className="relative">
                  Teachers
                  <Badge className="ml-2 bg-purple-100 text-purple-800 hover:bg-purple-100">{mockUsers.filter(user => user.role === 'teacher').length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="admins" className="relative">
                  Admins
                  <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-100">{mockUsers.filter(user => user.role === 'admin').length}</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {loading ? (
              <div className="p-6">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="overflow-x-auto p-4 md:p-6 pt-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-4 py-3 text-sm font-medium text-gray-500">User</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-500">Contact</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-500">Role</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-500">Status</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-500">Department</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-500">Last Active</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 group">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <Avatar className={`h-10 w-10 ${getAvatarColor(user.role)} mr-3`}>
                              <AvatarFallback>{getInitials(user.firstName, user.lastName)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                              <div className="text-xs text-gray-500">
                                {user.studentId || user.teacherId || user.adminId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                              ${user.role === 'student' ? ' bg-blue-50 text-blue-700' : 
                               user.role === 'teacher' ? ' bg-purple-50 text-purple-700' : 
                               ' bg-amber-50 text-amber-700'}
                            `}>
                              {getUserRoleIcon(user.role)}
                              <span className="capitalize">{user.role}</span>
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                            user.status === 'active' 
                              ? 'bg-green-50 text-green-700' 
                              : user.status === 'on_leave'
                              ? 'bg-yellow-50 text-yellow-700'
                              : 'bg-red-50 text-red-700'
                          }`}>
                            {user.status === 'on_leave' ? 'On Leave' : user.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{user.department}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{user.lastActive}</td>
                        <td className="px-4 py-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="opacity-70 group-hover:opacity-100">
                                <MoreHorizontalIcon className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleEditUser(user.id)}>
                                <EditIcon className="h-4 w-4 mr-2" />
                                <span>Edit User</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleResetPassword(user.id)}>
                                <MailIcon className="h-4 w-4 mr-2" />
                                <span>Reset Password</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleStatus(user.id, user.status)}>
                                <BadgeAlertIcon className="h-4 w-4 mr-2" />
                                <span>{user.status === 'active' ? 'Deactivate' : 'Activate'} User</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(user.id)}>
                                <TrashIcon className="h-4 w-4 mr-2" />
                                <span>Delete User</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredUsers.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <UserIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-lg font-medium">No users found</p>
                    <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>
            )}
            
            {filteredUsers.length > 0 && (
              <div className="border-t p-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredUsers.length}</span> out of <span className="font-medium">{mockUsers.length}</span> users
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Users;