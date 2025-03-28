"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";


interface CategoryType {
  id: number;
  category_type: string;
  link?: string;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/categorytype")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="p-4 shadow-md border rounded-lg">
            <h2 className="text-lg font-semibold">{category.category_type}</h2>      
            
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mx-auto mb-4">
              
              <Image src="/assets/images/svg/home.svg"
                     alt="home"
                     width={100} height={100}
              />
            </div>
            
            
               
                <Link href={`/home/${category.link}`}  >
                <div className="mt-4 bg-[#1d75a1] hover:bg-[#a39d8f] text-[#e5e4e3] font-bold py-2 px-4 rounded-full w-full transition-colors" >
               
                למידע נוסף 
                </div>
               
                </Link>
             
           
          </div>
        ))}
      </div>
    </div>
  );
}










//se server"
// "use client"

// import Link from "next/link";


// export default async function Home() {
//     const response =await fetch ("http://localhost:3000/api/categorytype"

//     );
//   const categorytype=await response.json();

//   return(
//    <>

//     <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-6">




//    {categorytype.map((m:any)=> (
//           <div key={m.id}>
            
//       <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm transition-transform transform hover:scale-105 hover:shadow-2xl">
//       {/* אייקון או תמונה */}
//       <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mx-auto mb-4">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-8 w-8 text-blue-600"
//           viewBox="0 0 24 24"
//           fill="currentColor"
//         >
//           <path d="M10.9 2.1c.6-.4 1.6-.4 2.2 0l8.1 5.2c.6.4 1 1 1 1.7v9.4c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V9c0-.7.4-1.3 1-1.7l8.1-5.2zm1.1 1.6L4 8.9V18h16V8.9l-8-5.2zM12 12c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3z" />
//         </svg>
//       </div>

//       {/* כותרת */}
   
//       <h2 className="text-lg font-semibold text-gray-800 text-center"  >{m.category_type}</h2>
  

//       {/* תיאור */}
//       <p className="text-gray-600 text-sm text-center mt-2">
//         פתרון אידיאלי לרוכשי דירה ראשונה. תנאים מצוינים וריבית נמוכה.
//       </p>

//       {/* כפתור */}
//       <div className="mt-4 bg-[#1d75a1] hover:bg-blue-700 text-[#e5e4e3] font-bold py-2 px-4 rounded-full w-full transition-colors" >
      
//       <Link href={`/home/${m.link}`}  >
//       למידע נוסף 
//       </Link>
//       </div>
      
//     </div>
             
             
//           </div>
//          )) }

// </div>


//     </>


//   )



// }


   