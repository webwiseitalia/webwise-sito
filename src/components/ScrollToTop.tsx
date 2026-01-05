import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Resetta lo scroll alla top della pagina quando cambia la route
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
