"use client"

import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";

interface Field {
  id: string;
  type: "input" | "button";
  label: string;
  top: number;
  left: number;
  width?: number;
  height?: number;
}

interface DraggableElementsProps {
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const DraggableElements: React.FC<DraggableElementsProps> = ({
  fields,
  setFields,
  containerRef,
}) => {
  const [containerSize, setContainerSize] = useState({ width: 1, height: 1 });

  // עדכון של ממדי הטופס (PDF)
  useEffect(() => {
    if (containerRef.current) {
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, [containerRef]);

  // חישוב המיקום מחדש, כולל גלילה של ה-PDF
  const handleDragStop = (id: string, data: any) => {
    if (!containerRef.current) return;

    const pdfElement = containerRef.current;
    const { top, left, width, height } = pdfElement.getBoundingClientRect();
    const scrollTop = pdfElement.scrollTop;

    // מחשבים את המיקום ביחס למסמך
    const relativeX = ((data.x - left) / width) * 100;
    const relativeY = ((data.y + scrollTop - top) / height) * 100;

    // עדכון המיקומים של השדות
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, left: relativeX, top: relativeY } : field
      )
    );
  };

  return (
    <>
      {fields.map((field) => (
        <Rnd
          key={field.id}
          default={{
            x: (field.left / 100) * containerSize.width,
            y: (field.top / 100) * containerSize.height,
            width: field.width || 150,
            height: field.height || 40,
          }}
          bounds="parent"
          onDragStop={(e, d) => handleDragStop(field.id, d)}
          className="absolute bg-white shadow-md border rounded px-2 flex items-center"
        >
          {field.type === "input" ? (
            <input type="text" placeholder={field.label} className="w-full border-none outline-none bg-transparent" />
          ) : (
            <button className="w-full bg-blue-500 text-white py-1 rounded">{field.label}</button>
          )}
        </Rnd>
      ))}
    </>
  );
};

export default DraggableElements;








// import React, { useState } from "react";

// interface Field {
//   id: string;
//   type: "input" | "button";
//   label: string;
//   top: number;
//   left: number;
// }

// interface DraggableElementsProps {
//   fields: Field[];
//   setFields: React.Dispatch<React.SetStateAction<Field[]>>;
// }

// const DraggableElements: React.FC<DraggableElementsProps> = ({ fields, setFields }) => {
//   const handleDragStart = (e: React.DragEvent, id: string) => {
//     e.dataTransfer.setData("elementId", id);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     const id = e.dataTransfer.getData("elementId");
//     const x = e.clientX;
//     const y = e.clientY;

//     setFields((prev) =>
//       prev.map((el) =>
//         el.id === id ? { ...el, top: y - 20, left: x - 50 } : el
//       )
//     );
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//   };

//   return (
//     <div
//       className="absolute inset-0"
//       onDrop={handleDrop}
//       onDragOver={handleDragOver}
//     >
//       {fields.map((el) =>
//         el.type === "input" ? (
//           <input
//             key={el.id}
//             type="text"
//             placeholder={el.label}
//             draggable="true"
//             onDragStart={(e) => handleDragStart(e, el.id)}
//             className="absolute p-2 border border-gray-400 bg-white"
//             style={{ top: el.top, left: el.left }}
//           />
//         ) : (
//           <button
//             key={el.id}
//             draggable="true"
//             onDragStart={(e) => handleDragStart(e, el.id)}
//             className="absolute p-2 bg-blue-500 text-white rounded"
//             style={{ top: el.top, left: el.left }}
//           >
//             {el.label}
//           </button>
//         )
//       )}
//     </div>
//   );
// };

// export default DraggableElements;
