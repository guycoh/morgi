
"use client";

import React, { useEffect, useState, useRef } from "react";
import { getDocument, PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker.entry";
import Fields from "./fields";


interface PdfViewerProps {
  pdfUrl: string;
  initialScale?: number;
  className?: string;
}

interface TextItem {
  str: string;
  transform: number[];
  width: number;
  height: number;
  dir: string;
  fontName?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ 
  pdfUrl, 
  initialScale = 1.5,
  className = "" 
}) => {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(initialScale);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPdf = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const pdfDoc = await getDocument(pdfUrl).promise;
        setPdf(pdfDoc);
        setNumPages(pdfDoc.numPages);
      } catch (error) {
        console.error("Error loading PDF:", error);
        setErrorMessage(
          error instanceof Error 
            ? error.message 
            : "Error loading PDF. Please check the URL."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadPdf();

    return () => {
      if (pdf) {
        pdf.destroy();
      }
    };
  }, [pdfUrl]);

  const renderPage = async (page: PDFPageProxy, canvas: HTMLCanvasElement, textLayer: HTMLDivElement) => {
    const viewport = page.getViewport({ scale });
    const context = canvas.getContext("2d");
    
    if (!context) {
      throw new Error("Could not get canvas context");
    }

    const ratio = window.devicePixelRatio || 1;
    canvas.width = viewport.width * ratio;
    canvas.height = viewport.height * ratio;
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;

    context.scale(ratio, ratio);

    await page.render({ 
      canvasContext: context, 
      viewport 
    }).promise;

    textLayer.innerHTML = "";
    Object.assign(textLayer.style, {
      width: `${viewport.width}px`,
      height: `${viewport.height}px`,
      position: "absolute",
      top: "0",
      left: "0",
      pointerEvents: "none"
    });

    const textContent = await page.getTextContent();
    
    textContent.items.forEach((item) => {
      if (!("str" in item)) return; // וידוא שזהו TextItem

      const textItem = item as TextItem;

      const span = document.createElement("span");
      span.textContent = textItem.str;
      Object.assign(span.style, {
        position: "absolute",
        left: `${textItem.transform[4]}px`,
        top: `${textItem.transform[5]}px`,
        fontSize: `${textItem.height}px`,
        color: "transparent",
        userSelect: "text",
        cursor: "text"
      });
      textLayer.appendChild(span);
    });
  };

  useEffect(() => {
    const updatePage = async () => {
      if (!pdf || !canvasRef.current || !textLayerRef.current) return;

      try {
        const page = await pdf.getPage(pageNumber);
        await renderPage(page, canvasRef.current, textLayerRef.current);
      } catch (error) {
        console.error("Error rendering page:", error);
        setErrorMessage(
          error instanceof Error 
            ? error.message 
            : "Error rendering page. Please try again."
        );
      }
    };

    updatePage();
  }, [pdf, pageNumber, scale]);

  const handleZoom = (delta: number) => {
    setScale(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  return (
    <div className={`flex flex-col items-center space-y-4 relative ${className}`}>

      <div className="flex items-center space-x-4" role="toolbar">
        <button
          onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
          disabled={pageNumber <= 1 || isLoading}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          ◀ Previous
        </button>
        <span role="status">
          Page {pageNumber} of {numPages}
        </span>
        <button
          onClick={() => setPageNumber(prev => Math.min(numPages, prev + 1))}
          disabled={pageNumber >= numPages || isLoading}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          Next ▶
        </button>
      </div>

      <div className="flex items-center space-x-4" role="toolbar">
        <button 
          onClick={() => handleZoom(0.5)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          aria-label="Zoom in"
        >
          +
        </button>
        <button 
          onClick={() => handleZoom(-0.5)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          aria-label="Zoom out"
        >
          -
        </button>
      </div>
     
{/*      
     
      <Fields pdfUrl={pdfUrl} />
 */}



<Fields pdfUrl={pdfUrl} />







      
      {isLoading && (
        <div role="status" aria-live="polite" className="text-center">
          Loading PDF...
        </div>
      )}
      
      {errorMessage && (
        <div role="alert" className="text-red-500">
          {errorMessage}
        </div>
      )}

      {!isLoading && pdf && (
        <div className="relative border shadow-md">
          <canvas 
            ref={canvasRef}
            aria-label={`PDF page ${pageNumber}`}
          />
          <div 
            ref={textLayerRef}
            className="absolute top-0 left-0 w-full h-full"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
};

export default PdfViewer;

















// import React, { useEffect, useState, useRef } from "react";
// import { getDocument, PDFDocumentProxy } from "pdfjs-dist/legacy/build/pdf";
// import "pdfjs-dist/legacy/build/pdf.worker.entry";

// interface PdfViewerProps {
//   pdfUrl: string;
// }

// const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
//   const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [numPages, setNumPages] = useState(0);
//   const [scale, setScale] = useState(1.5);
//   const [isLoading, setIsLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState("");
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const textLayerRef = useRef<HTMLDivElement>(null);

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
//       if (!pdf || !canvasRef.current || !textLayerRef.current) return;
//       const page = await pdf.getPage(pageNumber);
      
//       // שיפור חדות עם scale גבוה יותר
//       const viewport = page.getViewport({ scale });
//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");

//       const ratio = window.devicePixelRatio || 1;
//       canvas.width = viewport.width * ratio;
//       canvas.height = viewport.height * ratio;
//       canvas.style.width = `${viewport.width}px`;
//       canvas.style.height = `${viewport.height}px`;

//       context!.scale(ratio, ratio);

//       await page.render({ canvasContext: context!, viewport }).promise;

//       // הוספת שכבת טקסט
//       const textLayer = textLayerRef.current;
//       textLayer.innerHTML = ""; // ניקוי תוכן קודם
//       textLayer.style.width = `${viewport.width}px`;
//       textLayer.style.height = `${viewport.height}px`;
//       textLayer.style.position = "absolute";
//       textLayer.style.top = "0";
//       textLayer.style.left = "0";
//       textLayer.style.pointerEvents = "none";

//       const textContent = await page.getTextContent();
//       textContent.items.forEach((textItem: any) => {
//         const span = document.createElement("span");
//         span.textContent = textItem.str;
//         span.style.position = "absolute";
//         span.style.left = `${textItem.transform[4]}px`;
//         span.style.top = `${textItem.transform[5]}px`;
//         span.style.fontSize = `${textItem.height}px`;
//         span.style.color = "transparent"; // הופך לטקסט חי
//         span.style.userSelect = "text"; // מאפשר סימון טקסט
//         textLayer.appendChild(span);
//       });
//     };

//     renderPage();
//   }, [pdf, pageNumber, scale]);

//   return (
//     <div className="flex flex-col items-center space-y-4 relative">
//       <div className="flex space-x-4">
//         <button
//           onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
//           disabled={pageNumber <= 1 || isLoading}
//           className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
//         >
//           ◀ הקודם
//         </button>
//         <span>
//           עמוד {pageNumber} מתוך {numPages}
//         </span>
//         <button
//           onClick={() => setPageNumber((prev) => Math.min(numPages, prev + 1))}
//           disabled={pageNumber >= numPages || isLoading}
//           className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
//         >
//           הבא ▶
//         </button>
//       </div>

//       <div className="flex space-x-4">
//         <button 
//           onClick={() => setScale(prev => prev + 0.5)} 
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           +
//         </button>
//         <button 
//           onClick={() => setScale(prev => Math.max(0.5, prev - 0.5))} 
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           -
//         </button>
//       </div>

//       {isLoading && <p>Loading PDF...</p>}
//       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

//       {!isLoading && pdf && (
//         <div className="relative">
//           <canvas ref={canvasRef} className="border shadow-md" />
//           <div ref={textLayerRef} className="absolute top-0 left-0 w-full h-full"></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PdfViewer;
