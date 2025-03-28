"use client"

import React, { useRef, useState } from "react";

const SignaturePad = ({ onSave }: { onSave: (signature: string) => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [savedSignature, setSavedSignature] = useState<string | null>(null);

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
      setSavedSignature(dataUrl);
    //  onSave(dataUrl);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto">
      <p className="mb-2 text-gray-600">חתום כאן:</p>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        className="border rounded-lg shadow-md bg-gray-100"
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
      <button onClick={handleSave} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
        שמור חתימה
      </button>
      {savedSignature && <img src={savedSignature} alt="חתימה שמורה" className="mt-4 border rounded-lg shadow-md w-full max-w-xs" />}
    </div>
  );
};
export default SignaturePad