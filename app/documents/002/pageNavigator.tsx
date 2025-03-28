import React from "react";

interface PageNavigatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PageNavigator: React.FC<PageNavigatorProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="fixed top-4 left-4 bg-white shadow-lg p-4 rounded-lg flex flex-col items-center z-50">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          ⬅️
        </button>
        <span className="font-bold">
          עמוד {currentPage} מתוך {totalPages}
        </span>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          ➡️
        </button>
      </div>
      <input
        type="number"
        min="1"
        max={totalPages}
        value={currentPage}
        onChange={(e) => {
          const newPage = Number(e.target.value);
          if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
          }
        }}
        className="mt-2 px-2 py-1 border rounded text-center w-16"
      />
    </div>
  );
};

export default PageNavigator;
