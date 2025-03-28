import { useState } from "react";

const MortgageCalculator = () => {
  const [rows, setRows] = useState([
    { loanAmount: 0, annualRate: 0, years: 0, plan: "" },
  ]);

  const addRow = () => {
    setRows([...rows, { loanAmount: 0, annualRate: 0, years: 0, plan: "" }]);
  };

  const updateRow = (index: number, field: string, value: string | number) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const calculateMonthlyPayment = (
    loanAmount: number,
    annualRate: number,
    years: number
  ): number => {
    if (!loanAmount || !annualRate || !years) return 0;

    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = years * 12;
    return (
      (loanAmount *
        monthlyRate *
        Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">מחשבון משכנתא</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">סכום הלוואה</th>
            <th className="border border-gray-300 px-4 py-2">ריבית שנתית (%)</th>
            <th className="border border-gray-300 px-4 py-2">שנים</th>
            <th className="border border-gray-300 px-4 py-2">מסלול</th>
            <th className="border border-gray-300 px-4 py-2">תשלום חודשי</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={row.loanAmount}
                  onChange={(e) =>
                    updateRow(index, "loanAmount", +e.target.value)
                  }
                  className="border p-1 w-full"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  step="0.01"
                  value={row.annualRate}
                  onChange={(e) =>
                    updateRow(index, "annualRate", +e.target.value)
                  }
                  className="border p-1 w-full"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={row.years}
                  onChange={(e) => updateRow(index, "years", +e.target.value)}
                  className="border p-1 w-full"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  value={row.plan}
                  onChange={(e) => updateRow(index, "plan", e.target.value)}
                  className="border p-1 w-full"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {calculateMonthlyPayment(
                  row.loanAmount,
                  row.annualRate,
                  row.years
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addRow}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        הוסף שורה
      </button>
    </div>
  );
};

export default MortgageCalculator;
