import { createContext, useState } from "react";
import type { User } from "../types/auth";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (
    username: string,
    password: string
  ): Promise<void> => {
    if (username === "admin" && password === "admin") {
      setUser({
        id: "1",
        username,
        role: "admin",
      });
    } else {
      setUser({
        id: "2",
        username,
        role: "user",
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
