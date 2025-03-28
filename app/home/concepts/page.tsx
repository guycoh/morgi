"use client"

import { useState, useEffect } from 'react';
import { Spinner } from '@/components/spinner';

interface DataItem {
  id: number;
  concept: string;
  commentary: string;
 
}

const GlossaryPage: React.FC = () => {
  const [data, setData] = useState<DataItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/concepts'); // Replace with your API endpoint

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData: DataItem[] = await response.json();
        setData(jsonData);
      } catch (err: any) { // Type the error as any
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (loading) {
    return <div><Spinner/></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data to display.</div>; // Handle the case where data is null after loading
  }

  return (
   
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          מושגים במשכנתא
        </h1>
        <div className="space-y-6">
          {data.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <h2 className="text-xl font-semibold text-gray-800 underline mb-2">
                {item.concept}
              </h2>
              <p className="text-gray-600 leading-relaxed">{item.commentary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
   
   
   
   
   
   
   
   
   
   
   
  );
};

export default GlossaryPage;

