"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }

export function OriginStatement({ className, size = "lg" }: { className?: string; size?: "md" | "lg" }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const x1 = useSpring(useTransform(scrollYProgress, [0, 1], [-70, 70]), springConfig)
  const x2 = useSpring(useTransform(scrollYProgress, [0, 1], [70, -70]), springConfig)

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] as const },
  })

  return (
    <p ref={ref} className={cn("font-hero overflow-hidden text-center", className)}>
      <motion.span style={{ x: x1 }} className="block">
        <motion.span
          {...reveal(0)}
          className={cn(
            "block font-normal italic leading-[1.15] tracking-tight text-gar-cream/90",
            size === "lg" ? "text-[1.7rem] sm:text-[2.3rem] lg:text-[2.6rem]" : "text-[1.5rem] sm:text-[2rem] lg:text-[2.2rem]",
          )}
        >
          Cambogia è la nostra origine.
        </motion.span>
      </motion.span>
      <motion.span style={{ x: x2 }} className="block">
        <motion.span
          {...reveal(0.15)}
          className={cn(
            "text-gold-gradient inline-block px-2 pb-[0.1em] font-bold leading-[1] tracking-[-0.02em]",
            size === "lg" ? "text-[2.3rem] sm:text-[3.4rem] lg:text-[3.9rem]" : "text-[2rem] sm:text-[2.8rem] lg:text-[3.2rem]",
          )}
        >
          Il mondo è la nostra destinazione.
        </motion.span>
      </motion.span>
    </p>
  )
}
