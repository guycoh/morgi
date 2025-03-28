"use client"
import { useState } from 'react';

import { createClient } from "@supabase/supabase-js";

export default function AddDataForm() {
    const supabase=createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
 
 
    const [concept, setConcept] = useState('');
  const [commentary, setCommentary] = useState('');
  const [conceptPage, setConceptPage] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from refreshing the page
    setLoading(true);

    const { error } = await supabase.from('your_table_name').insert([
      {
        concept,        // Replace with your column names
        commentary,
        concept_page: conceptPage,
      },
    ]);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Data added successfully!');
      // Reset form fields after a successful submission
      setConcept('');
      setCommentary('');
      setConceptPage(false);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-lg bg-white">
      <h1 className="text-xl font-bold mb-4">Add New Entry</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Concept Field */}
        <div>
          <label htmlFor="concept" className="block text-sm font-medium">
            Concept
          </label>
          <input
            id="concept"
            type="text"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
            placeholder="Enter the concept"
            required
          />
        </div>

        {/* Commentary Field */}
        <div>
          <label htmlFor="commentary" className="block text-sm font-medium">
            Commentary
          </label>
          <textarea
            id="commentary"
            value={commentary}
            onChange={(e) => setCommentary(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
            placeholder="Enter commentary"
            required
          />
        </div>

        {/* Concept Page Field */}
        <div className="flex items-center">
          <input
            id="conceptPage"
            type="checkbox"
            checked={conceptPage}
            onChange={(e) => setConceptPage(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="conceptPage" className="ml-2 text-sm font-medium">
            Is this a concept page?
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full text-white font-bold py-2 px-4 rounded ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {/* Feedback Message */}
      {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
    </div>
  );
}
