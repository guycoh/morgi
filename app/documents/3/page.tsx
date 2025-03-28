"use client"
  

import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfViewer: React.FC<{ pdfUrl: string }> = ({ pdfUrl }) => {
  return (
    <div className="border shadow-md" style={{ height: "800px" }}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js`}>
        <Viewer fileUrl={pdfUrl} />
      </Worker>
    </div>
  );
};