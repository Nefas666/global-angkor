"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ease } from "@/lib/site"

export function OrnamentFlower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-4 w-4", className)} fill="currentColor">
      <path d="M12 2c1.2 2.6 1.2 5 0 7.4C10.8 7 10.8 4.6 12 2Zm0 20c-1.2-2.6-1.2-5 0-7.4 1.2 2.4 1.2 4.8 0 7.4ZM2 12c2.6-1.2 5-1.2 7.4 0C7 13.2 4.6 13.2 2 12Zm20 0c-2.6 1.2-5 1.2-7.4 0 2.4-1.2 4.8-1.2 7.4 0ZM5 5c2.6.6 4.2 2.2 4.8 4.8C7.2 9.2 5.6 7.6 5 5Zm14 14c-2.6-.6-4.2-2.2-4.8-4.8 2.6.6 4.2 2.2 4.8 4.8ZM19 5c-.6 2.6-2.2 4.2-4.8 4.8.6-2.6 2.2-4.2 4.8-4.8ZM5 19c.6-2.6 2.2-4.2 4.8-4.8-.6 2.6-2.2 4.2-4.8 4.8Z" />
      <circle cx="12" cy="12" r="1.6" />
    </svg>
  )
}

export function Ornament({ className, width = "w-24" }: { className?: string; width?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3 text-gar-gold", className)}>
      <motion.span
        className={cn("h-px bg-gradient-to-r from-transparent to-gar-gold origin-right", width)}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      />
      <motion.span
        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
        whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
      >
        <OrnamentFlower />
      </motion.span>
      <motion.span
        className={cn("h-px bg-gradient-to-l from-transparent to-gar-gold origin-left", width)}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      />
    </div>
  )
}
