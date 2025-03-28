import React from "react";

interface AddFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddField: (type: "name" | "email" | "id" | "signature") => void;
}

const AddFieldModal: React.FC<AddFieldModalProps> = ({ isOpen, onClose, onAddField }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4 text-center">בחר שדה להוספה</h2>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => { onAddField("name"); onClose(); }} 
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            שם
          </button>
          <button 
            onClick={() => { onAddField("email"); onClose(); }} 
            className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            אימייל
          </button>
          <button 
            onClick={() => { onAddField("id"); onClose(); }} 
            className="bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
          >
            ת"ז
          </button>
          <button 
            onClick={() => { onAddField("signature"); onClose(); }} 
            className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            חתימה
          </button>
        </div>
        <button 
          onClick={onClose} 
          className="mt-4 w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-400"
        >
          ביטול
        </button>
      </div>
    </div>
  );
};

export default AddFieldModal;
