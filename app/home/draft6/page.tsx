"use client";

import { useAuth } from "@/app/context/AuthContext";
export default function UserInfo() {
  const { user, logout } = useAuth();

  console.log("User Data:", user); // בדיקה - לראות אם יש מידע על המשתמש

  if (!user) {
    return <div>אתה לא מחובר. <button>התחבר כאן</button></div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
 
    </div>
  );
}
















