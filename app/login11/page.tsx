"use client"
import { login, signup } from './actions'
import { Auth_client } from '@/components/auth_client'
import { Nav } from "../home/components/nav";

export default function LoginPage() {
  return (
<>   
  <Nav/>  

<div className="flex justify-center items-center h-screen bg-gray-100">

    <div className="bg-white p-8 rounded-lg shadow-md w-96    ">
       <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h2>
    
        <form>
        <div className="mb-4">  
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2" >Email:</label>
            <input id="email"
                   name="email"
                   type="email"
                   required 
                   placeholder="Enter your email"
                   className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                   />
        </div>
        <div className="mb-6">

            <label htmlFor="password">Password:</label>
            <input id="password"
                   name="password" 
                   type="password"
                   required
                   placeholder="Enter your password"
                   className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
        </div>
        
        <button formAction={login}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        >Log in</button>
      
        <button formAction={signup}>Sign up</button>
        
        
            <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
            </div>
        
        
        
        
        </form>
<Auth_client/>
    </div>
</div>
</>
  )
}





   
