import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'

export const metadata = {
  title: 'Maryem Bannour - Portfolio',
  description: 'Portfolio personnel',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}