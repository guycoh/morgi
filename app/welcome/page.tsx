import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function WelcomePage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    // אם אין משתמש – נשלח לדף הבית או התחברות
    redirect('/home')
  }

  const name = user.user_metadata.full_name || user.email

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-300 text-center">
      <h1 className="text-4xl font-bold mb-4 text-green-900">
        שלום {name}! 👋
      </h1>
      <p className="text-lg text-green-800">ברוך הבא למורגי - אנחנו שמחים שאתה כאן!</p>
    </div>
  )
}
