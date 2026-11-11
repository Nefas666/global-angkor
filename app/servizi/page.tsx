import type { Metadata } from "next"
import { ComingSoon } from "@/components/gar/coming-soon"

export const metadata: Metadata = {
  title: "Servizi",
  description: "Un ponte tra i produttori cambogiani selezionati e i mercati internazionali.",
}

export default function ServiziPage() {
  return <ComingSoon eyebrow="Global Angkor Royal" title="Servizi" subtitle="Un ponte tra i produttori cambogiani selezionati e i mercati internazionali." image="/images/gar/riso-campo.jpg" />
}
