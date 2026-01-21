import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const isFirstLoad = useRef(true)

  useEffect(() => {
    // Al primo caricamento (refresh), vai sempre in cima e rimuovi l'hash
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      window.scrollTo(0, 0)
      // Rimuovi l'hash dall'URL senza causare scroll
      if (hash) {
        window.history.replaceState(null, '', pathname)
      }
      return
    }

    // Navigazione interna: se c'è un hash, scrolla all'elemento
    if (hash) {
      // Prima scroll in cima istantaneamente per evitare flash
      window.scrollTo(0, 0)

      // Poi scrolla alla sezione con un delay per permettere il render
      const scrollToElement = () => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }

      // Prova subito, poi riprova dopo un delay più lungo per sicurezza
      setTimeout(scrollToElement, 50)
      setTimeout(scrollToElement, 300)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}
