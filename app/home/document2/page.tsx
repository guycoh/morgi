"use client"
import React, { useRef, useState } from 'react';

const SignaturePad = ({ onClose }: { onClose: () => void }) => {
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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    setLastX(x);
    setLastY(y);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    startDrawing(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    draw(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseUp = () => setIsDrawing(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      startDrawing(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || e.touches.length === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    draw(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "signature.png";
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-2">חתום כאן</h2>
        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          className="border rounded-lg w-full touch-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setIsDrawing(false)}
        />
        <div className="flex justify-between mt-4">
          <button onClick={saveSignature} className="bg-blue-500 text-white px-4 py-2 rounded-lg">שמור חתימה</button>
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">סגור</button>
        </div>
      </div>
    </div>
  );
};

const SignatureForm = () => {
  const [showPad, setShowPad] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <button onClick={() => setShowPad(true)} className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg">
        חתום כאן
      </button>
      {showPad && <SignaturePad onClose={() => setShowPad(false)} />}
    </div>
  );
};

export default SignatureForm;
