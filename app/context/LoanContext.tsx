"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

interface LoanType {
  code: number;
  name: string;
  isIndexed: boolean;
}

interface ScheduleType {
  code: number;
  name: string;
}

interface LoanContextType {
  loanTypes: LoanType[];
  schedules: ScheduleType[];
  setLoanTypes: React.Dispatch<React.SetStateAction<LoanType[]>>;
  setSchedules: React.Dispatch<React.SetStateAction<ScheduleType[]>>;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

interface LoanProviderProps {
  children: ReactNode;
}

export const LoanProvider: React.FC<LoanProviderProps> = ({ children }) => {
  const [loanTypes, setLoanTypes] = useState<LoanType[]>([
    { code: 1, name: "פריים", isIndexed: false },
    { code: 2, name: "קבוע לא צמוד", isIndexed: false },
    { code: 3, name: "קבוע צמוד", isIndexed: true },
    { code: 11, name: "משתנה צמודה כל שנה", isIndexed: true },
    { code: 12, name: "משתנה צמודה כל 2.5", isIndexed: true },
    { code: 13, name: "משתנה צמודה כל 3", isIndexed: true },
    { code: 14, name: "משתנה צמודה כל 5", isIndexed: true },
    { code: 15, name: "משתנה צמודה כל 7", isIndexed: true },
    { code: 16, name: "משתנה צמודה כל 10", isIndexed: true },
    { code: 21, name: "משתנה לא צמוד כל שנה", isIndexed: false },
    { code: 22, name: "משתנה לא צמוד כל 2.5", isIndexed: false },
    { code: 23, name: "משתנה לא צמוד כל 3", isIndexed: false },
    { code: 24, name: "משתנה לא צמוד כל 5", isIndexed: false },
    { code: 25, name: "משתנה לא צמוד כל 7", isIndexed: false },
    { code: 26, name: "משתנה לא צמוד כל 10", isIndexed: false },
    { code: 27, name: "עוגן מק", isIndexed: false },
    { code: 31, name: "דולר", isIndexed: false },
    { code: 32, name: "יורו", isIndexed: false },
  ]);

  const [schedules, setSchedules] = useState<ScheduleType[]>([
    { code: 1, name: "שפיצר" },
    { code: 2, name: "קרן שווה" },
    { code: 3, name: "בוליט חלקי" },
    { code: 4, name: "בוליט מלא" },
  ]);

  return (
    <LoanContext.Provider value={{ loanTypes, schedules, setLoanTypes, setSchedules }}>
      {children}
    </LoanContext.Provider>
  );
};

export const useLoanContext = (): LoanContextType => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error("useLoanContext must be used within a LoanProvider");
  }
  return context;
};
