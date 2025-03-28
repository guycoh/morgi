"use client"
import React, { useState } from "react";

interface PageNavigatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PageNavigator: React.FC<PageNavigatorProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pageNumber = parseInt(e.target.value, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          &lt; קודם
        </button>
        <span>עמוד {currentPage} מתוך {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          הבא &gt;
        </button>
      </div>
      <input
        type="number"
        value={currentPage}
        onChange={handlePageInputChange}
        className="w-12 p-1 text-center border border-gray-300 rounded"
        min={1}
        max={totalPages}
      />
    </div>
  );
};

export default PageNavigator;
