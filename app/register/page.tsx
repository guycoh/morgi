// "use client"

// import { useState, ChangeEvent, FormEvent } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useRouter } from "next/navigation";

// const Signup = () => {
//   const { login } = useAuth();
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     const res = await fetch("/api/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (res.ok) {
//       await login(formData.email, formData.password); // התחברות מיד אחרי הרשמה
//       router.push("/profile"); // הפניה לדף הפרופיל
//     } else {
//       alert(data.error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg mt-10">
//       <h2 className="text-xl font-bold mb-4">Sign Up</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded mt-2"
//           disabled={loading}
//         >
//           {loading ? "Registering..." : "Sign Up"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;



// "use client"
// import AuthForm from "@/components/AuthForm";

// export default function RegisterPage() {
//   return <AuthForm isRegister />;
// }
