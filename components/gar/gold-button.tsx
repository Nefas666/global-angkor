"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type GoldButtonProps = { href: string; children: React.ReactNode; variant?: "green" | "gold" | "outline"; className?: string }

const MotionLink = motion.create(Link)

export function GoldButton({ href, children, variant = "green", className }: GoldButtonProps) {
  return (
    <MotionLink
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wider shadow-lg",
        variant === "green" && "bg-gar-green text-gar-cream ring-1 ring-gar-gold/60",
        variant === "gold" && "bg-gar-gold-light text-gar-green",
        variant === "outline" && "border border-gar-gold text-gar-gold-light",
        className,
      )}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.span
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
        whileHover={{ x: "200%" }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
      <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </MotionLink>
  )
}
