'use client'

import './globals.css'
import SideBar from './sidebar'
import AppProvider from './AppProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'devextreme/dist/css/dx.light.css'
import { useEffect } from 'react'
import supabase from '@/utils/SupabaseClient'
import { setInAsyncStorage } from '@/utils/index'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProvider>
      <html>
        <head />
        <body className=" flex">
          <ToastContainer />
          <SideBar />
          <div className="w-full">{children}</div>
        </body>
      </html>
    </AppProvider>
  )
}

// import "./globals.css";
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }
