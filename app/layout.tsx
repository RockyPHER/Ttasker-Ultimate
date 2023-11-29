import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'Ttasker Ultimate',
  description: 'Task management app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
      <body>{children}</body>
    </html>
  )
}
