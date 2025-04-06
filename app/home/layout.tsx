'use client'

import {Nav} from "./components/nav";
import {Footer}from "./components/footer";
import FloatingButton from "./components/contact";

export default function HomeLayout({
  children,


}:{
  children:React.ReactNode;
}
){
  return (
  <>
  <div className="min-h-screen flex flex-col">
   <Nav/>
   <FloatingButton/>
   <main className="flex-grow">
   {children}
   </main>
   <Footer/>
 
   </div>
   </>

  );



}