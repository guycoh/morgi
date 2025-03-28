///assets/pdf/apoalim.pdf

"use client"


import React, { useState } from "react";

const DraggableElements = () => {
  // רשימת האלמנטים עם המיקומים שנטענים מתוך הקובץ
  const [elements, setElements] = useState([
    { id: "name", type: "input", label: "שם", top: 50, left: 50 },
    { id: "email", type: "input", label: "אימייל", top: 150, left: 50 },
    { id: "phone", type: "input", label: "טלפון", top: 250, left: 50 },
    { id: "submit", type: "button", label: "שלח", top: 350, left: 50 },
  ]);

  // פונקציה להתחלת גרירה
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("elementId", id);
  };

  // פונקציה לטיפול בשחרור האלמנט
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("elementId");
    const x = e.clientX;
    const y = e.clientY;

    setElements((prev) =>
      prev.map((el) =>
        el.id === id ? { ...el, top: y - 20, left: x - 50 } : el
      )
    );
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // פונקציה להדפסת המיקומים לקונסול
  const handleSavePositions = () => {
    console.log("העתק את הנתונים והדבק בקובץ ה-TSX:");
    console.log(JSON.stringify(elements, null, 2));
  };

  return (
    <div
      className="relative w-screen h-screen bg-gray-100"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {elements.map((el) =>
        el.type === "input" ? (
          <input
            key={el.id}
            type="text"
            placeholder={el.label}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, el.id)}
            className="absolute p-2 border border-gray-400 bg-white"
            style={{ top: el.top, left: el.left }}
          />
        ) : (
          <button
            key={el.id}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, el.id)}
            className="absolute p-2 bg-blue-500 text-white rounded"
            style={{ top: el.top, left: el.left }}
          >
            {el.label}
          </button>
        )
      )}

      {/* כפתור לשמירת המיקומים */}
      <button
        onClick={handleSavePositions}
        className="absolute bottom-10 right-10 p-3 bg-green-500 text-white rounded"
      >
        שמור מיקומים
      </button>
    </div>
  );
};

export default DraggableElements;













// import React, { useState, useRef, useEffect } from "react";
// import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
// import "pdfjs-dist/build/pdf.worker.entry";

// GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js"; // נתיב ה-worker של PDF.js

// const PdfCanvasForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });
//   const [draggedField, setDraggedField] = useState<string | null>(null);
//   const [positions, setPositions] = useState({
//     name: { top: 100, left: 50 },
//     email: { top: 150, left: 50 },
//     phone: { top: 200, left: 50 },
//   });

//   const containerRef = useRef<HTMLDivElement>(null);
//   const pdfRef = useRef<HTMLDivElement>(null);

//   // טיפול בהתחלת הגרירה
//   const handleDragStart = (e: React.DragEvent, fieldName: string) => {
//     setDraggedField(fieldName);
//     e.dataTransfer.setData("fieldName", fieldName);
//   };

//   // טיפול בהנחת השדה
//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     if (!draggedField) return;

//     const x = e.clientX;
//     const y = e.clientY;

//     setPositions((prev) => ({
//       ...prev,
//       [draggedField]: { top: y - containerRef.current!.offsetTop, left: x - containerRef.current!.offsetLeft },
//     }));
//   };

//   // טיפול בגרירה
//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault(); // חייב כדי לאפשר לגרור
//   };

//   // Render PDF
//   const renderPDF = async () => {
//     try {
//       const pdf = await getDocument("/assets/pdf/apoalim.pdf").promise;
//       const numPages = pdf.numPages;
//       const scale = 1.5; // תאם את הגודל בהתאם לצורך

//       const container = pdfRef.current;
//       if (!container) return;

//       container.innerHTML = ""; // מנקה את המיכל לפני rendering מחדש של ה־PDF
//       console.log("PDF Loaded Successfully!");

//       for (let pageNum = 1; pageNum <= numPages; pageNum++) {
//         const page = await pdf.getPage(pageNum);
//         const viewport = page.getViewport({ scale });

//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d");
//         canvas.width = viewport.width;
//         canvas.height = viewport.height;

//         const renderContext = {
//           canvasContext: context!,
//           viewport: viewport,
//         };
//         await page.render(renderContext).promise;

//         const pageContainer = document.createElement("div");
//         pageContainer.className = "relative"; // Ensures absolute positioning of fields over canvas
//         pageContainer.style.width = `${viewport.width}px`;
//         pageContainer.style.height = `${viewport.height}px`;

//         pageContainer.appendChild(canvas);
//         container.appendChild(pageContainer);
//       }
//     } catch (error) {
//       console.error("Error loading PDF:", error);
//     }
//   };

//   // render השדות
//   const renderFields = () => {
//     return (
//       <>
//         <input
//           type="text"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           className="absolute bg-white p-2 border border-gray-400 pointer-events-auto"
//           style={{
//             top: `${positions.name.top}px`,
//             left: `${positions.name.left}px`,
//             width: "200px",
//             zIndex: 10, // Making sure fields are above the PDF
//           }}
//           placeholder="שם"
//           draggable="true"
//           onDragStart={(e) => handleDragStart(e, "name")}
//         />

//         <input
//           type="email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           className="absolute bg-white p-2 border border-gray-400 pointer-events-auto"
//           style={{
//             top: `${positions.email.top}px`,
//             left: `${positions.email.left}px`,
//             width: "200px",
//             zIndex: 10, // Making sure fields are above the PDF
//           }}
//           placeholder="אימייל"
//           draggable="true"
//           onDragStart={(e) => handleDragStart(e, "email")}
//         />

//         <input
//           type="tel"
//           value={formData.phone}
//           onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//           className="absolute bg-white p-2 border border-gray-400 pointer-events-auto"
//           style={{
//             top: `${positions.phone.top}px`,
//             left: `${positions.phone.left}px`,
//             width: "200px",
//             zIndex: 10, // Making sure fields are above the PDF
//           }}
//           placeholder="טלפון"
//           draggable="true"
//           onDragStart={(e) => handleDragStart(e, "phone")}
//         />
//       </>
//     );
//   };

//   useEffect(() => {
//     renderPDF();
//   }, []);

//   return (
//     <div
//       className="relative w-full max-w-3xl mx-auto"
//       onDrop={handleDrop}
//       onDragOver={handleDragOver}
//       ref={containerRef}
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "100%",
//         overflow: "hidden", // מבטיח שאין גלילה
//       }} 
//     >
//       <div
//         ref={pdfRef}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           zIndex: 1,
//         }}
//       />
//       {renderFields()}
//     </div>
//   );
// };

// export default PdfCanvasForm;
