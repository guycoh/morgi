// app/auth/callback/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AuthCallback() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect('/welcome')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>מתבצע אימות...</p>
    </div>
  )
}
