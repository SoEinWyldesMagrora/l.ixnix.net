import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserCredential } from '../types/user';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string, username: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const symbols = ['★', '♠', '♣', '♥', '♦', '♪', '♫', '☀', '☁', '☂', '☃', '☄', '☎', '☮', '☯', '☸', '☹', '☺', '♈', '♉'];

const getRandomSymbol = () => {
  return symbols[Math.floor(Math.random() * symbols.length)];
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email: string, password: string): Promise<UserCredential> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: '123',
          email,
          username: email.split('@')[0],
          displayName: email.split('@')[0],
          profileSymbol: getRandomSymbol(),
          pronouns: {
            de: [],
            en: []
          },
          links: {
            discord: '',
            custom: {
              label: '',
              url: ''
            }
          }
        };
        setCurrentUser(user);
        resolve({ user });
      }, 1000);
    });
  };

  const register = async (email: string, password: string, username: string): Promise<UserCredential> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: '123',
          email,
          username,
          displayName: username,
          profileSymbol: getRandomSymbol(),
          pronouns: {
            de: [],
            en: []
          },
          links: {
            discord: '',
            custom: {
              label: '',
              url: ''
            }
          }
        };
        setCurrentUser(user);
        resolve({ user });
      }, 1000);
    });
  };

  const logout = async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser(null);
        resolve();
      }, 500);
    });
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (currentUser) {
          setCurrentUser({ ...currentUser, ...data });
        }
        resolve();
      }, 500);
    });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  const value = {
    currentUser,
    isLoading,
    login,
    register,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};