///assets/pdf/form.pdf

"use client"

// import React, { useState, useEffect } from 'react';

// const PDFViewer: React.FC = () => {
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null);

//   useEffect(() => {
//     // Replace 'your-pdf-file.pdf' with the actual path to your PDF file
//     setPdfUrl('/assets/pdf/form.pdf');
//   }, []);

//   return (
//     <div>
//       {pdfUrl && (
//         <iframe
//           src={pdfUrl}
//           width="100%"
//           height="600px"
//           title="PDF Viewer"
//         />
//       )}
//     </div>
//   );
// };

// export default PDFViewer;

import React, { useState, useEffect } from 'react';

const PDFViewer: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    // Replace 'your-pdf-file.pdf' with the actual path to your PDF file
    setPdfUrl('/assets/pdf/apoalim.pdf');
  }, []);

  

  return (
    <div className="relative w-full h-screen">
    
    
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          title="PDF Viewer"
        />
      )}

    {/* אלמנטים שימוקמו מעל ה-PDF */}
  <div className="absolute top-10 left-10 z-10">
    <input type="text" placeholder="הקלד כאן" className="border p-2" />
  </div>

  <button className="absolute top-20 left-10 z-10 bg-blue-500 text-white px-4 py-2 rounded">
    שלח
  </button>

      
    </div>
  );
};

export default PDFViewer;
