import { supabase } from '@/lib/supabase'

export const revalidate = 60

export default async function Home() {
  const { data: products, error } = await supabase
    .from('products')
    .select('id,title,price_cents,currency')
    .eq('active', true)
    .limit(4)

  if (error) {
    console.error(error)
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Boutique</h1>
      <pre className="bg-gray-100 p-4 rounded-xl overflow-auto">
        {JSON.stringify(products, null, 2)}
      </pre>
    </main>
  )
}
