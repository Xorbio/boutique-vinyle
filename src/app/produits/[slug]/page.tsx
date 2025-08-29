import Image from 'next/image'
import Price from '@/components/Price'
import { getProductBySlug } from '@/lib/data'
import { notFound } from 'next/navigation'

export const revalidate = 60 // ISR

type Props = { params: { slug: string } }

export default async function ProductPage({ params }: Props) {
  // On récupère le produit grâce au slug dans l’URL
  const product = await getProductBySlug(params.slug)
  if (!product) return notFound()

  return (
    <div className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image principale */}
        <div>
          {product.images[0] && (
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50">
              <Image
                src={product.images[0].url}
                alt={product.images[0].alt || product.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Infos produit */}
        <div>
          <h1 className="text-3xl font-semibold">{product.title}</h1>
          <div className="mt-2 text-xl">
            <Price cents={product.price_cents} currency={product.currency} />
          </div>
          <p className="mt-6 text-gray-700">{product.description}</p>

          {/* Bouton Acheter (Stripe plus tard) */}
          <form action="/api/checkout" method="POST" className="mt-8 flex gap-3">
            <input type="hidden" name="slug" value={product.slug} />
            <input
              type="number"
              name="quantity"
              min={1}
              max={product.stock ?? 99}
              defaultValue={1}
              className="w-20 rounded-lg border p-2"
            />
            <button
              type="submit"
              disabled={(product.stock ?? 0) <= 0}
              className="rounded-xl bg-black text-white px-6 py-3 disabled:opacity-50"
            >
              Acheter
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
