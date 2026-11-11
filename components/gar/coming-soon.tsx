import { PageHero } from "./page-hero"
import { GoldButton } from "./gold-button"
import { Reveal } from "./reveal"

type ComingSoonProps = { eyebrow?: string; title: string; subtitle: string; image?: string; note?: string }

export function ComingSoon({ eyebrow, title, subtitle, image, note = "Contenuti in arrivo" }: ComingSoonProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} image={image}>
        <Reveal delay={0.4} className="mt-10 flex flex-col items-center gap-6">
          <span className="rounded-full border border-gar-gold/60 bg-white/70 px-5 py-2 font-display text-xs font-semibold uppercase tracking-[0.25em] text-gar-red">{note}</span>
          <GoldButton href="/contatti">Contattaci</GoldButton>
        </Reveal>
      </PageHero>
      <div className="h-16 bg-gar-cream" />
    </>
  )
}
