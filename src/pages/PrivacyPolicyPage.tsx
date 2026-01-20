import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SITE_DATA } from '../constants/siteData'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BurgerMenu from '../components/BurgerMenu'

gsap.registerPlugin(ScrollTrigger)

export default function PrivacyPolicyPage() {
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
            PRIVACY POLICY
          </h1>

          <p className="hero-animate text-white/60 text-xl lg:text-2xl font-light leading-relaxed max-w-3xl">
            Informativa sul trattamento dei dati personali ai sensi del GDPR
          </p>

          <p className="hero-animate text-white/40 text-sm mt-8">
            Ultimo aggiornamento: {lastUpdate}
          </p>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="w-full bg-black pb-20" style={{ padding: '0 50px 80px 50px' }}>
        <div className="space-y-16">

          {/* 1. Titolare del Trattamento */}
          <div className="content-section border-t border-white/10 pt-10">
            <h2 className="text-white text-2xl lg:text-3xl font-light mb-6">1. Titolare del Trattamento</h2>
            <p className="text-white/70 mb-6">Il Titolare del trattamento dei dati personali è:</p>
            <div className="border-l-2 border-[#2EBAEB] pl-6 py-4">
              <p className="font-medium text-white text-lg">{SITE_DATA.legal.companyName}</p>
              <div className="mt-3 space-y-2 text-white/60">
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#2EBAEB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {SITE_DATA.address.full}
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#2EBAEB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {SITE_DATA.contact.phone}
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#2EBAEB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {SITE_DATA.contact.email}
                </p>
                <p>P.IVA: {SITE_DATA.legal.vatNumber}</p>
              </div>
            </div>
          </div>

          {/* 2. Dati Raccolti */}
          <div className="content-section border-t border-white/10 pt-10">
            <h2 className="text-white text-2xl lg:text-3xl font-light mb-6">2. Dati Raccolti e Finalità del Trattamento</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-white/90 text-xl font-light mb-4">2.1 Dati forniti volontariamente dall'utente</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Tramite il modulo di contatto presente sul sito, raccogliamo i seguenti dati personali:
                </p>
                <div className="grid gap-3">
                  <div className="flex items-start gap-3 p-4 border border-white/10 rounded-lg">
                    <div className="w-2 h-2 bg-[#2EBAEB] rounded-full mt-2"></div>
                    <div>
                      <span className="text-white font-medium">Nome e Cognome</span>
                      <span className="text-white/50 ml-2">- per identificare l'interessato</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 border border-white/10 rounded-lg">
                    <div className="w-2 h-2 bg-[#2EBAEB] rounded-full mt-2"></div>
                    <div>
                      <span className="text-white font-medium">Indirizzo Email</span>
                      <span className="text-white/50 ml-2">- per rispondere alle richieste</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 border border-white/10 rounded-lg">
                    <div className="w-2 h-2 bg-[#2EBAEB] rounded-full mt-2"></div>
                    <div>
                      <span className="text-white font-medium">Numero di Telefono</span>
                      <span className="text-white/50 ml-2">(facoltativo) - per contatti telefonici</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 border border-white/10 rounded-lg">
                    <div className="w-2 h-2 bg-[#2EBAEB] rounded-full mt-2"></div>
                    <div>
                      <span className="text-white font-medium">Messaggio/Descrizione</span>
                      <span className="text-white/50 ml-2">- per comprendere le esigenze</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-amber-500/30 bg-amber-500/5 rounded-lg p-6">
                <p className="font-medium text-amber-400 mb-3">Finalità: I dati vengono raccolti esclusivamente per:</p>
                <ul className="list-disc list-inside text-white/70 space-y-1">
                  <li>Rispondere alle richieste di preventivo</li>
                  <li>Fornire informazioni sui nostri servizi</li>
                  <li>Organizzare sopralluoghi e consultazioni</li>
                  <li>Gestire la relazione commerciale</li>
                </ul>
              </div>

              <div>
                <h3 className="text-white/90 text-xl font-light mb-4">2.2 Base giuridica del trattamento</h3>
                <p className="text-white/70 leading-relaxed">
                  Il trattamento è basato sul <strong className="text-white">consenso esplicito</strong> dell'interessato
                  (Art. 6, par. 1, lett. a del GDPR), fornito attraverso l'invio del modulo di contatto, e sulla
                  <strong className="text-white"> esecuzione di misure precontrattuali</strong> (Art. 6, par. 1, lett. b del GDPR).
                </p>
              </div>
            </div>
          </div>

          {/* 3. Modalità di Trattamento */}
          <div className="content-section border-t border-white/10 pt-10">
            <h2 className="text-white text-2xl lg:text-3xl font-light mb-6">3. Modalità di Trattamento</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              I dati personali sono trattati con strumenti informatici e/o telematici, con logiche strettamente correlate alle
              finalità indicate e, comunque, in modo da garantire la sicurezza e la riservatezza dei dati stessi.
            </p>
            <p className="text-white/70 leading-relaxed">
              Adottiamo misure di sicurezza tecniche e organizzative adeguate per proteggere i dati personali da accessi non
              autorizzati, perdita, distruzione o divulgazione.
            </p>
          </div>

          {/* 4. Conservazione dei Dati */}
          <div className="content-section border-t border-white/10 pt-10">
            <h2 className="text-white text-2xl lg:text-3xl font-light mb-6">4. Conservazione dei Dati</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              I dati personali vengono conservati per il tempo strettamente necessario a gestire le richieste ricevute e le
              relazioni commerciali conseguenti:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 border border-white/10 rounded-lg">
                <span className="text-[#2EBAEB] text-2xl font-light">24</span>
                <div>
                  <p className="text-white font-medium">Richieste di preventivo</p>
                  <p className="text-white/50 text-sm">mesi dalla richiesta, salvo instaurazione di rapporto contrattuale</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 border border-white/10 rounded-lg">
                <span className="text-[#2EBAEB] text-2xl font-light">10</span>
                <div>
                  <p className="text-white font-medium">Rapporti contrattuali</p>
                  <p className="text-white/50 text-sm">anni in conformità agli obblighi fiscali e contabili</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 border border-white/10 rounded-lg">
                <span className="text-[#2EBAEB] text-2xl font-light">12</span>
                <div>
                  <p className="text-white font-medium">Richieste di informazioni</p>
                  <p className="text-white/50 text-sm">mesi dalla risposta</p>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Comunicazione e Diffusione dei Dati */}
          <div className="content-section border-t border-white/10 pt-10">
            <h2 className="text-white text-2xl lg:text-3xl font-light mb-6">5. Comunicazione e Diffusione dei Dati</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              I dati personali non vengono diffusi e possono essere comunicati esclusivamente a:
            </p>
            <ul className="list-disc list-inside text-white/60 mb-8 space-y-2">
              <li>Personale interno autorizzato al trattamento (titolare e collaboratori)</li>
              <li>Professionisti esterni (commercialisti, consulenti legali) vincolati da obblighi di riservatezza</li>
              <li>Autorità competenti in caso di richieste legittime previste per legge</li>
            </ul>

            <div className="border border-red-500/30 bg-red-500/5 rounded-lg p-6">
              <p className="font-medium text-red-400 mb-3">I tuoi dati NON verranno MAI:</p>
              <ul className="list-disc list-inside text-white/60 space-y-1">
                <li>Venduti a terze parti</li>
                <li>Condivisi con scopi di marketing</li>
                <li>Utilizzati per invio di newsletter non richieste</li>
                <li>Trasferiti fuori dall'Unione Europea</li>
              </ul>
            </div>
          </div>

          {/* 6. Diritti dell'Interessato */}
          <div className="content-section border-t border-white/10 pt-10">
            <h2 className="text-white text-2xl lg:text-3xl font-light mb-6">6. Diritti dell'Interessato</h2>
            <p className="text-white/70 mb-6">In qualità di interessato, hai il diritto di:</p>

            <div className="grid gap-4 mb-8">
              <div className="p-4 border border-white/10 rounded-lg">
                <p className="text-white font-medium">Accesso (Art. 15 GDPR)</p>
                <p className="text-white/50 text-sm mt-1">Ottenere conferma dell'esistenza dei tuoi dati e riceverne copia</p>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <p className="text-white font-medium">Rettifica (Art. 16 GDPR)</p>
                <p className="text-white/50 text-sm mt-1">Richiedere la correzione di dati inesatti o incompleti</p>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <p className="text-white font-medium">Cancellazione (Art. 17 GDPR)</p>
                <p className="text-white/50 text-sm mt-1">Richiedere la cancellazione dei dati ("diritto all'oblio")</p>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <p className="text-white font-medium">Limitazione (Art. 18 GDPR)</p>
                <p className="text-white/50 text-sm mt-1">Richiedere la limitazione del trattamento</p>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <p className="text-white font-medium">Portabilità (Art. 20 GDPR)</p>
                <p className="text-white/50 text-sm mt-1">Ricevere i dati in formato strutturato e trasferirli ad altro titolare</p>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <p className="text-white font-medium">Opposizione (Art. 21 GDPR)</p>
                <p className="text-white/50 text-sm mt-1">Opporsi al trattamento dei dati personali</p>
              </div>
              <div className="p-4 border border-white/10 rounded-lg">
                <p className="text-white font-medium">Revoca del consenso</p>
                <p className="text-white/50 text-sm mt-1">Revocare il consenso in qualsiasi momento</p>
              </div>
            </div>

            <div className="border border-[#2EBAEB]/30 bg-[#2EBAEB]/5 rounded-lg p-6">
              <p className="font-medium text-[#2EBAEB] mb-3">Come esercitare i tuoi diritti:</p>
              <p className="text-white/70">
                Puoi esercitare i tuoi diritti inviando una richiesta via email a{' '}
                <a href={`mailto:${SITE_DATA.contact.email}`} className="text-[#2EBAEB] hover:underline">{SITE_DATA.contact.email}</a>{' '}
                o tramite raccomandata A/R all'indirizzo: {SITE_DATA.address.full}.
              </p>
              <p className="text-white/70 mt-3">
                Risponderemo entro <strong className="text-white">30 giorni</strong> dalla ricezione della richiesta.
              </p>
            </div>
          </div>

          {/* 7. Diritto di Reclamo */}
          <div className="content-section border-t border-white/10 pt-10">
            <h2 className="text-white text-2xl lg:text-3xl font-light mb-6">7. Diritto di Reclamo</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Hai il diritto di proporre reclamo all'Autorità Garante per la protezione dei dati personali se ritieni che il
              trattamento dei tuoi dati violi il GDPR.
            </p>
            <div className="border border-white/10 rounded-lg p-6">
              <p className="font-medium text-white mb-3">Garante per la protezione dei dati personali:</p>
              <div className="space-y-2 text-white/60">
                <p>Sito web: <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#2EBAEB] hover:underline">www.garanteprivacy.it</a></p>
                <p>Email: garante@gpdp.it</p>
                <p>PEC: protocollo@pec.gpdp.it</p>
              </div>
            </div>
          </div>

          {/* 8. Cookie */}
          <div className="content-section border-t border-white/10 pt-10">
            <h2 className="text-white text-2xl lg:text-3xl font-light mb-6">8. Cookie e Tecnologie di Tracciamento</h2>
            <p className="text-white/70 leading-relaxed">
              Il nostro sito utilizza esclusivamente cookie tecnici necessari al funzionamento. Per maggiori informazioni,
              consulta la nostra <Link to="/cookie-policy" className="text-[#2EBAEB] hover:underline">Cookie Policy</Link>.
            </p>
          </div>

          {/* 9. Modifiche */}
          <div className="content-section border-t border-white/10 pt-10">
            <h2 className="text-white text-2xl lg:text-3xl font-light mb-6">9. Modifiche alla Privacy Policy</h2>
            <p className="text-white/70 leading-relaxed">
              Ci riserviamo il diritto di modificare o aggiornare questa Privacy Policy in qualsiasi momento. Le modifiche
              saranno pubblicate su questa pagina con indicazione della data di ultimo aggiornamento. Ti invitiamo a
              consultare periodicamente questa pagina per essere sempre informato sulle nostre politiche di privacy.
            </p>
          </div>

          {/* 10. Contatti */}
          <div className="content-section border-t border-white/10 pt-10">
            <h2 className="text-white text-2xl lg:text-3xl font-light mb-6">10. Contatti</h2>
            <p className="text-white/70 mb-6">
              Per qualsiasi domanda o richiesta relativa al trattamento dei tuoi dati personali, puoi contattarci:
            </p>
            <div className="border border-white/10 rounded-lg p-6">
              <div className="space-y-3">
                <p className="text-white/70 flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#2EBAEB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${SITE_DATA.contact.email}`} className="hover:text-[#2EBAEB] transition-colors">{SITE_DATA.contact.email}</a>
                </p>
                <p className="text-white/70 flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#2EBAEB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {SITE_DATA.contact.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="content-section border-t border-white/10 pt-10 text-center">
            <p className="text-white/40 text-sm">
              Questa Privacy Policy è conforme al Regolamento (UE) 2016/679 (GDPR) e al D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018
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
              to="/cookie-policy"
              className="flex-1 text-center py-4 px-6 border border-white/20 rounded-full text-white hover:bg-white/5 transition-colors"
            >
              Leggi la Cookie Policy
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
