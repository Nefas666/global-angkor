import type { Metadata } from "next"
import { ComingSoon } from "@/components/gar/coming-soon"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "L'informativa sul trattamento dei dati personali sarà pubblicata a breve.",
}

export default function PrivacyPolicyPage() {
  return <ComingSoon title="Privacy Policy" subtitle="L'informativa sul trattamento dei dati personali sarà pubblicata a breve." note="In aggiornamento" />
}
