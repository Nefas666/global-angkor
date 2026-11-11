"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, Building2, Check, CreditCard, Loader2, Lock, PackageCheck, Wallet } from "lucide-react"
import { Ornament } from "@/components/gar/ornament"
import { useCart } from "./cart-provider"
import { commerce, findLine, formatPrice, paymentMethods, shippingCost, shippingMethods, type Customer, type OrderResult } from "@/lib/commerce"
import { cn } from "@/lib/utils"
import { ease } from "@/lib/site"

const steps = ["Dati", "Spedizione", "Pagamento"] as const
const paymentIcons = { card: CreditCard, paypal: Wallet, bank: Building2 } as const

const emptyCustomer: Customer = { firstName: "", lastName: "", email: "", phone: "", address: "", city: "", zip: "", country: "Italia" }

const inputClass = "w-full rounded-xl border border-gar-gold/30 bg-white px-4 py-3 text-sm text-gar-ink outline-none transition focus:border-gar-gold focus:ring-2 focus:ring-gar-gold/25"

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gar-ink/80">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-gar-red">{error}</span>}
    </label>
  )
}

export function Checkout() {
  const { lines, subtotal, clear } = useCart()
  const [step, setStep] = useState(0)
  const [customer, setCustomer] = useState<Customer>(emptyCustomer)
  const [errors, setErrors] = useState<Partial<Record<keyof Customer | "card", string>>>({})
  const [shippingId, setShippingId] = useState(shippingMethods[0].id)
  const [paymentId, setPaymentId] = useState(paymentMethods[0].id)
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "" })
  const [processing, setProcessing] = useState(false)
  const [order, setOrder] = useState<(OrderResult & { email: string }) | null>(null)

  const shippingMethod = shippingMethods.find((m) => m.id === shippingId)
  const shipping = shippingCost(shippingMethod, subtotal)
  const total = subtotal + shipping

  const set = (key: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setCustomer((c) => ({ ...c, [key]: e.target.value }))

  const validateCustomer = () => {
    const next: typeof errors = {}
    const required: (keyof Customer)[] = ["firstName", "lastName", "email", "address", "city", "zip"]
    for (const key of required) if (!customer[key].trim()) next[key] = "Campo obbligatorio"
    if (customer.email && !/^\S+@\S+\.\S+$/.test(customer.email)) next.email = "Email non valida"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const validatePayment = () => {
    if (paymentId !== "card") return true
    const ok = card.number.replace(/\s/g, "").length >= 12 && /^\d{2}\/\d{2}$/.test(card.expiry) && /^\d{3,4}$/.test(card.cvc)
    setErrors(ok ? {} : { card: "Controlla i dati della carta" })
    return ok
  }

  const next = async () => {
    if (step === 0 && !validateCustomer()) return
    if (step < 2) return setStep(step + 1)
    if (!validatePayment()) return
    setProcessing(true)
    const result = await commerce.placeOrder({ lines, customer, shippingId, paymentId })
    setOrder({ ...result, email: customer.email })
    clear()
    setProcessing(false)
    window.scrollTo({ top: 0 })
  }

  if (order) {
    return (
      <section className="bg-gar-cream px-6 pt-40 pb-28">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="mx-auto max-w-xl rounded-3xl border border-gar-gold/30 bg-white p-10 text-center shadow-xl">
          <motion.span initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }} className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gar-green text-gar-cream">
            <PackageCheck className="h-9 w-9" />
          </motion.span>
          <h1 className="mt-6 font-serif text-4xl font-semibold text-gar-green">Grazie per il tuo ordine!</h1>
          <Ornament className="mt-4" />
          <p className="mt-5 text-gar-ink/75">
            Abbiamo ricevuto il tuo ordine <strong className="text-gar-green" data-no-translate>{order.reference}</strong>.
          </p>
          <p className="mt-1 text-sm text-gar-ink/60">
            Riceverai una conferma a <span data-no-translate>{order.email}</span>
          </p>
          <p className="mt-6 font-display text-2xl font-semibold text-gar-gold">{formatPrice(order.total)}</p>
          <p className="mt-6 rounded-xl border border-dashed border-gar-red/40 px-4 py-2 text-xs text-gar-red">Simulazione: nessun pagamento è stato effettuato.</p>
          <Link href="/shop" className="mt-8 inline-flex rounded-full bg-gar-green px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-gar-cream">
            Torna allo shop
          </Link>
        </motion.div>
      </section>
    )
  }

  if (lines.length === 0) {
    return (
      <section className="bg-gar-cream px-6 pt-44 pb-32 text-center">
        <h1 className="font-serif text-4xl font-semibold text-gar-green">Il carrello è vuoto</h1>
        <Ornament className="mt-4" />
        <Link href="/shop" className="mt-8 inline-flex rounded-full bg-gar-green px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-gar-cream">
          Vai allo shop
        </Link>
      </section>
    )
  }

  return (
    <section className="bg-gar-cream px-6 pt-36 pb-24">
      <div className="mx-auto max-w-6xl">
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-gar-ink/60 hover:text-gar-green">
          <ArrowLeft className="h-4 w-4" /> Torna allo shop
        </Link>
        <h1 className="mt-4 font-serif text-5xl font-semibold text-gar-green">Checkout</h1>

        <ol className="mt-8 flex items-center gap-3">
          {steps.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-3">
              <button type="button" disabled={i > step} onClick={() => setStep(i)} className="flex items-center gap-2">
                <span className={cn("flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold transition-colors", i < step ? "border-gar-green bg-gar-green text-gar-cream" : i === step ? "border-gar-gold bg-gar-gold text-white" : "border-gar-gold/40 text-gar-ink/40")}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span className={cn("hidden text-sm font-semibold sm:block", i <= step ? "text-gar-green" : "text-gar-ink/40")}>{label}</span>
              </button>
              {i < steps.length - 1 && (
                <span className="h-px flex-1 bg-gar-gold/30">
                  <motion.span className="block h-px bg-gar-green" animate={{ width: i < step ? "100%" : "0%" }} transition={{ duration: 0.5, ease }} />
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="rounded-3xl border border-gar-gold/25 bg-white p-6 shadow-sm md:p-8">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35, ease }}>
                {step === 0 && (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-gar-green sm:col-span-2">Dati di spedizione</h2>
                    <Field label="Nome *" error={errors.firstName}><input className={inputClass} value={customer.firstName} onChange={set("firstName")} autoComplete="given-name" /></Field>
                    <Field label="Cognome *" error={errors.lastName}><input className={inputClass} value={customer.lastName} onChange={set("lastName")} autoComplete="family-name" /></Field>
                    <Field label="Email *" error={errors.email}><input type="email" className={inputClass} value={customer.email} onChange={set("email")} autoComplete="email" /></Field>
                    <Field label="Telefono"><input className={inputClass} value={customer.phone} onChange={set("phone")} autoComplete="tel" /></Field>
                    <div className="sm:col-span-2"><Field label="Indirizzo *" error={errors.address}><input className={inputClass} value={customer.address} onChange={set("address")} autoComplete="street-address" /></Field></div>
                    <Field label="Città *" error={errors.city}><input className={inputClass} value={customer.city} onChange={set("city")} autoComplete="address-level2" /></Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="CAP *" error={errors.zip}><input className={inputClass} value={customer.zip} onChange={set("zip")} autoComplete="postal-code" /></Field>
                      <Field label="Paese">
                        <select className={inputClass} value={customer.country} onChange={set("country")}>
                          {["Italia", "Cambogia", "Francia", "Germania", "Spagna"].map((c) => <option key={c}>{c}</option>)}
                        </select>
                      </Field>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-gar-green">Metodo di spedizione</h2>
                    {shippingMethods.map((m) => {
                      const cost = shippingCost(m, subtotal)
                      return (
                        <label key={m.id} className={cn("flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-5 transition-colors", shippingId === m.id ? "border-gar-green bg-gar-sand/60" : "border-gar-gold/30 hover:border-gar-gold")}>
                          <span className="flex items-center gap-4">
                            <input type="radio" name="shipping" checked={shippingId === m.id} onChange={() => setShippingId(m.id)} className="h-4 w-4 accent-[#0f3b27]" />
                            <span>
                              <span className="block font-semibold text-gar-green">{m.label}</span>
                              <span className="block text-sm text-gar-ink/60">{m.description}</span>
                            </span>
                          </span>
                          <span className="font-semibold text-gar-green">{cost === 0 ? "Gratis" : formatPrice(cost)}</span>
                        </label>
                      )
                    })}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-gar-green">Pagamento</h2>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {paymentMethods.map((m) => {
                        const Icon = paymentIcons[m.id as keyof typeof paymentIcons]
                        return (
                          <button key={m.id} type="button" onClick={() => setPaymentId(m.id)} className={cn("flex items-center gap-3 rounded-2xl border p-4 text-left text-sm font-semibold transition-colors", paymentId === m.id ? "border-gar-green bg-gar-sand/60 text-gar-green" : "border-gar-gold/30 text-gar-ink/70 hover:border-gar-gold")}>
                            <Icon className="h-5 w-5 text-gar-gold" /> {m.label}
                          </button>
                        )
                      })}
                    </div>
                    {paymentId === "card" && (
                      <div className="grid gap-4 sm:grid-cols-[1fr_120px_100px]">
                        <Field label="Numero carta"><input className={inputClass} inputMode="numeric" placeholder="4242 4242 4242 4242" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value.replace(/[^\d ]/g, "").slice(0, 19) })} /></Field>
                        <Field label="Scadenza"><input className={inputClass} placeholder="MM/AA" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value.slice(0, 5) })} /></Field>
                        <Field label="CVC"><input className={inputClass} inputMode="numeric" placeholder="123" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })} /></Field>
                        {errors.card && <p className="text-xs text-gar-red sm:col-span-3">{errors.card}</p>}
                      </div>
                    )}
                    {paymentId === "paypal" && <p className="rounded-xl bg-gar-sand/60 p-4 text-sm text-gar-ink/75">Verrai reindirizzato a PayPal per completare il pagamento.</p>}
                    {paymentId === "bank" && <p className="rounded-xl bg-gar-sand/60 p-4 text-sm text-gar-ink/75">Riceverai le coordinate bancarie via email dopo la conferma dell'ordine.</p>}
                    <p className="flex items-center gap-2 text-xs text-gar-ink/55"><Lock className="h-3.5 w-3.5" /> Simulazione: nessun dato viene inviato o addebitato.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between border-t border-gar-gold/20 pt-6">
              {step > 0 ? (
                <button type="button" onClick={() => setStep(step - 1)} className="text-sm font-semibold text-gar-ink/60 hover:text-gar-green">Indietro</button>
              ) : <span />}
              <motion.button type="button" onClick={next} disabled={processing} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full bg-gar-green px-8 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-gar-cream ring-1 ring-gar-gold/60 transition-colors hover:bg-gar-green-soft disabled:opacity-70">
                {processing ? (<><Loader2 className="h-4 w-4 animate-spin" /> Elaborazione...</>) : step < 2 ? "Continua" : `Paga ${formatPrice(total)}`}
              </motion.button>
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-gar-gold/25 bg-white p-6 shadow-sm lg:sticky lg:top-28">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-gar-green">Riepilogo ordine</h2>
            <ul className="mt-5 space-y-4">
              {lines.map((line) => {
                const item = findLine(line)
                if (!item) return null
                return (
                  <li key={line.variantId} className="flex items-center gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                      <Image src={item.product.image} alt="" fill sizes="56px" className="object-cover" />
                      <span className="absolute right-0 top-0 rounded-bl-lg bg-gar-green px-1.5 text-[10px] font-bold text-gar-cream" data-no-translate>{line.quantity}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gar-green">{item.product.name}</p>
                      <p className="text-xs text-gar-ink/55">{item.variant.label}</p>
                    </div>
                    <span className="text-sm font-semibold">{formatPrice(item.variant.price * line.quantity)}</span>
                  </li>
                )
              })}
            </ul>
            <dl className="mt-6 space-y-2 border-t border-gar-gold/20 pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-gar-ink/65">Subtotale</dt><dd>{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-gar-ink/65">Spedizione</dt><dd>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</dd></div>
              <div className="flex justify-between border-t border-gar-gold/20 pt-3 font-display text-lg font-semibold text-gar-green"><dt>Totale</dt><dd>{formatPrice(total)}</dd></div>
            </dl>
            <p className="mt-2 text-xs text-gar-ink/50">IVA inclusa</p>
          </aside>
        </div>
      </div>
    </section>
  )
}
