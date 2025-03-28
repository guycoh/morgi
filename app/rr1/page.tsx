// "use client";

// import { useState } from "react";

// import { useRouter } from "next/navigation";

// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );


// export default function Login() {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     if (!email || !password) {
//       setError("אנא מלא את כל השדות.");
//       setLoading(false);
//       return;
//     }

//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       setError("האימייל או הסיסמה אינם נכונים.");
//     } else {
//       router.push("/dashboard"); // ניתוב לעמוד אחרי התחברות מוצלחת
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-center mb-4">כניסה למערכת</h2>
//         <form onSubmit={handleLogin} className="flex flex-col gap-4">
//           <input
//             type="email"
//             placeholder="אימייל"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="p-2 border rounded-md"
//             required
//           />
//           <input
//             type="password"
//             placeholder="סיסמה"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="p-2 border rounded-md"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-400"
//             disabled={loading}
//           >
//             {loading ? "מתחבר..." : "התחבר"}
//           </button>
//           {error && <p className="text-red-500 text-center">{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// }
