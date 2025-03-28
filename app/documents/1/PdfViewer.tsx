"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { getDocument, PDFDocumentProxy } from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker.entry";
import { Rnd } from "react-rnd";

interface PdfViewerProps {
  pdfUrl: string;
  initialScale?: number;
  className?: string;
  onFieldsChange?: (fields: Field[]) => void;
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

const PdfViewer: React.FC<PdfViewerProps> = ({
  pdfUrl,
  initialScale = 1.5,
  className = "",
  onFieldsChange,
}) => {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(initialScale);
  const [fields, setFields] = useState<Field[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

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
        setError(`Error rendering page ${pageNumber}: ${err instanceof Error ? err.message : String(err)}`);
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
        setError(`Error loading PDF: ${err instanceof Error ? err.message : String(err)}`);
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

  useEffect(() => {
    onFieldsChange?.(fields);
  }, [fields, onFieldsChange]);

  const handleZoom = (delta: number) => {
    setScale((prev) => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const addField = (type: Field["type"], page: number) => {
    const newField: Field = {
      id: crypto.randomUUID(),
      type,
      page,  // שמירה על העמוד שאליו השדה שייך
      x: 50,
      y: 50,
      ...DEFAULT_FIELD_DIMENSIONS,
      value: "",
    };
    setFields((prev) => [...prev, newField]);
  };

  const updateFieldValue = (id: string, value: string) => {
    setFields((prev) => prev.map((field) => (field.id === id ? { ...field, value } : field)));
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (isLoading) return <div className="p-4">Loading PDF...</div>;

  return (
    <div className={`flex flex-col items-center space-y-4 relative ${className}`}>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => handleZoom(0.25)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          +
        </button>
        <span className="text-sm">{Math.round(scale * 100)}%</span>
        <button
          onClick={() => handleZoom(-0.25)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          -
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {(["name", "email", "id", "signature"] as const).map((type) => (
          <button
            key={type}
            onClick={() => addField(type, 1)} // ברירת המחדל היא עמוד 1, ניתן לשנות
            className="bg-blue-500 px-3 py-1 text-white rounded hover:bg-blue-600 capitalize"
          >
            + {type}
          </button>
        ))}
      </div>

      <div className="relative space-y-6">
        {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNumber) => (
          <div
            key={pageNumber}
            className="relative border shadow-md bg-gray-100 p-4 rounded-lg mb-6"
          >
            <canvas
              ref={(el) => {
                canvasRefs.current[pageNumber - 1] = el;
              }}
              className="block mx-auto border border-gray-300 shadow"
            />
            {fields
              .filter((field) => field.page === pageNumber) // הצגת שדות רק בעמוד המתאים
              .map((field) => (
                <Rnd
                  key={field.id}
                  default={{
                    x: field.x,
                    y: field.y,
                    width: field.width,
                    height: field.height,
                  }}
                  bounds="parent"
                  onDragStop={(e, d) => {
                    setFields((prev) =>
                      prev.map((f) =>
                        f.id === field.id
                          ? { ...f, x: d.x, y: d.y, page: field.page } // עדכון העמוד עם המיקום החדש
                          : f
                      )
                    );
                  }}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    setFields((prev) =>
                      prev.map((f) =>
                        f.id === field.id
                          ? {
                              ...f,
                              x: position.x,
                              y: position.y,
                              width: ref.offsetWidth,
                              height: ref.offsetHeight,
                            }
                          : f
                      )
                    );
                  }}
                  className="absolute border bg-white/90 shadow-lg p-2 cursor-move rounded"
                >
                  <div className="relative">
                    <input
                      type={field.type === "email" ? "email" : "text"}
                      placeholder={field.type}
                      value={field.value}
                      onChange={(e) => updateFieldValue(field.id, e.target.value)}
                      className="border p-1 bg-white w-full h-full rounded"
                    />
                    <button
                      onClick={() => removeField(field.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full hover:bg-red-600 flex items-center justify-center"
                      title="Remove field"
                    >
                      ×
                    </button>
                  </div>
                </Rnd>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfViewer;














// "use client";

// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { getDocument, PDFDocumentProxy } from "pdfjs-dist/legacy/build/pdf";
// import "pdfjs-dist/legacy/build/pdf.worker.entry";
// import { Rnd } from "react-rnd";

// interface PdfViewerProps {
//   pdfUrl: string;
//   initialScale?: number;
//   className?: string;
//   onFieldsChange?: (fields: Field[]) => void;
// }

// interface Field {
//   id: string;
//   type: "name" | "email" | "id" | "signature";
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   value?: string;
// }

// const ZOOM_STEP = 0.25;
// const MIN_SCALE = 0.5;
// const MAX_SCALE = 3;
// const DEFAULT_FIELD_DIMENSIONS = {
//   width: 150,
//   height: 40,
// };

// const PdfViewer: React.FC<PdfViewerProps> = ({
//   pdfUrl,
//   initialScale = 1.5,
//   className = "",
//   onFieldsChange,
// }) => {
//   const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [numPages, setNumPages] = useState(0);
//   const [scale, setScale] = useState(initialScale);
//   const [fields, setFields] = useState<Field[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const renderPage = useCallback(async () => {
//     if (!pdf || !canvasRef.current) return;
    
//     try {
//       const page = await pdf.getPage(pageNumber);
//       const viewport = page.getViewport({ scale });
//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");
      
//       if (!context) {
//         throw new Error("Could not get canvas context");
//       }

//       canvas.width = viewport.width;
//       canvas.height = viewport.height;
      
//       await page.render({ canvasContext: context, viewport }).promise;
//     } catch (err) {
//       setError(`Error rendering page: ${err instanceof Error ? err.message : String(err)}`);
//     }
//   }, [pdf, pageNumber, scale]);

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
//     renderPage();
//   }, [renderPage]);

//   useEffect(() => {
//     onFieldsChange?.(fields);
//   }, [fields, onFieldsChange]);

//   const handleZoom = (delta: number) => {
//     setScale((prev) => Math.max(MIN_SCALE, Math.min(MAX_SCALE, prev + delta)));
//   };

//   const addField = (type: Field["type"]) => {
//     const newField: Field = {
//       id: crypto.randomUUID(),
//       type,
//       x: 50,
//       y: 50,
//       ...DEFAULT_FIELD_DIMENSIONS,
//       value: "",
//     };
//     setFields((prev) => [...prev, newField]);
//   };

//   const updateFieldValue = (id: string, value: string) => {
//     setFields((prev) =>
//       prev.map((field) => (field.id === id ? { ...field, value } : field))
//     );
//   };

//   const removeField = (id: string) => {
//     setFields((prev) => prev.filter((field) => field.id !== id));
//   };

//   if (error) {
//     return <div className="text-red-500 p-4">{error}</div>;
//   }

//   if (isLoading) {
//     return <div className="p-4">Loading PDF...</div>;
//   }

//   return (
//     <div className={`flex flex-col items-center space-y-4 relative ${className}`}>
//       <div className="flex items-center space-x-4" role="toolbar">
//         <button
//           onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
//           disabled={pageNumber <= 1}
//           className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
//         >
//           ◀ Previous
//         </button>
//         <span>
//           Page {pageNumber} of {numPages}
//         </span>
//         <button
//           onClick={() => setPageNumber((prev) => Math.min(numPages, prev + 1))}
//           disabled={pageNumber >= numPages}
//           className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
//         >
//           Next ▶
//         </button>
//       </div>
      
//       <div className="flex items-center space-x-4">
//         <button
//           onClick={() => handleZoom(ZOOM_STEP)}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           +
//         </button>
//         <span className="text-sm">{Math.round(scale * 100)}%</span>
//         <button
//           onClick={() => handleZoom(-ZOOM_STEP)}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           -
//         </button>
//       </div>

//       <div className="flex gap-2 mb-4">
//         {(["name", "email", "id", "signature"] as const).map((type) => (
//           <button
//             key={type}
//             onClick={() => addField(type)}
//             className="bg-blue-500 px-3 py-1 text-white rounded hover:bg-blue-600 capitalize"
//           >
//             + {type}
//           </button>
//         ))}
//       </div>

//       <div className="relative border shadow-md inline-block">
//         <canvas ref={canvasRef} className="block" />
//         {fields.map((field) => (
//           <Rnd
//             key={field.id}
//             default={{
//               x: field.x,
//               y: field.y,
//               width: field.width,
//               height: field.height,
//             }}
//             bounds="parent"
//             onDragStop={(e, d) => {
//               setFields((prev) =>
//                 prev.map((f) => (f.id === field.id ? { ...f, x: d.x, y: d.y } : f))
//               );
//             }}
//             onResizeStop={(e, direction, ref, delta, position) => {
//               setFields((prev) =>
//                 prev.map((f) =>
//                   f.id === field.id
//                     ? {
//                         ...f,
//                         x: position.x,
//                         y: position.y,
//                         width: ref.offsetWidth,
//                         height: ref.offsetHeight,
//                       }
//                     : f
//                 )
//               );
//             }}
//             className="absolute border bg-white/90 shadow-lg p-2 cursor-move rounded"
//           >
//             <div className="relative">
//               <input
//                 type={field.type === "email" ? "email" : "text"}
//                 placeholder={field.type}
//                 value={field.value}
//                 onChange={(e) => updateFieldValue(field.id, e.target.value)}
//                 className="border p-1 bg-white w-full h-full rounded"
//               />
//               <button
//                 onClick={() => removeField(field.id)}
//                 className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full hover:bg-red-600 flex items-center justify-center"
//                 title="Remove field"
//               >
//                 ×
//               </button>
//             </div>
//           </Rnd>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PdfViewer;


































// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import { getDocument, PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist/legacy/build/pdf";
// import "pdfjs-dist/legacy/build/pdf.worker.entry";
// import { Rnd } from "react-rnd";

// interface PdfViewerProps {
//   pdfUrl: string;
//   initialScale?: number;
//   className?: string;
// }

// interface Field {
//   id: string;
//   type: "name" | "email" | "id" | "signature";
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// }

// const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl, initialScale = 1.5, className = "" }) => {
//   const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [numPages, setNumPages] = useState(0);
//   const [scale, setScale] = useState(initialScale);
//   const [fields, setFields] = useState<Field[]>([]);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

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
//       const viewport = page.getViewport({ scale });
//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");
//       if (!context) return;
//       canvas.width = viewport.width;
//       canvas.height = viewport.height;
//       await page.render({ canvasContext: context, viewport }).promise;
//     };
//     renderPage();
//   }, [pdf, pageNumber, scale]);

//   const handleZoom = (delta: number) => {
//     setScale((prev) => Math.max(0.5, Math.min(3, prev + delta)));
//   };

//   const addField = (type: Field["type"]) => {
//     setFields([...fields, { id: crypto.randomUUID(), type, x: 50, y: 50, width: 150, height: 40 }]);
//   };

//   const removeField = (id: string) => {
//     setFields(fields.filter((field) => field.id !== id));
//   };

//   return (
//     <div className={`flex flex-col items-center space-y-4 relative ${className}`}>
//       <div className="flex items-center space-x-4" role="toolbar">
//         <button onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))} disabled={pageNumber <= 1} className="bg-gray-300 px-4 py-2 rounded">◀ Previous</button>
//         <span>Page {pageNumber} of {numPages}</span>
//         <button onClick={() => setPageNumber((prev) => Math.min(numPages, prev + 1))} disabled={pageNumber >= numPages} className="bg-gray-300 px-4 py-2 rounded">Next ▶</button>
//       </div>
//       <div className="flex items-center space-x-4">
//         <button onClick={() => handleZoom(0.5)} className="bg-blue-500 text-white px-4 py-2 rounded">+</button>
//         <button onClick={() => handleZoom(-0.5)} className="bg-blue-500 text-white px-4 py-2 rounded">-</button>
//       </div>
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
//             default={{ x: field.x, y: field.y, width: field.width, height: field.height }}
//             bounds="parent"
//             onDragStop={(e, d) => {
//               setFields((prev) => prev.map(f => f.id === field.id ? { ...f, x: d.x, y: d.y } : f));
//             }}
//             onResizeStop={(e, direction, ref, delta, position) => {
//               setFields((prev) => prev.map(f => f.id === field.id ? { ...f, x: position.x, y: position.y, width: ref.offsetWidth, height: ref.offsetHeight } : f));
//             }}
//             className="absolute border bg-white shadow p-2 cursor-move"
//           >
//             <div className="relative">
//               <input type="text" placeholder={field.type} className="border p-1 bg-white w-full h-full" />
//               <button onClick={() => removeField(field.id)} className="absolute top-0 right-0 bg-red-500 text-white px-1 rounded-full">×</button>
//             </div>
//           </Rnd>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PdfViewer;
