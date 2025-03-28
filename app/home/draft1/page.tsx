"use client"
import React, { useState } from "react";

export default function PriceToResidentSimulator() {
  const [contractPrice, setContractPrice] = useState<number>(1000000);
  const [marketValue, setMarketValue] = useState<number>(1200000);
  const [equity, setEquity] = useState<number>(200000);
  const [netIncome, setNetIncome] = useState<number>(10000);
  const [isGrantEligible, setIsGrantEligible] = useState<boolean>(false);
  const [grantAmount, setGrantAmount] = useState<string>("");

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
    }).format(value);
  };

  const handleContractPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newContractPrice = Number(event.target.value);
    setContractPrice(newContractPrice);

    // אם שווי השוק לפי שמאי קטן ממחיר החוזה, עדכון שווי השוק לפי שמאי
    if (newContractPrice > marketValue) {
      setMarketValue(newContractPrice);
    }
  };

  const handleGrantEligibilityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsGrantEligible(event.target.value === "yes");
    if (event.target.value === "no") {
      setGrantAmount(""); // אם לא צפוי לקבל מענק, ננקה את סכום המענק
    }
  };

  const handleGrantAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // הסרת כל תו שאינו מספר
    const value = event.target.value.replace(/\D/g, "");
    
    // שמירת הערך כטקסט (לא מספר) כדי למנוע הוספת אפסים
    setGrantAmount(value);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="border rounded-lg p-4 shadow">
        <h2 className="text-xl font-bold mb-4">סימולטור מחיר למשתכן</h2>

        {/* Contract Price */}
        <div className="mb-4">
          <label htmlFor="contractPrice" className="block text-sm font-medium mb-2">מחיר חוזה</label>
          <div className="relative w-full" style={{ direction: 'ltr' }}>
            <input
              type="range"
              id="contractPrice"
              min="500000"
              max="3000000"
              step="10000"
              value={contractPrice}
              onChange={handleContractPriceChange}
              className="w-full"
            />
          </div>
          <input
            type="text"
            value={formatCurrency(contractPrice)}
            readOnly
            className="mt-2 w-full border rounded px-2 py-1"
          />
        </div>

        {/* Market Value */}
        <div className="mb-4">
          <label htmlFor="marketValue" className="block text-sm font-medium mb-2">שווי שוק לפי שמאי</label>
          <div className="relative w-full" style={{ direction: 'ltr' }}>
            <input
              type="range"
              id="marketValue"
              min="500000"
              max="4000000"
              step="10000"
              value={marketValue}
              onChange={(e) => setMarketValue(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <input
            type="text"
            value={formatCurrency(marketValue)}
            readOnly
            className="mt-2 w-full border rounded px-2 py-1"
          />
        </div>

        {/* Grant Eligibility */}
        <div className="mb-4">
          <label htmlFor="grantEligibility" className="block text-sm font-medium mb-2">האם צפוי לקבל מענק?</label>
          <select
            id="grantEligibility"
            value={isGrantEligible ? "yes" : "no"}
            onChange={handleGrantEligibilityChange}
            className="w-full border rounded px-2 py-1"
          >
            <option value="no">לא</option>
            <option value="yes">כן</option>
          </select>
        </div>

        {/* Grant Amount */}
        {isGrantEligible && (
          <div className="mb-4">
            <label htmlFor="grantAmount" className="block text-sm font-medium mb-2">סכום המענק</label>
            <input
              type="text"
              id="grantAmount"
              value={grantAmount}
              onChange={handleGrantAmountChange}
              className="w-full border rounded px-2 py-1"
              placeholder="הכנס סכום המענק"
            />
          </div>
        )}

        {/* Equity */}
        <div className="mb-4">
          <label htmlFor="equity" className="block text-sm font-medium mb-2">הון עצמי</label>
          <div className="relative w-full" style={{ direction: 'ltr' }}>
            <input
              type="range"
              id="equity"
              min="60000"
              max="1000000"
              step="5000"
              value={equity}
              onChange={(e) => setEquity(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <input
            type="text"
            value={formatCurrency(equity)}
            readOnly
            className="mt-2 w-full border rounded px-2 py-1"
          />
        </div>

        {/* Net Income */}
        <div className="mb-4">
          <label htmlFor="netIncome" className="block text-sm font-medium mb-2">הכנסה נטו</label>
          <div className="relative w-full" style={{ direction: 'ltr' }}>
            <input
              type="range"
              id="netIncome"
              min="5000"
              max="50000"
              step="500"
              value={netIncome}
              onChange={(e) => setNetIncome(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <input
            type="text"
            value={formatCurrency(netIncome)}
            readOnly
            className="mt-2 w-full border rounded px-2 py-1"
          />
        </div>
      </div>
    </div>
  );
}
