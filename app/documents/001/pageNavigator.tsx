
import React from "react";

interface PageNavigatorProps {
  currentPage: number;
  numPages: number;
  goToPage: (page: number) => void;
}

const PageNavigator: React.FC<PageNavigatorProps> = ({ currentPage, numPages, goToPage }) => {
  return (
    <div className="fixed top-0 left-0 w-32 h-screen bg-white shadow-md p-4">
      <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="w-full bg-blue-500 text-white p-2 rounded mb-2">Previous</button>
      <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === numPages} className="w-full bg-blue-500 text-white p-2 rounded">Next</button>
      <div className="mt-4">
        <input type="number" min="1" max={numPages} value={currentPage} onChange={(e) => goToPage(Number(e.target.value))} className="w-full border p-2 rounded" />
      </div>
    </div>
  );
};

export default PageNavigator;
