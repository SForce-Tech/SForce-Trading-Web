import React, { createContext, useState, ReactNode } from "react";
import axios from "axios";

interface AuthContextProps {
  authData: string | null;
  setAuthData: (data: string | null) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  authData: null,
  setAuthData: () => {},
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useState<string | null>(
    sessionStorage.getItem("token")
  );

  const setAuth = (data: string | null) => {
    sessionStorage.setItem("token", data || "");
    setAuthData(data);
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "https://localhost:8443/api/users/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data;
      sessionStorage.setItem("token", token);
      setAuthData(token);
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.post("https://localhost:8443/logout");
      sessionStorage.removeItem("token");
      setAuthData(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ authData, setAuthData: setAuth, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
