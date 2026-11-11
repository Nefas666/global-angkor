import type { Metadata } from "next"
import { ComingSoon } from "@/components/gar/coming-soon"

export const metadata: Metadata = {
  title: "Download",
  description: "Cataloghi, schede prodotto e materiali informativi saranno presto disponibili.",
}

export default function DownloadPage() {
  return <ComingSoon eyebrow="Area download" title="Download" subtitle="Cataloghi, schede prodotto e materiali informativi saranno presto disponibili." note="Prossimamente" />
}
