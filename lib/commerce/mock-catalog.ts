import type { ShippingMethod, ShopProduct } from "./types"

export const products: ShopProduct[] = [
  {
    id: "riso-jasmine",
    name: "Riso Jasmine",
    category: "Alimentari",
    description: "Riso aromatico cambogiano, chicchi selezionati a mano.",
    image: "/images/gar/card-riso.jpg",
    href: "/prodotti/riso-jasmine",
    badge: "Best seller",
    variants: [
      { id: "riso-500g", label: "500 g", price: 3.9, sku: "GAR-RJ-05" },
      { id: "riso-1kg", label: "1 kg", price: 6.9, sku: "GAR-RJ-1" },
      { id: "riso-5kg", label: "5 kg", price: 29.9, sku: "GAR-RJ-5" },
      { id: "riso-20kg", label: "20 kg", price: 99, sku: "GAR-RJ-20" },
    ],
  },
  {
    id: "pepe-kampot-nero",
    name: "Pepe di Kampot nero",
    category: "Alimentari",
    description: "Pepe cambogiano dal profumo intenso e dal sapore unico.",
    image: "/images/gar/card-pepe.jpg",
    href: "/prodotti/pepe-di-kampot",
    variants: [
      { id: "pepe-nero-50", label: "50 g", price: 9.9, sku: "GAR-PK-N50" },
      { id: "pepe-nero-100", label: "100 g", price: 17.5, sku: "GAR-PK-N100" },
    ],
  },
  {
    id: "pepe-kampot-rosso",
    name: "Pepe di Kampot rosso",
    category: "Alimentari",
    description: "Bacche mature dal gusto pieno, con note dolci e fruttate.",
    image: "/images/gar/card-pepe.jpg",
    href: "/prodotti/pepe-di-kampot",
    variants: [
      { id: "pepe-rosso-50", label: "50 g", price: 12.9, sku: "GAR-PK-R50" },
      { id: "pepe-rosso-100", label: "100 g", price: 22.9, sku: "GAR-PK-R100" },
    ],
  },
  {
    id: "olio-cocco-vergine",
    name: "Olio di Cocco Vergine",
    category: "Cosmetica",
    description: "100% naturale per viso, corpo e capelli.",
    image: "/images/gar/cocco-hero-prodotti.jpg",
    href: "/prodotti/olio-di-cocco",
    variants: [
      { id: "cocco-250", label: "250 ml", price: 12.9, sku: "GAR-OC-250" },
      { id: "cocco-500", label: "500 ml", price: 21.9, sku: "GAR-OC-500" },
    ],
  },
  {
    id: "olio-cocco-pet",
    name: "Olio di Cocco Pet Care",
    category: "Pet Care",
    description: "Cura naturale per cute, pelo e zampe.",
    image: "/images/gar/banner-petcare.jpg",
    href: "/prodotti/olio-di-cocco#pet-care",
    variants: [
      { id: "pet-100", label: "100 ml", price: 9.9, sku: "GAR-PC-100" },
      { id: "pet-250", label: "250 ml", price: 18.9, sku: "GAR-PC-250" },
    ],
  },
]

export const shippingMethods: ShippingMethod[] = [
  { id: "standard", label: "Spedizione standard", description: "Consegna in 3–5 giorni lavorativi", price: 6.9, freeOver: 60 },
  { id: "express", label: "Spedizione express", description: "Consegna in 24–48 ore", price: 12.9 },
  { id: "pickup", label: "Ritiro in sede", description: "Italian Office & Deposit", price: 0 },
]

export const paymentMethods = [
  { id: "card", label: "Carta di credito" },
  { id: "paypal", label: "PayPal" },
  { id: "bank", label: "Bonifico bancario" },
]
