"use client";
import React, { createContext, useContext, useState } from "react";
const AlertContext = createContext();

export const GlobalAlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => useContext(AlertContext);
