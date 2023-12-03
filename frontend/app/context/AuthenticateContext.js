"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthenticateContext = createContext();

const GlobalAuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let newUser = localStorage.getItem("user");
    if (newUser !== null) {
      newUser = JSON.parse(newUser);
      setUser({
        username: newUser.username,
        isAuthenticated: newUser.isAuthenticated,
        authToken: newUser.authToken,
        loginExpiry: newUser.loginExpiry,
      });
    }
  }, []);

  return (
    <AuthenticateContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticateContext.Provider>
  );
};

export default GlobalAuthenticationProvider;
export const useAuthenticateContext = () => useContext(AuthenticateContext);
