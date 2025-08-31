"use client"
import Link from 'next/link'
import { useCart } from './CartProvider'

export default function CartLink() {
  const { totalCount } = useCart()
  return (
    <Link href="/panier" className="hover:opacity-70">
      Panier{totalCount > 0 ? ` (${totalCount})` : ''}
    </Link>
  )
}

