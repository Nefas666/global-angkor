import type { Metadata } from "next"
import { Contatti } from "@/components/pages/contatti"

export const metadata: Metadata = {
  title: "Contattaci",
  description: "Contatta Global Angkor Royal MG Co., Ltd. per informazioni sui prodotti, collaborazioni e distribuzione.",
}

export default function ContattiPage() {
  return <Contatti />
}
