"use client";

import React, { useEffect, useState, useRef } from "react";
import { getDocument, PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker.entry";
import { Rnd } from "react-rnd";

interface FieldsProps {
  pdfUrl: string;
}

interface Field {
  id: string;
  type: "name" | "email" | "id" | "signature";
  x: number;
  y: number;
  width: number;
  height: number;
}

const Fields: React.FC<FieldsProps> = ({ pdfUrl }) => {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdfDoc = await getDocument(pdfUrl).promise;
        setPdf(pdfDoc);
        setNumPages(pdfDoc.numPages);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };
    loadPdf();
  }, [pdfUrl]);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdf || !canvasRef.current) return;
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: context, viewport }).promise;
    };
    renderPage();
  }, [pdf, pageNumber]);

  const addField = (type: Field["type"]) => {
    setFields([...fields, { id: crypto.randomUUID(), type, x: 50, y: 50, width: 150, height: 40 }]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <div className="relative">
      <div className="flex gap-2 mb-4">
        <button onClick={() => addField("name")} className="bg-blue-500 px-3 py-1 text-white rounded">+ Name</button>
        <button onClick={() => addField("email")} className="bg-blue-500 px-3 py-1 text-white rounded">+ Email</button>
        <button onClick={() => addField("id")} className="bg-blue-500 px-3 py-1 text-white rounded">+ ID</button>
        <button onClick={() => addField("signature")} className="bg-blue-500 px-3 py-1 text-white rounded">+ Signature</button>
      </div>
      <div className="relative border shadow-md inline-block">
        <canvas ref={canvasRef} className="block" />
        {fields.map((field) => (
          <Rnd
            key={field.id}
            default={{ x: field.x, y: field.y, width: field.width, height: field.height }}
            bounds="parent"
            onDragStop={(e, d) => {
              setFields((prev) => prev.map(f => f.id === field.id ? { ...f, x: d.x, y: d.y } : f));
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              setFields((prev) => prev.map(f => f.id === field.id ? { ...f, x: position.x, y: position.y, width: ref.offsetWidth, height: ref.offsetHeight } : f));
            }}
            className="absolute border bg-white shadow p-2 cursor-move"
          >
            <div className="relative">
              <input type="text" placeholder={field.type} className="border p-1 bg-white w-full h-full" />
              <button
                onClick={() => removeField(field.id)}
                className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded-full"
              >
                ×
              </button>
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  );
};

export default Fields;




































// "use client";
// import React, { useState } from "react";
// import { Rnd } from "react-rnd";

// interface FieldProps {
//   label: string;
//   fieldType: "text" | "email" | "date" | "signature";
//   id: string;
//   initialX: number;
//   initialY: number;
//   onPositionChange: (id: string, x: number, y: number) => void;
// }

// const Field: React.FC<FieldProps> = ({
//   label,
//   fieldType,
//   id,
//   initialX,
//   initialY,
//   onPositionChange,
// }) => {
//   const [position, setPosition] = useState({ x: initialX, y: initialY });
//   const [size, setSize] = useState({ width: 200, height: 50 });

//   return (
//     <Rnd
//       size={{ width: size.width, height: size.height }}
//       position={{ x: position.x, y: position.y }}
//       onDragStop={(e, d) => {
//         setPosition({ x: d.x, y: d.y });
//         onPositionChange(id, d.x, d.y);
//       }}
//       onResizeStop={(e, direction, ref, delta, position) => {
//         setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
//         setPosition(position);
//       }}
//       bounds="parent"
//       enableResizing={fieldType === "signature"} // רק שדה חתימה ניתן לשינוי גודל
//       className="absolute border-2 border-blue-500 bg-white shadow-md rounded-lg p-2 cursor-move"
//     >
//       <label className="block font-bold mb-1">{label}</label>
//       {fieldType === "signature" ? (
//         <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-blue-500 text-blue-500 italic">
//           Signature Area
//         </div>
//       ) : (
//         <input
//           type={fieldType}
//           placeholder={label}
//           className="w-full p-2 border border-gray-300 rounded-lg outline-none"
//         />
//       )}
//     </Rnd>
//   );
// };

// export default Field;



















// import React, { useEffect, useState, useRef } from "react";
// import { getDocument, PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist/legacy/build/pdf";
// import "pdfjs-dist/legacy/build/pdf.worker.entry";
// import { Rnd } from "react-rnd";

// interface FieldsProps {
//   pdfUrl: string;
// }

// interface Field {
//   id: string;
//   type: "name" | "email" | "id" | "signature";
//   x: number;
//   y: number;
// }

// const Fields: React.FC<FieldsProps> = ({ pdfUrl }) => {
//   const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [numPages, setNumPages] = useState(0);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [fields, setFields] = useState<Field[]>([]);

//   useEffect(() => {
//     const loadPdf = async () => {
//       try {
//         const pdfDoc = await getDocument(pdfUrl).promise;
//         setPdf(pdfDoc);
//         setNumPages(pdfDoc.numPages);
//       } catch (error) {
//         console.error("Error loading PDF:", error);
//       }
//     };
//     loadPdf();
//   }, [pdfUrl]);

//   useEffect(() => {
//     const renderPage = async () => {
//       if (!pdf || !canvasRef.current) return;
//       const page = await pdf.getPage(pageNumber);
//       const viewport = page.getViewport({ scale: 1.5 });
//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");
//       if (!context) return;
//       canvas.width = viewport.width;
//       canvas.height = viewport.height;
//       await page.render({ canvasContext: context, viewport }).promise;
//     };
//     renderPage();
//   }, [pdf, pageNumber]);

//   const addField = (type: Field["type"]) => {
//     setFields([...fields, { id: crypto.randomUUID(), type, x: 50, y: 50 }]);
//   };

//   return (
//     <div className="relative">
//       <div className="flex gap-2 mb-4">
//         <button onClick={() => addField("name")} className="bg-blue-500 px-3 py-1 text-white rounded">+ Name</button>
//         <button onClick={() => addField("email")} className="bg-blue-500 px-3 py-1 text-white rounded">+ Email</button>
//         <button onClick={() => addField("id")} className="bg-blue-500 px-3 py-1 text-white rounded">+ ID</button>
//         <button onClick={() => addField("signature")} className="bg-blue-500 px-3 py-1 text-white rounded">+ Signature</button>
//       </div>
//       <div className="relative border shadow-md inline-block">
//         <canvas ref={canvasRef} className="block" />
//         {fields.map((field) => (
//           <Rnd
//             key={field.id}
//             default={{ x: field.x, y: field.y, width: 150, height: 40 }}
//             bounds="parent"
//             onDragStop={(e, d) => {
//               setFields((prev) => prev.map(f => f.id === field.id ? { ...f, x: d.x, y: d.y } : f));
//             }}
//           >
//             <input type="text" placeholder={field.type} className="border p-1 bg-white" />
//           </Rnd>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Fields;
