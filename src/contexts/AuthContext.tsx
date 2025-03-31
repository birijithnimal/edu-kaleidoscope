
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

// Define user roles
export type UserRole = "student" | "teacher" | "admin";

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Student",
    email: "student@example.com",
    role: "student",
    avatar: "https://ui-avatars.com/api/?name=John+Student&background=4a6cf7&color=fff"
  },
  {
    id: "2",
    name: "Jane Teacher",
    email: "teacher@example.com",
    role: "teacher",
    avatar: "https://ui-avatars.com/api/?name=Jane+Teacher&background=8b5cf6&color=fff"
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "https://ui-avatars.com/api/?name=Admin+User&background=e779c1&color=fff"
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("lms-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // This is a mock implementation
    try {
      // Simple validation
      if (!email || !password) {
        throw new Error("Please enter both email and password");
      }

      // Find user with matching email and role
      const foundUser = mockUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.role === role
      );

      if (foundUser) {
        // In a real app, you would verify the password here
        setUser(foundUser);
        setIsAuthenticated(true);
        localStorage.setItem("lms-user", JSON.stringify(foundUser));
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${foundUser.name}!`,
          duration: 3000,
        });

        // Redirect based on role
        navigate(`/${role}/dashboard`);
      } else {
        throw new Error("Invalid credentials or user not found");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
        variant: "destructive",
        duration: 3000,
      });
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      // Basic validation
      if (!name || !email || !password) {
        throw new Error("Please fill in all required fields");
      }

      // Check if user already exists
      const existingUser = mockUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      // Create new user (in a real app, this would be an API call)
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        avatar: `https://ui-avatars.com/api/?name=${name.replace(" ", "+")}&background=4a6cf7&color=fff`
      };

      // In a real application, you would save this to a database
      // For our mock, we'll just use it directly
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("lms-user", JSON.stringify(newUser));

      toast({
        title: "Registration Successful",
        description: `Welcome to our learning platform, ${newUser.name}!`,
        duration: 3000,
      });

      // Redirect based on role
      navigate(`/${role}/dashboard`);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
        variant: "destructive",
        duration: 3000,
      });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("lms-user");
    navigate("/login");
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
