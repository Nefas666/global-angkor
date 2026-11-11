"use client"

import Image from "next/image"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import { Ornament } from "./ornament"
import { ease } from "@/lib/site"

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }

type PageHeroProps = { eyebrow?: string; title: string; subtitle?: string; image?: string; children?: React.ReactNode }

export function PageHero({ eyebrow, title, subtitle, image, children }: PageHeroProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 120]), springConfig)
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.8], [1, 0]), springConfig)

  return (
    <section ref={ref} className="relative overflow-hidden bg-gar-sand pt-36 pb-20 md:pt-44 md:pb-28">
      {image && (
        <motion.div style={{ y }} className="absolute inset-0">
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-gar-cream/90 via-gar-cream/75 to-gar-cream" />
        </motion.div>
      )}
      <motion.div style={{ opacity }} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-gar-gold"
          >
            {eyebrow}
          </motion.p>
        )}
        <h1 className="mt-3 overflow-hidden font-display text-4xl font-semibold uppercase leading-tight tracking-wide text-gar-green md:text-6xl">
          <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }}>
            {title}
          </motion.span>
        </h1>
        <Ornament className="mt-5" />
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mx-auto mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-gar-ink/80 md:text-2xl"
          >
            {subtitle}
          </motion.p>
        )}
        {children}
      </motion.div>
    </section>
  )
}
