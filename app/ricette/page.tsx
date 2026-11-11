import type { Metadata } from "next"
import { ComingSoon } from "@/components/gar/coming-soon"

export const metadata: Metadata = {
  title: "Le nostre ricette",
  description: "Idee e preparazioni per portare in tavola i sapori autentici della Cambogia.",
}

export default function RicettePage() {
  return <ComingSoon eyebrow="Dalla Cambogia alla tua tavola" title="Le nostre ricette" subtitle="Idee e preparazioni per portare in tavola i sapori autentici della Cambogia." image="/images/gar/riso-ciotola.jpg" />
}
