import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"
import Header from "./components/header"

const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Finance Tracker",
  description: "",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={manrope.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
