"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, ChevronDown, Globe } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { languages } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { ease } from "@/lib/site"

const khmerFont = { fontFamily: "var(--font-khmer), sans-serif" }

export function LanguageSwitcher({ variant = "dropdown" }: { variant?: "dropdown" | "inline" }) {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = languages.find((l) => l.code === language) ?? languages[0]

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [open])

  if (variant === "inline") {
    return (
      <div className="flex items-center gap-3">
        <Globe className="h-4 w-4 text-gar-gold" />
        <div className="flex rounded-full border border-gar-gold/40 p-1" data-no-translate>
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setLanguage(l.code)}
              className={cn("relative rounded-full px-4 py-1.5 text-sm font-semibold transition-colors", language === l.code ? "text-gar-cream" : "text-gar-green")}
              aria-pressed={language === l.code}
            >
              {language === l.code && <motion.span layoutId="lang-pill-mobile" className="absolute inset-0 rounded-full bg-gar-green" />}
              <span className="relative" style={l.code === "km" ? khmerFont : undefined}>{l.short}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-xl border border-gar-gold/40 px-3 py-2.5 text-sm font-semibold text-gar-green transition-colors hover:border-gar-gold hover:bg-gar-sand"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Lingua"
      >
        <Globe className="h-4 w-4 text-gar-gold" />
        <span data-no-translate style={current.code === "km" ? khmerFont : undefined}>{current.short}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease }}
            className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-gar-gold/30 bg-white p-2 shadow-2xl"
            role="listbox"
          >
            <div data-no-translate>
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  role="option"
                  aria-selected={language === l.code}
                  onClick={() => {
                    setLanguage(l.code)
                    setOpen(false)
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm text-gar-ink/80 transition-colors hover:bg-gar-sand hover:text-gar-green"
                >
                  <span className="font-medium" style={l.code === "km" ? khmerFont : undefined}>{l.label}</span>
                  {language === l.code && <Check className="h-4 w-4 text-gar-gold" />}
                </button>
              ))}
            </div>
            <p className="border-t border-gar-gold/20 px-4 pt-2 pb-1 text-[10px] uppercase tracking-wider text-gar-ink/50">Traduzione automatica</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
