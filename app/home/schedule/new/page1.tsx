"use client"

import NameIcon from "@/app/svgFiles/name";

const NewAppointment1= () => {
    return ( 
<>





<form>

    {/*שם   */}
    <div className="mx-3">
              
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                   שם 
              </label>

             <div className="relative"  >
             
                        <div className="w-[16px] h-[16px] absolute left-4" >
                        <NameIcon />
                        </div>
           
                  <input 
                   name="name"                 
                   required                
                   type="text"               
                   placeholder="שם"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:bg-orange-50 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "/>  

             </div>


    </div> 

    {/*אימייל*/}
    <div className="mx-3">
              
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 מייל
              </label>
                  <input 
                  type="email"
                   name="name"                 
                   required                
                           
                   placeholder="מייל"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:bg-orange-50 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "/>        
    </div> 


    {/*טלפון*/}
    <div className="mx-3">
              
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
               טלפון
              </label>
                  <input 
                   name="name"                 
                   required                
                   type="tel"                            
                   placeholder="מייל"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:bg-orange-50 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "/>        
    </div> 


    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your comment</label>
    <textarea id="comment"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:bg-orange-50 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "placeholder="Write a comment..."  ></textarea>

    </form>
   









</>


     );
}
 
export default NewAppointment1