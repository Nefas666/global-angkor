import type { Metadata } from "next"
import { ComingSoon } from "@/components/gar/coming-soon"

export const metadata: Metadata = {
  title: "Termini e Condizioni",
  description: "I termini e le condizioni d'uso del sito saranno pubblicati a breve.",
}

export default function TerminiPage() {
  return <ComingSoon title="Termini e Condizioni" subtitle="I termini e le condizioni d'uso del sito saranno pubblicati a breve." note="In aggiornamento" />
}
