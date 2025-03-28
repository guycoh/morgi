"use client"
import React, { useState, useEffect } from "react";
import { getDocument } from "pdfjs-dist/legacy/build/pdf";

const PdfViewer = ({ file }: { file: File }) => {
  const [pdf, setPdf] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    const loadPdf = async () => {
      const pdfDocument = await getDocument(URL.createObjectURL(file)).promise;
      setPdf(pdfDocument);
      setNumPages(pdfDocument.numPages);
    };

    loadPdf();
  }, [file]);

  const renderPage = (pageNum: number) => {
    if (!pdf) return;
    pdf.getPage(pageNum).then((page: any) => {
      const canvas = document.getElementById(`pdf-canvas-${pageNum}`) as HTMLCanvasElement;
      const context = canvas?.getContext("2d");
      const viewport = page.getViewport({ scale: 1 });

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      page.render({ canvasContext: context!, viewport }).promise;
    });
  };

  useEffect(() => {
    renderPage(pageNumber);
  }, [pageNumber, pdf]);

  return (
    <div>
      <div>
        <button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>Page {pageNumber} of {numPages}</span>
        <button
          disabled={pageNumber === numPages}
          onClick={() => setPageNumber((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
      <canvas id={`pdf-canvas-${pageNumber}`} />
    </div>
  );
};

export default PdfViewer;
