// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EPC - ENPO Maurice Audin | Engineering Pioneers Club',
  description: 'Site officiel du Engineering Pioneers Club - École Nationale Polytechnique d\'Oran Maurice Audin',
  icons: {
    icon: '/favicon.ico',
    // Tu peux aussi ajouter d'autres tailles :
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}