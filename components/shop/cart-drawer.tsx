"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Minus, Plus, ShoppingBag, Trash2, Truck, X } from "lucide-react"
import { useCart } from "./cart-provider"
import { findLine, formatPrice, shippingMethods } from "@/lib/commerce"
import { ease } from "@/lib/site"

const freeOver = shippingMethods.find((m) => m.freeOver)?.freeOver ?? 0

export function CartDrawer() {
  const { lines, isOpen, close, update, remove, subtotal, count } = useCart()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, close])

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const missing = Math.max(0, freeOver - subtotal)

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 z-[60] bg-gar-green-deep/50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-gar-cream shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease }}
            role="dialog"
            aria-label="Carrello"
            data-lenis-prevent
          >
            <header className="flex items-center justify-between border-b border-gar-gold/30 px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-gar-gold" />
                <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-gar-green">Il tuo carrello</h2>
                <span className="rounded-full bg-gar-green px-2 py-0.5 text-xs font-semibold text-gar-cream">{count}</span>
              </div>
              <button type="button" onClick={close} className="rounded-full p-2 text-gar-green transition-colors hover:bg-gar-sand" aria-label="Chiudi carrello">
                <X className="h-5 w-5" />
              </button>
            </header>

            {lines.length > 0 && (
              <div className="border-b border-gar-gold/20 bg-white/60 px-6 py-3">
                <p className="flex items-center gap-2 text-xs text-gar-ink/75">
                  <Truck className="h-4 w-4 text-gar-green" />
                  {missing > 0 ? (
                    <span>
                      Ti mancano <strong className="text-gar-green">{formatPrice(missing)}</strong> per la spedizione gratuita
                    </span>
                  ) : (
                    <span className="font-semibold text-gar-green">Spedizione standard gratuita</span>
                  )}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gar-sand">
                  <motion.div className="h-full rounded-full bg-gar-gold" animate={{ width: `${Math.min(100, (subtotal / freeOver) * 100)}%` }} transition={{ duration: 0.5, ease }} />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gar-gold/40 bg-white">
                    <ShoppingBag className="h-8 w-8 text-gar-gold" strokeWidth={1.4} />
                  </span>
                  <p className="font-serif text-xl italic text-gar-ink/75">Il carrello è vuoto</p>
                  <Link href="/shop" onClick={close} className="rounded-full bg-gar-green px-6 py-3 font-display text-xs font-semibold uppercase tracking-wider text-gar-cream">
                    Vai allo shop
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => {
                      const item = findLine(line)
                      if (!item) return null
                      return (
                        <motion.li
                          key={line.variantId}
                          layout
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 30, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.3, ease }}
                          className="flex gap-4 rounded-2xl border border-gar-gold/20 bg-white p-3"
                        >
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                            <Image src={item.product.image} alt={item.product.name} fill sizes="80px" className="object-cover" />
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="font-display text-sm font-semibold text-gar-green">{item.product.name}</p>
                                <p className="text-xs text-gar-ink/60">{item.variant.label}</p>
                              </div>
                              <button type="button" onClick={() => remove(line.variantId)} className="p-1 text-gar-ink/40 transition-colors hover:text-gar-red" aria-label="Rimuovi">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-center rounded-full border border-gar-gold/40">
                                <button type="button" onClick={() => update(line.variantId, line.quantity - 1)} className="p-1.5 text-gar-green" aria-label="Diminuisci quantità">
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="w-6 text-center text-sm font-semibold">{line.quantity}</span>
                                <button type="button" onClick={() => update(line.variantId, line.quantity + 1)} className="p-1.5 text-gar-green" aria-label="Aumenta quantità">
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <span className="font-semibold text-gar-green">{formatPrice(item.variant.price * line.quantity)}</span>
                            </div>
                          </div>
                        </motion.li>
                      )
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <footer className="border-t border-gar-gold/30 bg-white px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gar-ink/70">Subtotale</span>
                  <span className="font-display text-xl font-semibold text-gar-green">{formatPrice(subtotal)}</span>
                </div>
                <p className="mt-1 text-xs text-gar-ink/50">IVA inclusa. Spedizione calcolata al checkout.</p>
                <Link href="/checkout" onClick={close} className="mt-4 flex w-full items-center justify-center rounded-full bg-gar-green py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-gar-cream ring-1 ring-gar-gold/60 transition-colors hover:bg-gar-green-soft">
                  Procedi al checkout
                </Link>
                <button type="button" onClick={close} className="mt-2 w-full py-2 text-sm text-gar-ink/60 underline-offset-4 hover:underline">
                  Continua lo shopping
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}
