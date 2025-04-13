import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import NavBar from '@/components/NavBar';
import { BookOpen, Users, Calendar, Award, CheckCircle, Star, ArrowRight, ChevronRight } from 'lucide-react';

const Index = () => {
  // In a real app, this would come from authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-edu-background">
      <NavBar userRole={isLoggedIn ? 'student' : null} userName="John Doe" />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-edu-primary to-edu-secondary text-white py-20 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/20 blur-3xl"></div>
            <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-white/20 blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-2">
                  #1 Education Management Platform
                </div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
                  Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">Educational</span> Experience
                </h1>
                <p className="text-xl text-white/90 max-w-lg">
                  Seamlessly connect students, teachers, and classes with our powerful cloud-based education management system.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/register">
                    <Button size="lg" className="bg-white text-edu-primary hover:bg-gray-100 font-medium px-8 shadow-lg hover:shadow-xl transition-all duration-300">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 font-medium px-8 transition-all duration-300 bg-white/20 backdrop-blur-sm shadow-lg flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
                      Login
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-1 text-white" />
                    <span>Free Trial</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-1 text-white" />
                    <span>No Credit Card</span>
                  </div>
                </div>
              </div>
              <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-tr from-edu-primary/20 to-transparent rounded-lg"></div>
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                  alt="Students using laptops"
                  className="rounded-lg shadow-2xl object-cover h-[500px] w-full transform hover:scale-[1.02] transition-transform duration-500 ease-in-out"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-xl">
                  <div className="flex items-center space-x-1 text-edu-primary">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <p className="text-sm font-medium text-gray-800 mt-1">Trusted by 10,000+ institutions</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-4">
                <p className="text-4xl font-bold text-edu-primary mb-2">10k+</p>
                <p className="text-gray-600">Active Users</p>
              </div>
              <div className="p-4">
                <p className="text-4xl font-bold text-edu-primary mb-2">500+</p>
                <p className="text-gray-600">Institutions</p>
              </div>
              <div className="p-4">
                <p className="text-4xl font-bold text-edu-primary mb-2">99.9%</p>
                <p className="text-gray-600">Uptime</p>
              </div>
              <div className="p-4">
                <p className="text-4xl font-bold text-edu-primary mb-2">24/7</p>
                <p className="text-gray-600">Support</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-edu-primary/10 rounded-full text-sm font-medium text-edu-primary mb-3">
                Powerful Features
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive tools to streamline your educational institution's management</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="p-4 bg-edu-primary/10 rounded-full w-fit mb-6 text-edu-primary">
                  <BookOpen className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Course Management</h3>
                <p className="text-gray-600 mb-4">Organize your courses, materials, and resources in one place.</p>
                <Link to="/features" className="inline-flex items-center text-edu-primary font-medium hover:underline">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="p-4 bg-edu-primary/10 rounded-full w-fit mb-6 text-edu-primary">
                  <Users className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">User Management</h3>
                <p className="text-gray-600 mb-4">Manage students, teachers, and staff with ease.</p>
                <Link to="/features" className="inline-flex items-center text-edu-primary font-medium hover:underline">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="p-4 bg-edu-primary/10 rounded-full w-fit mb-6 text-edu-primary">
                  <Calendar className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Timetable Generation</h3>
                <p className="text-gray-600 mb-4">Automatically generate conflict-free schedules.</p>
                <Link to="/features" className="inline-flex items-center text-edu-primary font-medium hover:underline">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="p-4 bg-edu-primary/10 rounded-full w-fit mb-6 text-edu-primary">
                  <Award className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Grade Tracking</h3>
                <p className="text-gray-600 mb-4">Track student progress and performance over time.</p>
                <Link to="/features" className="inline-flex items-center text-edu-primary font-medium hover:underline">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-edu-secondary/10 rounded-full text-sm font-medium text-edu-secondary mb-3">
                Testimonials
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Hear from educators who have transformed their institutions with our platform</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-1 text-edu-primary mb-4">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <p className="text-gray-700 mb-6">"This platform has completely transformed how we manage our courses and student information. The interface is intuitive and the support is excellent."</p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-edu-primary/20 flex items-center justify-center text-edu-primary font-bold text-lg mr-4">JD</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Jane Doe</h4>
                    <p className="text-gray-600 text-sm">Principal, Lincoln High School</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-1 text-edu-primary mb-4">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <p className="text-gray-700 mb-6">"The timetable generation feature alone has saved us countless hours of administrative work. I can't imagine going back to our old system."</p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-edu-primary/20 flex items-center justify-center text-edu-primary font-bold text-lg mr-4">MS</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Mark Smith</h4>
                    <p className="text-gray-600 text-sm">Administrator, Westfield College</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-1 text-edu-primary mb-4">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <p className="text-gray-700 mb-6">"As a teacher, I love how easy it is to track student progress and communicate with parents. The mobile app is a game-changer for quick updates."</p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-edu-primary/20 flex items-center justify-center text-edu-primary font-bold text-lg mr-4">AJ</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Alicia Johnson</h4>
                    <p className="text-gray-600 text-sm">Teacher, Oakridge Academy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-gradient-to-r from-edu-primary to-edu-secondary py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to transform your institution?</h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Join thousands of educational institutions already using our platform to streamline their operations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-edu-primary hover:bg-gray-100 font-medium px-8 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                  Create Your Account
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 font-medium px-8 transition-all duration-300 w-full sm:w-auto bg-white/20 backdrop-blur-sm shadow-lg flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"></path><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"></path></svg>
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-6">
                <BookOpen className="h-8 w-8 mr-3 text-edu-primary" />
                <span className="font-bold text-2xl">EduCloud</span>
              </div>
              <p className="text-gray-400 mb-6">
                A comprehensive education management system for schools, colleges, and universities.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-edu-primary transition-colors duration-300">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-edu-primary transition-colors duration-300">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-edu-primary transition-colors duration-300">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0V16h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548V16z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-4 text-gray-400">
                <li><Link to="/" className="hover:text-edu-primary transition-colors duration-300">Home</Link></li>
                <li><Link to="/login" className="hover:text-edu-primary transition-colors duration-300">Login</Link></li>
                <li><Link to="/register" className="hover:text-edu-primary transition-colors duration-300">Register</Link></li>
                <li><Link to="/about" className="hover:text-edu-primary transition-colors duration-300">About</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6">Resources</h3>
              <ul className="space-y-4 text-gray-400">
                <li><Link to="/features" className="hover:text-edu-primary transition-colors duration-300">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-edu-primary transition-colors duration-300">Pricing</Link></li>
                <li><Link to="/blog" className="hover:text-edu-primary transition-colors duration-300">Blog</Link></li>
                <li><Link to="/support" className="hover:text-edu-primary transition-colors duration-300">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6">Contact</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center">
                  <span className="mr-2">📧</span>
                  <span>info@educloud.com</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📱</span>
                  <span>(123) 456-7890</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🏢</span>
                  <span>123 Education St, Suite 400</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} EduCloud. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;