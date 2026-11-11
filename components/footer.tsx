"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ClipboardList, Facebook, Globe, Instagram, Leaf, Linkedin, LockKeyhole, Mail, MapPin, PawPrint, Phone } from "lucide-react"
import { company, legalLinks, offices, socials } from "@/lib/site"
import { OrnamentFlower } from "@/components/gar/ornament"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center">
      <h4 className="font-display text-base font-semibold uppercase tracking-wide text-gar-gold-light md:text-lg">{children}</h4>
      <div className="mt-2 flex items-center justify-center gap-3 text-gar-gold">
        <span className="h-px w-16 bg-gar-gold/60" />
        <OrnamentFlower className="h-3.5 w-3.5" />
        <span className="h-px w-16 bg-gar-gold/60" />
      </div>
    </div>
  )
}

function InfoRow({ icon: Icon, children }: { icon: typeof Mail; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gar-gold" strokeWidth={1.6} />
      <span>{children}</span>
    </li>
  )
}

function Flag({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-gar-gold">
      <Image src={src} alt={alt} fill sizes="64px" className="scale-110 object-cover" />
    </span>
  )
}

function SocialLink({ href, icon: Icon, label, brand }: { href: string; icon: typeof Mail; label: string; brand: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 text-sm text-gar-cream/90 transition-colors hover:text-gar-gold-light"
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full text-white" style={{ background: brand }}>
        <Icon className="h-4 w-4" />
      </span>
      {label}
    </motion.a>
  )
}

export function Footer() {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: "-100px" })
  const instagramGradient = "radial-gradient(circle at 30% 110%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285AEB 90%)"

  return (
    <footer ref={footerRef} id="contatti-footer" className="relative overflow-hidden border-t-4 border-gar-gold bg-gar-green-deep text-gar-cream">
      <div className="bg-gar-pattern absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6 pt-14 pb-8">
        <motion.div
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-gar-gold/40"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="lg:pr-10">
            <div className="flex items-center gap-4">
              <Flag src={offices.cambodia.flag} alt="Bandiera della Cambogia" />
              <ColumnTitle>{offices.cambodia.title}</ColumnTitle>
            </div>
            <p className="mt-5 font-semibold uppercase tracking-wide">{company.name}</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gar-cream/85">
              <InfoRow icon={MapPin}>{offices.cambodia.address.map((line) => <span key={line} className="block">{line}</span>)}</InfoRow>
              <InfoRow icon={ClipboardList}>Registration Number {offices.cambodia.registration}</InfoRow>
              <InfoRow icon={ClipboardList}>MOC Number {offices.cambodia.moc}</InfoRow>
              <InfoRow icon={Phone}><a href={`tel:${offices.cambodia.phone.replace(/\s/g, "")}`} className="hover:text-gar-gold-light">Phone: {offices.cambodia.phone}</a></InfoRow>
              <InfoRow icon={Mail}><a href={`mailto:${company.email}`} className="hover:text-gar-gold-light">Email: {company.email}</a></InfoRow>
              <InfoRow icon={Globe}><a href={company.websiteUrl} className="hover:text-gar-gold-light">Website: {company.website}</a></InfoRow>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:px-10">
            <div className="flex items-center gap-4">
              <Flag src={offices.italy.flag} alt="Bandiera dell'Italia" />
              <ColumnTitle>{offices.italy.title}</ColumnTitle>
            </div>
            <p className="mt-5 font-semibold uppercase tracking-wide">{company.name}</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-gar-cream/85">
              <InfoRow icon={MapPin}>{offices.italy.address.map((line) => <span key={line} className="block">{line}</span>)}</InfoRow>
              <InfoRow icon={Phone}><a href={`tel:${offices.italy.phone.replace(/\s/g, "")}`} className="hover:text-gar-gold-light">Phone: {offices.italy.phone}</a></InfoRow>
              <InfoRow icon={Mail}><a href={`mailto:${company.email}`} className="hover:text-gar-gold-light">Email: {company.email}</a></InfoRow>
              <InfoRow icon={Globe}><a href={company.websiteUrl} className="hover:text-gar-gold-light">Website: {company.website}</a></InfoRow>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1 lg:pl-10">
            <ColumnTitle>Follow us</ColumnTitle>
            <div className="mt-6 space-y-5">
              {[
                { group: socials.petCare, icon: PawPrint },
                { group: socials.wellness, icon: Leaf },
              ].map(({ group, icon: Icon }) => (
                <div key={group.handle} className="flex items-center gap-4 border-b border-gar-gold/30 pb-5">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gar-gold text-gar-gold">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <div className="space-y-2">
                    <p className="font-display text-sm font-semibold text-gar-gold-light">{group.label}</p>
                    <SocialLink href={group.facebook} icon={Facebook} label={group.handle} brand="#1877F2" />
                    <SocialLink href={group.instagram} icon={Instagram} label={group.handle} brand={instagramGradient} />
                  </div>
                </div>
              ))}
              <motion.a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0A66C2] text-white ring-2 ring-white/80">
                  <Linkedin className="h-6 w-6" />
                </span>
                <span className="text-sm leading-snug text-gar-cream/85">
                  <span className="block font-serif text-lg text-gar-cream">{company.name}</span>
                  Company news, partnerships and business opportunities.
                </span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gar-gold/40 pt-6 text-sm text-gar-cream/80 md:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <Link href="/" className="relative block h-14 w-12 shrink-0" aria-label="Home">
              <Image src="/logo-global-angkor-royal.svg" alt="Global Angkor Royal" fill className="object-contain" />
            </Link>
            <LockKeyhole className="hidden h-5 w-5 text-gar-gold sm:block" strokeWidth={1.6} />
            <p>© {new Date().getFullYear()} GLOBAL ANGKOR ROYAL MG CO., LTD. — All Rights Reserved.</p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-gar-gold-light">
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[8rem] font-bold leading-none text-white/[0.025] md:text-[14rem]"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        aria-hidden="true"
      >
        Angkor Royal
      </motion.div>
    </footer>
  )
}
