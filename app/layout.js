import './globals.css'

export const metadata = {
  title: 'Maryem Bannour - Portfolio',
  description: 'Portfolio personnel',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}