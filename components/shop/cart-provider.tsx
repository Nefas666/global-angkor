"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { cartSubtotal, type CartLine } from "@/lib/commerce"

type CartContextValue = {
  lines: CartLine[]
  count: number
  subtotal: number
  isOpen: boolean
  lastAdded: number
  open: () => void
  close: () => void
  add: (productId: string, variantId: string, quantity?: number) => void
  update: (variantId: string, quantity: number) => void
  remove: (variantId: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = "gar-cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [lastAdded, setLastAdded] = useState(0)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]")
      if (Array.isArray(saved)) setLines(saved)
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  }, [lines, hydrated])

  const add = useCallback((productId: string, variantId: string, quantity = 1) => {
    setLines((current) => {
      const existing = current.find((l) => l.variantId === variantId)
      if (existing) return current.map((l) => (l.variantId === variantId ? { ...l, quantity: l.quantity + quantity } : l))
      return [...current, { productId, variantId, quantity }]
    })
    setLastAdded(Date.now())
    setIsOpen(true)
  }, [])

  const update = useCallback((variantId: string, quantity: number) => {
    setLines((current) => (quantity <= 0 ? current.filter((l) => l.variantId !== variantId) : current.map((l) => (l.variantId === variantId ? { ...l, quantity } : l))))
  }, [])

  const remove = useCallback((variantId: string) => setLines((current) => current.filter((l) => l.variantId !== variantId)), [])
  const clear = useCallback(() => setLines([]), [])
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const value = useMemo(
    () => ({ lines, count: lines.reduce((n, l) => n + l.quantity, 0), subtotal: cartSubtotal(lines), isOpen, lastAdded, open, close, add, update, remove, clear }),
    [lines, isOpen, lastAdded, open, close, add, update, remove, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
