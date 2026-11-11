"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, type LucideIcon } from "lucide-react"
import { TiltCard } from "./tilt-card"
import { IconCircle } from "./icon-circle"

export type Product = {
  title: string
  description: string
  image: string
  icon: LucideIcon
  href?: string
  comingSoon?: boolean
  id?: string
}

export function ProductCard({ product, index, size = "md" }: { product: Product; index: number; size?: "md" | "lg" }) {
  const body = (
    <div className="flex h-full flex-col bg-white shadow-[0_10px_40px_-15px_rgba(15,59,39,0.35)]">
      <div className={`relative overflow-hidden ${size === "lg" ? "aspect-[16/8]" : "aspect-[16/9]"}`}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute bottom-3 left-4">
          <motion.div whileHover={{ scale: 1.1, rotate: -6 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
            <IconCircle icon={product.icon} variant="solid" size={size === "lg" ? "lg" : "md"} />
          </motion.div>
        </div>
      </div>
      <div className={`flex flex-1 flex-col ${size === "lg" ? "p-7" : "p-5"}`}>
        <h3 className={`font-display font-bold uppercase tracking-wide text-gar-green ${size === "lg" ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>
          {product.title}
        </h3>
        <p className={`mt-2 flex-1 text-gar-ink/75 ${size === "lg" ? "text-base md:text-lg" : "text-sm"}`}>{product.description}</p>
        {product.comingSoon ? (
          <p className="mt-4 font-display text-sm font-bold uppercase tracking-wider text-gar-red">Prossimamente</p>
        ) : (
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gar-gold">
            Scopri di più
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
        )}
      </div>
    </div>
  )

  return (
    <TiltCard index={index} className="h-full" intensity={6}>
      <div id={product.id} className="h-full scroll-mt-32">
        {product.href && !product.comingSoon ? (
          <Link href={product.href} className="block h-full">
            {body}
          </Link>
        ) : (
          body
        )}
      </div>
    </TiltCard>
  )
}
