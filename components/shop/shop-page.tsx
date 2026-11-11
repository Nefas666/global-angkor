"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Minus, Plus, ShieldCheck, ShoppingBag, Truck, Leaf } from "lucide-react"
import { PageHero } from "@/components/gar/page-hero"
import { Reveal } from "@/components/gar/reveal"
import { TiltCard } from "@/components/gar/tilt-card"
import { useCart } from "./cart-provider"
import { formatPrice, products, type ShopProduct } from "@/lib/commerce"
import { cn } from "@/lib/utils"
import { ease } from "@/lib/site"

const categories = ["Tutti", "Alimentari", "Cosmetica", "Pet Care"] as const

function ShopCard({ product, index }: { product: ShopProduct; index: number }) {
  const { add } = useCart()
  const [variantId, setVariantId] = useState(product.variants[0].id)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const variant = product.variants.find((v) => v.id === variantId)!

  const handleAdd = () => {
    add(product.id, variantId, quantity)
    setAdded(true)
    setQuantity(1)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <motion.div layout initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5, delay: index * 0.06, ease }}>
      <TiltCard className="h-full" intensity={4}>
        <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-gar-gold/25 bg-white shadow-[0_20px_50px_-30px_rgba(15,59,39,0.5)]">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={product.image} alt={product.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 hover:scale-105" />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gar-green">{product.category}</span>
            {product.badge && <span className="absolute right-4 top-4 rounded-full bg-gar-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">{product.badge}</span>}
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg font-semibold text-gar-green">{product.name}</h3>
              <motion.span key={variant.price} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="font-display text-lg font-semibold text-gar-gold">
                {formatPrice(variant.price)}
              </motion.span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-gar-ink/70">{product.description}</p>

            <div className="mt-5 flex flex-wrap gap-2" role="radiogroup" aria-label="Formato">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  role="radio"
                  aria-checked={v.id === variantId}
                  onClick={() => setVariantId(v.id)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                    v.id === variantId ? "border-gar-green bg-gar-green text-gar-cream" : "border-gar-gold/40 text-gar-green hover:border-gar-gold",
                  )}
                >
                  {v.label}
                </button>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-3 pt-6">
              <div className="flex items-center rounded-full border border-gar-gold/40">
                <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-2.5 text-gar-green" aria-label="Diminuisci quantità">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                <button type="button" onClick={() => setQuantity((q) => q + 1)} className="p-2.5 text-gar-green" aria-label="Aumenta quantità">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <motion.button
                type="button"
                onClick={handleAdd}
                whileTap={{ scale: 0.96 }}
                className={cn(
                  "relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full py-3 font-display text-xs font-semibold uppercase tracking-wider transition-colors",
                  added ? "bg-gar-gold text-white" : "bg-gar-green text-gar-cream hover:bg-gar-green-soft",
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {added ? (
                    <motion.span key="added" className="flex items-center gap-2" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
                      <Check className="h-4 w-4" /> Aggiunto
                    </motion.span>
                  ) : (
                    <motion.span key="add" className="flex items-center gap-2" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
                      <ShoppingBag className="h-4 w-4" /> Aggiungi al carrello
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
            {product.href && (
              <Link href={product.href} className="mt-4 text-center text-xs font-semibold uppercase tracking-wider text-gar-gold underline-offset-4 hover:underline">
                Scheda prodotto
              </Link>
            )}
          </div>
        </article>
      </TiltCard>
    </motion.div>
  )
}

export function ShopPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>("Tutti")
  const visible = category === "Tutti" ? products : products.filter((p) => p.category === category)

  return (
    <>
      <PageHero eyebrow="Shop online" title="Shop" subtitle="Acquista online i prodotti autentici della Cambogia." image="/images/gar/home-hero.jpg">
        <Reveal delay={0.4} className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gar-ink/75">
          <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-gar-gold" /> Spedizione gratuita sopra 60 €</span>
          <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gar-gold" /> Pagamenti sicuri</span>
          <span className="flex items-center gap-2"><Leaf className="h-4 w-4 text-gar-gold" /> 100% naturale</span>
        </Reveal>
      </PageHero>

      <section className="bg-gar-cream pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gar-gold/25 pb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={cn("relative rounded-full px-5 py-2 text-sm font-semibold transition-colors", category === c ? "text-gar-cream" : "text-gar-green hover:bg-gar-sand")}
                >
                  {category === c && <motion.span layoutId="shop-filter" className="absolute inset-0 rounded-full bg-gar-green" transition={{ duration: 0.35, ease }} />}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
            <p className="rounded-full border border-dashed border-gar-red/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gar-red">Demo — prezzi indicativi</p>
          </div>

          <motion.div layout className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((product, i) => (
                <ShopCard key={product.id} product={product} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  )
}
