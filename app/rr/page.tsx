// "use client"

// import { useState } from 'react';

// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );
// function SignUp() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
 
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
  



//   const validatePassword = (password: string) => {
//     const minLength = 8;
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasNumber = /[0-9]/.test(password);

//     if (password.length < minLength) return 'הסיסמה חייבת להיות לפחות 8 תווים.';
//     if (!hasUpperCase) return 'הסיסמה חייבת לכלול לפחות אות גדולה אחת.';
//     if (!hasLowerCase) return 'הסיסמה חייבת לכלול לפחות אות קטנה אחת.';
//     if (!hasNumber) return 'הסיסמה חייבת לכלול לפחות מספר אחד.';
    
//     return null;
//   };

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     if (password !== confirmPassword) {
//       setError('הסיסמאות אינן תואמות.');
//       return;
//     }

//     const passwordError = validatePassword(password);
//     if (passwordError) {
//       setError(passwordError);
//       return;
//     }

//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (error) {
//       setError(error.message);
//     } else {
//       setSuccess('נשלח אימייל אישור. בדוק את תיבת הדואר שלך.');
//     }
//   };

//   return (
//     <form onSubmit={handleSignUp} className="flex flex-col gap-4 max-w-sm mx-auto p-4 border rounded-lg shadow-md">
//       <input
//         type="email"
//         placeholder="אימייל"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="p-2 border rounded-md"
//         required
//       />
//       <input
//         type="password"
//         placeholder="סיסמה"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="p-2 border rounded-md"
//         required
//       />
//       <input
//         type="password"
//         placeholder="אישור סיסמה"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//         className="p-2 border rounded-md"
//         required
//       />
//       <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
//         הרשמה
//       </button>
//       {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-500">{success}</p>}
//     </form>
//   );
// }

// export default SignUp;
