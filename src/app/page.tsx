import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="py-14">
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Vinyle laqué perforé, <span className="whitespace-nowrap">pièces uniques</span>.
          </h1>
          <p className="mt-5 text-lg text-gray-700 max-w-xl">
            Créations artisanales réalisées à la main : boite à mouchoirs, décoration de noël, jeux etc. 
            Chaque pièce est soignée, durable et prête à offrir.
          </p>
          <div className="mt-7 flex gap-3">
            <Link href="/boutique" className="rounded-xl bg-black text-white px-6 py-3">
              Découvrir la boutique
            </Link>
            <Link href="/a-propos" className="rounded-xl border px-6 py-3">
              L’histoire de l’atelier
            </Link>
          </div>
        </div>
        <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gray-50">
          {/* Remplace par une jolie photo */}
          <Image
            src="/globe.svg"
            alt="Création en vinyle laqué perforé"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">Pièces récentes</h2>
        <p className="text-gray-700">Retrouvez toutes les créations dans la <Link href="/boutique" className="underline">boutique</Link>.</p>
      </section>
    </div>
  )
}
