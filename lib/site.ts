export const company = {
  name: "Global Angkor Royal MG Co., Ltd.",
  shortName: "Global Angkor Royal",
  email: "info@global-angkor.com",
  website: "www.global-angkor.com",
  websiteUrl: "https://www.global-angkor.com",
}

export const offices = {
  cambodia: {
    title: "Head Office — Cambodia",
    flag: "/images/gar/flag-kh.png",
    address: ["No. 621, Street Bakheng, Tapul Village", "Sangkat Svay Dongkum, Siem Reap City", "Siem Reap Province, Cambodia"],
    registration: "1000641042",
    moc: "00062302",
    phone: "+855 96 616 8850",
  },
  italy: {
    title: "Italian Office & Deposit",
    flag: "/images/gar/flag-it.png",
    address: ["Via Raffaello Sanzio 23", "24041 Brembate (BG), Italy"],
    phone: "+39 340 367 1692",
  },
}

export const socials = {
  petCare: {
    label: "Pet Care",
    handle: "globalangkorpetcare",
    facebook: "https://www.facebook.com/globalangkorpetcare",
    instagram: "https://www.instagram.com/globalangkorpetcare",
  },
  wellness: {
    label: "Food & Cosmetic",
    handle: "globalangkorwellness",
    facebook: "https://www.facebook.com/globalangkorwellness",
    instagram: "https://www.instagram.com/globalangkorwellness",
  },
  linkedin: "https://www.linkedin.com/search/results/companies/?keywords=Global%20Angkor%20Royal%20MG",
}

export type NavItem = { label: string; href: string; children?: { label: string; href: string; note?: string }[] }

export const productLinks = [
  { label: "Riso Jasmine", href: "/prodotti/riso-jasmine" },
  { label: "Pepe di Kampot", href: "/prodotti/pepe-di-kampot" },
  { label: "Olio di Cocco", href: "/prodotti/olio-di-cocco" },
  { label: "Seta e Tessuti", href: "/prodotti#seta-e-tessuti", note: "Prossimamente" },
  { label: "Le nostre ricette", href: "/ricette" },
]

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Prodotti", href: "/prodotti", children: productLinks },
  { label: "Servizi", href: "/servizi" },
  { label: "Shop", href: "/shop" },
  { label: "Contattaci", href: "/contatti" },
]

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Termini e Condizioni", href: "/termini-e-condizioni" },
]

export const ease = [0.25, 0.4, 0.25, 1] as const
