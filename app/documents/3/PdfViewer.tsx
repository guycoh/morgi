"use client";

// import React, { useEffect, useState } from "react";
// import { getDocument, PDFDocumentProxy } from "pdfjs-dist/legacy/build/pdf";
// import "pdfjs-dist/legacy/build/pdf.worker.entry";

// interface PdfViewerProps {
//   pdfUrl: string;
// }

// const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
//   const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [numPages, setNumPages] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [svgContent, setSvgContent] = useState<string | null>(null);

//   useEffect(() => {
//     const loadPdf = async () => {
//       setIsLoading(true);
//       setErrorMessage("");
//       try {
//         const pdfDoc = await getDocument(pdfUrl).promise;
//         setPdf(pdfDoc);
//         setNumPages(pdfDoc.numPages);
//       } catch (error) {
//         console.error("Error loading PDF:", error);
//         setErrorMessage("Error loading PDF. Please check the URL.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadPdf();
//   }, [pdfUrl]);

//   useEffect(() => {
//     const renderPage = async () => {
//       if (!pdf) return;
//       const page = await pdf.getPage(pageNumber);
//       const operatorList = await page.getOperatorList();
//       const viewport = page.getViewport({ scale: 1.5 });

//       const svgGfx = new (await import("pdfjs-dist/web/pdf_viewer")).SVGGraphics(pdf.commonObjs, pdf.fontLoader);
//       const svg = await svgGfx.getSVG(operatorList, viewport);

//       setSvgContent(svg.outerHTML);
//     };

//     renderPage();
//   }, [pdf, pageNumber]);

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <div className="flex space-x-4">
//         <button onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))} disabled={pageNumber <= 1 || isLoading}>
//           ◀ הקודם
//         </button>
//         <span>עמוד {pageNumber} מתוך {numPages}</span>
//         <button onClick={() => setPageNumber((prev) => Math.min(numPages, prev + 1))} disabled={pageNumber >= numPages || isLoading}>
//           הבא ▶
//         </button>
//       </div>

//       {isLoading && <p>Loading PDF...</p>}
//       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//       {!isLoading && svgContent && (
//         <div className="border shadow-md" dangerouslySetInnerHTML={{ __html: svgContent }} />
//       )}
//     </div>
//   );
// };

// export default PdfViewer;
