
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  PlusIcon, 
  TrashIcon, 
  PencilIcon, 
  UserPlusIcon,
  DownloadIcon,
  UploadIcon,
  SearchIcon
} from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
};

const UserManagementPanel = () => {
  const [selectedTab, setSelectedTab] = useState('students');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Mock user data
  const mockUsers: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'student' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'student' },
    { id: '3', name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'student' },
    { id: '4', name: 'Alice Brown', email: 'alice.brown@example.com', role: 'student' },
    { id: '5', name: 'Professor Smith', email: 'smith@example.com', role: 'teacher' },
    { id: '6', name: 'Dr. Johnson', email: 'johnson@example.com', role: 'teacher' },
    { id: '7', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  ];

  const filteredUsers = mockUsers.filter(user => 
    user.role === selectedTab && 
    (user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddUser = () => {
    toast({
      title: "Add User",
      description: "This would open a modal to add a new user.",
    });
  };

  const handleEditUser = (user: User) => {
    toast({
      title: "Edit User",
      description: `This would open a modal to edit ${user.name}.`,
    });
  };

  const handleDeleteUser = (user: User) => {
    toast({
      variant: "destructive",
      title: "Delete User",
      description: `This would confirm deletion of ${user.name}.`,
    });
  };

  const handleImportUsers = () => {
    toast({
      title: "Import Users",
      description: "This would open a file picker to import users from CSV/Excel.",
    });
  };

  const handleExportUsers = () => {
    toast({
      title: "Export Users",
      description: `Exporting ${filteredUsers.length} ${selectedTab} to CSV.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          View and manage users in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-4">
          <TabsList>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teacher">Teachers</TabsTrigger>
            <TabsTrigger value="admin">Admins</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
          <div className="relative w-full sm:w-64">
            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Button onClick={handleAddUser} size="sm" className="flex items-center">
              <UserPlusIcon className="h-4 w-4 mr-1" />
              Add User
            </Button>
            
            <Button onClick={handleImportUsers} variant="outline" size="sm" className="flex items-center">
              <UploadIcon className="h-4 w-4 mr-1" />
              Import
            </Button>
            
            <Button onClick={handleExportUsers} variant="outline" size="sm" className="flex items-center">
              <DownloadIcon className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="border rounded-md">
          <div className="grid grid-cols-12 bg-muted p-2 border-b font-medium text-sm">
            <div className="col-span-5">Name</div>
            <div className="col-span-5">Email</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          
          <div className="divide-y">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <div key={user.id} className="grid grid-cols-12 p-3 items-center text-sm">
                  <div className="col-span-5">{user.name}</div>
                  <div className="col-span-5 text-gray-700">{user.email}</div>
                  <div className="col-span-2 flex justify-end gap-1">
                    <Button onClick={() => handleEditUser(user)} variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <PencilIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button onClick={() => handleDeleteUser(user)} variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No {selectedTab} found matching your search criteria
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagementPanel;
