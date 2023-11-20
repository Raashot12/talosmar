import type {Metadata} from "next"
import {Open_Sans, Roboto_Mono} from "next/font/google"
import "react-toastify/dist/ReactToastify.css"
import "./globals.css"
import {AuthProvider} from "@/context/AuthContext"


const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-opensans",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto-mono",
})

export const metadata: Metadata = {
  title: "Talosmart Media",
  description: "The next generation social media app",
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${openSans.variable} ${robotoMono.variable} font-sans`}
        >
          {children}
        </body>
      </html>
    </AuthProvider>
  )
}
