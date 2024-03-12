import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
const SECRET_KEY = process.env.JWT_SECRET_KEY;
// Define the shape of the context's value
interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

// Initialize the context with undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  // Check the token in localStorage when the component mounts
  useEffect(() => {
    const token =
      localStorage.getItem("token") === null
        ? localStorage.setItem("token", SECRET_KEY as string)
        : localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error(error);
      alert("Authentication failed");
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/");
  };

  // The value provided to the context consumers
  const value = { isAuthenticated, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
