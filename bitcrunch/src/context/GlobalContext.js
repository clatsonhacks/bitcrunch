"use client";
import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [contractAddress, setContractAddress] = useState(null);

  return (
    <GlobalContext.Provider value={{ contractAddress, setContractAddress }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
