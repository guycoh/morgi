"use client"

import { useState } from "react";

interface ScheduleEntry {
  month: number;
  payment: string;
  principal: string;
  interest: string;
  balance: string;
}

export default function LoanCalculator() {
  const [amount, setAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(4);
  const [years, setYears] = useState(30);
  const [inflationRate, setInflationRate] = useState(2);
  const [isLinked, setIsLinked] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);

  const calculateSchedule = () => {
    const months = years * 12;
    const monthlyInterest = interestRate / 100 / 12;
    let balance = amount;
    const newSchedule: ScheduleEntry[] = [];
    let monthlyPayment =
      (amount * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -months));

    for (let i = 0; i < months; i++) {
      const interest = balance * monthlyInterest;
      let principal = monthlyPayment - interest;
      if (isLinked) {
        balance *= 1 + inflationRate / 100 / 12;
      }
      
      // אם זה התשלום האחרון, לוודא שהיתרה נסגרת לאפס
      if (i === months - 1) {
        principal = balance;
        monthlyPayment = interest + principal;
        balance = 0;
      } else {
        balance -= principal;
      }
      
      newSchedule.push({
        month: i + 1,
        payment: monthlyPayment.toFixed(2),
        interest: interest.toFixed(2),
        principal: principal.toFixed(2),
        balance: balance.toFixed(2),
      });
    }
    setSchedule(newSchedule);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">מחשבון הלוואה</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">סכום ההלוואה</label>
          <input type="number" value={amount} onChange={(e) => setAmount(+e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">ריבית שנתית (%)</label>
          <input type="number" value={interestRate} onChange={(e) => setInterestRate(+e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">משך ההלוואה (שנים)</label>
          <input type="number" value={years} onChange={(e) => setYears(+e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">מדד שנתי צפוי (%)</label>
          <input type="number" value={inflationRate} onChange={(e) => setInflationRate(+e.target.value)} className="w-full p-2 border rounded" disabled={!isLinked} />
        </div>
        <div className="flex items-center">
          <input type="checkbox" checked={isLinked} onChange={() => setIsLinked(!isLinked)} className="mr-2" />
          <label className="text-sm">הלוואה צמודת מדד</label>
        </div>
        <button onClick={calculateSchedule} className="w-full bg-blue-500 text-white p-2 rounded">חשב</button>
      </div>
      {schedule.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">לוח סילוקין</h3>
          <div className="overflow-x-auto max-h-64 border mt-2 p-2">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-2">חודש</th>
                  <th className="p-2">תשלום</th>
                  <th className="p-2">קרן</th>
                  <th className="p-2">ריבית</th>
                  <th className="p-2">יתרה</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row: ScheduleEntry) => (
                  <tr key={row.month} className="border-b">
                    <td className="p-2">{row.month}</td>
                    <td className="p-2">{row.payment}</td>
                    <td className="p-2">{row.principal}</td>
                    <td className="p-2">{row.interest}</td>
                    <td className="p-2">{row.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
