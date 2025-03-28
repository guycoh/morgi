// "use client";

// import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
// import { getDocument, PDFDocumentProxy } from "pdfjs-dist/legacy/build/pdf";
// import "pdfjs-dist/legacy/build/pdf.worker.entry";
// import { Rnd } from "react-rnd";
// import PageNavigator from "./pageNavigator";
// import AddFieldModal from "./addFieldModal";

// interface PdfViewerProps {
//   pdfUrl: string;
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

// const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
//   const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
//   const [numPages, setNumPages] = useState(0);
//   const [scale, setScale] = useState(1.5);
//   const [fields, setFields] = useState<Field[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);
//   const [fieldTypeToAdd, setFieldTypeToAdd] = useState<Field["type"] | null>(null);
//   const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
//   const viewerRef = useRef<HTMLDivElement | null>(null);

//   const renderPage = useCallback(async (pageNumber: number) => {
//     if (!pdf || !canvasRefs.current[pageNumber - 1]) return;
//     try {
//       const page = await pdf.getPage(pageNumber);
//       const viewport = page.getViewport({ scale });
//       const canvas = canvasRefs.current[pageNumber - 1]!;
//       const context = canvas.getContext("2d");

//       if (!context) throw new Error("Could not get canvas context");

//       canvas.width = viewport.width;
//       canvas.height = viewport.height;

//       await page.render({ canvasContext: context, viewport }).promise;
//     } catch (err) {
//       setError(`Error rendering page ${pageNumber}: ${err}`);
//     }
//   }, [pdf, scale]);

//   useEffect(() => {
//     const loadPdf = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);
//         const pdfDoc = await getDocument(pdfUrl).promise;
//         setPdf(pdfDoc);
//         setNumPages(pdfDoc.numPages);
//       } catch (err) {
//         setError(`Error loading PDF: ${err}`);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadPdf();
//   }, [pdfUrl]);

//   useEffect(() => {
//     if (pdf) {
//       for (let i = 1; i <= numPages; i++) {
//         renderPage(i);
//       }
//     }
//   }, [pdf, numPages, renderPage]);

//   const goToPage = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//     const targetCanvas = canvasRefs.current[pageNumber - 1];
//     if (targetCanvas && viewerRef.current) {
//       viewerRef.current.scrollTo({ top: targetCanvas.offsetTop, behavior: "smooth" });
//     }
//   };

//   const addField = (type: Field["type"], page: number) => {
//     setFields((prev) => [...prev, { id: crypto.randomUUID(), type, page, x: 50, y: 50, ...DEFAULT_FIELD_DIMENSIONS }]);
//     setIsAddFieldModalOpen(false);
//   };

//   if (error) return <div className="text-red-500 p-4">{error}</div>;
//   if (isLoading) return <div className="p-4">Loading PDF...</div>;

//   return (
//     <div className="flex">
//       <PageNavigator currentPage={currentPage} numPages={numPages} goToPage={goToPage} />
//       <div className="flex flex-col items-center">
//         <button onClick={() => setScale(scale + 0.1)} className="m-2 p-2 bg-blue-500 text-white rounded">Zoom In</button>
//         <button onClick={() => setScale(scale - 0.1)} className="m-2 p-2 bg-blue-500 text-white rounded">Zoom Out</button>
//       </div>
//       <div ref={viewerRef} className="flex-1 overflow-y-auto h-screen p-4 space-y-6">
//         {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNumber) => (
//           <div key={pageNumber} className="relative border shadow-md bg-gray-100 p-4 rounded-lg mb-6">
//             <canvas ref={(el) => { canvasRefs.current[pageNumber - 1] = el || null; }} className="block mx-auto" />
//           </div>
//         ))}
//       </div>
//       {isAddFieldModalOpen && fieldTypeToAdd && (
//         <AddFieldModal type={fieldTypeToAdd} page={currentPage} onAddField={addField} onClose={() => setIsAddFieldModalOpen(false)} />
//       )}
//     </div>
//   );
// };

// export default PdfViewer;
