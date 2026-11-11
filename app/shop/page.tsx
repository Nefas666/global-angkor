import type { Metadata } from "next"
import { ShopPage } from "@/components/shop/shop-page"

export const metadata: Metadata = {
  title: "Shop",
  description: "Acquista online i prodotti autentici della Cambogia.",
}

export default function Page() {
  return <ShopPage />
}
