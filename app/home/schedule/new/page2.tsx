"use client"

import NameIcon from "@/app/svgFiles/name";
import MorgyIco from "@/app/svgFiles/morgy";
import MailIcon from "@/app/svgFiles/mail";
import PhoneIcon from "@/app/svgFiles/phone";


const NewAppointment= () => {
    return ( 


<>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* קביעת פגישה      */}

             
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
          קביעת פגישת זום
          </h2>
          <form className="space-y-4">
        
         {/* שם*/}
            <div className="relative">
            < div className="absolute bottom-1 left-1  w-[36px] h-[36px]">
                  <NameIcon/>          
            </div>
             
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                שם מלא
              </label>
              <input
                type="text"
                name="name"
                placeholder="הכנס שם מלא"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:bg-orange-50  "
              />
            </div>
           
           
            {/* מייל*/}
           
            <div className="relative" >
            < div className="absolute bottom-1 left-1  w-[36px] h-[36px]">
                  <MailIcon/>          
            </div>
              
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                דוא"ל
              </label>
              <input
                type="email"
                id="email"
               placeholder="כתובת מייל "
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:bg-orange-50   "
              />
            </div>
            {/* טלפון*/}
            <div className="relative" >
              
            < div className="absolute bottom-1 left-1  w-[36px] h-[36px]">
                  <PhoneIcon/>          
            </div>
              
              
              
              <label
                htmlFor=" phone"
                className="block text-sm font-medium text-gray-700"
              >
              טלפון
              </label>
              <input
                type="text"
              placeholder="טלפון "
               
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:bg-orange-50 "
              />
            </div>
           
           
           
           
           
           
           
           
           
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
               משהו  נוסף שתרצה להוסיף
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="כתוב את הודעתך כאן..."
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:bg-orange-50  "
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              קבע פגישה
            </button>
          </form>
        </div>

        {/* צד SVG */}
        <div className="hidden md:flex w-1/2 bg-blue-500 items-center justify-center relative  ">
            < div className="absolute  left-3 top-2  w-[86px] h-[86px] text-white">
                  <MorgyIco/>          
            </div>
            < div className="absolute right-3 top-4">
                  <h1 className="text-3xl text-white"> מורגי- משכנתא מכל הלב  </h1>
            </div>
            <div className="mx-5 text-white text-pretty text-2xl">
                    <p   className="text-wrap " >
                      מייל אישור הפגישה בתאריך 
                    
                      <span> 04/02/2025 </span>
                     בשעה 
                     
                     <span> 16:00 </span>
                      יישלח אליך במייל
                    </p>
                    <br></br>
                    <p>
                    חשוב להיות במקום שקט בפגישה ללא הפרעות כדי שנוכל לתת לך את השרות הטוב ביותר.
                    </p>
            </div>

        </div>





      </div>
    </div>
      
      
      
      
      
      
      </>


     );
}
 
export default NewAppointment