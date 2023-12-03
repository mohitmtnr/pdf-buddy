"use client";
import { createContext, useContext, useState } from "react";

const OptimizeFetch = createContext();
const GlobalOptimizeFetchProvider = ({ children }) => {
  const [fetchData, setFetchData] = useState({
    isDataChanged: true,
    cache: [],
  });

  return (
    <OptimizeFetch.Provider value={{ fetchData, setFetchData }}>
      {children}
    </OptimizeFetch.Provider>
  );
};

export default GlobalOptimizeFetchProvider;
export const useOptimizeFetch = () => useContext(OptimizeFetch);
