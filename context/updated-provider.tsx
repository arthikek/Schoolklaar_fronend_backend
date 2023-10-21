'use client'
import React, { createContext, useContext, ReactNode, useState, use } from 'react';



interface ReloadedContextProps {
  reloaded: boolean;
  setReloaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReloadedContext = createContext<ReloadedContextProps | undefined>(undefined);

export const useReloaded = () => {
  const context = useContext(ReloadedContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};

interface ReloadedProviderProps {
  children: ReactNode;
}

export const ReloadedProvider: React.FC<ReloadedProviderProps> = ({ children }) => {
  const [reloaded, setReloaded] = useState<boolean>(false);


  return (
    <ReloadedContext.Provider value={{ reloaded, setReloaded }}>
      {children}
    </ReloadedContext.Provider>
  );
};
