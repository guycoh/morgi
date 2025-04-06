'use client'

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 px-4">
      <div className="relative bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl border border-blue-200 dark:border-gray-700 rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center transition-all duration-500 hover:shadow-blue-300/30 dark:hover:shadow-blue-800/30">

        {/* Logo */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md border border-gray-200 dark:border-gray-600">
          <Image
            src="/assets/myLogo.svg"
            alt="Morgi Logo"
            width={72}
            height={72}
            className="rounded-full"
          />
        </div>

        <div className="mt-12">
          {/* SVG ICON */}
          <div className="flex justify-center mb-6 text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 3h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-extrabold text-blue-900 dark:text-blue-300 mb-4">אופס... משהו התפקשש</h1>
          <p className="text-gray-700 dark:text-gray-400 mb-6 text-lg">
            נראה ש-Morgi התבלבל רגע בדרך 😅 <br />
            הצוות שלנו כבר בודק מה קרה.
          </p>

          <button
            onClick={() => router.push('/home')}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            חזרה לדף הבית
          </button>
        </div>

        {/* Decorative Line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 rounded-full mt-6 opacity-60"></div>
      </div>
    </div>
  );
}
