export type ProductVariant = { id: string; label: string; price: number; sku: string }

export type ShopProduct = {
  id: string
  name: string
  category: "Alimentari" | "Cosmetica" | "Pet Care"
  description: string
  image: string
  href?: string
  badge?: string
  variants: ProductVariant[]
}

export type CartLine = { productId: string; variantId: string; quantity: number }

export type ShippingMethod = { id: string; label: string; description: string; price: number; freeOver?: number }

export type Customer = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  zip: string
  country: string
}

export type OrderRequest = { lines: CartLine[]; customer: Customer; shippingId: string; paymentId: string }
export type OrderResult = { reference: string; total: number }

/**
 * Contract for the e-commerce backend. The mock adapter can be replaced by a
 * PrestaShop (Webservice API) or WinterCMS (Shop plugin REST) implementation.
 */
export interface CommerceAdapter {
  listProducts(): Promise<ShopProduct[]>
  listShippingMethods(): Promise<ShippingMethod[]>
  placeOrder(order: OrderRequest): Promise<OrderResult>
}
