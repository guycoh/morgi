"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { getDocument, PDFDocumentProxy } from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker.entry";
import { Rnd } from "react-rnd";
import PageNavigator from "./pageNavigator";
import AddFieldModal from "./addFieldModal";

interface PdfViewerProps {
  pdfUrl: string;
}

interface Field {
  id: string;
  type: "name" | "email" | "id" | "signature";
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
  value?: string;
}

const DEFAULT_FIELD_DIMENSIONS = { width: 150, height: 40 };

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.5);
  const [fields, setFields] = useState<Field[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);
  const [fieldTypeToAdd, setFieldTypeToAdd] = useState<Field["type"] | null>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const viewerRef = useRef<HTMLDivElement | null>(null);

  const renderPage = useCallback(
    async (pageNumber: number) => {
      if (!pdf || !canvasRefs.current[pageNumber - 1]) return;
      try {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale });
        const canvas = canvasRefs.current[pageNumber - 1]!;
        const context = canvas.getContext("2d");

        if (!context) throw new Error("Could not get canvas context");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;
      } catch (err) {
        setError(`Error rendering page ${pageNumber}: ${err}`);
      }
    },
    [pdf, scale]
  );

  useEffect(() => {
    const loadPdf = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const pdfDoc = await getDocument(pdfUrl).promise;
        setPdf(pdfDoc);
        setNumPages(pdfDoc.numPages);
      } catch (err) {
        setError(`Error loading PDF: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadPdf();
  }, [pdfUrl]);

  useEffect(() => {
    if (pdf) {
      for (let i = 1; i <= numPages; i++) {
        renderPage(i);
      }
    }
  }, [pdf, numPages, renderPage]);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    viewerRef.current?.scrollTo({ top: viewerRef.current.clientHeight * (pageNumber - 1), behavior: "smooth" });
  };

  const addField = (type: Field["type"], page: number) => {
    setFields((prev) => [...prev, { id: crypto.randomUUID(), type, page, x: 50, y: 50, ...DEFAULT_FIELD_DIMENSIONS }]);
    setIsAddFieldModalOpen(false);
  };

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (isLoading) return <div className="p-4">Loading PDF...</div>;

  return (
    <div className="flex">
      <PageNavigator currentPage={currentPage} numPages={numPages} goToPage={goToPage} />

      <div ref={viewerRef} className="flex-1 overflow-y-auto h-screen p-4 space-y-6">
        {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNumber) => (
          <div key={pageNumber} className="relative border shadow-md bg-gray-100 p-4 rounded-lg mb-6">
          
          
          <canvas ref={(el) => { canvasRefs.current[pageNumber - 1] = el || null; }} className="block mx-auto" />
            {fields
              .filter((field) => field.page === pageNumber)
              .map((field) => (
                <Rnd
                  key={field.id}
                  default={{ x: field.x, y: field.y, width: field.width, height: field.height }}
                  bounds="parent"
                  className="absolute border bg-white shadow-lg p-2 rounded"
                >
                  <input type="text" placeholder={field.type} className="border p-1 w-full h-full rounded" />
                </Rnd>
              ))}
          </div>
        ))}
      </div>

      {isAddFieldModalOpen && fieldTypeToAdd && (
        <AddFieldModal type={fieldTypeToAdd} page={currentPage} onAddField={addField} onClose={() => setIsAddFieldModalOpen(false)} />
      )}
    </div>
  );
};

export default PdfViewer;




















// "use client"


// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { getDocument, PDFDocumentProxy } from "pdfjs-dist/legacy/build/pdf";
// import "pdfjs-dist/legacy/build/pdf.worker.entry";
// import { Rnd } from "react-rnd";
// import AddFieldModal from "./addFieldModal"; // יש לוודא שהקומפוננטה קיימת בקובץ מתאים
// import PageNavigator from "./pageNavigator"; // דאג שהקומפוננטה תהיה קיימת

// interface PdfViewerProps {
//   pdfUrl: string;
//   initialScale?: number;
//   className?: string;
//   onFieldsChange?: (fields: Field[]) => void;
// }

// interface Field {
//   id: string;
//   type: "name" | "email" | "id" | "signature";
//   page: number;
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   value?: string;
// }

// const DEFAULT_FIELD_DIMENSIONS = { width: 150, height: 40 };

// const PdfViewer: React.FC<PdfViewerProps> = ({
//   pdfUrl,
//   initialScale = 1.5,
//   className = "",
//   onFieldsChange,
// }) => {
//   const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
//   const [numPages, setNumPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [scale, setScale] = useState(initialScale);
//   const [fields, setFields] = useState<Field[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalFieldType, setModalFieldType] = useState<"name" | "email" | "id" | "signature" | null>(null);

//   const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

//   const renderPage = useCallback(
//     async (pageNumber: number) => {
//       if (!pdf || !canvasRefs.current[pageNumber - 1]) return;

//       try {
//         const page = await pdf.getPage(pageNumber);
//         const viewport = page.getViewport({ scale });
//         const canvas = canvasRefs.current[pageNumber - 1]!;
//         const context = canvas.getContext("2d");

//         if (!context) throw new Error("Could not get canvas context");

//         canvas.width = viewport.width;
//         canvas.height = viewport.height;

//         await page.render({ canvasContext: context, viewport }).promise;
//       } catch (err) {
//         setError(`Error rendering page ${pageNumber}: ${err instanceof Error ? err.message : String(err)}`);
//       }
//     },
//     [pdf, scale]
//   );

//   useEffect(() => {
//     const loadPdf = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);
//         const pdfDoc = await getDocument(pdfUrl).promise;
//         setPdf(pdfDoc);
//         setNumPages(pdfDoc.numPages);
//       } catch (err) {
//         setError(`Error loading PDF: ${err instanceof Error ? err.message : String(err)}`);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadPdf();
//   }, [pdfUrl]);

//   useEffect(() => {
//     if (pdf) {
//       renderPage(currentPage);
//     }
//   }, [pdf, currentPage, renderPage]);

//   useEffect(() => {
//     onFieldsChange?.(fields);
//   }, [fields, onFieldsChange]);

//   const handleZoom = (delta: number) => {
//     setScale((prev) => Math.max(0.5, Math.min(3, prev + delta)));
//   };

//   const addField = (type: "name" | "email" | "id" | "signature", page: number) => {
//     const newField: Field = {
//       id: crypto.randomUUID(),
//       type,
//       page,
//       x: 50,
//       y: 50,
//       ...DEFAULT_FIELD_DIMENSIONS,
//       value: "",
//     };
//     setFields((prev) => [...prev, newField]);
//     setModalOpen(false);
//   };

//   const updateFieldValue = (id: string, value: string) => {
//     setFields((prev) => prev.map((field) => (field.id === id ? { ...field, value } : field)));
//   };

//   const removeField = (id: string) => {
//     setFields((prev) => prev.filter((field) => field.id !== id));
//   };

//   if (error) return <div className="text-red-500 p-4">{error}</div>;
//   if (isLoading) return <div className="p-4">Loading PDF...</div>;

//   return (
//     <div className={`flex flex-col items-center space-y-4 relative ${className}`}>
      
//         {/* ניווט עמודים */}
//         <PageNavigator
//         currentPage={currentPage}
//         totalPages={numPages}
//         onPageChange={setCurrentPage}
//       />

      
//       <div className="flex items-center space-x-4">
//         <button
//           onClick={() => handleZoom(0.25)}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           +
//         </button>
//         <span className="text-sm">{Math.round(scale * 100)}%</span>
//         <button
//           onClick={() => handleZoom(-0.25)}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           -
//         </button>
//       </div>

//       <div className="flex gap-2 mb-4">
//         {(["name", "email", "id", "signature"] as const).map((type) => (
//           <button
//             key={type}
//             onClick={() => {
//               setModalFieldType(type);
//               setModalOpen(true);
//             }}
//             className="bg-blue-500 px-3 py-1 text-white rounded hover:bg-blue-600 capitalize"
//           >
//             + {type}
//           </button>
//         ))}
//       </div>

//       <div className="relative space-y-6">
//         {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNumber) => (
//           <div
//             key={pageNumber}
//             className="relative border shadow-md bg-gray-100 p-4 rounded-lg mb-6"
//           >
//             <canvas
//               ref={(el) => {
//                 canvasRefs.current[pageNumber - 1] = el;
//               }}
//               className="block mx-auto border border-gray-300 shadow"
//             />
//             {fields
//               .filter((field) => field.page === pageNumber)
//               .map((field) => (
//                 <Rnd
//                   key={field.id}
//                   default={{
//                     x: field.x,
//                     y: field.y,
//                     width: field.width,
//                     height: field.height,
//                   }}
//                   bounds="parent"
//                   onDragStop={(e, d) => {
//                     setFields((prev) =>
//                       prev.map((f) => (f.id === field.id ? { ...f, x: d.x, y: d.y } : f))
//                     );
//                   }}
//                   onResizeStop={(e, direction, ref, delta, position) => {
//                     setFields((prev) =>
//                       prev.map((f) =>
//                         f.id === field.id
//                           ? {
//                               ...f,
//                               x: position.x,
//                               y: position.y,
//                               width: ref.offsetWidth,
//                               height: ref.offsetHeight,
//                             }
//                           : f
//                       )
//                     );
//                   }}
//                   className="absolute border bg-white/90 shadow-lg p-2 cursor-move rounded"
//                 >
//                   <div className="relative">
//                     <input
//                       type={field.type === "email" ? "email" : "text"}
//                       placeholder={field.type}
//                       value={field.value}
//                       onChange={(e) => updateFieldValue(field.id, e.target.value)}
//                       className="border p-1 bg-white w-full h-full rounded"
//                     />
//                     <button
//                       onClick={() => removeField(field.id)}
//                       className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full hover:bg-red-600 flex items-center justify-center"
//                       title="Remove field"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 </Rnd>
//               ))}
//           </div>
//         ))}
//       </div>


//       {/* המודאל לצורך הוספת שדה */}
//       <AddFieldModal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onAddField={addField}
//         page={currentPage}
//       />
//     </div>
//   );
// };

// export default PdfViewer;
