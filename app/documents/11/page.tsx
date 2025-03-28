
"use client"


import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// הגדרת נתיב ל-worker של PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfEditor: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [annotations, setAnnotations] = useState<{ page: number; text: string; x: number; y: number }[]>([]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const addAnnotation = (e: React.MouseEvent) => {
    const text = prompt('הכנס טקסט הערה:');
    if (text) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setAnnotations([...annotations, { page: pageNumber, text, x, y }]);
    }
  };

  return (
    <div>
      <Document file="sample.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} onClick={addAnnotation}>
          {annotations
            .filter((ann) => ann.page === pageNumber)
            .map((ann, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: ann.x,
                  top: ann.y,
                  background: 'yellow',
                  padding: '2px 4px',
                  borderRadius: '4px',
                }}
              >
                {ann.text}
              </div>
            ))}
        </Page>
      </Document>
      <div>
        <button onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))} disabled={pageNumber <= 1}>
          עמוד קודם
        </button>
        <button onClick={() => setPageNumber((prev) => (numPages && prev < numPages ? prev + 1 : prev))} disabled={numPages ? pageNumber >= numPages : true}>
          עמוד הבא
        </button>
      </div>
    </div>
  );
};

export default PdfEditor;
































// import React, { useState, useRef, useEffect } from 'react';
// import { PDFDocument, PDFField, PDFTextField, PDFSignature } from 'pdf-lib';
// import { Document, Page } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';

// // Create a local worker
// // Update worker configuration
// import { pdfjs } from 'react-pdf';
// if (typeof window !== 'undefined') {
//   pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// }

// interface FormField {
//   name: string;
//   value: string;
//   type: 'text' | 'signature';
//   required: boolean;
// }

// const PDFViewer = ({ url }: { url: string }) => {
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <div className="border rounded-lg overflow-hidden">
//       <Document
//         file={url}
//         onLoadSuccess={onDocumentLoadSuccess}
//         loading={
//           <div className="flex justify-center items-center py-4">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
//           </div>
//         }
//         error={
//           <div className="text-red-500 text-center py-4">
//             Error loading PDF. Please try again.
//           </div>
//         }
//       >
//         <Page 
//           pageNumber={currentPage} 
//           width={window.innerWidth > 768 ? 400 : window.innerWidth - 64}
//           error={
//             <div className="text-red-500 text-center py-4">
//               Error loading page. Please try again.
//             </div>
//           }
//         />
//       </Document>
      
//       {numPages && numPages > 1 && (
//         <div className="flex items-center justify-center gap-4 py-4 bg-gray-50">
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage <= 1}
//             className="px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-300"
//           >
//             Previous
//           </button>
//           <span>
//             Page {currentPage} of {numPages}
//           </span>
//           <button
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, numPages))}
//             disabled={currentPage >= numPages}
//             className="px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-300"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// const PDFSigner = () => {
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null);
//   const [formFields, setFormFields] = useState<FormField[]>([]);
//   const [loading, setLoading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setLoading(true);
//     setPdfFile(file);

//     try {
//       // Create URL for PDF preview
//       const fileUrl = URL.createObjectURL(file);
//       setPdfUrl(fileUrl);

//       // Load PDF for form fields
//       const arrayBuffer = await file.arrayBuffer();
//       const pdfDoc = await PDFDocument.load(arrayBuffer);
//       const form = pdfDoc.getForm();
      
//       const fields = form.getFields();
//       const formattedFields: FormField[] = fields.map(field => ({
//         name: field.getName(),
//         value: '',
//         type: field instanceof PDFSignature ? 'signature' : 'text',
//         required: true
//       }));

//       setFormFields(formattedFields);
//     } catch (error) {
//       console.error('Error loading PDF:', error);
//       alert('Error loading PDF. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFieldChange = (name: string, value: string) => {
//     setFormFields(prev =>
//       prev.map(field =>
//         field.name === name ? { ...field, value } : field
//       )
//     );
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!pdfFile) return;

//     setLoading(true);
//     try {
//       const arrayBuffer = await pdfFile.arrayBuffer();
//       const pdfDoc = await PDFDocument.load(arrayBuffer);
//       const form = pdfDoc.getForm();

//       formFields.forEach(field => {
//         const pdfField = form.getField(field.name);
        
//         if (pdfField instanceof PDFTextField) {
//           pdfField.setText(field.value);
//         } else if (pdfField instanceof PDFSignature) {
//           const textField = pdfField as unknown as PDFTextField;
//           textField.setText(field.value);
//         }
//       });

//       form.flatten();
//       const modifiedPdfBytes = await pdfDoc.save();
      
//       const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `signed-${pdfFile.name}`;
//       link.click();
//       URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Error processing PDF:', error);
//       alert('Error processing PDF. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* PDF Preview Section */}
//         <div className="border rounded-lg p-4 bg-white shadow-sm">
//           <h2 className="text-xl font-semibold mb-4">PDF Preview</h2>
//           <div className="mb-4">
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept=".pdf"
//               onChange={handleFileUpload}
//               className="block w-full text-sm text-gray-500
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded-md file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-blue-50 file:text-blue-700
//                 hover:file:bg-blue-100"
//             />
//           </div>

//           {pdfUrl && <PDFViewer url={pdfUrl} />}
//         </div>

//         {/* Form Fields Section */}
//         <div className="border rounded-lg p-4 bg-white shadow-sm">
//           <h2 className="text-xl font-semibold mb-4">Form Fields</h2>
//           {loading && (
//             <div className="flex justify-center items-center py-4">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
//             </div>
//           )}

//           {formFields.length > 0 ? (
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {formFields.map(field => (
//                 <div key={field.name} className="space-y-2">
//                   <label className="block text-sm font-medium">
//                     {field.name}
//                     {field.required && <span className="text-red-500">*</span>}
//                   </label>
//                   {field.type === 'signature' ? (
//                     <input
//                       type="text"
//                       value={field.value}
//                       onChange={(e) => handleFieldChange(field.name, e.target.value)}
//                       placeholder="Type your signature"
//                       className="w-full px-3 py-2 border rounded-md"
//                       required={field.required}
//                     />
//                   ) : (
//                     <input
//                       type="text"
//                       value={field.value}
//                       onChange={(e) => handleFieldChange(field.name, e.target.value)}
//                       className="w-full px-3 py-2 border rounded-md"
//                       required={field.required}
//                     />
//                   )}
//                 </div>
//               ))}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-2 px-4 rounded-md
//                   hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed
//                   transition duration-200"
//               >
//                 {loading ? 'Processing...' : 'Download Signed PDF'}
//               </button>
//             </form>
//           ) : (
//             <div className="text-center text-gray-500 py-8">
//               {pdfFile ? 'No fillable fields found in this PDF' : 'Upload a PDF to view fillable fields'}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PDFSigner;