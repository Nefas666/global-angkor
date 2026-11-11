import type { Metadata } from "next"
import { ChiSiamo } from "@/components/pages/chi-siamo"

export const metadata: Metadata = {
  title: "Chi siamo",
  description: "Global Angkor Royal MG Co., Ltd.: dalla Cambogia, l'eccellenza naturale verso il mondo.",
}

export default function ChiSiamoPage() {
  return <ChiSiamo />
}
