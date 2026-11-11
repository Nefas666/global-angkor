"use client"

import { AnimatePresence, motion, useAnimationControls } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import { useEffect } from "react"
import { useCart } from "./cart-provider"

export function CartButton() {
  const { count, open, lastAdded } = useCart()
  const controls = useAnimationControls()

  useEffect(() => {
    if (lastAdded) controls.start({ scale: [1, 1.25, 0.95, 1], rotate: [0, -10, 8, 0], transition: { duration: 0.5 } })
  }, [lastAdded, controls])

  return (
    <motion.button type="button" onClick={open} animate={controls} whileTap={{ scale: 0.9 }} className="relative rounded-xl p-2.5 text-gar-green transition-colors hover:bg-gar-sand" aria-label="Apri carrello">
      <ShoppingBag className="h-5 w-5" />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gar-gold px-1 text-[10px] font-bold text-white"
            data-no-translate
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
