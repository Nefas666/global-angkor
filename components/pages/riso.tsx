"use client"

import Image from "next/image"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import {
  Archive, CalendarDays, CircleCheck, CookingPot, Droplet, Droplets, Hand, Heart, Leaf, MapPin, Package, Sprout, Timer, Users, Waves, Wheat,
} from "lucide-react"
import { Ornament } from "@/components/gar/ornament"
import { Reveal, SlideUpText } from "@/components/gar/reveal"
import { IconCircle } from "@/components/gar/icon-circle"
import { ease } from "@/lib/site"

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }

const traditions = [
  { icon: Sprout, label: "Coltivazione sostenibile" },
  { icon: Leaf, label: "Rispetto per la natura" },
  { icon: Users, label: "Tradizione e comunità" },
]

const properties = [
  { icon: MapPin, label: "Origine", value: "Cambogia" },
  { icon: Sprout, label: "Area di coltivazione", value: "Siem Reap" },
  { icon: Wheat, label: "Metodo di coltivazione", value: "Tradizionale" },
  { icon: CalendarDays, label: "Raccolto", value: "Annuale" },
  { icon: Droplets, label: "Sistema di irrigazione", value: "Acqua naturale" },
  { icon: Leaf, label: "Coltivazione sostenibile", value: "Sì" },
  { icon: Hand, label: "Selezione dei chicchi", value: "Selezionati a mano" },
]

const nutrition = [
  ["Energia", "350 kcal"],
  ["Carboidrati", "78 g"],
  ["Proteine", "7 g"],
  ["Grassi", "0,6 g"],
  ["Fibre", "0,4 g"],
  ["Sale", "0 g"],
]

const steps = [
  { icon: Droplet, text: "Sciacquare il riso con acqua fredda." },
  { icon: Waves, text: "Utilizzare 1 parte di riso e 1,5 parti di acqua." },
  { icon: CookingPot, text: "Portare a ebollizione." },
  { icon: CookingPot, text: "Cuocere a fuoco basso per circa 12–14 minuti." },
  { icon: Timer, text: "Lasciare riposare per circa 5 minuti prima di servire." },
]

const formats = ["500 g", "1 kg", "5 kg", "20 kg", "50 kg"]
const formatNotes = ["Confezionamento sottovuoto disponibile", "Soluzioni Retail e Professional", "Private Label disponibile"]

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-gar-gold/30 bg-white/70 p-7 shadow-[0_10px_40px_-20px_rgba(15,59,39,0.35)] backdrop-blur ${className}`}>{children}</div>
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center">
      <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-gar-green">{children}</h3>
      <Ornament className="mt-2" width="w-10" />
    </div>
  )
}

export function Riso() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const imageY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 150]), springConfig)
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.8], [1, 0]), springConfig)

  return (
    <>
      <section ref={ref} className="relative flex min-h-[90vh] items-center overflow-hidden bg-gar-cream">
        <motion.div style={{ y: imageY }} className="absolute inset-y-0 right-0 w-full lg:w-[60%]">
          <Image src="/images/gar/riso-hero.jpg" alt="Risaia cambogiana al tramonto" fill priority sizes="60vw" className="object-cover lg:mask-fade-left" />
          <div className="absolute inset-0 bg-gar-cream/70 lg:hidden" />
        </motion.div>
        <motion.div style={{ opacity }} className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-36 pb-20">
          <div className="max-w-lg text-center">
            <Ornament width="w-32" />
            <h1 className="mt-4 font-display text-4xl font-semibold uppercase leading-tight tracking-wide text-gar-green md:text-6xl">
              <SlideUpText>Dalla terra</SlideUpText>
              <SlideUpText delay={0.1}>della Cambogia</SlideUpText>
            </h1>
            <Ornament className="mt-4" width="w-32" />
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease }} className="mt-5 font-display text-2xl uppercase tracking-wide text-gar-gold md:text-3xl">
              Un riso di qualità
              <br />
              per il mondo
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.8, ease }} className="mx-auto mt-5 max-w-sm leading-relaxed text-gar-ink/85">
              Coltivato nelle fertili pianure cambogiane, bagnate dall&apos;acqua pura e dal sole tropicale, secondo tradizioni tramandate da generazioni.
            </motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, type: "spring", stiffness: 120, damping: 16 }} className="mt-8 flex flex-col items-center">
              <IconCircle icon={Wheat} variant="solid" size="lg" />
              <div className="-mt-3 rounded-xl border-2 border-gar-gold bg-gar-green px-8 py-3 font-display uppercase tracking-wide text-gar-cream shadow-xl">
                Riso Jasmine cambogiano
                <span className="block text-sm text-gar-gold-light">Qualità premium</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="grid bg-gar-sand lg:grid-cols-[1.3fr_1fr]">
        <Reveal y={0} className="relative min-h-[320px] overflow-hidden">
          <Image src="/images/gar/riso-tradizione.jpg" alt="Agricoltore cambogiano durante il raccolto del riso" fill sizes="60vw" className="object-cover" />
        </Reveal>
        <div className="flex flex-col justify-center px-8 py-14 md:px-14">
          <Reveal y={10}>
            <Wheat className="h-7 w-7 text-gar-gold" strokeWidth={1.4} />
          </Reveal>
          <h2 className="mt-3 font-display text-3xl font-semibold uppercase leading-tight tracking-wide text-gar-green md:text-4xl">
            <SlideUpText>La nostra</SlideUpText>
            <SlideUpText delay={0.1}>tradizione</SlideUpText>
          </h2>
          <Ornament className="mt-4 justify-start" width="w-24" />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-gar-ink/80">
              Ogni chicco nasce dall&apos;impegno e dalla passione dei nostri agricoltori. Il riso viene coltivato con metodi sostenibili, rispettando la natura e le persone.
            </p>
          </Reveal>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {traditions.map(({ icon, label }, i) => (
              <Reveal key={label} delay={0.2 + i * 0.1} y={20} className="flex flex-col items-center text-center">
                <IconCircle icon={icon} />
                <span className="mt-3 font-display text-[11px] font-semibold uppercase tracking-wide text-gar-ink/80">{label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gar-cream px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          <Reveal>
            <Card className="h-full">
              <CardTitle>Riso Jasmine cambogiano</CardTitle>
              <div className="mt-6 space-y-5 leading-relaxed text-gar-ink/80">
                <p>Il nostro Riso Jasmine Cambogiano è un riso aromatico apprezzato per il suo profumo naturale, la consistenza morbida e il sapore delicato.</p>
                <Ornament width="w-8" />
                <p>Coltivato nelle fertili pianure della Cambogia secondo metodi agricoli tradizionali, nasce dall&apos;esperienza degli agricoltori locali e da un&apos;attenta selezione dei chicchi.</p>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="h-full">
              <CardTitle>Proprietà agronomiche</CardTitle>
              <dl className="mt-6 divide-y divide-gar-gold/25 overflow-hidden rounded-2xl border border-gar-gold/30">
                {properties.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-gar-sand/70">
                    <Icon className="h-5 w-5 text-gar-green" strokeWidth={1.5} />
                    <dt className="text-gar-ink/80">{label}</dt>
                    <dd className="font-medium text-gar-green">{value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </Reveal>
          <div className="grid gap-6">
            {["/images/gar/riso-spighe.jpg", "/images/gar/riso-campo.jpg"].map((src, i) => (
              <Reveal key={src} delay={0.2 + i * 0.1} className="group relative min-h-[200px] overflow-hidden rounded-3xl">
                <Image src={src} alt="" fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gar-sand px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_1.6fr_1fr]">
          <Reveal>
            <Card className="h-full">
              <CardTitle>Valori nutrizionali</CardTitle>
              <p className="mt-3 text-center text-xs text-gar-ink/60">(Valori medi per 100 g di prodotto crudo)</p>
              <table className="mt-5 w-full text-sm">
                <tbody className="divide-y divide-gar-gold/25">
                  {nutrition.map(([label, value]) => (
                    <tr key={label}>
                      <td className="py-2.5 text-gar-ink/80">{label}</td>
                      <td className="py-2.5 text-right font-medium text-gar-green">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="h-full">
              <CardTitle>Come prepararlo</CardTitle>
              <div className="mt-6 grid items-center gap-6 md:grid-cols-[1.3fr_1fr]">
                <ol className="space-y-4">
                  {steps.map(({ icon: Icon, text }, i) => (
                    <motion.li key={text} className="flex items-start gap-3 text-sm text-gar-ink/85" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease }}>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gar-green text-xs font-bold text-gar-cream">{i + 1}</span>
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gar-green" strokeWidth={1.5} />
                      <span>{text}</span>
                    </motion.li>
                  ))}
                </ol>
                <motion.div className="relative mx-auto aspect-square w-full max-w-[220px]" animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}>
                  <Image src="/images/gar/riso-ciotola.jpg" alt="Ciotola di riso Jasmine cotto" fill sizes="220px" className="rounded-full object-cover" />
                </motion.div>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.2}>
            <Card className="h-full">
              <CardTitle>Conservazione</CardTitle>
              <div className="mt-8 flex items-start gap-4">
                <IconCircle icon={Archive} />
                <p className="leading-relaxed text-gar-ink/80">Conservare in luogo fresco e asciutto, al riparo da fonti di calore e umidità.</p>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="bg-gar-cream px-6 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold uppercase tracking-wide text-gar-green">Formati disponibili</h2>
            <Ornament className="mt-3" width="w-12" />
            <div className="mt-8 grid grid-cols-5 gap-3">
              {formats.map((format, i) => (
                <motion.div key={format} className="flex flex-col items-center gap-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }}>
                  <Package className="text-gar-green" style={{ width: 28 + i * 4, height: 28 + i * 4 }} strokeWidth={1.4} />
                  <span className="text-sm font-semibold text-gar-ink">{format}</span>
                </motion.div>
              ))}
            </div>
            <ul className="mt-8 space-y-3">
              {formatNotes.map((note) => (
                <li key={note} className="flex items-center gap-3 text-gar-ink/85">
                  <CircleCheck className="h-5 w-5 text-gar-green" strokeWidth={1.6} />
                  {note}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15} className="relative aspect-[654/210] overflow-hidden rounded-3xl shadow-xl">
            <Image src="/images/gar/riso-formati.jpg" alt="Confezioni di riso Jasmine Angkor Royal da 500 g a 50 kg" fill sizes="60vw" className="object-cover" />
          </Reveal>
        </div>
        <Reveal className="mx-auto mt-14 flex max-w-xl items-center justify-center gap-3 text-center font-serif text-xl italic text-gar-green">
          <Heart className="h-5 w-5 text-gar-gold" /> Dalla Cambogia alla tua tavola
        </Reveal>
      </section>
    </>
  )
}
