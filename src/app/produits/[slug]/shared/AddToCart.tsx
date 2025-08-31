"use client"
import { useState } from 'react'
import { useCart } from '@/components/CartProvider'
import Price from '@/components/Price'

type Props = {
  product: {
    id: number
    slug: string
    title: string
    price_cents: number
    currency: 'EUR'|'USD'|'GBP'
    image_url?: string
    stock: number
  }
}

export default function AddToCart({ product }: Props) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)

  const canIncrease = qty < Math.max(1, product.stock)
  const canDecrease = qty > 1

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <div className="inline-flex items-center border rounded-lg overflow-hidden">
        <button
          type="button"
          className="px-3 py-2 disabled:opacity-40"
          onClick={() => setQty(q => Math.max(1, q - 1))}
          disabled={!canDecrease}
          aria-label="Diminuer la quantité"
        >−</button>
        <input
          type="number"
          inputMode="numeric"
          min={1}
          step={1}
          max={product.stock || undefined}
          value={qty}
          onChange={(e) => {
            const v = parseInt(e.target.value || '1', 10)
            if (Number.isFinite(v)) setQty(Math.min(Math.max(1, v), Math.max(1, product.stock)))
          }}
          className="w-20 text-center p-2 outline-none"
        />
        <button
          type="button"
          className="px-3 py-2 disabled:opacity-40"
          onClick={() => setQty(q => Math.min(Math.max(1, product.stock), q + 1))}
          disabled={!canIncrease}
          aria-label="Augmenter la quantité"
        >+</button>
      </div>

      <button
        type="button"
        onClick={() => addItem({
          id: product.id,
          slug: product.slug,
          title: product.title,
          price_cents: product.price_cents,
          currency: product.currency,
          image_url: product.image_url,
        }, qty)}
        disabled={product.stock <= 0}
        className="rounded-xl bg-black text-white px-6 py-3 disabled:opacity-50"
      >
        Ajouter au panier · <Price cents={product.price_cents * qty} currency={product.currency} />
      </button>
    </div>
  )
}

