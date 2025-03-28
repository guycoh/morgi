"use client";

import React, { useEffect, useState, useRef } from "react";
import { getDocument, PDFDocumentProxy } from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker.entry";

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer11: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scale = 3; // הגדל את המספר כדי לקבל איכות גבוהה יותר

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
      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context!, viewport }).promise;
    };

    renderPage();
  }, [pdf, pageNumber]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        <button
          onClick={() => setPageNumber((prev) => prev - 1)}
          disabled={pageNumber <= 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          ◀ הקודם
        </button>
        <span>
          עמוד {pageNumber} מתוך {numPages}
        </span>
        <button
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={pageNumber >= numPages}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          הבא ▶
        </button>
      </div>
      <canvas ref={canvasRef} className="border shadow-md" />
    </div>
  );
};

export default PdfViewer11;
