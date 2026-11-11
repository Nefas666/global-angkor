import { cn } from "@/lib/utils"
import { Ornament } from "./ornament"
import { Reveal, SlideUpText } from "./reveal"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: "center" | "left"
  tone?: "dark" | "light"
  as?: "h1" | "h2"
  className?: string
}

export function SectionHeading({ eyebrow, title, subtitle, align = "center", tone = "dark", as: Tag = "h2", className }: SectionHeadingProps) {
  const centered = align === "center"
  return (
    <div className={cn(centered ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <Reveal y={10}>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-gar-gold">{eyebrow}</p>
        </Reveal>
      )}
      <Tag
        className={cn(
          "mt-2 font-display font-semibold uppercase leading-tight tracking-wide",
          Tag === "h1" ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl",
          tone === "dark" ? "text-gar-green" : "text-gar-gold-light",
        )}
      >
        <SlideUpText>{title}</SlideUpText>
      </Tag>
      <Ornament className={cn("mt-4", !centered && "justify-start")} width={centered ? "w-24" : "w-16"} />
      {subtitle && (
        <Reveal delay={0.15} y={20}>
          <p className={cn("mt-5 text-base leading-relaxed md:text-lg", centered && "mx-auto max-w-2xl", tone === "dark" ? "text-gar-ink/75" : "text-gar-cream/80")}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}
