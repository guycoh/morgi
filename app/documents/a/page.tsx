"use client"


import { useState, useRef, useEffect } from 'react';
import interact from 'interactjs';


import { Document, Page, pdfjs } from 'react-pdf'; // Import pdfjs

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;



const App: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null); // Correct type for numPages
  const [pageNumber, setPageNumber] = useState(1);
  const [fields, setFields] = useState({});
  const pdfContainerRef = useRef<HTMLDivElement>(null);
 
  const onDocumentLoadSuccess = (pdf: { numPages: number }) => { // Explicitly define the type
    setNumPages(pdf.numPages);
  };




  const handleFieldChange = (field: string, value: string) => {
    setFields({ ...fields, [field]: value });
  };

  useEffect(() => {
    if (pdfContainerRef.current) {  // Ensure the ref is attached
    interact('.draggable', { context: pdfContainerRef.current }) // Set context
      .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: pdfContainerRef.current, // Use the PDF container as the restriction
            endOnly: true
          })
        ],
        // this function is called when the drag is started
        onstart: function (event) {
          console.log(event.type, event.target);
        },
        // this function is called when the user is moving the mouse while dragging
        onmove: function (event) {
          const target = event.target;
          // keep the dragged position in the data-x/data-y attributes
          const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
          const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

          target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

          // update the data attributes
          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
        },
        // this function is called when the drag is ended
        onend: function (event) {
          console.log(event.type, event.target);
        }
      });
    }
  }, []); // Empty dependency array ensures this runs only once after mount

  return (
    <div ref={pdfContainerRef} className="relative"> {/* Make container relative */}
      <Document file="/assets/pdf/apoalim.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>

      <div className="absolute top-0 left-0 w-full h-full">
        <div className="draggable absolute bg-white p-2 border border-gray-300 rounded" data-field="name" style={{ top: '100px', left: '50px' }}> {/* Initial position */}
          <input type="text" placeholder="שם לקוח" onChange={(e) => handleFieldChange('name', e.target.value)} />
        </div>
        {/* ... more draggable fields */}
      </div>
    </div>
  );
};

export default App;








// import { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import { DndContext, useDraggable } from "@dnd-kit/core";

// //pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// //pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdf.worker.min.js", import.meta.url).toString();

// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

// type Field = {
//   id: number;
//   type: string;
//   x: number;
//   y: number;
//   value: string;
// };

// export default function PdfSigner() {
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [fields, setFields] = useState<Field[]>([]);
  
//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     const newField: Field = {
//       id: fields.length + 1,
//       type: "text", // Change to signature if needed
//       x: e.clientX,
//       y: e.clientY,
//       value: ""
//     };
//     setFields([...fields, newField]);
//   };

//   const saveFields = () => {
//     const json = JSON.stringify(fields, null, 2);
//     const blob = new Blob([json], { type: "application/json" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "fields.json";
//     link.click();
//   };

//   return (
//     <div className="flex flex-col items-center p-4">
//       <button onClick={saveFields} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Save Fields</button>
//       <div className="border rounded shadow p-4 relative" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
//         <Document file="/assets/pdf/apoalim.pdf" onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
//           {[...Array(numPages)].map((_, i) => (
//             <Page key={i} pageNumber={i + 1} className="border" />
//           ))}
//         </Document>
//         <DndContext>
//           {fields.map((field) => (
//             <DraggableField key={field.id} field={field} setFields={setFields} />
//           ))}
//         </DndContext>
//       </div>
//     </div>
//   );
// }

// function DraggableField({ field, setFields }: { field: Field; setFields: React.Dispatch<React.SetStateAction<Field[]>> }) {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: field.id });

//   return (
//     <input
//       ref={setNodeRef}
//       {...listeners}
//       {...attributes}
//       className="absolute border p-1 bg-white"
//       style={{ left: field.x, top: field.y, transform: `translate(${transform?.x || 0}px, ${transform?.y || 0}px)` }}
//       value={field.value}
//       onChange={(e) => {
//         setFields((prevFields) =>
//           prevFields.map((f) => (f.id === field.id ? { ...f, value: e.target.value } : f))
//         );
//       }}
//     />
//   );
// }
