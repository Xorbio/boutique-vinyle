import Link from 'next/link'
import Image from 'next/image'
import Price from './Price'

export default function ProductCard({ p }:{ p:{
  id:number; title:string; slug:string; price_cents:number; currency:'EUR'|'USD'|'GBP'; image_url?:string
}}) {
  return (
    <Link href={`/produits/${p.slug}`} className="block rounded-2xl border p-3 hover:shadow-md transition">
      <div className="aspect-square w-full relative rounded-xl overflow-hidden bg-gray-50">
        {p.image_url ? (
          <Image src={p.image_url} alt={p.title} fill className="object-cover" sizes="(min-width:768px) 25vw, 100vw" />
        ) : <div className="w-full h-full" />}
      </div>
      <div className="mt-3">
        <h3 className="font-medium">{p.title}</h3>
        <div className="text-sm text-gray-700"><Price cents={p.price_cents} currency={p.currency} /></div>
      </div>
    </Link>
  )
}
