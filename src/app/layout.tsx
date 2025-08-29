import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Atelier Vinyle – Pièces artisanales en vinyle laqué perforé',
  description: 'Créations artisanales uniques en vinyle laqué perforé. Boutique en ligne : suspensions, dessous de plat, et pièces décoratives.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    title: 'Atelier Vinyle',
    description: 'Créations artisanales en vinyle laqué perforé.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-gray-900">
        <Header />
        <main className="container mx-auto px-4">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold">Atelier Vinyle</Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/boutique" className="hover:opacity-70">Boutique</Link>
          <Link href="/a-propos" className="hover:opacity-70">À propos</Link>
          <Link href="/contact" className="hover:opacity-70">Contact</Link>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="container mx-auto px-4 py-10 text-sm text-gray-600 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 justify-between">
        <div>
          <div className="font-medium text-gray-800">Atelier Vinyle</div>
          <p>Pièces uniques en vinyle laqué perforé – fait main.</p>
        </div>
        <div className="flex gap-6">
          <Link href="/mentions-legales" className="hover:opacity-70">Mentions légales</Link>
          <Link href="/cgv" className="hover:opacity-70">CGV</Link>
          <Link href="/confidentialite" className="hover:opacity-70">Confidentialité</Link>
        </div>
        <div>© {new Date().getFullYear()} Atelier Vinyle</div>
      </div>
    </footer>
  )
}
