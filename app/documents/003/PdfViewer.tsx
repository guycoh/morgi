


"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { getDocument, PDFDocumentProxy } from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker.entry";
import { Rnd } from "react-rnd";
import AddFieldModal from "./addFieldModal";
import PageNavigator from "./pageNavigator";

interface PdfViewerProps {
  pdfUrl: string;
  initialScale?: number;
  className?: string;
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

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl, initialScale = 1.5, className = "" }) => {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(initialScale);
  const [fields, setFields] = useState<Field[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
      renderPage(currentPage); // רינדור עמוד ברגע שה-PDF נטען
    }
  }, [pdf, currentPage, renderPage]); // בכל פעם שה-`currentPage` משתנה, רינדור מחדש

 
  useEffect(() => {
    if (!containerRef.current) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        let visiblePage = currentPage;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageIndex = parseInt(entry.target.getAttribute("data-page") || "1", 10);
            visiblePage = pageIndex;
          }
        });
  
        setCurrentPage(visiblePage);
      },
      { root: containerRef.current, threshold: 0.6 }
    );
  
    const pages = containerRef.current.querySelectorAll(".pdf-page");
    pages.forEach((page) => observer.observe(page));
  
    return () => pages.forEach((page) => observer.unobserve(page));
  }, [pdf, scale]);
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  const handleZoom = (delta: number) => {
    setScale((prev) => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const addField = (type: Field["type"]) => {
    const newField: Field = {
      id: crypto.randomUUID(),
      type,
      page: currentPage,
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

  const goToPage = (page: number) => {
    if (page >= 1 && page <= numPages) {
      setCurrentPage(page);
      if (containerRef.current) {
        const pageElement = containerRef.current.children[page - 1] as HTMLElement;
        pageElement?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (isLoading) return <div className="p-4">Loading PDF...</div>;

  return (
    <div className={`flex flex-col items-center space-y-4 relative ${className}`}>
      <div className="fixed left-4 top-4 flex flex-col items-center space-y-4 z-50">
        <PageNavigator 
          currentPage={currentPage} 
          totalPages={numPages} 
          onPageChange={goToPage} 
        />
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed top-44 left-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 z-50"
        >
          הוסף שדה +
        </button>
      </div>

      <AddFieldModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddField={addField} />

      <div className="flex items-center space-x-4">
        <button onClick={() => handleZoom(0.25)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          +
        </button>
        <span className="text-sm">{Math.round(scale * 100)}%</span>
        <button onClick={() => handleZoom(-0.25)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          -
        </button>
      </div>

      <div className="relative space-y-6" ref={containerRef}>
        {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNumber) => (
          <div key={pageNumber} className="relative border shadow-md bg-gray-100 p-4 rounded-lg mb-6">
            <canvas
              ref={(el) => {
                if (el) canvasRefs.current[pageNumber - 1] = el;
              }}
              className="block mx-auto border border-gray-300 shadow"
            />

            {fields
              .filter((field) => field.page === pageNumber)
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
                      prev.map((f) => (f.id === field.id ? { ...f, x: d.x, y: d.y } : f))
                    );
                  }}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    setFields((prev) =>
                      prev.map((f) =>
                        f.id === field.id
                          ? { ...f, x: position.x, y: position.y, width: ref.offsetWidth, height: ref.offsetHeight }
                          : f
                      )
                    );
                  }}
                  className="absolute border bg-white/90 shadow-lg p-2 cursor-move rounded"
                >
                  <input
                    type={field.type === "email" ? "email" : "text"}
                    placeholder={field.type}
                    value={field.value}
                    onChange={(e) => updateFieldValue(field.id, e.target.value)}
                    className="border p-1 bg-white w-full h-full rounded"
                  />
                </Rnd>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfViewer;
