"use client"
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const FormWithSupabase: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cell: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { data, error } = await supabase.from('leads').insert([
        {
          name: formData.name,
          email: formData.email,
          cell: parseInt(formData.cell),
        },
      ]);

      if (error) {
        throw error;
      }

      setSuccess('Form submitted successfully!');
      setFormData({ name: '', email: '', cell: '' }); // Reset form
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Submit Your Info</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border rounded"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border rounded"
          />
        </div>

        {/* Age Field */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          Cell
          </label>
          <input
            type="text"
            id="cell"
            name="cell"
            value={formData.cell}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            loading ? 'opacity-50' : 'hover:bg-blue-600'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {/* Success Message */}
        {success && <p className="text-green-500 mt-4">{success}</p>}

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default FormWithSupabase;
