"use client"


import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFViewer({ fileUrl }: { fileUrl: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg">
      <Document
        file={fileUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        className="shadow-lg border rounded-lg overflow-hidden"
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page key={index} pageNumber={index + 1} scale={1.5} className="mb-4" />
        ))}
      </Document>
    </div>
  );
}























// import { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";

// import SignatureModal from "./components/signatureModal";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const PDFSigner = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [signatures, setSignatures] = useState<{ [key: number]: string }>({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentField, setCurrentField] = useState<number | null>(null);

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setFile(event.target.files[0]);
//     }
//   };

//   const handleSaveSignature = (signature: string) => {
//     if (currentField !== null) {
//       setSignatures((prev) => ({ ...prev, [currentField]: signature }));
//     }
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="p-6">
//       <input type="file" accept="application/pdf" onChange={handleFileUpload} className="mb-4" />
//       {file && (
//         <Document file={URL.createObjectURL(file)} className="border p-2">
//           <Page pageNumber={1} renderTextLayer={false} />
//           {/* הצגת חתימות במיקום רצוי */}
//           {Object.entries(signatures).map(([key, value]) => (
//             <img key={key} src={value} alt="חתימה" className="absolute top-[50px] left-[50px] w-20" />
//           ))}
//         </Document>
//       )}
//       <button onClick={() => setIsModalOpen(true)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
//         הוסף חתימה
//       </button>
//       <SignatureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveSignature} />
//     </div>
//   );
// };

// export default PDFSigner;
