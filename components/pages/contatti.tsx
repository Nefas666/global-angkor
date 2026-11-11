"use client"

import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { useState, type FormEvent } from "react"
import { CircleCheck, Mail, MessageSquareText, Phone, Send, Tag, UserRound } from "lucide-react"
import { Ornament, OrnamentFlower } from "@/components/gar/ornament"
import { Reveal, SlideUpText } from "@/components/gar/reveal"
import { company, offices, ease } from "@/lib/site"

const contacts = [
  { icon: Mail, title: "Email", value: company.email, href: `mailto:${company.email}` },
  { icon: Phone, title: "Mercato asiatico", value: offices.cambodia.phone, href: `tel:${offices.cambodia.phone.replace(/\s/g, "")}` },
  { icon: Phone, title: "Mercato europeo", value: offices.italy.phone, href: `tel:${offices.italy.phone.replace(/\s/g, "")}` },
]

const inputClass =
  "w-full rounded-lg border border-gar-gold/40 bg-white py-3 pl-11 pr-4 text-sm text-gar-ink placeholder:text-gar-ink/45 outline-none transition focus:border-gar-gold focus:ring-2 focus:ring-gar-gold/30"

export function Contatti() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = String(data.get("subject") || "Richiesta informazioni dal sito")
    const body = `Nome: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40">
      <div className="absolute inset-0">
        <Image src="/images/gar/riso-hero.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-gar-cream via-gar-cream/85 to-gar-cream/40" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div className="text-center lg:text-left">
          <h1 className="font-display text-5xl font-semibold uppercase tracking-wide text-gar-green md:text-7xl">
            <SlideUpText>Contattaci</SlideUpText>
          </h1>
          <Ornament className="mt-4 lg:justify-start" width="w-28" />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-md font-serif text-2xl italic leading-snug text-gar-ink/85 lg:mx-0">
              Siamo a tua disposizione per qualsiasi domanda sui nostri prodotti, per discutere di una collaborazione o per ricevere maggiori informazioni. Saremo lieti di risponderti.
            </p>
          </Reveal>
          <ul className="mx-auto mt-10 max-w-sm space-y-6 text-left lg:mx-0">
            {contacts.map(({ icon: Icon, title, value, href }, i) => (
              <motion.li key={title} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease }}>
                <a href={href} className="group flex items-center gap-5">
                  <motion.span whileHover={{ scale: 1.1, rotate: -8 }} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gar-green text-gar-cream shadow-lg">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </motion.span>
                  <span>
                    <span className="block font-display text-lg font-semibold uppercase tracking-wide text-gar-gold">{title}</span>
                    <span className="text-gar-ink transition-colors group-hover:text-gar-green">{value}</span>
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.2} className="rounded-3xl border border-gar-gold/30 bg-gar-cream/95 p-7 shadow-2xl backdrop-blur md:p-10">
          <h2 className="flex items-center justify-center gap-3 font-display text-2xl font-semibold uppercase tracking-wide text-gar-green">
            <OrnamentFlower className="h-7 w-7 text-gar-gold" />
            Invia un messaggio
          </h2>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
                <CircleCheck className="mx-auto h-12 w-12 text-gar-green" strokeWidth={1.4} />
                <p className="mt-4 font-serif text-2xl text-gar-green">Grazie per averci scritto!</p>
                <p className="mt-2 text-sm text-gar-ink/70">Si è aperto il tuo programma di posta con il messaggio pronto da inviare a {company.email}.</p>
                <button type="button" onClick={() => setSent(false)} className="mt-6 text-sm font-semibold uppercase tracking-wider text-gar-gold">
                  Scrivi un altro messaggio
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} className="mt-8 space-y-5" exit={{ opacity: 0 }}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-gar-ink">
                    Il tuo nome <span className="text-gar-red">*</span>
                    <span className="relative mt-2 block">
                      <UserRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gar-ink/50" />
                      <input name="name" required autoComplete="name" placeholder="Il tuo nome" className={inputClass} />
                    </span>
                  </label>
                  <label className="block text-sm font-medium text-gar-ink">
                    La tua email <span className="text-gar-red">*</span>
                    <span className="relative mt-2 block">
                      <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gar-ink/50" />
                      <input name="email" type="email" required autoComplete="email" placeholder="La tua email" className={inputClass} />
                    </span>
                  </label>
                </div>
                <label className="block text-sm font-medium text-gar-ink">
                  Oggetto
                  <span className="relative mt-2 block">
                    <Tag className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gar-ink/50" />
                    <input name="subject" placeholder="Oggetto del messaggio" className={inputClass} />
                  </span>
                </label>
                <label className="block text-sm font-medium text-gar-ink">
                  Messaggio <span className="text-gar-red">*</span>
                  <span className="relative mt-2 block">
                    <MessageSquareText className="absolute left-3.5 top-3.5 h-4 w-4 text-gar-ink/50" />
                    <textarea name="message" required rows={5} placeholder="Scrivi qui il tuo messaggio..." className={`${inputClass} resize-y`} data-lenis-prevent />
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm text-gar-ink">
                  <input type="checkbox" name="privacy" required className="mt-0.5 h-4 w-4 accent-[#0f3b27]" />
                  <span>
                    Ho letto e accetto l&apos;
                    <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-gar-green">
                      Informativa sulla Privacy
                    </Link>
                    . <span className="text-gar-red">*</span>
                  </span>
                </label>
                <p className="text-xs leading-relaxed text-gar-ink/65">
                  Inviando questo modulo, acconsento al trattamento dei miei dati personali da parte di {company.name} per l&apos;evasione della mia richiesta.
                </p>
                <div className="flex justify-end">
                  <motion.button
                    type="submit"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border-2 border-gar-gold bg-gar-green px-8 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-gar-cream shadow-xl"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Send className="h-4 w-4 text-gar-gold-light transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                    Invia messaggio
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
