"use client"

import React, { useState, useRef } from "react";
import DraggableElements from "./DraggableElements";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";

// הגדרת ה-Worker הנכון
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

interface Field {
  id: string;
  type: "input" | "button";
  label: string;
  top: number;
  left: number;
}

const PdfWithDraggableFields = () => {
  const [fields, setFields] = useState<Field[]>([
    { id: "name", type: "input", label: "שם", top: 10, left: 10 },
    { id: "email", type: "input", label: "אימייל", top: 30, left: 10 },
    { id: "phone", type: "input", label: "טלפון", top: 50, left: 10 },
    { id: "submit", type: "button", label: "שלח", top: 70, left: 10 },
  ]);


  const pdfContainerRef = useRef<HTMLDivElement | null>(null); // שמירת ה-PDF

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* מסגרת PDF עם גלילה */}
      <div className="relative w-[90vw] h-[90vh] border shadow-lg">
        {/* עטיפת ה-PDF שתשמש כנקודת יחס לשדות */}
        <div ref={pdfContainerRef} className="absolute inset-0 overflow-auto bg-white">
          <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`}>
            <Viewer fileUrl="/assets/pdf/apoalim.pdf" />
          </Worker>
        </div>

        {/* שדות נגררים מעל ה-PDF */}
      
        <DraggableElements fields={fields} setFields={setFields} containerRef={pdfContainerRef} />
        {/* כפתור שמירת מיקומים */}
        <button
          onClick={() => console.log("מיקומים שנשמרו:", JSON.stringify(fields, null, 2))}
          className="absolute bottom-4 right-4 p-3 bg-green-500 text-white rounded"
        >
          שמור מיקומים
        </button>
      </div>
    </div>
  );
};

export default PdfWithDraggableFields;
