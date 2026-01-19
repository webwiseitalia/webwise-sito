import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { SITE_DATA } from '../constants/siteData'

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const lastUpdate = '19/01/2025'

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="bg-[#2d2520] py-6 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="text-white/70 hover:text-white text-sm flex items-center gap-2 mb-4 transition-colors"
          >
            <span>←</span> Torna alla Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#c4a574] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-white text-2xl font-semibold">Privacy Policy</h1>
              <p className="text-white/60 text-sm">Informativa sul trattamento dei dati personali</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 lg:p-10">
          <p className="text-gray-500 text-sm mb-8">Ultimo aggiornamento: {lastUpdate}</p>

          {/* 1. Titolare del Trattamento */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Titolare del Trattamento</h2>
            <p className="text-gray-600 mb-4">Il Titolare del trattamento dei dati personali è:</p>
            <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#c4a574]">
              <p className="font-semibold text-gray-900">{SITE_DATA.legal.companyName}</p>
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {SITE_DATA.address.full}
              </p>
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {SITE_DATA.contact.phone}
              </p>
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {SITE_DATA.contact.email}
              </p>
              <p className="text-gray-600 mt-1">P.IVA: {SITE_DATA.legal.vatNumber}</p>
            </div>
          </section>

          {/* 2. Dati Raccolti */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Dati Raccolti e Finalità del Trattamento</h2>

            <h3 className="text-lg font-medium text-gray-800 mb-3">2.1 Dati forniti volontariamente dall'utente</h3>
            <p className="text-gray-600 mb-4">
              Tramite il modulo di contatto presente sul sito, raccogliamo i seguenti dati personali:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
              <li><strong>Nome e Cognome</strong> - per identificare l'interessato</li>
              <li><strong>Indirizzo Email</strong> - per rispondere alle richieste</li>
              <li><strong>Numero di Telefono</strong> (facoltativo) - per contatti telefonici</li>
              <li><strong>Messaggio/Descrizione del Progetto</strong> - per comprendere le esigenze</li>
            </ul>

            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 mb-6">
              <p className="font-medium text-amber-800 mb-2">Finalità: I dati vengono raccolti esclusivamente per:</p>
              <ul className="list-disc list-inside text-amber-700 space-y-1">
                <li>Rispondere alle richieste di preventivo</li>
                <li>Fornire informazioni sui nostri servizi</li>
                <li>Organizzare sopralluoghi e consultazioni</li>
                <li>Gestire la relazione commerciale</li>
              </ul>
            </div>

            <h3 className="text-lg font-medium text-gray-800 mb-3">2.2 Base giuridica del trattamento</h3>
            <p className="text-gray-600 mb-4">
              Il trattamento è basato sul <strong>consenso esplicito</strong> dell'interessato (Art. 6, par. 1, lett. a del GDPR), fornito attraverso
              l'invio del modulo di contatto, e sulla <strong>esecuzione di misure precontrattuali</strong> (Art. 6, par. 1, lett. b del GDPR).
            </p>
          </section>

          {/* 3. Modalità di Trattamento */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Modalità di Trattamento</h2>
            <p className="text-gray-600 mb-4">
              I dati personali sono trattati con strumenti informatici e/o telematici, con logiche strettamente correlate alle
              finalità indicate e, comunque, in modo da garantire la sicurezza e la riservatezza dei dati stessi.
            </p>
            <p className="text-gray-600">
              Adottiamo misure di sicurezza tecniche e organizzative adeguate per proteggere i dati personali da accessi non
              autorizzati, perdita, distruzione o divulgazione.
            </p>
          </section>

          {/* 4. Conservazione dei Dati */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Conservazione dei Dati</h2>
            <p className="text-gray-600 mb-4">
              I dati personali vengono conservati per il tempo strettamente necessario a gestire le richieste ricevute e le
              relazioni commerciali conseguenti:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li><strong>Richieste di preventivo:</strong> i dati vengono conservati per 24 mesi dalla richiesta, salvo instaurazione di rapporto contrattuale</li>
              <li><strong>Rapporti contrattuali:</strong> i dati vengono conservati per 10 anni in conformità agli obblighi fiscali e contabili</li>
              <li><strong>Richieste di informazioni:</strong> i dati vengono conservati per 12 mesi dalla risposta</li>
            </ul>
          </section>

          {/* 5. Comunicazione e Diffusione dei Dati */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Comunicazione e Diffusione dei Dati</h2>
            <p className="text-gray-600 mb-4">
              I dati personali non vengono diffusi e possono essere comunicati esclusivamente a:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
              <li>Personale interno autorizzato al trattamento (titolare e collaboratori)</li>
              <li>Professionisti esterni (commercialisti, consulenti legali) vincolati da obblighi di riservatezza</li>
              <li>Autorità competenti in caso di richieste legittime previste per legge</li>
            </ul>

            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <p className="font-medium text-red-800 mb-2">I tuoi dati NON verranno MAI:</p>
              <ul className="list-disc list-inside text-red-700 space-y-1">
                <li>Venduti a terze parti</li>
                <li>Condivisi con scopi di marketing</li>
                <li>Utilizzati per invio di newsletter non richieste</li>
                <li>Trasferiti fuori dall'Unione Europea</li>
              </ul>
            </div>
          </section>

          {/* 6. Diritti dell'Interessato */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Diritti dell'Interessato</h2>
            <p className="text-gray-600 mb-4">In qualità di interessato, hai il diritto di:</p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li><strong>Accesso (Art. 15 GDPR):</strong> Ottenere conferma dell'esistenza dei tuoi dati e riceverne copia</li>
              <li><strong>Rettifica (Art. 16 GDPR):</strong> Richiedere la correzione di dati inesatti o incompleti</li>
              <li><strong>Cancellazione (Art. 17 GDPR):</strong> Richiedere la cancellazione dei dati ("diritto all'oblio")</li>
              <li><strong>Limitazione (Art. 18 GDPR):</strong> Richiedere la limitazione del trattamento</li>
              <li><strong>Portabilità (Art. 20 GDPR):</strong> Ricevere i dati in formato strutturato e trasferirli ad altro titolare</li>
              <li><strong>Opposizione (Art. 21 GDPR):</strong> Opporsi al trattamento dei dati personali</li>
              <li><strong>Revoca del consenso:</strong> Revocare il consenso in qualsiasi momento</li>
            </ul>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="font-medium text-blue-800 mb-2">Come esercitare i tuoi diritti:</p>
              <p className="text-blue-700">
                Puoi esercitare i tuoi diritti inviando una richiesta via email a <a href={`mailto:${SITE_DATA.contact.email}`} className="underline">{SITE_DATA.contact.email}</a> o tramite raccomandata A/R
                all'indirizzo: {SITE_DATA.address.full}.
              </p>
              <p className="text-blue-700 mt-2">Risponderemo entro <strong>30 giorni</strong> dalla ricezione della richiesta.</p>
            </div>
          </section>

          {/* 7. Diritto di Reclamo */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Diritto di Reclamo</h2>
            <p className="text-gray-600 mb-4">
              Hai il diritto di proporre reclamo all'Autorità Garante per la protezione dei dati personali se ritieni che il
              trattamento dei tuoi dati violi il GDPR.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="font-medium text-gray-800 mb-2">Garante per la protezione dei dati personali:</p>
              <p className="text-gray-600">Sito web: <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#2EBAEB] hover:underline">www.garanteprivacy.it</a></p>
              <p className="text-gray-600">Email: garante@gpdp.it</p>
              <p className="text-gray-600">PEC: protocollo@pec.gpdp.it</p>
            </div>
          </section>

          {/* 8. Cookie */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Cookie e Tecnologie di Tracciamento</h2>
            <p className="text-gray-600">
              Il nostro sito utilizza esclusivamente cookie tecnici necessari al funzionamento. Per maggiori informazioni,
              consulta la nostra <Link to="/cookie-policy" className="text-[#2EBAEB] hover:underline">Cookie Policy</Link>.
            </p>
          </section>

          {/* 9. Modifiche */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Modifiche alla Privacy Policy</h2>
            <p className="text-gray-600">
              Ci riserviamo il diritto di modificare o aggiornare questa Privacy Policy in qualsiasi momento. Le modifiche
              saranno pubblicate su questa pagina con indicazione della data di ultimo aggiornamento. Ti invitiamo a
              consultare periodicamente questa pagina per essere sempre informato sulle nostre politiche di privacy.
            </p>
          </section>

          {/* 10. Contatti */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contatti</h2>
            <p className="text-gray-600 mb-4">
              Per qualsiasi domanda o richiesta relativa al trattamento dei tuoi dati personali, puoi contattarci:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-gray-700 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#2EBAEB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {SITE_DATA.contact.email}
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#2EBAEB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {SITE_DATA.contact.phone}
              </p>
            </div>
          </section>

          {/* Footer note */}
          <div className="border-t pt-6 mt-10">
            <p className="text-gray-500 text-sm text-center">
              Questa Privacy Policy è conforme al Regolamento (UE) 2016/679 (GDPR) e al D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018
            </p>
          </div>

          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              to="/"
              className="flex-1 text-center py-3 px-6 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Torna alla Home
            </Link>
            <Link
              to="/cookie-policy"
              className="flex-1 text-center py-3 px-6 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Leggi la Cookie Policy
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#2d2520] py-12 px-4 lg:px-8 mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">{SITE_DATA.legal.companyName}</h3>
              <p className="text-white/60 text-sm">{SITE_DATA.description.slice(0, 100)}...</p>
              <div className="mt-4 space-y-1">
                <p className="text-white/60 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {SITE_DATA.address.full}
                </p>
                <p className="text-white/60 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {SITE_DATA.contact.phone}
                </p>
                <p className="text-white/60 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {SITE_DATA.contact.email}
                </p>
              </div>
            </div>

            {/* Spacer */}
            <div></div>

            {/* Legal */}
            <div className="text-right">
              <p className="text-white/40 text-sm">P.IVA: {SITE_DATA.legal.vatNumber}</p>
              <div className="mt-4 space-x-4">
                <Link to="/privacy-policy" className="text-white/60 hover:text-white text-sm transition-colors">Privacy Policy</Link>
                <Link to="/cookie-policy" className="text-white/60 hover:text-white text-sm transition-colors">Cookie Policy</Link>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} {SITE_DATA.legal.companyName}. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
