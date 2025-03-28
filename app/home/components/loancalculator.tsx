
"use client"
import { useState } from 'react';
import PercentageIcon from '@/app/svgFiles/percentage';
import MoneyIcon from '@/app/svgFiles/money';
import ClockIcon from '@/app/svgFiles/clock';




const LoanCalculator = ({cal,setCal,handleCalClick}:any) => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const calculateMonthlyPayment = () => {
    const principal = loanAmount;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyInterestRate === 0) {
      setMonthlyPayment(principal / numberOfPayments);
    } else {
      const payment =
        (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
      setMonthlyPayment(payment);
    }
  };

  return (


<div
   className={
    ` fixed z-50  inset-y-0 right-0 top-28  transform ${
      cal ? 'translate-x-0' : 'translate-x-full'
  } transition-transform duration-500 ease-in-out `}

   
   
   >



    
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 z-50"  >
  
      <h1 className='text-2xl my-1'>מחשבון הלוואה</h1>
 
      {/* סכום הלוואה */}
      <div className="relative flex items-center sm:col-span-2 mb-4">
          <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">סכום הלוואה</label>
          <input type="number" placeholder="Enter email"
                 className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                 value={loanAmount}
                 onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
          <div className="w-[16px] h-[16px] absolute left-4" >
                <MoneyIcon/>
          </div>
      </div>
    
     {/* שיעור הריבית*/}
     <div className="relative flex items-center sm:col-span-2 mb-4">
          <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">שיעור הריבית (%):</label>
          <input type="number"
                
                step="0.01"
                 min="0" max="10"          
                 className="px-4
                  py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 
                   [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none                  
                  rounded outline-none"
                 onChange={(e) => setInterestRate(Number(e.target.value))}

            />
          <div className="w-[16px] h-[16px] absolute left-4" >
                <PercentageIcon/>
          </div>
    
     </div>
    
     {/* תקופת ההלוואה */}
     <div className="relative flex items-center sm:col-span-2 mb-4">
          <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">תקופת ההלוואה  (שנים):</label>
          <input type="number"
                 value={loanTerm}  
                 className="px-4
                 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 
                  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none                  
                 rounded outline-none"
                 onChange={(e) => setLoanTerm(Number(e.target.value))}

            />
          <div className="w-[16px] h-[16px] absolute left-4" >
                <ClockIcon/>
          </div>
     </div>
    
     
    
      <button 
      onClick={calculateMonthlyPayment}      
      className="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
      type="button">
     
        
        חשב
      </button >
      {monthlyPayment !== null && (
        <div>
          <h2>תשלום חודשי: &#8362;{monthlyPayment.toFixed(2)}</h2>
        </div>
      )}
  
   

</div>
</div>
  );
};

export default LoanCalculator;
