"use client"
import React, { useState } from "react";


import SignatureModal from "../components/signatureModal";

const SignaturePage = () => {
  const [signatures, setSignatures] = useState<(string | null)[]>([null, null, null, null]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentField, setCurrentField] = useState<number | null>(null);

  const openModal = (index: number) => {
    setCurrentField(index);
    setModalOpen(true);
  };

  const handleSaveSignature = (signature: string) => {
    if (currentField !== null) {
      const newSignatures = [...signatures];
      newSignatures[currentField] = signature;
      setSignatures(newSignatures);
    }
    setModalOpen(false);
    setCurrentField(null);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">טופס חתימות</h2>
      {signatures.map((signature, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700">חתימה {index + 1}:</label>
          <div className="flex items-center mt-2">
            <div className="border rounded-lg w-48 h-16 bg-gray-100 flex items-center justify-center">
              {signature ? <img src={signature} alt={`חתימה ${index + 1}`} className="h-full" /> : "אין חתימה"}
            </div>
            <button
              onClick={() => openModal(index)}
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              חתום
            </button>
          </div>
        </div>
      ))}
      <SignatureModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveSignature} />
    </div>
  );
};

export default SignaturePage;
