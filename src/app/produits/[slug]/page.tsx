import Image from 'next/image'
import Price from '@/components/Price'
import { getProductBySlug } from '@/lib/data'
import { notFound } from 'next/navigation'
import AddToCart from './shared/AddToCart'

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
          <div className="mt-1 text-sm text-gray-600">Stock restant: {product.stock ?? 0}</div>
          <p className="mt-6 text-gray-700">{product.description}</p>

          {/* Ajout au panier */}
          <div className="mt-8">
            <AddToCart
              product={{
                id: product.id,
                slug: product.slug,
                title: product.title,
                price_cents: product.price_cents,
                currency: product.currency,
                image_url: product.images[0]?.url,
                stock: product.stock ?? 0,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
