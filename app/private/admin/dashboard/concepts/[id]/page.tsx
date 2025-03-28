"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query; // מזהה הרשומה מה-URL
  const [formData, setFormData] = useState({
    concept: '',
    commentary: '',
    concept_page: false,
  });
  const [loading, setLoading] = useState(true);

  // Fetch record data by ID
  const fetchRecord = async (recordId: string) => {
    const { data, error } = await supabase
      .from('your_table_name')
      .select('*')
      .eq('id', recordId)
      .single();

    if (error) {
      console.error('Error fetching record:', error);
    } else {
      setFormData(data);
    }
    setLoading(false);
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'concept_page' ? value === 'true' : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('your_table_name')
      .update({
        concept: formData.concept,
        commentary: formData.commentary,
        concept_page: formData.concept_page,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating record:', error);
    } else {
      alert('הרשומה עודכנה בהצלחה!');
      router.push('/'); // חזרה לדף הראשי לאחר העדכון
    }
  };

  useEffect(() => {
    if (id) {
      fetchRecord(id as string);
    }
  }, [id]);

  if (loading) {
    return <p>טוען נתונים...</p>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">עריכת רשומה</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-right font-bold mb-1">מושג</label>
          <input
            type="text"
            name="concept"
            value={formData.concept}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-right font-bold mb-1">הערה</label>
          <input
            type="text"
            name="commentary"
            value={formData.commentary}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-right font-bold mb-1">עמוד קונספט</label>
          <select
            name="concept_page"
            value={formData.concept_page ? 'true' : 'false'}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="true">כן</option>
            <option value="false">לא</option>
          </select>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            עדכן
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            ביטול
          </button>
        </div>
      </form>
    </div>
  );
}
