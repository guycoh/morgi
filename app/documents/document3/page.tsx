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
    setPdfUrl('/assets/pdf/form.pdf');
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const openForm1 = () => {
    // Replace 'form1-url' with the actual URL of the first form
    window.open('form1-url', '_blank');
  };

  const openForm2 = () => {
    // Replace 'form2-url' with the actual URL of the second form
    window.open('form2-url', '_blank');
  };

  return (
    <div>
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          title="PDF Viewer"
        />
      )}

      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
      </div>

      <button onClick={openForm1}>Open Form 1</button>
      <button onClick={openForm2}>Open Form 2</button>
    </div>
  );
};

export default PDFViewer;
