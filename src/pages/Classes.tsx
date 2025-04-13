import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useUser } from '@/contexts/UserContext'; // Import useUser hook
import { BookOpen, Users, ClockIcon, CalendarIcon, SearchIcon, AlertTriangle } from 'lucide-react'; // Added AlertTriangle
import LoadingSpinner from "@/components/student/LoadingSpinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Import Alert components

// Mock data for classes
const mockClasses = [
  {
    id: 1,
    code: "MATH101-A",
    name: "Introduction to Calculus",
    schedule: "Mon, Wed 10:00-11:30",
    room: "Science Building 302",
    description: "Section A - A foundational course covering limits, derivatives, and integrals.",
    enrollmentCount: 45,
    assignments: 8,
    nextClass: "Monday, 10:00 AM"
  },
  {
    id: 2,
    code: "MATH101-B",
    name: "Introduction to Calculus",
    schedule: "Tue, Thu 13:00-14:30",
    room: "Engineering Hall 105",
    description: "Section B - A foundational course covering limits, derivatives, and integrals.",
    enrollmentCount: 38,
    assignments: 8,
    nextClass: "Tuesday, 1:00 PM"
  },
  {
    id: 3,
    code: "MATH205",
    name: "Linear Algebra",
    schedule: "Wed, Fri 09:00-10:30",
    room: "Humanities Building 210",
    description: "Fundamentals of matrices, vector spaces, and linear transformations.",
    enrollmentCount: 32,
    assignments: 6,
    nextClass: "Wednesday, 9:00 AM"
  },
  {
    id: 4,
    code: "MATH301",
    name: "Differential Equations",
    schedule: "Mon, Thu 14:00-15:30",
    room: "Science Building 150",
    description: "Advanced course on ordinary and partial differential equations.",
    enrollmentCount: 25,
    assignments: 7,
    nextClass: "Monday, 2:00 PM"
  }
];

const Classes = () => {
  const [loading, setLoading] = useState(false);
  const { userRole, userName, logout } = useUser();
  const [activeTab, setActiveTab] = useState<string>('current');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Add useEffect to check authentication on component mount
  useEffect(() => {
    if (!userRole || userRole !== 'teacher') {
      navigate('/login');
    }
  }, [userRole, navigate]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  const filteredClasses = mockClasses.filter(
    classItem =>
      classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Remove the direct authentication check since we're using useEffect
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Pass destructured user data from context to NavBar */}
      <NavBar userRole={userRole} userName={userName} onLogout={handleLogout} /> 
      
      {/* Enhanced Header Section */}
      <div className="bg-white dark:bg-gray-800 p-4 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-edu-primary dark:text-edu-primary-light"> {/* Increased title size */}
            My Classes
          </h1>
        </div>
      </div>
      
      {/* Adjust padding and width */}
      <main className="flex-grow p-4 sm:p-6 max-w-7xl mx-auto w-full"> 
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4"> {/* Ensure items-center */}
          {/* Use standard shadcn Tabs styling */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto"> 
            <TabsList className="grid grid-cols-3 w-full md:w-auto"> {/* Adjust grid/width */}
              <TabsTrigger value="current">Current</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Search Input */}
          <div className="relative w-full md:max-w-xs"> {/* Control max width */}
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search" // Use type search for potential browser features
              placeholder="Search classes..."
              className="pl-9 w-full" // Ensure full width within container
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Apply consistent styling to TabsContent */}
        <TabsContent value="current" className="mt-6"> 
          {loading ? (
            <LoadingSpinner />
          ) : filteredClasses.length === 0 ? (
             // Add empty state for search results
             <div className="text-center py-16 text-gray-500 dark:text-gray-400 border border-dashed rounded-lg">
               <p className="text-lg font-medium">No Matching Classes</p>
               <p className="text-sm mt-1">No classes found matching "{searchTerm}". Try a different search.</p>
             </div>
          ) : (
            // Apply consistent grid styling
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-all duration-300 ease-in-out"> 
              {filteredClasses.map((classItem) => (
                // Apply consistent card styling
                <Card key={classItem.id} className="overflow-hidden transition-all duration-200 ease-in-out hover:shadow-xl dark:bg-gray-800 dark:border-gray-700"> 
                  {/* Refined Card Header */}
                  <CardHeader className="bg-gray-50 dark:bg-gray-700/50 p-4 border-b dark:border-gray-600"> 
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center text-edu-primary dark:text-edu-primary-light text-base font-semibold"> {/* Adjusted size */}
                          <BookOpen className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{classItem.code}</span>
                        </CardTitle>
                        <CardDescription className="mt-1 text-xs text-gray-500 dark:text-gray-400"> {/* Adjusted size */}
                          {classItem.name}
                        </CardDescription>
                      </div>
                      {/* Example Action Button */}
                      <Button size="sm" variant="outline" className="text-xs">Grade</Button> 
                    </div>
                  </CardHeader>
                  {/* Refined Card Content */}
                  <CardContent className="p-4 space-y-2"> 
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                      <span>{classItem.schedule}</span>
                    </div>
                     <p className="text-xs text-edu-primary dark:text-edu-primary-light pl-6">Next: {classItem.nextClass}</p> {/* Indented Next Class */}
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <ClockIcon className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                      <span>{classItem.room}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t dark:border-gray-600 text-xs text-gray-500 dark:text-gray-400"> {/* Adjusted size/styling */}
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {classItem.enrollmentCount} students
                      </div>
                      <div>
                        {classItem.assignments} assignments
                      </div>
                    </div>
                  </CardContent>
                  {/* Refined Card Footer */}
                  <CardFooter className="flex justify-between items-center border-t dark:border-gray-600 p-3 bg-gray-50 dark:bg-gray-700/50"> 
                    <Button size="sm" variant="ghost" className="text-xs">Roster</Button> {/* Adjusted size/variant */}
                    <Button size="sm" className="text-xs">Manage</Button> {/* Adjusted size */}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Apply consistent empty state styling */}
        <TabsContent value="past" className="mt-6"> 
          <div className="text-center py-16 text-gray-500 dark:text-gray-400 border border-dashed rounded-lg">
            <p className="text-lg font-medium">No Past Classes</p>
            <p className="text-sm mt-1">Classes from previous semesters will be listed here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-6"> 
          <div className="text-center py-16 text-gray-500 dark:text-gray-400 border border-dashed rounded-lg">
             <p className="text-lg font-medium">No Upcoming Classes</p>
             <p className="text-sm mt-1">Future classes you are assigned to teach will appear here.</p>
          </div>
        </TabsContent>
      </main>
    </div>
  );
};

export default Classes;
