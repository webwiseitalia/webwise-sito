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
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}
