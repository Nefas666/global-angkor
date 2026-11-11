import type { Metadata } from "next"
import { Riso } from "@/components/pages/riso"

export const metadata: Metadata = {
  title: "Riso Jasmine cambogiano",
  description: "Dalla terra della Cambogia, un riso di qualità per il mondo: il riso Jasmine cambogiano Global Angkor Royal.",
}

export default function RisoPage() {
  return <Riso />
}
