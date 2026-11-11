"use client"

import Image from "next/image"
import { OriginStatement } from "@/components/gar/origin-statement"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import { Award, Globe, Handshake, Leaf, Nut, Package, Scroll, ShieldCheck, Sprout, Users, Wheat } from "lucide-react"
import { Ornament, OrnamentFlower } from "@/components/gar/ornament"
import { Reveal, SlideUpText } from "@/components/gar/reveal"

const categories = [
  { icon: Wheat, label: "Riso Jasmine cambogiano" },
  { icon: Sprout, label: "Pepe di Kampot" },
  { icon: Nut, label: "Olio naturale di cocco" },
  { icon: Package, label: "Prodotti alimentari e cosmetici" },
  { icon: Scroll, label: "Tessili e artigianato" },
]

const commitments = [
  { icon: Leaf, title: "Origine e qualità", text: "Selezioniamo solo prodotti naturali, autentici e di altissima qualità." },
  { icon: Handshake, title: "Produttori selezionati", text: "Collaboriamo direttamente con produttori locali affidabili e responsabili." },
  { icon: ShieldCheck, title: "Standard internazionali", text: "Rispettiamo elevati standard di qualità, sicurezza e tracciabilità." },
  { icon: Globe, title: "Ponte tra due mondi", text: "Uniamo la Cambogia ai mercati internazionali nel modo migliore." },
  { icon: Users, title: "Partnership durature", text: "Costruiamo relazioni solide basate su fiducia, trasparenza e crescita condivisa." },
]

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }

export function ChiSiamo() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imageY = useSpring(useTransform(scrollYProgress, [0, 1], [-60, 60]), springConfig)

  return (
    <section ref={ref} className="bg-gar-pattern relative overflow-hidden pt-32 text-gar-cream md:pt-40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <div className="text-center">
            <Reveal y={10} className="flex justify-center text-gar-gold">
              <OrnamentFlower className="h-8 w-8" />
            </Reveal>
            <h1 className="mt-2 font-display text-5xl font-semibold uppercase tracking-wide md:text-7xl">
              <SlideUpText className="text-gold-gradient">Chi siamo</SlideUpText>
            </h1>
            <Ornament className="mt-4" />
            <Reveal delay={0.1}>
              <p className="mt-5 font-serif text-2xl text-gar-cream md:text-3xl">Dalla Cambogia, l&apos;eccellenza naturale verso il mondo.</p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="mt-8 space-y-5 text-base leading-relaxed text-gar-cream/85">
            <p>
              <strong className="font-semibold uppercase text-gar-gold-light">Global Angkor Royal MG Co., Ltd.</strong> nasce in Cambogia con una visione precisa:{" "}
              <span className="text-gar-gold-light">selezionare e portare sui mercati internazionali il meglio che questa terra straordinaria può offrire.</span>
            </p>
            <p>
              La Cambogia è una terra ricca di tradizioni, biodiversità, materie prime naturali e produzioni ancora profondamente legate al territorio. Noi vogliamo trasformare questa ricchezza in un&apos;opportunità per il mercato internazionale, creando un collegamento diretto tra produttori cambogiani selezionati, qualità locale e clienti in tutto il mondo.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-gar-gold/40">
            {categories.map(({ icon: Icon, label }, i) => (
              <Reveal key={label} delay={i * 0.08} y={20} className="flex flex-col items-center gap-3 px-3 text-center">
                <motion.span whileHover={{ scale: 1.15, rotate: -8 }} className="text-gar-gold">
                  <Icon className="h-9 w-9" strokeWidth={1.3} />
                </motion.span>
                <span className="font-display text-xs font-semibold uppercase tracking-wide text-gar-gold-light">{label}</span>
              </Reveal>
            ))}
          </div>

          <div className="mt-14">
            <div className="flex items-center gap-4">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gar-gold" />
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-gar-gold-light">Il nostro impegno</h2>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gar-gold" />
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-gar-gold/40">
              {commitments.map(({ icon: Icon, title, text }, i) => (
                <Reveal key={title} delay={i * 0.08} y={20} className="flex flex-col items-center px-3 text-center">
                  <Icon className="h-8 w-8 text-gar-gold" strokeWidth={1.3} />
                  <h3 className="mt-3 font-display text-xs font-semibold uppercase tracking-wide text-gar-gold-light">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-gar-cream/75">{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="relative lg:sticky lg:top-28">
          <motion.div style={{ y: imageY }} className="relative aspect-[2/3] overflow-hidden rounded-[2rem] ring-1 ring-gar-gold/40">
            <Image src="/images/gar/chi-siamo.jpg" alt="Angkor Wat e i prodotti Global Angkor Royal" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </motion.div>
          <motion.div
            className="absolute -left-4 top-8 flex h-32 w-32 flex-col items-center justify-center rounded-full border-2 border-gar-gold bg-gar-green-deep/95 text-center shadow-2xl md:-left-10 md:h-36 md:w-36"
            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.3 }}
          >
            <Award className="mb-1 h-5 w-5 text-gar-gold" />
            <span className="font-display text-[10px] font-semibold uppercase leading-tight tracking-wider text-gar-gold-light">
              Autentico
              <br />
              Naturale
              <br />
              Premium
              <br />
              Qualità
            </span>
          </motion.div>
        </div>
      </div>

      <Reveal className="mx-auto max-w-3xl px-6 pb-14 text-center text-lg leading-relaxed text-gar-cream/85">
        <p>Non esportiamo solo prodotti. Esportiamo origine, qualità e autenticità.</p>
        <p>La nostra presenza in Cambogia e in Europa ci permette di comprendere l&apos;origine dei nostri prodotti e le esigenze dei mercati internazionali.</p>
        <p className="mt-2">
          <strong className="font-semibold uppercase text-gar-gold-light">Global Angkor Royal MG Co., Ltd.</strong> vuole diventare un punto di riferimento globale per prodotti cambogiani autentici, naturali e di qualità premium.
        </p>
      </Reveal>

      <div className="border-y border-gar-gold/50 bg-gar-green-deep/60 px-6 py-12 text-center">
        <OriginStatement size="md" />
        <Ornament className="mt-4" />
      </div>
    </section>
  )
}
