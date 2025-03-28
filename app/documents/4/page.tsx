"use client"

import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';



// Set the worker source *before* you try to load any PDFs.  This is crucial!
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`; // Or your local path

const MyPDFViewer: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pdfFile, setPdfFile] = useState<string | null>(null); // State for the PDF file URL

    useEffect(() => {
      // Set the PDF file URL here (or however you are getting it)
      setPdfFile('/assets/pdf/form.pdf'); // Example
    }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div>
      {pdfFile && ( // Conditionally render the Document to prevent errors if pdfFile is still null.
      <Document
        file={pdfFile} // Use the state variable here
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
        <div style={{ position: 'absolute', top: '100px', left: '50px' }}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        </div>
        <div style={{ position: 'absolute', top: '150px', left: '50px' }}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        </div>
        <div style={{ position: 'absolute', top: '200px', left: '50px' }}>
          <button onClick={() => console.log("name:", name, "email:", email)}>Submit</button>
        </div>
      </Document>
      )}
      <p>Page {pageNumber} of {numPages || '?'}</p>
      <button
        disabled={pageNumber <= 1}
        onClick={() => setPageNumber(pageNumber - 1)}
      >
        Previous
      </button>
      <button
        disabled={pageNumber >= (numPages || 1)}
        onClick={() => setPageNumber(pageNumber + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default MyPDFViewer;