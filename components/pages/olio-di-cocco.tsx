"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import { Droplet, FlaskConical, Heart, Leaf, Palmtree, PawPrint, Rabbit, Sparkles, Sprout, Users } from "lucide-react"
import { Ornament } from "@/components/gar/ornament"
import { Reveal, SlideUpText } from "@/components/gar/reveal"
import { IconCircle } from "@/components/gar/icon-circle"
import { GoldButton } from "@/components/gar/gold-button"
import { TiltCard } from "@/components/gar/tilt-card"
import { socials, ease } from "@/lib/site"

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }

const heroFeatures = [
  { icon: Leaf, label: "100% naturale" },
  { icon: FlaskConical, label: "Senza additivi" },
  { icon: Droplet, label: "Multiuso" },
  { icon: Users, label: "Per tutti i tipi di pelle" },
]

const benefits = [
  { image: "/images/gar/cocco-pelle.jpg", icon: Sparkles, title: "Pelle", subtitle: "Idratazione e nutrimento", text: "Aiuta a mantenere la pelle morbida, elastica e luminosa, contribuendo a ridurre la sensazione di secchezza." },
  { image: "/images/gar/cocco-corpo.jpg", icon: Heart, title: "Corpo", subtitle: "Morbidezza e protezione", text: "Ideale per massaggi e per le zone particolarmente secche come gomiti, ginocchia e talloni. Lascia la pelle morbida, vellutata e protetta." },
  { image: "/images/gar/cocco-capelli.jpg", icon: Sprout, title: "Capelli", subtitle: "Nutrimento e luminosità", text: "Utilizzato sulle lunghezze e sulle punte, aiuta a nutrire i capelli secchi, rendendoli più morbidi, luminosi e disciplinati." },
  { image: "/images/gar/cocco-labbra.jpg", icon: Droplet, title: "Labbra e zone secche", subtitle: "Trattamento emolliente", text: "La sua azione emolliente lo rende perfetto per labbra, mani e piccole zone soggette a secchezza, aiutando a mantenerle morbide e nutrite." },
]

const strip = [
  { icon: Leaf, label: ["100%", "Olio di Cocco Vergine"] },
  { icon: Sprout, label: ["Origine naturale", "dalla Cambogia"] },
  { icon: Heart, label: ["Senza parabeni", "e siliconi"] },
  { icon: Rabbit, label: ["Non testato", "su animali"] },
  { icon: Palmtree, label: ["Adatto a tutta", "la famiglia"] },
]

export function OlioDiCocco() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 160]), springConfig)
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.8], [1, 0]), springConfig)

  return (
    <>
      <section className="bg-gar-cream px-6 pt-36 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-gar-gold">Le nostre linee</p>
            <h1 className="mt-2 font-display text-4xl font-semibold uppercase tracking-wide text-gar-green md:text-6xl">
              <SlideUpText>Olio di cocco</SlideUpText>
            </h1>
            <Ornament className="mt-4" />
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {[
              { src: "/images/gar/banner-cosmetica.jpg", href: "#cosmetica", alt: "Olio di cocco Cosmetica — Puro e naturale per la cura di pelle, corpo e capelli" },
              { src: "/images/gar/banner-petcare.jpg", href: "#pet-care", alt: "Olio di cocco Pet Care — Cura naturale per cute, pelo e zampe" },
            ].map((banner, i) => (
              <TiltCard key={banner.href} index={i} intensity={5}>
                <Link href={banner.href} className="relative block aspect-square overflow-hidden rounded-2xl">
                  <Image src={banner.src} alt={banner.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </Link>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section id="cosmetica" ref={ref} className="relative scroll-mt-24 overflow-hidden bg-[#f7efdf]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-16 lg:grid-cols-[1fr_1.2fr_auto]">
          <motion.div style={{ y }} className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image src="/images/gar/cocco-hero-donna.jpg" alt="Donna che si prende cura della pelle con olio di cocco" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
          </motion.div>
          <motion.div style={{ opacity }} className="text-center">
            <h2 className="font-display text-4xl font-semibold uppercase leading-tight tracking-wide text-gar-green md:text-5xl">
              <SlideUpText>Olio di cocco</SlideUpText>
              <SlideUpText delay={0.1} className="text-gold-gradient">Cosmetica</SlideUpText>
            </h2>
            <Ornament className="mt-4" />
            <Reveal delay={0.2}>
              <p className="mt-5 font-display text-xl uppercase tracking-wide text-gar-green">Bellezza naturale dalla Cambogia</p>
              <p className="mx-auto mt-3 max-w-md text-gar-ink/80">Un unico ingrediente naturale per la cura quotidiana di viso, corpo e capelli.</p>
            </Reveal>
            <motion.div className="relative mx-auto mt-8 aspect-[220/175] w-full max-w-sm" animate={{ y: [0, -12, 0], rotate: [0, 1.5, 0] }} transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}>
              <Image src="/images/gar/cocco-hero-prodotti.jpg" alt="Bottiglia di olio di cocco e noci di cocco" fill sizes="384px" className="rounded-3xl object-cover shadow-2xl" />
            </motion.div>
          </motion.div>
          <ul className="grid grid-cols-2 gap-5 lg:grid-cols-1">
            {heroFeatures.map(({ icon, label }, i) => (
              <motion.li key={label} className="flex items-center gap-3" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease }}>
                <IconCircle icon={icon} variant="solid" />
                <span className="max-w-[9rem] text-xs font-semibold uppercase tracking-wide text-gar-ink/80">{label}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-gar-cream px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-gar-green md:text-4xl">
              <SlideUpText>I benefici dell&apos;olio di cocco</SlideUpText>
            </h2>
            <Ornament className="mt-3" />
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-2xl text-gar-ink/80">
                Ricco di acidi grassi naturali, vitamine ed antiossidanti, l&apos;olio di cocco è un prezioso alleato di bellezza. Idrata, nutre, protegge e dona luminosità in modo naturale.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <TiltCard key={b.title} index={i} intensity={5} className="h-full">
                <article className="flex h-full flex-col bg-white text-center shadow-[0_10px_40px_-20px_rgba(15,59,39,0.35)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={b.image} alt={b.title} fill sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="-mt-7 flex justify-center">
                    <IconCircle icon={b.icon} variant="solid" className="relative z-10" />
                  </div>
                  <div className="flex-1 px-5 pt-3 pb-6">
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide text-gar-green">{b.title}</h3>
                    <p className="font-serif text-lg italic text-gar-gold">{b.subtitle}</p>
                    <p className="mt-3 text-sm leading-relaxed text-gar-ink/75">{b.text}</p>
                  </div>
                </article>
              </TiltCard>
            ))}
          </div>
          <Reveal className="mt-12 grid grid-cols-2 gap-6 rounded-3xl border border-gar-gold/30 bg-gar-sand px-6 py-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-gar-gold/40">
            {strip.map(({ icon: Icon, label }) => (
              <div key={label[0]} className="flex flex-col items-center text-center">
                <Icon className="h-7 w-7 text-gar-gold" strokeWidth={1.4} />
                <span className="mt-2 text-sm font-semibold text-gar-green">{label[0]}</span>
                <span className="text-sm text-gar-ink/70">{label[1]}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <Reveal y={0} className="relative min-h-[320px] overflow-hidden">
          <Image src="/images/gar/cocco-natura.jpg" alt="Olio di cocco naturale tra foglie di palma" fill sizes="50vw" className="object-cover" />
        </Reveal>
        <div className="bg-gar-pattern flex flex-col justify-center px-8 py-16 text-gar-cream md:px-14">
          <Reveal y={10}>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gar-gold-light">Un ingrediente, infinite possibilità</p>
          </Reveal>
          <h2 className="mt-3 font-display text-3xl font-semibold uppercase leading-tight tracking-wide text-gar-gold-light md:text-4xl">
            <SlideUpText>Pura natura</SlideUpText>
            <SlideUpText delay={0.1} className="text-gar-cream">per la tua beauty routine</SlideUpText>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-lg leading-relaxed text-gar-cream/85">
              L&apos;olio di cocco è un ingrediente semplice e versatile, ideale per una routine di bellezza naturale e consapevole, nel rispetto della tua pelle e dell&apos;ambiente.
            </p>
            <div className="mt-8">
              <GoldButton href="/contatti" variant="gold">Scopri di più</GoldButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="pet-care" className="scroll-mt-24 bg-[#123a7a] px-6 py-20 text-center text-white">
        <Reveal className="mx-auto max-w-3xl">
          <PawPrint className="mx-auto h-10 w-10 text-gar-gold-light" strokeWidth={1.5} />
          <h2 className="mt-4 font-display text-4xl font-semibold uppercase tracking-wide md:text-5xl">Olio di cocco</h2>
          <p className="mt-3 inline-block rounded-md bg-gradient-to-r from-gar-gold to-gar-gold-light px-8 py-2 font-display text-2xl font-bold uppercase tracking-wide text-[#123a7a]">Pet Care</p>
          <p className="mt-6 font-serif text-2xl text-white/90">Cura naturale per cute, pelo e zampe</p>
          <Ornament className="mt-6" />
          <p className="mt-6 text-white/80">
            Scopri la linea Pet Care su{" "}
            <a href={socials.petCare.instagram} target="_blank" rel="noreferrer" className="font-semibold text-gar-gold-light underline-offset-4 hover:underline">
              @{socials.petCare.handle}
            </a>{" "}
            o contattaci per informazioni su formati e distribuzione.
          </p>
          <div className="mt-8">
            <GoldButton href="/contatti" variant="gold">Contattaci</GoldButton>
          </div>
        </Reveal>
      </section>
    </>
  )
}
