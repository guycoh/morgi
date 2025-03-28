import PdfViewer from "./PdfViewer";
export default function PdfPage() {
 // const pdfUrl = "/assets/pdf/apoalim.pdf"; 
    const pdfUrl = "/assets/pdf/contract.pdf";
  return ( 

    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      
      <h1 className="text-2xl font-bold mb-4">מציג PDF</h1>
      <PdfViewer pdfUrl={pdfUrl} />
    </div>
  );
}
