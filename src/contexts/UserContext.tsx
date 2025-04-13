import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type UserRole = 'student' | 'teacher' | 'admin' | null;

interface UserContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  userName: string | null;
  studentId: string | null;
  teacherId: string | null;
  login: (email: string, password: string, role: UserRole, name: string) => void;
  logout: () => void;
}

const defaultUserContext: UserContextType = {
  isAuthenticated: false,
  userRole: null,
  userName: null,
  studentId: null,
  teacherId: null,
  login: () => {},
  logout: () => {}
};

const UserContext = createContext<UserContextType>(defaultUserContext);

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check for existing session on component mount
  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    const storedUserName = localStorage.getItem('userName');
    const storedStudentId = localStorage.getItem('studentId');
    const storedTeacherId = localStorage.getItem('teacherId');
    
    if (storedUserRole) {
      setIsAuthenticated(true);
      setUserRole(storedUserRole as UserRole);
      setUserName(storedUserName);
      setStudentId(storedStudentId);
      setTeacherId(storedTeacherId);
    }
  }, []);

  const login = (email: string, password: string, role: UserRole, name: string) => {
    // In a real app, this would validate credentials with an API
    // For now, we'll just set the user state
    setIsAuthenticated(true);
    setUserRole(role);
    setUserName(name);
    
    // Set IDs based on role
    if (role === 'student') {
      setStudentId('s12345');
      setTeacherId(null);
    } else if (role === 'teacher') {
      setTeacherId('t12345');
      setStudentId(null);
    } else {
      setStudentId(null);
      setTeacherId(null);
    }
    
    // Store in localStorage for persistence
    localStorage.setItem('userRole', role as string);
    localStorage.setItem('userName', name);
    if (role === 'student') {
      localStorage.setItem('studentId', 's12345');
      localStorage.removeItem('teacherId');
    } else if (role === 'teacher') {
      localStorage.setItem('teacherId', 't12345');
      localStorage.removeItem('studentId');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserName(null);
    setStudentId(null);
    setTeacherId(null);
    
    // Clear localStorage
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('studentId');
    localStorage.removeItem('teacherId');
    
    // Redirect to login page
    navigate('/login');
  };

  const value = {
    isAuthenticated,
    userRole,
    userName,
    studentId,
    teacherId,
    login,
    logout
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};