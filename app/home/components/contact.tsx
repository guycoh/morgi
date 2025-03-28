//import { FaPhoneAlt } from "react-icons/fa"; // אייקון טלפון
import Image from "next/image"


const FloatingButton = () => {
  return (
    <div className="fixed bottom-56 left-4 z-50">
      <button
        className="flex items-center px-4 py-3 text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
        onClick={() => alert("מתקשר ליועץ...")}
      >
       <Image src="/assets/svgFiles/phone.svg" alt="phone" width={30} height={30}  />
      </button>
    </div>
  );
};

export default FloatingButton;