"use client";
import { createContext, useState, useContext } from "react";
const ActivePageContext = createContext();

export const GlobalActivePageProvider = ({ children }) => {
  const [activeFile, setActiveFile] = useState("");

  return (
    <ActivePageContext.Provider value={{ activeFile, setActiveFile }}>
      {children}
    </ActivePageContext.Provider>
  );
};

export const useActivePageContext = () => useContext(ActivePageContext);
