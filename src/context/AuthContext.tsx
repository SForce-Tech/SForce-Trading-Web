import React, { createContext, useState, ReactNode } from "react";
import axios from "axios";

interface AuthContextProps {
  authData: any;
  setAuthData: (data: any) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  authData: null,
  setAuthData: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useState<any>(
    sessionStorage.getItem("token")
  );

  const setAuth = (data: any) => {
    sessionStorage.setItem("token", data);
    setAuthData(data);
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
    <AuthContext.Provider value={{ authData, setAuthData: setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
