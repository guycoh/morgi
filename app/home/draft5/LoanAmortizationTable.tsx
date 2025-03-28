"use client"
import React from "react";



interface LoanAmortizationTableProps {
  loanAmount: number;
  months: number;
  annualInterestRate: number; // ריבית שנתית באחוזים
  annualIndexRate: number; // שיעור עליית מדד שנתי באחוזים
}

const LoanAmortizationTable: React.FC<LoanAmortizationTableProps> = ({
  loanAmount,
  months,
  annualInterestRate,
  annualIndexRate,
}) => {
  const monthlyInterestRate = annualInterestRate / 12 / 100; // ריבית חודשית
  const monthlyIndexRate = annualIndexRate / 12 / 100; // שיעור מדד חודשי

  // חישוב לוח הסילוקין
  const calculateAmortizationTable = () => {
    let balance = loanAmount; // יתרת הקרן ההתחלתית
    const payments = [];
    let totalInterest = 0;
    let totalIndexation = 0;

    for (let i = 1; i <= months; i++) {
      // עדכון היתרה לפי המדד
      const indexationAmount = balance * monthlyIndexRate;
      balance += indexationAmount;

      // חישוב הריבית החודשית
      const interestAmount = balance * monthlyInterestRate;

      // חישוב התשלום החודשי הדרוש כדי לשלם את כל היתרה עד סוף התקופה
      const remainingMonths = months - i + 1;
      const monthlyPayment =
        balance *
        (monthlyInterestRate /
          (1 - Math.pow(1 + monthlyInterestRate, -remainingMonths)));

      // חישוב רכיב הקרן בתשלום החודשי
      const principalPayment = monthlyPayment - interestAmount;

      // עדכון יתרת הקרן
      balance -= principalPayment;

      // צבירת נתונים לתצוגה
      payments.push({
        month: i,
        indexation: indexationAmount,
        interest: interestAmount,
        principal: principalPayment,
        totalMonthlyPayment: monthlyPayment,
        remainingBalance: balance > 0 ? balance : 0,
      });

      totalInterest += interestAmount;
      totalIndexation += indexationAmount;
    }

    return { payments, totalInterest, totalIndexation };
  };

  const { payments, totalInterest, totalIndexation } = calculateAmortizationTable();

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">לוח סילוקין צמוד מדד</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-50">
            <th className="border border-gray-300 p-2">חודש</th>
            <th className="border border-gray-300 p-2">הצמדה (₪)</th>
            <th className="border border-gray-300 p-2">ריבית (₪)</th>
            <th className="border border-gray-300 p-2">קרן (₪)</th>
            <th className="border border-gray-300 p-2">תשלום חודשי (₪)</th>
            <th className="border border-gray-300 p-2">יתרה (₪)</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 text-center">
                {payment.month}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {payment.indexation.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {payment.interest.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {payment.principal.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {payment.totalMonthlyPayment.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {payment.remainingBalance.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-bold">
            <td className="border border-gray-300 p-2 text-center">סה"כ</td>
            <td className="border border-gray-300 p-2 text-center">
              {totalIndexation.toFixed(2)}
            </td>
            <td className="border border-gray-300 p-2 text-center">
              {totalInterest.toFixed(2)}
            </td>
            <td className="border border-gray-300 p-2 text-center" colSpan={3}>
              -
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default LoanAmortizationTable;
