"use client"
import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Receipt = () => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const generatePDF = async () => {
    const element = receiptRef.current;
    const button = buttonRef.current;
    if (!element) return;

    if (button) button.style.display = "none";
    
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("receipt.pdf");
    if (button) button.style.display = "block";
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-300" ref={receiptRef}>
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <div className="flex items-center">
          <img src="/logo.svg" alt="לוגו" className="w-20 h-20 mr-4" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">מורגי משכנתאות</h2>
            <p className="text-sm text-gray-600">עוסק פטור מס׳ 28979896</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">תאריך: 18/03/2025</p>
          <p className="text-sm text-gray-600">מס׳ קבלה: 00123</p>
        </div>
      </div>
      
      {/* Customer Info */}
      <div className="mb-6">
        <p className="font-medium text-lg">לכבוד:</p>
        <p className="text-gray-700 text-lg">שם הלקוח</p>
      </div>

      {/* Items Table */}
      <table className="w-full border-collapse border border-gray-300 text-md mb-6">
        <thead>
          <tr className="bg-gray-100 text-gray-800">
            <th className="border p-3">תיאור</th>
            <th className="border p-3">כמות</th>
            <th className="border p-3">סה"כ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-3">שירות לדוגמה</td>
            <td className="border p-3 text-center">1</td>
            <td className="border p-3 text-center">₪500</td>
          </tr>
        </tbody>
      </table>

      {/* Total */}
      <div className="text-right mb-6">
        <p className="font-bold text-xl text-gray-800">סה"כ לתשלום: ₪500</p>
      </div>

      {/* Footer */}
      <div className="border-t pt-6 text-md text-gray-700">
        <p className="font-semibold">תודה על העסקה!</p>
        <p>כתובת: שמואל הנגיד 6, רמת השרון</p>
        <p>טלפון: 052-3684844 | אימייל: guycoh@outlook.co.il</p>
      </div>

      {/* PDF Button */}
      <button 
        ref={buttonRef} 
        onClick={generatePDF} 
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
        הורד כ-PDF
      </button>
    </div>
  );
};

export default Receipt;





// import { useEffect, useState } from "react";
// import Image from "next/image";

// const images = ["/assets/images/discount.png",
//                 "/assets/images/hapoalim.png",
//                 "/assets/images/leumi.png",
//                 "/assets/images/mizrachi.png",
//                 "/assets/images/image5.jpg"];

// const ImageTicker = () => {
//   const [position, setPosition] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPosition((prev) => (prev <= -100 ? 0 : prev - 0.1)); // חזרה ללולאה אין-סופית
//     }, 20); // מהירות תנועה

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full overflow-hidden bg-gray-100 p-2 border-t border-b">
//       <div
//         className="flex whitespace-nowrap"
//         style={{ transform: `translateX(${position}%)` }}
//       >
//         {[...images, ...images].map((src, index) => ( // שכפול הרשימה למעבר חלק
//           <div key={index} className="mx-4">
//             <Image src={src} alt={`image-${index}`} width={100} height={100} className="rounded-lg shadow-md" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageTicker;






















// import { useEffect, useState } from "react";

// const NewsTicker = () => {
//   const texts = ["חדשות 1", "עדכון חשוב", "מבזק מיוחד", "כותרת היום"];
//   const [position, setPosition] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPosition((prev) => (prev <= -100 ? 0 : prev - 0.2)); // ברגע שיוצא מהמסך, חוזר להתחלה
//     }, 20); // מהירות תנועה

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full overflow-hidden bg-gray-100 p-2 border-t border-b">
//       <div
//         className="flex whitespace-nowrap"
//         style={{ transform: `translateX(${position}%)` }}
//       >
//         {[...texts, ...texts].map((text, index) => ( // כפול למעבר חלק
//           <span key={index} className="mx-4 text-lg font-bold text-red-600">
//             {text}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NewsTicker;


























// import Image from "next/image"
// //import logo 


// const MyImg = () => {
//   return (
//       <>
  
//   <Image src="/112.jpg" alt="fffff" width={100} height={100}  />
  
  
//   <Image src="/assets/logo.svg" alt="ww" width={100} height={100}  />

//   <Image src="/assets/14.jpg" alt="rrrr" width={300} height={300}  />
  
//   </>
//   )
// }

// export default MyImg



// export const MyImg = () => {
//   return (
//   <>
  
//   <Image src="/cake.jpg" alt="fffff"/>
  
  
  
  
//   </>
//   )
// }
