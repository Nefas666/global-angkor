import type { Metadata } from "next"
import { Checkout } from "@/components/shop/checkout"

export const metadata: Metadata = {
  title: "Checkout",
  description: "Completa il tuo ordine Global Angkor Royal.",
}

export default function Page() {
  return <Checkout />
}
