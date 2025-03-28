
import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
 

  const { email, password, name } = await req.json();

  // יצירת משתמש חדש עם Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const user = data.user;
  if (!user) {
    return NextResponse.json({ error: "User registration failed" }, { status: 500 });
  }

  // שמירת הנתונים בטבלת `users`
  const { error: dbError } = await supabase
    .from("users")
    .insert([{ id: user.id, name, email, role_id: 2 }]);

  if (dbError) {
    return NextResponse.json({ error: "Failed to save user in database" }, { status: 500 });
  }

  return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
}























// import { NextResponse } from "next/server";
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );


// export async function POST(req: Request) {
//   const { email, password, full_name, role_id } = await req.json();

//   // יצירת המשתמש ב-Supabase Authentication
//   const { data, error } = await supabase.auth.signUp({ email, password });

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }

//   // הכנסת המשתמש לטבלת `users`
//   const { error: userError } = await supabase.from("users").insert([
//     {
//       id: data.user?.id,
//       email,
//       full_name,
//       role_id, // כברירת מחדל, ניתן לשים 3 (משתמש רגיל)
//     },
//   ]);

//   if (userError) {
//     return NextResponse.json({ error: userError.message }, { status: 400 });
//   }

//   return NextResponse.json({
//     message: "User registered successfully!",
//     user: {
//       id: data.user?.id,
//       email,
//       full_name,
//       role_id,
//     },
//   });
// }


// import { NextResponse } from "next/server";
// import { createServerClient } from "@supabase/ssr";

// export async function POST(req: Request) {
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   );

//   const { email, password, name } = await req.json();

//   יצירת משתמש חדש
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: { data: { name } },
//   });

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }

//   return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
// }






