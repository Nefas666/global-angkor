import { Grid3x3, Nut, Sprout, Wheat } from "lucide-react"
import type { Product } from "./product-card"

export const homeProducts: Product[] = [
  { title: "Riso Jasmine", description: "Pregiato riso Jasmine cambogiano, naturalmente aromatico.", image: "/images/gar/card-riso.jpg", icon: Wheat, href: "/prodotti/riso-jasmine" },
  { title: "Pepe di Kampot", description: "Pepe cambogiano di fama internazionale, dal profumo intenso e dal sapore unico.", image: "/images/gar/card-pepe.jpg", icon: Sprout, href: "/prodotti/pepe-di-kampot" },
  { title: "Olio di Cocco", description: "Olio di cocco puro e naturale, ideale per molteplici utilizzi.", image: "/images/gar/card-cocco.jpg", icon: Nut, href: "/prodotti/olio-di-cocco" },
  { title: "Seta e Tessuti", description: "Seta tradizionale cambogiana e tessuti artigianali.", image: "/images/gar/card-seta.jpg", icon: Grid3x3, comingSoon: true },
]

export const catalogProducts: Product[] = [
  { title: "Riso Jasmine", description: "Pregiato riso Jasmine della Cambogia, profumato e dal gusto unico.", image: "/images/gar/card-riso.jpg", icon: Wheat, href: "/prodotti/riso-jasmine" },
  { title: "Olio di Cocco", description: "Olio di cocco puro, naturale e multiuso.", image: "/images/gar/card-cocco.jpg", icon: Nut, href: "/prodotti/olio-di-cocco" },
  { title: "Pepe di Kampot", description: "Un pepe di fama mondiale con un aroma e un sapore unici.", image: "/images/gar/card-pepe.jpg", icon: Sprout, href: "/prodotti/pepe-di-kampot" },
  { title: "Seta e Tessuti", description: "Pregiata seta cambogiana e tessuti artigianali tradizionali.", image: "/images/gar/card-seta.jpg", icon: Grid3x3, comingSoon: true, id: "seta-e-tessuti" },
]
