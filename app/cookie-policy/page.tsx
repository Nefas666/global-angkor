import type { Metadata } from "next"
import { ComingSoon } from "@/components/gar/coming-soon"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "L'informativa sull'uso dei cookie sarà pubblicata a breve.",
}

export default function CookiePolicyPage() {
  return <ComingSoon title="Cookie Policy" subtitle="L'informativa sull'uso dei cookie sarà pubblicata a breve." note="In aggiornamento" />
}
