import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Se c'è un hash, scrolla all'elemento corrispondente
    if (hash) {
      // Piccolo delay per assicurarsi che la pagina sia renderizzata
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      // Altrimenti vai in cima alla pagina
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}
