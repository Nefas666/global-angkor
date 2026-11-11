import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type IconCircleProps = { icon: LucideIcon; variant?: "solid" | "outline" | "gold"; size?: "sm" | "md" | "lg"; className?: string }

const sizes = { sm: "h-10 w-10 [&>svg]:h-4 [&>svg]:w-4", md: "h-14 w-14 [&>svg]:h-6 [&>svg]:w-6", lg: "h-20 w-20 [&>svg]:h-9 [&>svg]:w-9" }

export function IconCircle({ icon: Icon, variant = "outline", size = "md", className }: IconCircleProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        sizes[size],
        variant === "solid" && "border-2 border-gar-cream bg-gar-green text-gar-cream shadow-lg ring-1 ring-gar-gold/60",
        variant === "outline" && "border border-gar-green/40 text-gar-green",
        variant === "gold" && "border border-gar-gold/70 text-gar-gold",
        className,
      )}
    >
      <Icon strokeWidth={1.5} />
    </span>
  )
}
