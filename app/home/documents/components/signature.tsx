// components/SignaturePad.tsx

import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = () => {
  const signatureRef = useRef<SignatureCanvas>(null);

  // פונקציה לנקות את החתימה
  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  };

  // פונקציה לשמור את החתימה כקובץ תמונה (base64)
  const saveSignature = () => {
    if (signatureRef.current) {
      const signatureData = signatureRef.current.toDataURL(); // מחזיר את התמונה ב-base64
      console.log(signatureData); // כאן אפשר לשלוח את התמונה לשרת או לשמור ב-localStorage
    }
  };

  return (
    <div className="signature-container">
      <h2 className="text-xl font-semibold mb-4">חתום כאן:</h2>
      <SignatureCanvas
        ref={signatureRef}
        backgroundColor="white"
        penColor="black"
        canvasProps={{
          width: 600,
          height: 300,
          className: "signature-canvas",
        }}
      />
      <div className="actions">
        <button onClick={clearSignature} className="clear-button">
          נקה
        </button>
        <button onClick={saveSignature} className="save-button">
          שמור חתימה
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
