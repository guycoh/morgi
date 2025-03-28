import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // התחברות למערכת
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  // שליפת מידע נוסף על המשתמש מהטבלה `users`
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("name, role_id,email")
    .eq("id", data.user?.id)
    .single();

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 500 });
  }

  return NextResponse.json({
    message: "Login successful!",
    user: {
      id: data.user?.id,
      email: userData.email,
      name: userData.name,
      role_id: userData.role_id,
    },
  });
}
