"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Download, Menu, ShoppingBag, X } from "lucide-react"
import { navItems, ease } from "@/lib/site"
import { cn } from "@/lib/utils"
import { LanguageSwitcher } from "@/components/language-switcher"
import { CartButton } from "@/components/shop/cart-button"

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setProductsOpen(false)
  }, [pathname])

  const openProducts = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setProductsOpen(true)
  }
  const closeProducts = () => {
    closeTimer.current = setTimeout(() => setProductsOpen(false), 120)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500",
        scrolled ? "border-gar-gold/30 bg-white/95 shadow-[0_8px_30px_-12px_rgba(15,59,39,0.25)] backdrop-blur-md" : "border-transparent bg-white/80 backdrop-blur-sm",
      )}
    >
      <div className={cn("mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-4 transition-all duration-500 md:px-6", scrolled ? "py-1.5" : "py-3")}>
        <Link href="/" className="flex items-center gap-3" aria-label="Global Angkor Royal — Home">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={cn("relative shrink-0 transition-all duration-500", scrolled ? "h-14 w-12" : "h-20 w-[4.4rem]")}
          >
            <Image src="/logo-global-angkor-royal.svg" alt="Global Angkor Royal" fill priority className="object-contain" />
          </motion.div>
          <span className="hidden flex-col leading-none 2xl:flex">
            <span className="font-display text-2xl font-semibold tracking-wide text-gar-green">Global Angkor Royal</span>
            <span className="mt-1 font-display text-sm tracking-[0.25em] text-gar-gold">MG CO., LTD.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex xl:gap-3">
          {navItems.map((item, i) => {
            const active = isActive(pathname, item.href)
            const hasChildren = !!item.children?.length
            return (
              <motion.div
                key={item.href}
                className="relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease }}
                onMouseEnter={hasChildren ? openProducts : undefined}
                onMouseLeave={hasChildren ? closeProducts : undefined}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex flex-col items-center px-3 py-2 text-[0.82rem] font-medium uppercase tracking-wide transition-colors xl:text-sm",
                    active ? "text-gar-green" : "text-gar-ink/80 hover:text-gar-green",
                  )}
                  onFocus={hasChildren ? openProducts : undefined}
                  aria-haspopup={hasChildren ? "menu" : undefined}
                  aria-expanded={hasChildren ? productsOpen : undefined}
                >
                  {item.label === "Shop" && <ShoppingBag className="absolute -top-2.5 h-4 w-4 text-gar-gold" strokeWidth={1.7} />}
                  <span className="flex items-center gap-1">
                    {item.label}
                    {hasChildren && <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", productsOpen && "rotate-180")} />}
                  </span>
                  {active ? (
                    <motion.span layoutId="nav-underline" className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-gar-gold" />
                  ) : (
                    <span className="absolute -bottom-0.5 left-3 right-3 h-0.5 origin-left scale-x-0 rounded-full bg-gar-gold/70 transition-transform duration-300 group-hover:scale-x-100" />
                  )}
                </Link>

                {hasChildren && (
                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease }}
                        className="absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 overflow-hidden rounded-2xl border border-gar-gold/30 bg-white p-2 shadow-2xl"
                        role="menu"
                      >
                        {item.children!.map((child, ci) => (
                          <motion.div key={child.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: ci * 0.04 }}>
                            <Link
                              href={child.href}
                              role="menuitem"
                              className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-gar-ink/80 transition-colors hover:bg-gar-sand hover:text-gar-green"
                            >
                              <span className="font-medium">{child.label}</span>
                              {child.note && <span className="text-[10px] font-semibold uppercase tracking-wider text-gar-red">{child.note}</span>}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            )
          })}

          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: navItems.length * 0.08, duration: 0.4, ease }}>
            <Link
              href="/download"
              className="group relative ml-1 inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gar-green px-5 py-3 text-sm font-semibold uppercase tracking-wide text-gar-cream shadow-md ring-1 ring-gar-gold/50 transition-colors hover:bg-gar-green-soft"
            >
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              Download
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (navItems.length + 1) * 0.08, duration: 0.4, ease }}>
            <LanguageSwitcher />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (navItems.length + 2) * 0.08, duration: 0.4, ease }}>
            <CartButton />
          </motion.div>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
        <CartButton />
        <motion.button
          type="button"
          className="p-2 text-gar-green"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label={mobileMenuOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={mobileMenuOpen}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden border-t border-gar-gold/30 bg-white/95 backdrop-blur-md lg:hidden"
            data-lenis-prevent
          >
            <div className="max-h-[75vh] space-y-1 overflow-y-auto px-6 py-4">
              <div className="mb-3 border-b border-gar-gold/20 pb-4">
                <LanguageSwitcher variant="inline" />
              </div>
              {navItems.map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} onClick={(e) => (e.target as HTMLElement).closest("a") && setMobileMenuOpen(false)}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block py-2 font-display text-lg font-semibold uppercase tracking-wide",
                      isActive(pathname, item.href) ? "text-gar-gold" : "text-gar-green",
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="mb-2 ml-3 space-y-1 border-l border-gar-gold/40 pl-4">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} className="flex items-center gap-2 py-1.5 text-sm text-gar-ink/75">
                          {child.label}
                          {child.note && <span className="text-[10px] font-semibold uppercase tracking-wider text-gar-red">{child.note}</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <Link href="/download" onClick={() => setMobileMenuOpen(false)} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gar-green px-5 py-3 text-sm font-semibold uppercase tracking-wide text-gar-cream">
                <Download className="h-4 w-4" />
                Download
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
