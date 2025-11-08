'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User, mockUsers } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string, role: 'customer' | 'vendor') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete (userWithoutPassword as any).password;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      toast({
        title: 'تم تسجيل الدخول بنجاح',
        description: `مرحباً ${foundUser.firstName}!`,
      });
      setIsLoading(false);
      return true;
    } else {
      toast({
        variant: 'destructive',
        title: 'فشل تسجيل الدخول',
        description: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
      });
      setIsLoading(false);
      return false;
    }
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: 'customer' | 'vendor'
  ): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if user already exists
    if (mockUsers.find(u => u.email === email)) {
      toast({
        variant: 'destructive',
        title: 'فشل التسجيل',
        description: 'البريد الإلكتروني مستخدم بالفعل.',
      });
      setIsLoading(false);
      return false;
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      password,
      firstName,
      lastName,
      role,
    };

    // In a real app, this would be sent to the server
    mockUsers.push(newUser);

    const userWithoutPassword = { ...newUser };
    delete (userWithoutPassword as any).password;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    toast({
      title: 'تم إنشاء الحساب بنجاح',
      description: `مرحباً ${firstName}!`,
    });
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: 'تم تسجيل الخروج',
      description: 'تم تسجيل الخروج بنجاح.',
    });
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

