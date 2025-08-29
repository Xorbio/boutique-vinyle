import { listProducts } from '@/lib/data'
import ProductCard from '@/components/ProductCard'

export const revalidate = 60

export default async function BoutiquePage() {
  const products = await listProducts()
  return (
    <div className="py-10">
      <h1 className="text-3xl font-semibold mb-6">Boutique</h1>
      {products.length === 0 ? (
        <p>Aucun produit pour le moment.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  )
}
