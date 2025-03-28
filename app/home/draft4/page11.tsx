"use client"

import { useState } from "react";

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [annualRate, setAnnualRate] = useState(4.0);
  const [termMonths, setTermMonths] = useState(120);
  const [expectedInflation, setExpectedInflation] = useState(2.0);

  const monthlyRate = annualRate / 12 / 100;
  const monthlyInflation = expectedInflation / 12 / 100;

  const monthlyPayment =
    monthlyRate > 0
      ? (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths))
      : loanAmount / termMonths;

  const generateAmortizationSchedule = () => {
    let balance = loanAmount;
    let schedule = [];
    let indexLevel = 100;
    
    for (let i = 0; i <= termMonths; i++) {
      let interestPayment = balance * monthlyRate;
      let principalPayment = i === 0 ? 0 : monthlyPayment - interestPayment;
      balance = i === 0 ? balance : balance - principalPayment;
      let indexedPayment = i === 0 ? 0 : (monthlyPayment * indexLevel) / 100;
      
      schedule.push({
        period: i,
        monthlyPayment: i === 0 ? 0 : monthlyPayment.toFixed(2),
        interestPayment: interestPayment.toFixed(2),
        principalPayment: principalPayment.toFixed(2),
        remainingBalance: balance.toFixed(2),
        indexLevel: indexLevel.toFixed(2),
        indexedPayment: indexedPayment.toFixed(2),
      });
      indexLevel *= 1 + monthlyInflation;
    }
    return schedule;
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">מחשבון הלוואה</h2>
      <div className="grid grid-cols-2 gap-4">
        <label>
          סכום הלוואה
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="border p-2 w-full"
          />
        </label>
        <label>
          ריבית שנתית (%)
          <input
            type="number"
            value={annualRate}
            onChange={(e) => setAnnualRate(Number(e.target.value))}
            className="border p-2 w-full"
          />
          <span className="text-sm">ריבית חודשית: {(monthlyRate * 100).toFixed(4)}%</span>
        </label>
        <label>
          תקופה (חודשים)
          <input
            type="number"
            value={termMonths}
            onChange={(e) => setTermMonths(Number(e.target.value))}
            className="border p-2 w-full"
          />
        </label>
        <label>
          מדד שנתי צפוי (%)
          <input
            type="number"
            value={expectedInflation}
            onChange={(e) => setExpectedInflation(Number(e.target.value))}
            className="border p-2 w-full"
          />
          <span className="text-sm">מדד חודשי: {(monthlyInflation * 100).toFixed(4)}%</span>
        </label>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">תשלום חודשי: {monthlyPayment.toFixed(2)} ש"ח</h3>
      </div>
      
      <table className="mt-4 w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">תקופה</th>
            <th className="border p-2">תשלום חודשי</th>
            <th className="border p-2">ריבית</th>
            <th className="border p-2">קרן</th>
            <th className="border p-2">יתרה</th>
            <th className="border p-2">צפי מדד</th>
            <th className="border p-2">תשלום ממודד</th>
          </tr>
        </thead>
        <tbody>
          {generateAmortizationSchedule().map((row) => (
            <tr key={row.period} className="border">
              <td className="border p-2">{row.period}</td>
              <td className="border p-2">{row.monthlyPayment}</td>
              <td className="border p-2">{row.interestPayment}</td>
              <td className="border p-2">{row.principalPayment}</td>
              <td className="border p-2">{row.remainingBalance}</td>
              <td className="border p-2">{row.indexLevel}</td>
              <td className="border p-2">{row.indexedPayment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
