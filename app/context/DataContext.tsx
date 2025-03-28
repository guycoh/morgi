"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DataContextType {
  name: string;
  loggedin: boolean;
  email: string;
  setName: (newName: string) => void;
  setLoggedin: (status: boolean) => void;
  setEmail: (newEmail: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string>('Guest');
  const [loggedin, setLoggedin] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  return (
    <DataContext.Provider
      value={{ name, loggedin, email, setName, setLoggedin, setEmail }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
