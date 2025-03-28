"use client"

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Modal_delete from './components/modal_delete';
import Link from 'next/link';
import { Addicon } from '@/app/svgFiles/records/add';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!; // החלף בקישור Supabase שלך
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // החלף במפתח ה-API שלך
const supabase = createClient(supabaseUrl, supabaseKey);



interface RowData {
  id: number;
  concept: string;
  commentary: string;
  concept_page: boolean;
}

export default function DataTable() {
  const [data, setData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);





  // Fetch data from Supabase
  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('concepts').select('*');
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setData(data || []);
    }
    setLoading(false);
  };

  // Delete row from Supabase
  const deleteRow = async (id: number) => {
    const { error } = await supabase.from('concepts').delete().eq('id', id);
    if (error) {
      console.error('Error deleting row:', error);
    } else {
      fetchData(); // Refresh data after deletion
    }
  };

  // Open the modal with the selected row
  const openModal = (row: RowData) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };








  // Edit row (example: toggle concept_page)
  const toggleConceptPage = async (id: number, currentValue: boolean) => {
    const { error } = await supabase
      .from('concepts')
      .update({ concept_page: !currentValue })
      .eq('id', id);
    if (error) {
      console.error('Error updating row:', error);
    } else {
      fetchData(); // Refresh data after update
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">טבלת מושגים</h1>
     
     
      
       <Link href="concepts/add">
       <div className=" fill-white w-16 h-12 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
       <Addicon />
       </div>
      
      </Link>
      {loading ? (
        <p>טוען נתונים...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-right border-b">מזהה</th>
              <th className="px-4 py-2 text-right border-b">מושג</th>
              <th className="px-4 py-2 text-right border-b">הערה</th>
              <th className="px-4 py-2 text-right border-b">עמוד קונספט</th>
              <th className="px-4 py-2 text-right border-b">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 text-right border-b">{row.id}</td>
                <td className="px-4 py-2 text-right border-b">{row.concept}</td>
                <td className="px-4 py-2 text-right border-b">{row.commentary}</td>
                <td className="px-4 py-2 text-right border-b">
                  {row.concept_page ? '✅' : '❌'}
                </td>
                <td className="px-4 py-2 text-right border-b space-x-2">
                  <button
                    onClick={() => toggleConceptPage(row.id, row.concept_page)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    ערוך
                  </button>
                  <button
                   onClick={() => openModal(row)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    מחק
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
        {/* Modal */}

         {modalOpen && selectedRow && (
        


        <Modal_delete
        isOpen={modalOpen}
        title="אישור מחיקה"
        content={
          selectedRow
            ? `האם אתה בטוח שברצונך למחוק את הרשומה "${selectedRow.concept}"?`
            : ''
        }
        onConfirm={() => selectedRow && deleteRow(selectedRow.id)}
        onCancel={closeModal}
      />

        )}

    </div>
  );
}
