
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MenuIcon, XIcon, LogOut, User, BookOpen, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type NavBarProps = {
  userRole?: 'student' | 'teacher' | 'admin' | null;
  userName?: string;
  onLogout?: () => void;
};

const NavBar = ({ userRole, userName, onLogout }: NavBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const handleLogout = () => {
    // Call the logout function passed as prop
    if (onLogout) {
      onLogout();
    }
    
    // Show a toast notification
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-edu-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">EduCloud</span>
            </Link>
          </div>
          
          {!isMobile ? (
            <div className="flex items-center space-x-4">
              {userRole === 'student' && (
                <>
                  <Link to="/dashboard" className="px-3 py-2 rounded-md hover:bg-edu-primary/80">Dashboard</Link>
                  <Link to="/courses" className="px-3 py-2 rounded-md hover:bg-edu-primary/80">My Courses</Link>
                  <Link to="/timetable" className="px-3 py-2 rounded-md hover:bg-edu-primary/80">Timetable</Link>
                </>
              )}
              
              {userRole === 'teacher' && (
                <>
                  <Link to="/dashboard" className="px-3 py-2 rounded-md hover:bg-edu-primary/80">Dashboard</Link>
                  <Link to="/classes" className="px-3 py-2 rounded-md hover:bg-edu-primary/80">My Classes</Link>
                  <Link to="/timetable" className="px-3 py-2 rounded-md hover:bg-edu-primary/80">Timetable</Link>
                </>
              )}
              
              {userRole === 'admin' && (
                <>
                  <Link to="/dashboard" className="px-3 py-2 rounded-md hover:bg-edu-primary/80">Dashboard</Link>
                  <Link to="/users" className="px-3 py-2 rounded-md hover:bg-edu-primary/80">Users</Link>
                  <Link to="/timetable" className="px-3 py-2 rounded-md hover:bg-edu-primary/80">Timetable</Link>
                </>
              )}
              
              {userRole && (
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{userName || 'User'}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleLogout}
                    className="text-white hover:bg-edu-primary/80"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </div>
              )}
              
              {!userRole && (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="ghost" className="text-white hover:bg-edu-primary/80">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" className="bg-white text-edu-primary hover:bg-gray-100">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center">
              <button onClick={toggleMenu} className="p-2">
                {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="bg-edu-primary/95 pt-2 pb-4 px-2 space-y-1 shadow-lg">
          {userRole === 'student' && (
            <>
              <Link to="/dashboard" className="block px-3 py-2 rounded-md hover:bg-edu-primary/80">Dashboard</Link>
              <Link to="/courses" className="block px-3 py-2 rounded-md hover:bg-edu-primary/80">My Courses</Link>
              <Link to="/timetable" className="block px-3 py-2 rounded-md hover:bg-edu-primary/80">Timetable</Link>
            </>
          )}
          
          {userRole === 'teacher' && (
            <>
              <Link to="/dashboard" className="block px-3 py-2 rounded-md hover:bg-edu-primary/80">Dashboard</Link>
              <Link to="/classes" className="block px-3 py-2 rounded-md hover:bg-edu-primary/80">My Classes</Link>
              <Link to="/timetable" className="block px-3 py-2 rounded-md hover:bg-edu-primary/80">Timetable</Link>
            </>
          )}
          
          {userRole === 'admin' && (
            <>
              <Link to="/dashboard" className="block px-3 py-2 rounded-md hover:bg-edu-primary/80">Dashboard</Link>
              <Link to="/users" className="block px-3 py-2 rounded-md hover:bg-edu-primary/80">Users</Link>
              <Link to="/timetable" className="block px-3 py-2 rounded-md hover:bg-edu-primary/80">Timetable</Link>
            </>
          )}
          
          {userRole ? (
            <div className="border-t border-white/20 pt-2 mt-2">
              <div className="px-3 py-2 flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>{userName || 'User'}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-edu-primary/80 flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <div className="border-t border-white/20 pt-2 mt-2 flex flex-col space-y-2 px-3">
              <Link to="/login">
                <Button variant="ghost" className="w-full text-white hover:bg-edu-primary/80">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="w-full bg-white text-edu-primary hover:bg-gray-100">Register</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
