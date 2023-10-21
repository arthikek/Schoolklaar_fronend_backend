'use client'
import React, { createContext, useContext, ReactNode, useState, use } from 'react';


interface StudentContextProps {
  generalContext: any| null;
  setGeneralContext: React.Dispatch<React.SetStateAction<any | null>>;
}

const GeneralContext = createContext<StudentContextProps | undefined>(undefined);

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};

interface StudentProviderProps {
  children: ReactNode;
}

export const StudentProvider: React.FC<StudentProviderProps> = ({ children }) => {
  const [generalContext, setGeneralContext] = useState<any | null>(null);


  return (
    <GeneralContext.Provider value={{ generalContext, setGeneralContext }}>
      {children}
    </GeneralContext.Provider>
  );
};
