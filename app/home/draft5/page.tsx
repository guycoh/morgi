"use client"
import React, { useState } from "react";
import LoanAmortizationTable from "./LoanAmortizationTable";


const LoanForm = () => {
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [months, setMonths] = useState<number>(240);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(3.5);
  const [annualIndexRate, setAnnualIndexRate] = useState<number>(2.8);
  const [showTable, setShowTable] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTable(true); // מציג את לוח הסילוקין
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">מחשבון לוח סילוקין</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            סכום ההלוואה (₪):
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            תקופה (בחודשים):
          </label>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            ריבית שנתית (%):
          </label>
          <input
            type="number"
            value={annualInterestRate}
            step="0.01"
            onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            שיעור הצמדה שנתי (%):
          </label>
          <input
            type="number"
            value={annualIndexRate}
            step="0.01"
            onChange={(e) => setAnnualIndexRate(Number(e.target.value))}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600 transition"
        >
          צור לוח סילוקין
        </button>
      </form>

      {showTable && (
        <div className="mt-8">
          <LoanAmortizationTable
            loanAmount={loanAmount}
            months={months}
            annualInterestRate={annualInterestRate}
            annualIndexRate={annualIndexRate}
          />
        </div>
      )}
    </div>
  );
};

export default LoanForm;
