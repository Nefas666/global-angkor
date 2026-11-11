import type { Metadata } from "next"
import { OlioDiCocco } from "@/components/pages/olio-di-cocco"

export const metadata: Metadata = {
  title: "Olio di cocco",
  description: "Olio di cocco cambogiano puro e naturale: linea Cosmetica e linea Pet Care di Global Angkor Royal.",
}

export default function OlioDiCoccoPage() {
  return <OlioDiCocco />
}
