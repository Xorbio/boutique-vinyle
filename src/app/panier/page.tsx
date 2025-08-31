"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/CartProvider'
import Price from '@/components/Price'

export default function PanierPage() {
  const { items, updateQuantity, removeItem, clear, totalCents } = useCart()

  if (items.length === 0) {
    return (
      <div className="py-10">
        <h1 className="text-3xl font-semibold mb-6">Panier</h1>
        <p>Votre panier est vide. <Link href="/boutique" className="underline">Continuer vos achats</Link>.</p>
      </div>
    )
  }

  return (
    <div className="py-10">
      <h1 className="text-3xl font-semibold mb-6">Panier</h1>
      <div className="space-y-4">
        {items.map((i) => (
          <div key={i.id} className="flex items-center gap-4 border rounded-xl p-3">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-50 shrink-0">
              {i.image_url ? (
                <Image src={i.image_url} alt={i.title} fill className="object-cover" />
              ) : null}
            </div>
            <div className="flex-1">
              <div className="font-medium">{i.title}</div>
              <div className="text-sm text-gray-600">
                <Price cents={i.price_cents} currency={i.currency} />
              </div>
            </div>
            <div className="inline-flex items-center border rounded-lg overflow-hidden">
              <button className="px-3 py-2" onClick={() => updateQuantity(i.id, i.quantity - 1)} aria-label="Diminuer">−</button>
              <input
                type="number"
                className="w-16 text-center p-2 outline-none"
                value={i.quantity}
                min={1}
                step={1}
                onChange={(e) => {
                  const v = parseInt(e.target.value || '1', 10)
                  updateQuantity(i.id, Number.isFinite(v) ? v : 1)
                }}
              />
              <button className="px-3 py-2" onClick={() => updateQuantity(i.id, i.quantity + 1)} aria-label="Augmenter">+</button>
            </div>
            <div className="w-28 text-right font-medium">
              <Price cents={i.price_cents * i.quantity} currency={i.currency} />
            </div>
            <button className="text-sm text-red-600 hover:underline" onClick={() => removeItem(i.id)}>Retirer</button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button className="text-sm text-gray-600 hover:underline" onClick={clear}>Vider le panier</button>
        <div className="text-xl font-semibold">Total: <Price cents={totalCents} currency={items[0].currency} /></div>
      </div>

      <div className="mt-6">
        <button className="rounded-xl bg-black text-white px-6 py-3 disabled:opacity-50" onClick={() => alert('Paiement à intégrer (Stripe).')}>
          Passer au paiement
        </button>
      </div>
    </div>
  )
}

