import { supabase, publicImageUrl } from './supabase'

export type ProductCard = {
  id: number
  title: string
  slug: string
  price_cents: number
  currency: 'EUR' | 'USD' | 'GBP'
  image_url?: string
}

export async function listProducts(params?: {
  limit?: number
  offset?: number
}): Promise<ProductCard[]> {
  const { limit = 24, offset = 0 } = params ?? {}

  const { data, error } = await supabase
    .from('products')
    .select(`id,title,slug,price_cents,currency,product_images(storage_path,position)`)
    .eq('active', true)
    .order('id', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error

  return (data ?? []).map((p: any) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    price_cents: p.price_cents,
    currency: p.currency,
    image_url: p.product_images?.length
      ? publicImageUrl(
          p.product_images.sort((a: any, b: any) => a.position - b.position)[0].storage_path
        )
      : undefined,
  }))
}

export type ProductDetail = {
  id: number
  title: string
  slug: string
  description?: string
  price_cents: number
  currency: 'EUR' | 'USD' | 'GBP'
  images: { url: string; alt?: string }[]
  stock?: number
  attributes?: Record<string, any>
}

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id, title, slug, description, price_cents, currency,
      product_images(storage_path, alt, position),
      inventory(stock, attributes)
    `)
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (error && (error as any).code !== 'PGRST116') throw error
  if (!data) return null

  // inventory arrive comme un tableau → on prend la 1ère ligne
  const inv = Array.isArray((data as any).inventory)
    ? (data as any).inventory[0]
    : (data as any).inventory

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    description: data.description ?? '',
    price_cents: data.price_cents,
    currency: data.currency,
    images: (data as any).product_images
      ? (data as any).product_images
          .sort((a: any, b: any) => a.position - b.position)
          .map((img: any) => ({ url: publicImageUrl(img.storage_path), alt: img.alt ?? '' }))
      : [],
    stock: inv?.stock ?? 0,
    attributes: inv?.attributes ?? {},
  }
}
