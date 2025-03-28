// import { useState, useEffect } from "react";


// // ChildComponent.tsx
// import React from "react";

// // מגדירים את סוג הפרופס שיתקבלו מ-Parent
// interface ChildProps {
//   computedRequestedMortgage:number;
// }


// const LoanComponent: React.FC<ChildProps> = ({computedRequestedMortgage }) => {
 
 
//     const [amount, setAmount] = useState<number>(computedRequestedMortgage);
//     const [annualRate, setAnnualRate] = useState<number>(5);
//     const [months, setMonths] = useState<number>(60);
//     const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  
//     const calculatePayment = () => {
//       if (amount <= 0 || months <= 0) {
//         setMonthlyPayment(0);
//         return;
//       }
//       const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
//       let payment;
//       if (monthlyRate === 0) {
//         payment = amount / months;
//       } else {
//         payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
//       }
//       setMonthlyPayment(payment > 0 ? payment : 0);
//     };
  
//     const formatAmount = (value: number): string => {
//       return new Intl.NumberFormat("he-IL").format(value);
//     };
  
//     const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const rawValue = e.target.value.replace(/,/g, ""); // remove commas
//       const numericValue = Number(rawValue);
//       if (!isNaN(numericValue)) {
//         setAmount(numericValue);
//       }
//     };
  
//     // useEffect to calculate payment automatically when any input changes
//     useEffect(() => {
//       calculatePayment();
//     }, [amount, annualRate, months,monthlyPayment ]); // Re-run calculation whenever any of these values change
  
 
 
 
 
 
//     return (
//         <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
//         <h2 className="text-xl font-bold text-center">מחשבון הלוואה</h2>
//         <label className="block">
//           סכום הלוואה:
//           <input
//             type="text"
//             value={formatAmount(computedRequestedMortgage)}
//             onChange={handleAmountChange}
//             className="block w-full mt-1 p-2 border rounded"
//           />
//         </label>
//         <label className="block">
//           ריבית שנתית (%):
//           <input
//             type="number"
//             value={annualRate}
//             onChange={(e) => setAnnualRate(Number(e.target.value) || 0)}
//             className="block w-full mt-1 p-2 border rounded"
//           />
//         </label>
//         <label className="block">
//           תקופה (חודשים):
//           <input
//             type="number"
//             value={months}
//             onChange={(e) => setMonths(Number(e.target.value) || 0)}
//             className="block w-full mt-1 p-2 border rounded"
//           />
//         </label>
//         {monthlyPayment > 0 && (
//           <p className="text-lg font-bold text-center mt-4">
//             תשלום חודשי: ₪{monthlyPayment.toFixed(2)}
//           </p>
//         )}
//       </div>




        
//   );    
// };

// export default LoanComponent;


import React, { useState, useEffect } from "react";

interface MortgageCalculatorProps {
  computedRequestedMortgage: number; // סכום ההלוואה שמתקבל מה-Parent
}

const LoanComponent: React.FC<MortgageCalculatorProps> = ({ computedRequestedMortgage }) => {
  const [annualRate, setAnnualRate] = useState<number>(5); // ריבית שנתית
  const [months, setMonths] = useState<number>(60); // תקופה בחודשים
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0); // תשלום חודשי

  // פונקציה לחישוב תשלום חודשי
  const calculateMonthlyPayment = () => {
    if (computedRequestedMortgage <= 0 || months <= 0) {
      setMonthlyPayment(0);
      return;
    }
    const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
    let payment;
    if (monthlyRate === 0) {
      payment = computedRequestedMortgage / months;
    } else {
      payment = (computedRequestedMortgage * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    }
    setMonthlyPayment(payment > 0 ? payment : 0);
  };

  // חישוב אוטומטי בכל שינוי של הערכים
  useEffect(() => {
    calculateMonthlyPayment();
  }, [computedRequestedMortgage, annualRate, months]);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-center">מחשבון משכנתא</h2>
      <p className="text-lg font-semibold text-center">
        סכום הלוואה: ₪{computedRequestedMortgage.toLocaleString("he-IL")}
      </p>

      <label className="block">
        ריבית שנתית (%):
        <input
          type="number"
          value={annualRate}
          onChange={(e) => setAnnualRate(Number(e.target.value) || 0)}
          className="block w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block">
        תקופה (חודשים):
        <input
          type="number"
          value={months}
          onChange={(e) => setMonths(Number(e.target.value) || 0)}
          className="block w-full mt-1 p-2 border rounded"
        />
      </label>

      {monthlyPayment > 0 && (
        <p className="text-lg font-bold text-center mt-4">
          תשלום חודשי: ₪{monthlyPayment.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default LoanComponent;
