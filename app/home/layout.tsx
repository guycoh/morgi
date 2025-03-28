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
 
   <Nav/>
   <FloatingButton/>
  
   {children}

   <Footer/>
 
  
   </>

  );



}