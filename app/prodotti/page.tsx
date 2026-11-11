import type { Metadata } from "next"
import { PageHero } from "@/components/gar/page-hero"
import { ProductGrid } from "@/components/gar/product-grid"

export const metadata: Metadata = {
  title: "Prodotti",
  description: "Riso Jasmine, olio di cocco, pepe di Kampot e seta: i prodotti autentici della Cambogia selezionati da Global Angkor Royal.",
}

export default function ProdottiPage() {
  return (
    <>
      <PageHero
        eyebrow="I nostri prodotti"
        title="Prodotti"
        subtitle="Selezioniamo i migliori prodotti naturali della Cambogia e li portiamo sui mercati internazionali con qualità, integrità e passione."
      />
      <section className="bg-gar-cream px-6 pb-24">
        <ProductGrid set="catalog" size="lg" className="mx-auto -mt-6 grid max-w-6xl gap-8 md:grid-cols-2" />
      </section>
    </>
  )
}
