"use client"
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const SignaturePad: React.FC<{ onSave: (dataUrl: string) => void }> = ({ onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
  }, []);

  const startDrawing = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setIsDrawing(true);
    setLastX(x);
    setLastY(y);
  };

  const draw = (clientX: number, clientY: number) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    setLastX(x);
    setLastY(y);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => startDrawing(e.clientX, e.clientY);
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => isDrawing && draw(e.clientX, e.clientY);
  const handleMouseUp = () => setIsDrawing(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      startDrawing(touch.clientX, touch.clientY);
    }
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isDrawing && e.touches.length > 0) {
      const touch = e.touches[0];
      draw(touch.clientX, touch.clientY);
    }
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      onSave(dataUrl);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white shadow-lg p-4 rounded-2xl max-w-md mx-auto">
      <p className="mb-2 text-gray-600">חתום כאן:</p>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        className="border rounded-lg touch-none bg-gray-100"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      />
      <Button onClick={saveSignature} className="mt-3">שמור חתימה</Button>
    </div>
  );
};

const SignatureForm = () => {
  const [signature, setSignature] = useState<string | null>(null);
  const [isSigning, setIsSigning] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {!isSigning ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          <label className="block text-gray-700 mb-2">שם מלא:</label>
          <input className="w-full p-2 border rounded-md mb-4" type="text" placeholder="הכנס את שמך" />
          <label className="block text-gray-700 mb-2">חתימה:</label>
          <button onClick={() => setIsSigning(true)} className="w-full p-3 bg-blue-500 text-white rounded-lg">חתום כאן</button>
        </div>
      ) : (
        <SignaturePad onSave={(dataUrl) => { setSignature(dataUrl); setIsSigning(false); }} />
      )}

      {signature && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
          <p className="text-gray-600">החתימה שלך:</p>
          <img src={signature} alt="חתימה" className="mt-2 border rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default SignatureForm;