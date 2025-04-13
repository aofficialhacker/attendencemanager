import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { EyeIcon, EyeOffIcon, BookOpen, Mail, Lock } from 'lucide-react';
import NavBar from '@/components/NavBar';
import { useUser } from '@/contexts/UserContext';
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useUser();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      // Check for hardcoded admin credentials
      if (email === "admin@educloud.com" && password === "admin123") {
        // Use the login function from UserContext with hardcoded admin data
        login(
          email,
          password,
          'admin',
          'System Administrator'
        );
        
        toast({
          title: "Admin Login successful",
          description: "Welcome back, Administrator!",
        });
        
        // Redirect to dashboard
        navigate('/dashboard');
        setIsLoading(false);
        return;
      }
      
      // For demonstration, we'll check if the user exists in localStorage
      // In a real app, this would be handled by your backend API
      
      // Check if user exists and password is correct
      const userKey = `user_${email}`;
      const storedUserData = localStorage.getItem(userKey);
      
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }
      
      if (storedUserData) {
        // User exists, parse the stored data
        const userData = JSON.parse(storedUserData);
        
        // In a real app, you would hash and compare passwords
        // For demo, we'll just check if password exists
        if (password) {
          // Use the login function from UserContext with the stored user data
          login(
            email, 
            password, 
            userData.role as 'student' | 'teacher' | 'admin', 
            userData.name
          );
          
          toast({
            title: "Login successful",
            description: "Welcome back to EduCloud!",
          });
          
          // Redirect to dashboard
          navigate('/dashboard');
        } else {
          throw new Error('Invalid password');
        }
      } else {
        // Check if it's one of the demo users based on email pattern
        // This is for backward compatibility with the previous implementation
        let role = null;
        let name = null;
        
        if (email.includes('teacher')) {
          role = 'teacher';
          name = 'Teacher User';
        } else if (email.includes('admin')) {
          role = 'admin';
          name = 'Admin User';
        } else if (email) {
          role = 'student';
          name = 'Student User';
        }
        
        if (role && name) {
          // Use the login function from UserContext
          login(email, password, role, name);
          
          toast({
            title: "Login successful",
            description: "Welcome back to EduCloud!",
          });
          
          // Redirect to dashboard
          navigate('/dashboard');
        } else {
          throw new Error('User not found. Please register first.');
        }
      }
      
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError('Invalid email or password. Please try again.');
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <NavBar />
      
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardHeader className="space-y-2 pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <BookOpen className="h-10 w-10 text-edu-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-center text-gray-800">Welcome back</CardTitle>
            <CardDescription className="text-center text-gray-600 text-base">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded flex items-start space-x-3">
                <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-gray-50 focus:bg-white transition-colors duration-200"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-edu-primary hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-gray-50 focus:bg-white transition-colors duration-200"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label 
                  htmlFor="remember" 
                  className="text-sm font-normal text-gray-600 cursor-pointer"
                >
                  Remember me for 30 days
                </Label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-11 text-base font-medium bg-edu-primary hover:bg-edu-primary/90 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : "Sign in"}
              </Button>
            </form>
            
            <div className="relative py-3">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">OR</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                type="button" 
                variant="outline"
                className="flex items-center justify-center space-x-2 border-gray-300 hover:bg-gray-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21.73l3.15-3.15C17.45 1.19 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span>Google</span>
              </Button>
              
              <Button 
                type="button" 
                variant="outline"
                className="flex items-center justify-center space-x-2 border-gray-300 hover:bg-gray-50"
              >
                <svg className="h-5 w-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.451 19.878a10.117 10.117 0 01-1.465 2.454c-.773.945-1.413 1.605-1.914 1.979-.766.704-1.587 1.06-2.462 1.079-.633 0-1.391-.18-2.279-.546-.883-.364-1.694-.545-2.422-.545-.773 0-1.602.181-2.493.545-.886.366-1.604.557-2.149.569-.833.036-1.661-.334-2.486-1.107-.536-.41-1.196-1.112-1.985-2.107C1.737 20.906.975 19.284.272 17.274c-.77-2.165-1.158-4.264-1.158-6.297 0-2.328.503-4.326 1.513-5.992 0 0 .393-.75 1.074-1.47.681-.72 1.508-1.28 2.488-1.399.462-.051 1.018.175 1.671.428.653.253 1.236.378 1.747.378.533 0 1.347-.164 2.429-.488 1.082-.324 1.96-.298 2.628.087 1.083.5 1.897 1.28 2.439 2.345a8.421 8.421 0 00-1.434 4.32 7.01 7.01 0 001.112 3.78c.352.501.743.925 1.174 1.273a10.692 10.692 0 011.112 1.06c-.124.365-.322.782-.621 1.25-1.196 1.892-1.732 2.945-1.71 3.076.031.097.093.171.185.222.093.05.208.043.35-.022.98-.39 1.687-1.03 2.127-1.92.127-.248.215-.468.267-.659.394-.578.685-1.174.88-1.788.287-.894.427-1.754.427-2.577 0-.825-.166-1.6-.497-2.324a6.38 6.38 0 00-1.02-1.607l.031-.031c.28.011.544.016.792.016.228 0 .456-.005.686-.016 1.145-.052 2.16-.215 3.044-.5v1.153c0 4.057-1.348 6.935-4.056 8.635z" />
                </svg>
                <span>Apple</span>
              </Button>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center pb-8 pt-2">
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-edu-primary hover:text-edu-primary/80">
                Create one now
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Login;