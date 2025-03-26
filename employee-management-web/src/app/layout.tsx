import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Employee\'s control',
  description: 'App to add items to buy',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
