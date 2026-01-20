import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SITE_DATA } from '../constants/siteData'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BurgerMenu from '../components/BurgerMenu'

gsap.registerPlugin(ScrollTrigger)

export default function CookiePolicyPage() {
  const [showBurger, setShowBurger] = useState(false)
  const [navbarCompression, setNavbarCompression] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Logica scroll per navbar/burger
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const threshold = 100

      if (scrollY > threshold) {
        setShowBurger(true)
        setNavbarCompression(Math.min((scrollY - threshold) / 100, 1))
      } else {
        setShowBurger(false)
        setNavbarCompression(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      // Hero animation
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.hero-animate'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out'
          }
        )
      }

      // Content sections animation
      if (contentRef.current) {
        const sections = contentRef.current.querySelectorAll('.content-section')
        sections.forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
          )
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const lastUpdate = '19/01/2025'

  return (
    <div className="min-h-screen bg-black">
      <Navbar compressionProgress={navbarCompression} />
      <BurgerMenu isVisible={showBurger} />

      {/* Hero Section */}
      <section ref={heroRef} className="w-full bg-black pt-32 pb-16 lg:pt-40 lg:pb-20" style={{ padding: '160px 50px 60px 50px' }}>
        <div>
          <Link
            to="/"
            className="hero-animate inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 text-sm"
          >
            <span>←</span>
            <span>HOME</span>
          </Link>

          <h1 className="hero-animate text-white font-extralight tracking-tight leading-none mb-8" style={{ fontSize: 'clamp(48px, 8vw, 100px)' }}>
            COOKIE POLICY
          </h1>

          <p className="hero-animate text-white/60 text-xl lg:text-2xl font-light leading-relaxed max-w-3xl">
            Informativa sull'utilizzo dei cookie su questo sito web
          </p>

          <p className="hero-animate text-white/40 text-sm mt-8">
            Ultimo aggiornamento: {lastUpdate}
          </p>
        </div>
      </section>

      {/* Privacy-Friendly Notice */}
      <section className="w-full bg-black pb-12" style={{ padding: '0 50px 40px 50px' }}>
        <div className="border border-[#2EBAEB]/30 bg-[#2EBAEB]/5 rounded-lg p-6 lg:p-8">
          <div className="flex items-start gap-4 lg:gap-6">
            <div className="w-12 h-12 bg-[#2EBAEB] rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-[#2EBAEB] text-xl">Sito Privacy-Friendly</p>
              <p className="text-white/70 mt-3 leading-relaxed text-lg">
                Questo sito web utilizza <strong className="text-white">solo cookie tecnici</strong> necessari al funzionamento.
                <strong className="text-white"> Non utilizziamo cookie di profilazione, tracciamento o analisi</strong>.
                La tua privacy è protetta e non serve il tuo consenso per la navigazione.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="w-full bg-black pb-20" style={{ padding: '0 50px 80px 50px' }}>
        <div className="space-y-16">

          {/* 1. Cosa sono i Cookie */}
          <div className="content-section border-t border-white/10 pt-10">
            <h2 className="text-white text-2xl lg:text-3xl font-light mb-6">1. Cosa sono i Cookie</h2>
            <p className="text-white/70 leading-relaxed">
              I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo (computer, tablet o smartphone)
              quando visiti un sito web. I cookie permettono al sito di riconoscere il tuo dispositivo e memorizzare alcune
              informazioni sulle tue preferenze o azioni passate.
            </p>
          </div>

          {/* 2. Tipologie di Cookie */}
          <div className="content-section border-t border-white/10 pt-10">
            <h2 className="text-white text-2xl lg:text-3xl font-light mb-6">2. Tipologie di Cookie</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-white/90 text-xl font-light mb-4">2.1 Cookie Tecnici</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Sono cookie necessari al funzionamento del sito e permettono di navigare e utilizzare le funzionalità base.
                  Senza questi cookie, il sito potrebbe non funzionare correttamente.
                </p>
                <div className="border border-[#2EBAEB]/30 bg-[#2EBAEB]/5 rounded-lg p-5">
                  <p className="font-medium text-[#2EBAEB] mb-3">Cookie tecnici utilizzati su questo sito:</p>
                  <ul className="list-disc list-inside text-white/70 space-y-1">
                    <li>Cookie di navigazione e di sessione</li>
                    <li>Cookie per memorizzare le preferenze dell'interfaccia</li>
                  </ul>
                  <p className="text-white/50 text-sm mt-3">
                    Secondo la normativa vigente, i cookie tecnici non richiedono il consenso dell'utente.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-white/90 text-xl font-light mb-4">2.2 Cookie Analitici</h3>
                <div className="border border-red-500/30 bg-red-500/5 rounded-lg p-5">
                  <p className="font-medium text-red-400 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    NON UTILIZZATI
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    Questo sito NON utilizza cookie analitici come Google Analytics o simili per tracciare il comportamento degli utenti.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-white/90 text-xl font-light mb-4">2.3 Cookie di Profilazione</h3>
                <div className="border border-red-500/30 bg-red-500/5 rounded-lg p-5">
                  <p className="font-medium text-red-400 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    NON UTILIZZATI
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    Questo sito NON utilizza cookie di profilazione per creare profili utente o inviare pubblicità mirata.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-white/90 text-xl font-light mb-4">2.4 Cookie di Terze Parti</h3>
                <div className="border border-red-500/30 bg-red-500/5 rounded-lg p-5">
                  <p className="font-medium text-red-400 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    NON UTILIZZATI
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    Questo sito NON utilizza servizi di terze parti che installano cookie (Facebook Pixel, Google Ads, ecc.).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Cookie Utilizzati */}
          <div className="content-section border-t border-white/10 pt-10">
            <h2 className="text-white text-2xl lg:text-3xl font-light mb-6">3. Cookie Utilizzati su Questo Sito</h2>
            <p className="text-white/70 mb-6">Il nostro sito utilizza esclusivamente i seguenti cookie tecnici:</p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-4 px-4 text-white/60 text-sm font-medium">Nome Cookie</th>
                    <th className="text-left py-4 px-4 text-white/60 text-sm font-medium">Tipologia</th>
                    <th className="text-left py-4 px-4 text-white/60 text-sm font-medium">Finalità</th>
                    <th className="text-left py-4 px-4 text-white/60 text-sm font-medium">Durata</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 text-white/80 text-sm">webwise-cookie-consent</td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-3 py-1 bg-[#2EBAEB]/20 text-[#2EBAEB] text-xs rounded-full">Tecnico</span>
                    </td>
                    <td className="py-4 px-4 text-white/60 text-sm">
                      Memorizza le preferenze dell'interfaccia per migliorare l'esperienza di navigazione
                    </td>
                    <td className="py-4 px-4 text-white/60 text-sm">1 anno</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border border-amber-500/30 bg-amber-500/5 rounded-lg p-5 mt-6">
              <p className="text-amber-400/90 text-sm">
                <strong>Nota importante:</strong> I cookie tecnici sono essenziali per il funzionamento del sito e non richiedono il
                consenso dell'utente ai sensi del Provvedimento del Garante Privacy n. 229/2014 e del GDPR.
              </p>
            </div>
          </div>

          {/* 4. Come Gestire i Cookie */}
          <div className="content-section border-t border-white/10 pt-10">
            <h2 className="text-white text-2xl lg:text-3xl font-light mb-6">4. Come Gestire i Cookie</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Anche se i cookie tecnici non richiedono consenso, puoi comunque gestirli o eliminarli attraverso le impostazioni
              del tuo browser:
            </p>

            <div className="grid gap-4">
              <div className="flex items-center gap-4 p-4 border border-white/10 rounded-lg">
                <span className="text-white/80 font-medium w-32">Chrome</span>
                <span className="text-white/50 text-sm">Impostazioni → Privacy e sicurezza → Cookie e altri dati dei siti</span>
              </div>
              <div className="flex items-center gap-4 p-4 border border-white/10 rounded-lg">
                <span className="text-white/80 font-medium w-32">Firefox</span>
                <span className="text-white/50 text-sm">Preferenze → Privacy e sicurezza → Cookie e dati dei siti web</span>
              </div>
              <div className="flex items-center gap-4 p-4 border border-white/10 rounded-lg">
                <span className="text-white/80 font-medium w-32">Safari</span>
                <span className="text-white/50 text-sm">Preferenze → Privacy → Cookie e dati dei siti web</span>
              </div>
              <div className="flex items-center gap-4 p-4 border border-white/10 rounded-lg">
                <span className="text-white/80 font-medium w-32">Edge</span>
                <span className="text-white/50 text-sm">Impostazioni → Cookie e autorizzazioni del sito</span>
              </div>
            </div>

            <div className="border border-amber-500/30 bg-amber-500/5 rounded-lg p-5 mt-6">
              <p className="text-amber-400/90 text-sm">
                <strong>Attenzione:</strong> La disabilitazione completa dei cookie tecnici potrebbe compromettere alcune funzionalità del sito.
              </p>
            </div>
          </div>

          {/* 5. Link a Siti Esterni */}
          <div className="content-section border-t border-white/10 pt-10">
            <h2 className="text-white text-2xl lg:text-3xl font-light mb-6">5. Link a Siti Esterni</h2>
            <p className="text-white/70 leading-relaxed">
              Il nostro sito potrebbe contenere link a siti web di terze parti. Non siamo responsabili per le pratiche di privacy o
              il contenuto di tali siti esterni. Ti invitiamo a leggere le informative sulla privacy dei siti che visiti.
            </p>
          </div>

          {/* 6. Aggiornamenti */}
          <div className="content-section border-t border-white/10 pt-10">
            <h2 className="text-white text-2xl lg:text-3xl font-light mb-6">6. Aggiornamenti della Cookie Policy</h2>
            <p className="text-white/70 leading-relaxed">
              Questa Cookie Policy può essere modificata nel tempo. Eventuali modifiche sostanziali saranno comunicate
              attraverso un avviso pubblicato su questa pagina. Ti invitiamo a consultare periodicamente questa pagina
              per rimanere aggiornato sull'utilizzo dei cookie sul nostro sito.
            </p>
          </div>

          {/* 7. Base Normativa */}
          <div className="content-section border-t border-white/10 pt-10">
            <h2 className="text-white text-2xl lg:text-3xl font-light mb-6">7. Base Normativa</h2>
            <p className="text-white/70 mb-4">Questa Cookie Policy è redatta in conformità a:</p>
            <ul className="list-disc list-inside text-white/60 space-y-2">
              <li>Regolamento (UE) 2016/679 del Parlamento Europeo (GDPR)</li>
              <li>Direttiva 2002/58/CE (Direttiva ePrivacy) aggiornata dalla Direttiva 2009/136/CE</li>
              <li>Provvedimento del Garante per la protezione dei dati personali dell'8 maggio 2014, n. 229</li>
              <li>Linee guida cookie e altri strumenti di tracciamento del 10 giugno 2021</li>
            </ul>
          </div>

          {/* 8. Contatti */}
          <div className="content-section border-t border-white/10 pt-10">
            <h2 className="text-white text-2xl lg:text-3xl font-light mb-6">8. Contatti</h2>
            <p className="text-white/70 mb-6">
              Per domande o chiarimenti su questa Cookie Policy, puoi contattarci:
            </p>
            <div className="border border-white/10 rounded-lg p-6">
              <p className="font-medium text-white text-lg mb-3">{SITE_DATA.legal.companyName}</p>
              <div className="space-y-2 text-white/60">
                <p>{SITE_DATA.address.full}</p>
                <p>Email: <a href={`mailto:${SITE_DATA.contact.email}`} className="text-[#2EBAEB] hover:underline">{SITE_DATA.contact.email}</a></p>
                <p>Tel: {SITE_DATA.contact.phone}</p>
              </div>
            </div>
          </div>

          {/* Zero Tracking Badge */}
          <div className="content-section border border-[#2EBAEB]/30 bg-[#2EBAEB]/5 rounded-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2EBAEB]/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#2EBAEB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-light text-white mb-2">Zero Tracciamento</h3>
            <p className="text-white/60">
              Naviga tranquillo: questo sito rispetta la tua privacy e non traccia le tue attività online
            </p>
          </div>

          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Link
              to="/"
              className="flex-1 text-center py-4 px-6 border border-white/20 rounded-full text-white hover:bg-white/5 transition-colors"
            >
              Torna alla Home
            </Link>
            <Link
              to="/privacy-policy"
              className="flex-1 text-center py-4 px-6 border border-white/20 rounded-full text-white hover:bg-white/5 transition-colors"
            >
              Leggi la Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
