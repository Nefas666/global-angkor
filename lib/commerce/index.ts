import { products, shippingMethods } from "./mock-catalog"
import type { CartLine, CommerceAdapter, ShippingMethod, ShopProduct } from "./types"

export * from "./types"
export { products, shippingMethods, paymentMethods } from "./mock-catalog"

const mockAdapter: CommerceAdapter = {
  async listProducts() {
    return products
  },
  async listShippingMethods() {
    return shippingMethods
  },
  async placeOrder(order) {
    await new Promise((resolve) => setTimeout(resolve, 1600))
    const subtotal = cartSubtotal(order.lines, products)
    const shipping = shippingCost(shippingMethods.find((m) => m.id === order.shippingId), subtotal)
    return { reference: `GAR-${Date.now().toString(36).toUpperCase().slice(-6)}`, total: subtotal + shipping }
  },
}

// Swap with a PrestaShop / WinterCMS adapter when the backend is available.
export const commerce: CommerceAdapter = mockAdapter

export function findLine(line: CartLine, catalog: ShopProduct[] = products) {
  const product = catalog.find((p) => p.id === line.productId)
  const variant = product?.variants.find((v) => v.id === line.variantId)
  return product && variant ? { product, variant } : null
}

export function cartSubtotal(lines: CartLine[], catalog: ShopProduct[] = products) {
  return lines.reduce((sum, line) => sum + (findLine(line, catalog)?.variant.price ?? 0) * line.quantity, 0)
}

export function shippingCost(method: ShippingMethod | undefined, subtotal: number) {
  if (!method) return 0
  if (method.freeOver && subtotal >= method.freeOver) return 0
  return method.price
}

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(value)
