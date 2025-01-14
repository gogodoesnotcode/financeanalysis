import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Toaster } from "@/components/ui/toaster"

// Configure font with display option
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Add display swap for better loading performance
})

export const metadata: Metadata = {
  title: 'Personal Portfolio',
  description: 'Professional portfolio website',
  // Add some additional metadata for better SEO
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-zinc-900 text-white min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}