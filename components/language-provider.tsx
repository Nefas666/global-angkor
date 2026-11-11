"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { translateString, type Language } from "@/lib/i18n"

type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void }

const LanguageContext = createContext<LanguageContextValue | null>(null)
const STORAGE_KEY = "gar-language"
const ATTRIBUTES = ["placeholder", "aria-label", "alt", "title"]

const originalText = new WeakMap<Text, string>()
const appliedText = new WeakMap<Text, string>()
const originalAttrs = new WeakMap<Element, Record<string, string>>()
const appliedAttrs = new WeakMap<Element, Record<string, string>>()

function skip(element: Element | null) {
  return !element || !!element.closest("script,style,noscript,[data-no-translate]")
}

function translateTree(root: HTMLElement, language: Language) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let node: Node | null
  while ((node = walker.nextNode())) {
    const text = node as Text
    const current = text.nodeValue ?? ""
    if (!current.trim() || skip(text.parentElement)) continue
    if (!originalText.has(text) || appliedText.get(text) !== current) originalText.set(text, current)
    const next = translateString(originalText.get(text)!, language)
    if (next !== current) text.nodeValue = next
    appliedText.set(text, next)
  }

  root.querySelectorAll(ATTRIBUTES.map((a) => `[${a}]`).join(",")).forEach((element) => {
    if (skip(element)) return
    const originals = originalAttrs.get(element) ?? {}
    const applied = appliedAttrs.get(element) ?? {}
    for (const name of ATTRIBUTES) {
      const current = element.getAttribute(name)
      if (current === null) continue
      if (!(name in originals) || applied[name] !== current) originals[name] = current
      const next = translateString(originals[name], language)
      if (next !== current) element.setAttribute(name, next)
      applied[name] = next
    }
    originalAttrs.set(element, originals)
    appliedAttrs.set(element, applied)
  })
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("it")

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === "en" || saved === "km") setLanguageState(saved)
  }, [])

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    let frame = 0
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(run)
    })
    function run() {
      observer.disconnect()
      translateTree(document.body, language)
      if (language !== "it") {
        observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRIBUTES })
      }
    }
    run()
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [language])

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within LanguageProvider")
  return context
}
