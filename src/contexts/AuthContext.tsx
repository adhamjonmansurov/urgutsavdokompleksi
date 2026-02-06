import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  phone: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, password: string) => Promise<boolean>;
  register: (phone: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  verifyOtp: (phone: string, otp: string) => Promise<boolean>;
  sendOtp: (phone: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem("shopowner_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const sendOtp = async (phone: string): Promise<boolean> => {
    // Mock OTP sending - in production, this would call an API
    console.log(`OTP sent to ${phone}: 123456`);
    localStorage.setItem("pending_otp", JSON.stringify({ phone, otp: "123456", expires: Date.now() + 300000 }));
    return true;
  };

  const verifyOtp = async (phone: string, otp: string): Promise<boolean> => {
    const pending = localStorage.getItem("pending_otp");
    if (!pending) return false;
    
    const { phone: savedPhone, otp: savedOtp, expires } = JSON.parse(pending);
    if (savedPhone === phone && savedOtp === otp && Date.now() < expires) {
      localStorage.setItem("verified_phone", phone);
      localStorage.removeItem("pending_otp");
      return true;
    }
    return false;
  };

  const register = async (phone: string, password: string, name: string): Promise<boolean> => {
    const verifiedPhone = localStorage.getItem("verified_phone");
    if (verifiedPhone !== phone) return false;
    
    // Mock registration
    const newUser: User = {
      id: crypto.randomUUID(),
      phone,
      name,
    };
    
    // Store user credentials
    const users = JSON.parse(localStorage.getItem("shopowner_users") || "{}");
    users[phone] = { ...newUser, password };
    localStorage.setItem("shopowner_users", JSON.stringify(users));
    
    // Set current session
    setUser(newUser);
    localStorage.setItem("shopowner_user", JSON.stringify(newUser));
    localStorage.removeItem("verified_phone");
    
    return true;
  };

  const login = async (phone: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem("shopowner_users") || "{}");
    const userData = users[phone];
    
    if (userData && userData.password === password) {
      const loggedInUser: User = {
        id: userData.id,
        phone: userData.phone,
        name: userData.name,
      };
      setUser(loggedInUser);
      localStorage.setItem("shopowner_user", JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("shopowner_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        verifyOtp,
        sendOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
