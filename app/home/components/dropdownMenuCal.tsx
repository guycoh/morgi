"use client"
import { useState } from "react";
import Link from "next/link";


const DropdownMenuCal= () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="relative inline-block text-left text-[#1d75a1]">
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-[#1d75a1] bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
         מחשבונים 
          <svg
            className={`w-5 h-5 ml-2 transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
          <div className="py-1">
            <Link
              href="/home/calculators/mortgage_calculator"
              className="block px-4 py-2 text-sm text-[#1d75a1] hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
             מחשבון משכנתא
            </Link>
            <Link
              href="/home/calculators/purchase_tax_calculator"
              className="block px-4 py-2 text-sm text-[#1d75a1] hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              מס רכישה
            </Link>
            <Link
              href="/home/calculators/eligibility_calculator"
              className="block px-4 py-2 text-sm text-[#1d75a1] hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
      
             מחשבון זכאות
            </Link>

            <Link
              href="/home/calculators/loan_table"
              className="block px-4 py-2 text-sm text-[#1d75a1] hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >      
            כדאיות מיחזור
            </Link>

            <Link
              href="/home/calculators/eligibility_calculator"
              className="block px-4 py-2 text-sm text-[#1d75a1] hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >      
             מחיר למשתכן
            </Link>

            <Link
              href="/home/calculators/mechir_la_mishtaken"
              className="block px-4 py-2 text-sm text-[#1d75a1] hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >      
            זכאות מחיר למשתכן
            </Link>




          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenuCal;
