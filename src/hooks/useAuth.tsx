import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  subscription_active: boolean;
  subscription_expiry?: string;
  collegeName: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, collegeName: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
  startSubscription: (id:string) => Promise<void>;
  isSubscriptionActive: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const savedUser = localStorage.getItem('mathUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('mathUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('mathUser');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const { id, name, subscription_active, subscription_expiry ,collegeName} = response.data;
  
      setUser({
        id,
        name,
        email,
        subscription_active,
        subscription_expiry,
        collegeName
      });
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, collegeName:string) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/register', { name, email, password, collegeName  });
  
      const { id, subscription_active, subscription_expiry,college_name } = response.data;
  
      setUser({
        id,
        name,
        email,
        subscription_active,
        subscription_expiry,
        collegeName
      });
      
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Registration error");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  const startSubscription = async (id:string) => {
    if (!user) return;
    try {
      console.log(id)
      const response = await axios.post('http://localhost:5000/api/check-subscription', { id  });
      const { active, expires_at } = response.data;
      setUser(prevUser => prevUser ? { ...prevUser, subscription_active: active, subscription_expiry: expires_at } : null);
    } catch (error) {
      console.error("Failed to fetch subscription status", error);
    }
  };

  const isSubscriptionActive = () => {
    
    if (!user || !user.subscription_active || !user.subscription_expiry) return false;
    return new Date(user.subscription_expiry) > new Date();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, signOut, isLoading, startSubscription, isSubscriptionActive }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
