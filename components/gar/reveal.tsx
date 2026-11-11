"use client"

import { motion, useInView, type HTMLMotionProps } from "framer-motion"
import { useRef } from "react"
import { ease } from "@/lib/site"

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number; x?: number }

export function Reveal({ delay = 0, y = 40, x = 0, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function SlideUpText({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <span ref={ref} className="block overflow-hidden">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "110%" }}
        animate={inView ? { y: 0 } : { y: "110%" }}
        transition={{ duration: 0.7, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}
