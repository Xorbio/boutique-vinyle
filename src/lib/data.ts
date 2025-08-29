// src/lib/data.ts
import { supabase, publicImageUrl } from './supabase'
import type { PostgrestError } from '@supabase/supabase-js'

export type ProductImage = {
  storage_path: string
  alt?: string
  position: number
}
export type Inventory = {
  stock: number
  attributes: Record<string, unknown>
}
export type ProductRow = {
  id: number
  title: string
  slug: string
  description?: string
  price_cents: number
  currency: 'EUR' | 'USD' | 'GBP'
  active: boolean
  product_images?: ProductImage[]
  inventory?: Inventory[]   // renvoyé en tableau par Supabase
}

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

  const { data: rows, error: listError } = await supabase
    .from('products')
    .select('id,title,slug,price_cents,currency,product_images(storage_path,alt,position)')
    .eq('active', true)
    .order('id', { ascending: false })
    .range(offset, offset + limit - 1)

  if (listError) throw listError

  const items = (rows as ProductRow[]) ?? []
  return items.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    price_cents: p.price_cents,
    currency: p.currency,
    image_url: p.product_images?.length
      ? publicImageUrl([...p.product_images].sort((a, b) => a.position - b.position)[0].storage_path)
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
  attributes?: Record<string, unknown>
}

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  const { data: row, error: rowError } = await supabase
    .from('products')
    .select(`
      id, title, slug, description, price_cents, currency,
      product_images(storage_path, alt, position),
      inventory(stock, attributes)
    `)
    .eq('slug', slug)
    .eq('active', true)
    .single()

  const pgErr = rowError as PostgrestError | null
  if (pgErr && pgErr.code !== 'PGRST116') throw pgErr
  if (!row) return null

  const product = row as ProductRow
  const inv = product.inventory && product.inventory.length > 0 ? product.inventory[0] : undefined

  return {
    id: product.id,
    title: product.title,
    slug: product.slug,
    description: product.description ?? '',
    price_cents: product.price_cents,
    currency: product.currency,
    images: (product.product_images ?? [])
      .sort((a, b) => a.position - b.position)
      .map((img) => ({ url: publicImageUrl(img.storage_path), alt: img.alt ?? '' })),
    stock: inv?.stock ?? 0,
    attributes: inv?.attributes ?? {},
  }
}
