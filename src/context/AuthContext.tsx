
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/auth";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {

  // Restore previously authenticated user
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);

      return storedUser ? JSON.parse(storedUser) as User : null;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  });

  const login = async (
    username: string,
    password: string
  ): Promise<void> => {

    let authenticatedUser: User;

    if (username === "admin" && password === "admin") {
      authenticatedUser = { id: "1", username, role: "admin" };
    } else if (username === "demo" && password === "demo") {
      authenticatedUser = { id: "2", username, role: "user" };
    } else {
      throw new Error("Invalid username or password");
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));

    setUser(authenticatedUser);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
