

//git config --global user.name "Guy Cohen"



// components/Signature.tsx
// import React, { useRef } from 'react';
// import SignatureCanvas from 'signature-canvas';

// const Signature = () => {
//   const sigCanvas = useRef<SignatureCanvas | null>(null);

//   const clearSignature = () => {
//     if (sigCanvas.current) {
//       sigCanvas.current.clear();
//     }
//   };

//   const saveSignature = () => {
//     if (sigCanvas.current) {
//       const dataUrl = sigCanvas.current.toDataURL();
//       console.log('Saved signature as:', dataUrl);
//       // תוכל להוריד או לשלוח את התמונה כאן
//     }
//   };

//   return (
//     <div className="signature-container">
//       <SignatureCanvas
//         ref={sigCanvas}
//         penColor="black"
//         backgroundColor="white"
//         canvasProps={{
//           width: 400,
//           height: 200,
//           className: 'signature-canvas',
//         }}
//       />
//       <div className="buttons">
//         <button onClick={clearSignature} className="btn-clear">Clear</button>
//         <button onClick={saveSignature} className="btn-save">Save</button>
//       </div>
//     </div>
//   );
// };

// export default Signature;
