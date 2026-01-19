import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const COOKIE_KEY = 'webwise-sito-cookie-consent'

type ConsentStatus = 'pending' | 'accepted' | 'rejected'

export default function CookieBanner() {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>('pending')
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation()

  // Pagine dove il banner non deve mostrare il blur (policy pages)
  const isPolicyPage = location.pathname === '/privacy-policy' || location.pathname === '/cookie-policy'

  useEffect(() => {
    // Controlla se l'utente ha già dato il consenso
    const savedConsent = localStorage.getItem(COOKIE_KEY)
    if (savedConsent === 'accepted' || savedConsent === 'rejected') {
      setConsentStatus(savedConsent as ConsentStatus)
    } else {
      setConsentStatus('pending')
      // Mostra il banner con un piccolo delay per l'animazione
      setTimeout(() => setIsVisible(true), 500)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setConsentStatus('accepted')
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem(COOKIE_KEY, 'rejected')
    setConsentStatus('rejected')
    setIsVisible(false)
  }

  // Non mostrare nulla se l'utente ha già scelto
  if (consentStatus !== 'pending') {
    return null
  }

  return (
    <>
      {/* Overlay con blur - non mostrato sulle pagine policy */}
      {!isPolicyPage && (
        <div
          className={`fixed inset-0 z-[998] transition-all duration-500 ${
            isVisible ? 'backdrop-blur-md bg-black/40' : 'backdrop-blur-none bg-transparent pointer-events-none'
          }`}
          aria-hidden="true"
        />
      )}

      {/* Banner Cookie */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[999] transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <div className="bg-[#111] border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-6 lg:py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Testo */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#2EBAEB]/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#2EBAEB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-lg font-medium">Utilizziamo i Cookie</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Questo sito utilizza esclusivamente cookie tecnici necessari al corretto funzionamento.
                  Non utilizziamo cookie di profilazione o tracciamento. Per maggiori informazioni, consulta la nostra{' '}
                  <Link to="/cookie-policy" className="text-[#2EBAEB] hover:underline">
                    Cookie Policy
                  </Link>{' '}
                  e la{' '}
                  <Link to="/privacy-policy" className="text-[#2EBAEB] hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              {/* Bottoni - stessa dimensione e colore */}
              <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                <button
                  onClick={handleReject}
                  className="px-8 py-3 border border-white/30 rounded-full text-white text-sm font-medium hover:border-white/50 hover:bg-white/5 transition-all"
                >
                  Rifiuta
                </button>
                <button
                  onClick={handleAccept}
                  className="px-8 py-3 border border-white/30 rounded-full text-white text-sm font-medium hover:border-white/50 hover:bg-white/5 transition-all"
                >
                  Accetta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
