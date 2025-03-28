"use client"
import NameIcon from "@/app/svgFiles/name";

const Draft = () => {
    return (
      <>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* טופס יצירת קשר */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            יצירת קשר
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                שם מלא
              </label>
              <input
                type="text"
                id="name"
                placeholder="הכנס שם מלא"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                דוא"ל
              </label>
              <input
                type="email"
                id="email"
               
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                הודעה
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="כתוב את הודעתך כאן..."
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              שלח הודעה
            </button>
          </form>
        </div>

        {/* צד SVG */}
        <div className="hidden md:flex w-1/2 bg-blue-500 items-center justify-center">
         
        </div>
      </div>
    </div>
      
      
      
      
      
      
      </>
  );
}


 
export default Draft;