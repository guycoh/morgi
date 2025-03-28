"use client"
import { createClient } from "@/utils/supabase/client"
import { useState,useEffect } from "react"
 


export const Auth_client = () => {
 
    const [user,setUser]=useState<any>(null);
   
    

    useEffect(()=>{
    async function getUser() {
        const supabase=createClient();
        const {data,error}=await supabase.auth.getUser()
        if(error || !data?.user) {
          console.log ('no user')
        }else{
           setUser(data.user)

        }
   
    }
     getUser()
    },[])
    
    console.log({user})
    return (
    <div>
    {user?true:false}
  

    </div>
  )
}
