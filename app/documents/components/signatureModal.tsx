"use client"

import React, { useRef, useState } from "react";

const SignatureModal = ({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (signature: string) => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  const startDrawing = (x: number, y: number) => {
    setIsDrawing(true);
    setLastX(x);
    setLastY(y);
  };

  const draw = (x: number, y: number) => {
    if (!isDrawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    setLastX(x);
    setLastY(y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleSave = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL();
      onSave(dataUrl);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">חתום כאן:</h2>
        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          className="border rounded-lg shadow-md bg-gray-100 w-full"
          onMouseDown={(e) => startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
          onMouseMove={(e) => draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            startDrawing(touch.clientX, touch.clientY);
          }}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            draw(touch.clientX, touch.clientY);
          }}
          onTouchEnd={stopDrawing}
        ></canvas>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600">בטל</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">שמור</button>
        </div>
      </div>
    </div>
  );
};

export default SignatureModal


// "use client"
// import React, { useRef, useState } from "react";

// const SignatureModal = ({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (signature: string) => void }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [lastX, setLastX] = useState(0);
//   const [lastY, setLastY] = useState(0);

//   const startDrawing = (x: number, y: number) => {
//     setIsDrawing(true);
//     setLastX(x);
//     setLastY(y);
//   };

//   const draw = (x: number, y: number) => {
//     if (!isDrawing || !canvasRef.current) return;
//     const ctx = canvasRef.current.getContext("2d");
//     if (!ctx) return;
//     ctx.beginPath();
//     ctx.moveTo(lastX, lastY);
//     ctx.lineTo(x, y);
//     ctx.stroke();
//     setLastX(x);
//     setLastY(y);
//   };

//   const stopDrawing = () => {
//     setIsDrawing(false);
//   };

//   const handleSave = () => {
//     if (canvasRef.current) {
//       const dataUrl = canvasRef.current.toDataURL();
//       onSave(dataUrl);
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-lg font-semibold mb-2">חתום כאן:</h2>
//         <canvas
//           ref={canvasRef}
//           width={400}
//           height={200}
//           className="border rounded-lg shadow-md bg-gray-100 w-full"
//           onMouseDown={(e) => startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
//           onMouseMove={(e) => draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
//           onMouseUp={stopDrawing}
//           onMouseOut={stopDrawing}
//           onTouchStart={(e) => {
//             const touch = e.touches[0];
//             startDrawing(touch.clientX, touch.clientY);
//           }}
//           onTouchMove={(e) => {
//             const touch = e.touches[0];
//             draw(touch.clientX, touch.clientY);
//           }}
//           onTouchEnd={stopDrawing}
//         ></canvas>
//         <div className="flex justify-end mt-4">
//           <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600">בטל</button>
//           <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">שמור</button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default SignatureModal