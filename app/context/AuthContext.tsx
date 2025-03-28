// "use client";
// import { createContext, useContext, useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// interface User {
//   id: string;
//   email: string;
//   full_name: string;
//   role_id: number;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const loadUser = async () => {
//       const storedUser = Cookies.get("user");
      
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       } else {
//         // אם אין נתונים בקובץ Cookie, נטען את המשתמש מ-Supabase
//         const { data, error } = await supabase.auth.getUser();

//         if (error) {
//           console.error("Failed to fetch user from Supabase:", error);
//           return;
//         }

//         if (data?.user) {
//           const userData: User = {
//             id: data.user.id,
//             email: data.user.email!,
//             full_name: data.user.user_metadata?.name || "Unknown",
//             role_id: 2, // יש למשוך את ה-role הנכון מה-DB אם חשוב
//           };

//           setUser(userData);
//           Cookies.set("user", JSON.stringify(userData), { expires: 7 });
//         }
//       }
//     };

//     loadUser();
//   }, []);

//   const login = async (email: string, password: string) => {
//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       setUser(data.user);
//       Cookies.set("user", JSON.stringify(data.user), { expires: 7 });
//       Cookies.set("token", data.token, { expires: 7 });
//     } else {
//       alert(data.error);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     Cookies.remove("user");
//     Cookies.remove("token");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };
