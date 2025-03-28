import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // רענון הסשן
    const { data: { user }, error } = await supabase.auth.getUser();

    // נתיבים מוגנים - דרושה התחברות
    if (request.nextUrl.pathname.startsWith("/protected") && error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // הפניה מהעמוד הראשי אם המשתמש מחובר
    if (request.nextUrl.pathname === "/" && user) {
      return NextResponse.redirect(new URL("/protected", request.url));
    }

    // בדיקת הרשאות (Roles)
    let role_id = null;
    if (user) {
      const { data: userData, error: roleError } = await supabase
        .from("users")
        .select("role_id")
        .eq("id", user.id)
        .single();

      if (roleError || !userData) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      role_id = userData.role_id;
    }

    // הגבלת גישה למנהלים בלבד
    if (request.nextUrl.pathname.startsWith("/admin") && role_id !== 1) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return response;
  } catch (e) {
    console.error("Middleware error:", e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};


// import { createServerClient } from "@supabase/ssr";
// import { type NextRequest, NextResponse } from "next/server";

// export const updateSession = async (request: NextRequest) => {
//   try {
//     let response = NextResponse.next({
//       request: {
//         headers: request.headers,
//       },
//     });

//     const supabase = createServerClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//       {
//         cookies: {
//           getAll() {
//             return request.cookies.getAll();
//           },
//           setAll(cookiesToSet) {
//             cookiesToSet.forEach(({ name, value }) =>
//               request.cookies.set(name, value),
//             );
//             response = NextResponse.next({ request });
//             cookiesToSet.forEach(({ name, value, options }) =>
//               response.cookies.set(name, value, options),
//             );
//           },
//         },
//       },
//     );

//     // רענון סשן
//     const { data: { user }, error } = await supabase.auth.getUser();

//     // נתיבים מוגנים - משתמש חייב להיות מחובר
//     if (request.nextUrl.pathname.startsWith("/protected") && error) {
//       return NextResponse.redirect(new URL("/sign-in", request.url));
//     }

//     // דף הבית: הפניה ל-/protected אם המשתמש מחובר
//     if (request.nextUrl.pathname === "/" && user) {
//       return NextResponse.redirect(new URL("/protected", request.url));
//     }

//     // בדיקת תפקידים (roles)
//     if (user) {
//       const { data: userData, error: roleError } = await supabase
//         .from("users")
//         .select("role_id")
//         .eq("id", user.id)
//         .single();

//       if (!userData || roleError) {
//         return NextResponse.redirect(new URL("/unauthorized", request.url));
//       }

//       // הגבלת גישה לפי תפקיד
//       if (request.nextUrl.pathname.startsWith("/admin") && userData.role_id !== 1) {
//         return NextResponse.redirect(new URL("/unauthorized", request.url));
//       }
//     }

//     return response;
//   } catch (e) {
//     return NextResponse.next({
//       request: {
//         headers: request.headers,
//       },
//     });
//   }
// };





























// import { createServerClient } from "@supabase/ssr";
// import { type NextRequest, NextResponse } from "next/server";

// export const updateSession = async (request: NextRequest) => {
//   // This `try/catch` block is only here for the interactive tutorial.
//   // Feel free to remove once you have Supabase connected.
//   try {
//     // Create an unmodified response
//     let response = NextResponse.next({
//       request: {
//         headers: request.headers,
//       },
//     });

//     const supabase = createServerClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//       {
//         cookies: {
//           getAll() {
//             return request.cookies.getAll();
//           },
//           setAll(cookiesToSet) {
//             cookiesToSet.forEach(({ name, value }) =>
//               request.cookies.set(name, value),
//             );
//             response = NextResponse.next({
//               request,
//             });
//             cookiesToSet.forEach(({ name, value, options }) =>
//               response.cookies.set(name, value, options),
//             );
//           },
//         },
//       },
//     );

//     // This will refresh session if expired - required for Server Components
//     // https://supabase.com/docs/guides/auth/server-side/nextjs
//     const user = await supabase.auth.getUser();

//     // protected routes
//     if (request.nextUrl.pathname.startsWith("/protected") && user.error) {
//       return NextResponse.redirect(new URL("/sign-in", request.url));
//     }

//     if (request.nextUrl.pathname === "/" && !user.error) {
//       return NextResponse.redirect(new URL("/protected", request.url));
//     }

//     return response;
//   } catch (e) {
//     // If you are here, a Supabase client could not be created!
//     // This is likely because you have not set up environment variables.
//     // Check out http://localhost:3000 for Next Steps.
//     return NextResponse.next({
//       request: {
//         headers: request.headers,
//       },
//     });
//   }
// };
