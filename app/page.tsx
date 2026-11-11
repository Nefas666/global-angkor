import { HeroSection } from "@/components/hero-section"
import { Reveal } from "@/components/gar/reveal"
import { Ornament } from "@/components/gar/ornament"
import { GoldButton } from "@/components/gar/gold-button"
import { OriginStatement } from "@/components/gar/origin-statement"

export default function Home() {
  return (
    <>
      <HeroSection />
      <section className="bg-gar-pattern px-6 py-20 text-center text-gar-cream">
        <Reveal className="mx-auto max-w-5xl">
          <OriginStatement />
          <Ornament className="mt-6" />
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gar-cream/80">
            Non esportiamo solo prodotti. Esportiamo origine, qualità e autenticità.
          </p>
          <div className="mt-8">
            <GoldButton href="/chi-siamo" variant="gold">Chi siamo</GoldButton>
          </div>
        </Reveal>
      </section>
    </>
  )
}
