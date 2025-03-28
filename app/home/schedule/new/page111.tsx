"use client"

import NameIcon from "@/app/svgFiles/name";
import MorgyIco from "@/app/svgFiles/morgy";
import MailIcon from "@/app/svgFiles/mail";
import PhoneIcon from "@/app/svgFiles/phone";

import { useSearchParams } from 'next/navigation';
//import { FormEvent } from "react";
import { useState } from "react";

export default function NewAppointment({params}:any){
  
  const searchParams = useSearchParams();
  const selectedDate = searchParams.get('selectedDate');
  const selectedTime = searchParams.get('selectedTime');

  const date_zoom=selectedDate?.valueOf();
  const hour_zoom=selectedTime?.valueOf();

  const [formData, setFormData] = useState({ name: "", email: "", cell: "",zoom_comment:"",date_zoom:"",hour_zoom:""});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.message || "Thank you for contacting us!");
        setFormData({ name: "", email: "", cell: "",zoom_comment:"",date_zoom:"",hour_zoom:""});
     
 
     
      } else {
        setResponseMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setResponseMessage("Error submitting the form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };








  
  // const handleSubmit=async (e:FormEvent<HTMLFormElement>)=>{
  //     e.preventDefault();
  //     const {leads}=Object.fromEntries(new FormData(e.currentTarget)); 

  //     await fetch("http://localhost:3000/api/leads",{
  //        method:"post",
  //        body:JSON.stringify({leads}),

  //     });
  
  // };
  
  
  
  
  
  
  return (
    <>
      
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
      {/* קביעת פגישה      */}

           
      <div className="w-full md:w-1/2 p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
        קביעת פגישת זום
        </h2>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
       
        </h2>
      
        <form onSubmit={handleSubmit}  className="space-y-4">
             <input
              name="date_zoom"
              type="hidden"
              readOnly
              value={date_zoom}
              onChange={handleChange}
              />
              <input
              name="hour_zoom"
              type="hidden"
              readOnly
              value={hour_zoom}
              onChange={handleChange}
     
              />


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
              onChange={handleChange}
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
              name="email"
              onChange={handleChange}
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
              htmlFor="cell"
              className="block text-sm font-medium text-gray-700"
            >
            טלפון
            </label>
            <input
              type="text"
              placeholder="טלפון "
              name="cell"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:bg-orange-50 "
              onChange={handleChange}
            />
          </div>
         
          {/* zoom_comment*/}
          <div>
            <label
              htmlFor="zoom_comment"
              className="block text-sm font-medium text-gray-700"
            >
             משהו  נוסף שתרצה להוסיף
            </label>
            <textarea
              onChange={handleChange}
              name="zoom_comment"
              rows={4}
              placeholder="כתוב את הודעתך כאן..."
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:bg-orange-50  "
            ></textarea>
          </div>



          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#1d75a1] text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            קבע פגישה
          </button>
        </form>
      </div>

      {/* צד SVG */}
      <div className="hidden md:flex w-1/2 bg-[#1d75a1] items-center justify-center relative  ">
          < div className="absolute  left-3 top-2  w-[86px] h-[86px] text-white">
                <MorgyIco/>          
          </div>
          < div className="absolute right-3 top-4">
                <h1 className="text-3xl text-white"> מורגי- משכנתא מכל הלב  </h1>
          </div>
          <div className="mx-5 text-white text-pretty text-xl">
                  <p   className="text-wrap " >
                    מייל אישור הפגישה בתאריך 
                  
                    <span> {selectedDate} </span>
                   בשעה 
               
                   <span> {selectedTime} </span>
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
  )
}
