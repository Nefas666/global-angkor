"use client"

import { ProductCard } from "./product-card"
import { catalogProducts, homeProducts } from "./products"

export function ProductGrid({ set, size = "md", className }: { set: "home" | "catalog"; size?: "md" | "lg"; className?: string }) {
  const products = set === "home" ? homeProducts : catalogProducts
  return (
    <div className={className}>
      {products.map((product, index) => (
        <ProductCard key={product.title} product={product} index={index} size={size} />
      ))}
    </div>
  )
}
