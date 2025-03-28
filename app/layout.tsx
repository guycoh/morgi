
import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

//import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { LoanProvider } from "./context/LoanContext";


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" className={geistSans.className} suppressHydrationWarning>
      <body>
          <div>
          {/* <AuthProvider>
          </AuthProvider>   */}
          <DataProvider>
          <LoanProvider>
                {children}
          </LoanProvider>
          </DataProvider>   
          
         </div>
      
      
      
       
      </body>
    </html>
  );
}
// import { DataProvider } from '../context/DataContext';

// import type { AppProps } from 'next/app'

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <DataProvider>
//       <Component {...pageProps} />
//     </DataProvider>
//   );
// }