"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Award, Globe, Leaf, Sprout } from "lucide-react"
import { Ornament } from "@/components/gar/ornament"
import { GoldButton } from "@/components/gar/gold-button"
import { ProductCard } from "@/components/gar/product-card"
import { homeProducts } from "@/components/gar/products"
import { ease } from "@/lib/site"

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }

const fadeUpVariants = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: (i: number) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { delay: i * 0.12, duration: 0.9, ease } }),
}

const badges = [
  { icon: Leaf, title: "100% Naturale", text: "Materie prime pure" },
  { icon: Sprout, title: "Bio e sostenibile", text: "Nel rispetto della terra" },
  { icon: Award, title: "Qualità premium", text: "Selezione accurata" },
  { icon: Globe, title: "Esportazione internazionale", text: "Verso i mercati del mondo" },
]

export function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), springConfig)
  const textX1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -260]), springConfig)
  const textX2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), springConfig)
  const textX3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -140]), springConfig)
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.9]), springConfig)
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.8], [1, 0]), springConfig)

  return (
    <>
      <section id="hero" ref={ref} className="noise-overlay relative flex min-h-[92vh] items-center overflow-hidden bg-gar-cream">
        <div className="absolute inset-0 bg-gradient-to-br from-gar-cream via-[#f6ecd6] to-gar-sand" />
        <motion.div
          className="absolute top-24 left-10 h-40 w-40 rounded-full bg-gar-gold/25 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 right-1/3 h-48 w-48 rounded-full bg-gar-green/10 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <motion.div style={{ y, scale }} className="absolute inset-y-0 right-0 hidden w-[58%] lg:block">
          <motion.div
            className="mask-fade-left relative h-full w-full"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
          >
            <Image src="/images/gar/home-hero.jpg" alt="Olio di cocco, pepe di Kampot e riso Jasmine Global Angkor Royal" fill priority sizes="60vw" className="object-cover object-center" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-[#f6ecd6] via-[#f6ecd6]/60 to-transparent" />
          </motion.div>
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-36 pb-40 lg:pb-48">
          <motion.div style={{ opacity }}>
            <h1 className="font-hero text-gar-green">
              <motion.span style={{ x: textX1 }} className="block">
                <motion.span variants={fadeUpVariants} initial="hidden" animate="visible" custom={1} className="block text-[1.85rem] font-normal italic leading-[1.15] tracking-tight text-gar-green/90 sm:text-[2.5rem] lg:text-[2.75rem]">
                  Prodotti autentici
                </motion.span>
              </motion.span>
              <motion.span style={{ x: textX2 }} className="block">
                <motion.span variants={fadeUpVariants} initial="hidden" animate="visible" custom={2} className="block text-[2.6rem] font-bold leading-[1] tracking-[-0.02em] sm:text-[4rem] lg:text-[4rem] xl:text-[4.25rem]">
                  dalla Cambogia
                </motion.span>
              </motion.span>
              <motion.span style={{ x: textX3 }} className="block">
                <motion.span variants={fadeUpVariants} initial="hidden" animate="visible" custom={3} className="text-gold-gradient inline-block pr-4 pb-[0.1em] text-[2.6rem] font-bold leading-[1] tracking-[-0.02em] sm:text-[4rem] lg:text-[4rem] xl:text-[4.25rem]">
                  al mondo.
                </motion.span>
              </motion.span>
            </h1>
            <motion.p variants={fadeUpVariants} initial="hidden" animate="visible" custom={4} className="mt-7 max-w-md text-lg leading-relaxed text-gar-ink/80">
              Selezioniamo i migliori prodotti naturali della Cambogia e li portiamo sui mercati internazionali con qualità, integrità e passione.
            </motion.p>
            <motion.div variants={fadeUpVariants} initial="hidden" animate="visible" custom={5} className="mt-7 flex flex-wrap items-center gap-6">
              <GoldButton href="/prodotti">Scopri i nostri prodotti</GoldButton>
              <Ornament className="justify-start" width="w-20" />
            </motion.div>
            <motion.ul
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={6}
              className="mt-10 grid grid-cols-1 gap-4 rounded-2xl border border-gar-gold/30 bg-white/65 p-5 shadow-[0_20px_50px_-25px_rgba(15,59,39,0.45)] backdrop-blur-md sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.3fr] lg:gap-0 lg:divide-x lg:divide-gar-gold/30 lg:px-8 lg:py-7"
            >
              {badges.map(({ icon: Icon, title, text }, i) => (
                <motion.li
                  key={title}
                  className="flex items-center gap-4 lg:px-6 lg:first:pl-0 lg:last:pr-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.1, duration: 0.5, ease }}
                  whileHover={{ y: -3 }}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gar-green/40 bg-gar-cream text-gar-green">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[0.8rem] font-semibold uppercase leading-snug tracking-wide text-gar-green lg:text-[0.82rem]">{title}</span>
                    <span className="mt-0.5 block text-xs text-gar-ink/65 lg:text-[0.8rem]">{text}</span>
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-3xl lg:hidden">
            <Image src="/images/gar/home-hero.jpg" alt="" fill sizes="100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section id="prodotti" className="relative z-20 -mt-28 pb-20 lg:-mt-36">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {homeProducts.map((product, index) => (
            <ProductCard key={product.title} product={product} index={index} />
          ))}
        </div>
      </section>
    </>
  )
}
