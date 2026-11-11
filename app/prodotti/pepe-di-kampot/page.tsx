import type { Metadata } from "next"
import { ComingSoon } from "@/components/gar/coming-soon"

export const metadata: Metadata = {
  title: "Pepe di Kampot",
  description: "Un pepe di fama mondiale con un aroma e un sapore unici.",
}

export default function PepeDiKampotPage() {
  return <ComingSoon eyebrow="I nostri prodotti" title="Pepe di Kampot" subtitle="Un pepe di fama mondiale con un aroma e un sapore unici." image="/images/gar/card-pepe.jpg" />
}
