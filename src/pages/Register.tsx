
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { EyeIcon, EyeOffIcon, BookOpen, AlertCircleIcon } from 'lucide-react';
import NavBar from '@/components/NavBar';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Please check the form for errors.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call your registration API
      // const response = await axios.post('/api/auth/register', formData);
      
      // Simulate successful registration for demonstration
      // Store user data in localStorage for demo purposes
      // In a real app, this would be handled by your backend
      const userData = {
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        role: formData.role
      };
      
      // Store in localStorage so the login component can find it
      localStorage.setItem(`user_${formData.email}`, JSON.stringify(userData));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      });
      
      // Redirect to login page
      navigate('/login');
      
      setIsLoading(false);
      
    } catch (err) {
      setIsLoading(false);
      
      // Handle duplicate email error
      if ((err as any)?.response?.status === 400 && (err as any)?.response?.data?.message?.includes('email')) {
        setErrors((prev) => ({ ...prev, email: 'This email is already registered' }));
        
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "This email is already registered.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "An error occurred. Please try again later.",
        });
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-edu-background bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00bTAtMTZjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00bTE2IDE2YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNG0wLTE2YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNG0tMzIgMzJjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00bTAtMTZjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00bTE2IDE2YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNG0wLTE2YzAtMi4yIDEuOC00IDQtNHM0IDEuOCA0IDQtMS44IDQtNCA0LTQtMS44LTQtNG0tMTYtMTZjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00bTE2IDBjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00bTE2IDBjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00bS00OCAxNmMwLTIuMiAxLjgtNCA0LTRzNCAxLjggNCA0LTEuOCA0LTQgNC00LTEuOC00LTRtMCAxNmMwLTIuMiAxLjgtNCA0LTRzNCAxLjggNCA0LTEuOCA0LTQgNC00LTEuOC00LTQiLz48L2c+PC9nPjwvc3ZnPg==')] bg-fixed">
      <NavBar />
      
      <main className="flex-grow flex items-center justify-center p-4 py-8 animate-in fade-in duration-500">
        <Card className="w-full max-w-lg border-2 shadow-lg overflow-hidden backdrop-blur-sm bg-white/95">
          <CardHeader className="space-y-2 pb-2">
            <div className="flex justify-center mb-6 transform hover:scale-105 transition-transform duration-300">
              <div className="p-4 rounded-full bg-edu-primary/10">
                <BookOpen className="h-14 w-14 text-edu-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-edu-primary to-blue-600">Create an account</CardTitle>
            <CardDescription className="text-center text-base">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="mb-6">
              <div className="flex justify-between mb-1 text-xs text-gray-500">
                <span>Personal Info</span>
                <span>Account Details</span>
                <span>Confirmation</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1 overflow-hidden">
                <div 
                  className={`bg-edu-primary h-1.5 rounded-full transition-all duration-300 ${!formData.firstName || !formData.lastName ? 'w-[10%]' : !formData.email || !formData.role ? 'w-[40%]' : !formData.password || !formData.confirmPassword ? 'w-[70%]' : 'w-full'}`}
                ></div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 group">
                  <Label htmlFor="firstName" className="text-sm font-medium group-focus-within:text-edu-primary transition-colors duration-200">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`transition-all duration-200 focus:border-edu-primary focus:ring-1 focus:ring-edu-primary ${errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'hover:border-gray-400'}`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm flex items-center mt-1 animate-in slide-in-from-left duration-200">
                      <AlertCircleIcon className="h-4 w-4 mr-1" />
                      {errors.firstName}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2 group">
                  <Label htmlFor="lastName" className="text-sm font-medium group-focus-within:text-edu-primary transition-colors duration-200">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`transition-all duration-200 focus:border-edu-primary focus:ring-1 focus:ring-edu-primary ${errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'hover:border-gray-400'}`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm flex items-center mt-1 animate-in slide-in-from-left duration-200">
                      <AlertCircleIcon className="h-4 w-4 mr-1" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2 group">
                <Label htmlFor="email" className="text-sm font-medium group-focus-within:text-edu-primary transition-colors duration-200">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`transition-all duration-200 focus:border-edu-primary focus:ring-1 focus:ring-edu-primary ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'hover:border-gray-400'}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center mt-1 animate-in slide-in-from-left duration-200">
                    <AlertCircleIcon className="h-4 w-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div className="space-y-2 group">
                <Label htmlFor="role" className="text-sm font-medium group-focus-within:text-edu-primary transition-colors duration-200">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
                >
                  <SelectTrigger className="transition-all duration-200 focus:border-edu-primary focus:ring-1 focus:ring-edu-primary hover:border-gray-400">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student" className="focus:bg-edu-primary/10 focus:text-edu-primary">Student</SelectItem>
                    <SelectItem value="teacher" className="focus:bg-edu-primary/10 focus:text-edu-primary">Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 group">
                <Label htmlFor="password" className="text-sm font-medium group-focus-within:text-edu-primary transition-colors duration-200">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={`transition-all duration-200 focus:border-edu-primary focus:ring-1 focus:ring-edu-primary ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'hover:border-gray-400'}`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-edu-primary transition-colors duration-200"
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
                {errors.password && (
                  <p className="text-red-500 text-sm flex items-center mt-1 animate-in slide-in-from-left duration-200">
                    <AlertCircleIcon className="h-4 w-4 mr-1" />
                    {errors.password}
                  </p>
                )}
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">
                    Password must include:
                  </p>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    <div className="flex items-center">
                      <div className={`h-1.5 w-1.5 rounded-full mr-1.5 ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className={`text-xs ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>8+ characters</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`h-1.5 w-1.5 rounded-full mr-1.5 ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className={`text-xs ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>Uppercase</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`h-1.5 w-1.5 rounded-full mr-1.5 ${/[a-z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className={`text-xs ${/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>Lowercase</span>
                    </div>
                    <div className="flex items-center">
                      <div className={`h-1.5 w-1.5 rounded-full mr-1.5 ${/[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className={`text-xs ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>Number</span>
                    </div>
                    <div className="flex items-center col-span-2">
                      <div className={`h-1.5 w-1.5 rounded-full mr-1.5 ${/[@$!%*?&]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className={`text-xs ${/[@$!%*?&]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>Special character (@$!%*?&)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 group">
                <Label htmlFor="confirmPassword" className="text-sm font-medium group-focus-within:text-edu-primary transition-colors duration-200">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`transition-all duration-200 focus:border-edu-primary focus:ring-1 focus:ring-edu-primary ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'hover:border-gray-400'}`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm flex items-center mt-1 animate-in slide-in-from-left duration-200">
                    <AlertCircleIcon className="h-4 w-4 mr-1" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-edu-primary hover:bg-edu-primary/90 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-md mt-6 h-12 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : "Create account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center py-6">
            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-edu-primary hover:underline font-medium transition-colors duration-200 hover:text-edu-primary/80">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Register;
