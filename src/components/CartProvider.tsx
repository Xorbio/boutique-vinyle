"use client"
import React from 'react'

export type CartItem = {
  id: number
  title: string
  slug: string
  price_cents: number
  currency: 'EUR'|'USD'|'GBP'
  image_url?: string
  quantity: number
}

type CartState = {
  items: CartItem[]
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clear: () => void
  totalCount: number
  totalCents: number
}

const CartContext = React.createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = 'cart.v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<CartState>({ items: [] })

  // hydrate from localStorage
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as CartState
        if (parsed && Array.isArray(parsed.items)) setState({ items: parsed.items })
      }
    } catch {}
  }, [])

  // persist to localStorage
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {}
  }, [state])

  const addItem = React.useCallback((item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setState((s) => {
      const existing = s.items.find((i) => i.id === item.id)
      if (existing) {
        return { items: s.items.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i) }
      }
      return { items: [...s.items, { ...item, quantity }] }
    })
  }, [])

  const removeItem = React.useCallback((id: number) => {
    setState((s) => ({ items: s.items.filter((i) => i.id !== id) }))
  }, [])

  const updateQuantity = React.useCallback((id: number, quantity: number) => {
    setState((s) => ({ items: s.items.map((i) => i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i) }))
  }, [])

  const clear = React.useCallback(() => setState({ items: [] }), [])

  const totalCount = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalCents = state.items.reduce((sum, i) => sum + i.price_cents * i.quantity, 0)

  const value: CartContextType = {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    totalCount,
    totalCents,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = React.useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

