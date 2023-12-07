"use client";
import React, { createContext, useContext, useState } from "react";
const AlertContext = createContext();

export const GlobalAlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message, ...top) => {
    setAlert({ type, message, top: top[0] ? top[0] : false });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => useContext(AlertContext);
