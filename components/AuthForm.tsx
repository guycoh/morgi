// "use_client"

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AuthForm({ isRegister = false }: { isRegister?: boolean }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
//       const body = isRegister ? { email, password, name } : { email, password };

//       const res = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "שגיאה לא ידועה");

//       router.push("/home"); // הפניה למסך התחברות לאחר הרשמה מוצלחת
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">{isRegister ? "הרשמה" : "התחברות"}</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {isRegister && (
//           <input
//             type="text"
//             placeholder="שם מלא"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-2 border rounded-md"
//             required
//           />
//         )}
//         <input
//           type="email"
//           placeholder="אימייל"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 border rounded-md"
//           required
//         />
//         <input
//           type="password"
//           placeholder="סיסמה"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded-md"
//           required
//         />
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
//           {isRegister ? "הרשמה" : "התחברות"}
//         </button>
//       </form>
//     </div>
//   );
// }
