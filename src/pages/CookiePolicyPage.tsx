import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { SITE_DATA } from '../constants/siteData'

export default function CookiePolicyPage() {
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-white text-2xl font-semibold">Cookie Policy</h1>
              <p className="text-white/60 text-sm">Informativa sull'utilizzo dei cookie</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 lg:p-10">
          <p className="text-gray-500 text-sm mb-8">Ultimo aggiornamento: {lastUpdate}</p>

          {/* Privacy-Friendly Notice */}
          <div className="bg-green-50 rounded-lg p-4 border border-green-200 mb-10">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-green-800">Sito Privacy-Friendly</p>
                <p className="text-green-700 text-sm mt-1">
                  Questo sito web utilizza <strong>solo cookie tecnici</strong> necessari al funzionamento. <strong>Non utilizziamo cookie
                  di profilazione, tracciamento o analisi</strong>. La tua privacy è protetta e non serve il tuo consenso per
                  la navigazione.
                </p>
              </div>
            </div>
          </div>

          {/* 1. Cosa sono i Cookie */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Cosa sono i Cookie</h2>
            <p className="text-gray-600">
              I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo (computer, tablet o smartphone)
              quando visiti un sito web. I cookie permettono al sito di riconoscere il tuo dispositivo e memorizzare alcune
              informazioni sulle tue preferenze o azioni passate.
            </p>
          </section>

          {/* 2. Tipologie di Cookie */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Tipologie di Cookie</h2>

            <h3 className="text-lg font-medium text-gray-800 mb-3">2.1 Cookie Tecnici</h3>
            <p className="text-gray-600 mb-4">
              Sono cookie necessari al funzionamento del sito e permettono di navigare e utilizzare le funzionalità base. Senza
              questi cookie, il sito potrebbe non funzionare correttamente.
            </p>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200 mb-6">
              <p className="font-medium text-green-800 mb-2">Cookie tecnici utilizzati su questo sito:</p>
              <ul className="list-disc list-inside text-green-700 space-y-1">
                <li>Cookie di navigazione e di sessione</li>
                <li>Cookie per memorizzare le preferenze dell'interfaccia</li>
              </ul>
              <p className="text-green-600 text-sm mt-2">
                Secondo la normativa vigente, i cookie tecnici non richiedono il consenso dell'utente.
              </p>
            </div>

            <h3 className="text-lg font-medium text-gray-800 mb-3">2.2 Cookie Analitici</h3>
            <div className="bg-red-50 rounded-lg p-4 border border-red-200 mb-6">
              <p className="font-medium text-red-800 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                NON UTILIZZATI
              </p>
              <p className="text-red-700 text-sm mt-1">
                Questo sito NON utilizza cookie analitici come Google Analytics o simili per tracciare il comportamento degli utenti.
              </p>
            </div>

            <h3 className="text-lg font-medium text-gray-800 mb-3">2.3 Cookie di Profilazione</h3>
            <div className="bg-red-50 rounded-lg p-4 border border-red-200 mb-6">
              <p className="font-medium text-red-800 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                NON UTILIZZATI
              </p>
              <p className="text-red-700 text-sm mt-1">
                Questo sito NON utilizza cookie di profilazione per creare profili utente o inviare pubblicità mirata.
              </p>
            </div>

            <h3 className="text-lg font-medium text-gray-800 mb-3">2.4 Cookie di Terze Parti</h3>
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <p className="font-medium text-red-800 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                NON UTILIZZATI
              </p>
              <p className="text-red-700 text-sm mt-1">
                Questo sito NON utilizza servizi di terze parti che installano cookie (Facebook Pixel, Google Ads, ecc.).
              </p>
            </div>
          </section>

          {/* 3. Cookie Utilizzati */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Cookie Utilizzati su Questo Sito</h2>
            <p className="text-gray-600 mb-4">Il nostro sito utilizza esclusivamente i seguenti cookie tecnici:</p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Nome Cookie</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Tipologia</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Finalità</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Durata</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">webwise-sito-cookie-consent</td>
                    <td className="border border-gray-200 px-4 py-2">
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Tecnico</span>
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">
                      Memorizza lo stato di espansione/chiusura della barra laterale per migliorare l'esperienza di navigazione
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">1 anno</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 mt-4">
              <p className="text-amber-800 text-sm">
                <strong>Nota importante:</strong> I cookie tecnici come "webwise-sito-cookie-consent" sono essenziali per il funzionamento del sito e non richiedono il
                consenso dell'utente ai sensi del Provvedimento del Garante Privacy n. 229/2014 e del GDPR.
              </p>
            </div>
          </section>

          {/* 4. Come Gestire i Cookie */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Come Gestire i Cookie</h2>
            <p className="text-gray-600 mb-4">
              Anche se i cookie tecnici non richiedono consenso, puoi comunque gestirli o eliminarli attraverso le impostazioni
              del tuo browser:
            </p>

            <h3 className="text-lg font-medium text-gray-800 mb-3">Disabilitare i cookie tramite il browser:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li><strong>Google Chrome:</strong> Impostazioni → Privacy e sicurezza → Cookie e altri dati dei siti</li>
              <li><strong>Mozilla Firefox:</strong> Preferenze → Privacy e sicurezza → Cookie e dati dei siti web</li>
              <li><strong>Safari:</strong> Preferenze → Privacy → Cookie e dati dei siti web</li>
              <li><strong>Microsoft Edge:</strong> Impostazioni → Cookie e autorizzazioni del sito → Gestisci e elimina cookie</li>
            </ul>

            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <p className="text-amber-800 text-sm">
                <strong>Attenzione:</strong> La disabilitazione completa dei cookie tecnici potrebbe compromettere alcune funzionalità del sito e ridurre la
                qualità dell'esperienza di navigazione.
              </p>
            </div>
          </section>

          {/* 5. Link a Siti Esterni */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Link a Siti Esterni</h2>
            <p className="text-gray-600">
              Il nostro sito potrebbe contenere link a siti web di terze parti. Non siamo responsabili per le pratiche di privacy o
              il contenuto di tali siti esterni. Ti invitiamo a leggere le informative sulla privacy dei siti che visiti.
            </p>
          </section>

          {/* 6. Aggiornamenti */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Aggiornamenti della Cookie Policy</h2>
            <p className="text-gray-600 mb-4">
              Questa Cookie Policy può essere modificata nel tempo. Eventuali modifiche sostanziali saranno comunicate
              attraverso un avviso pubblicato su questa pagina.
            </p>
            <p className="text-gray-600">
              Ti invitiamo a consultare periodicamente questa pagina per rimanere aggiornato sull'utilizzo dei cookie sul nostro
              sito.
            </p>
          </section>

          {/* 7. Base Normativa */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Base Normativa</h2>
            <p className="text-gray-600 mb-4">Questa Cookie Policy è redatta in conformità a:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Regolamento (UE) 2016/679 del Parlamento Europeo (GDPR)</li>
              <li>Direttiva 2002/58/CE (Direttiva ePrivacy) aggiornata dalla Direttiva 2009/136/CE</li>
              <li>Provvedimento del Garante per la protezione dei dati personali dell'8 maggio 2014, n. 229</li>
              <li>Linee guida cookie e altri strumenti di tracciamento del 10 giugno 2021</li>
            </ul>
          </section>

          {/* 8. Contatti */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Contatti</h2>
            <p className="text-gray-600 mb-4">
              Per domande o chiarimenti su questa Cookie Policy, puoi contattarci:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="font-semibold text-gray-800">{SITE_DATA.legal.companyName}</p>
              <p className="text-gray-600">{SITE_DATA.address.full}</p>
              <p className="text-gray-600">Email: <a href={`mailto:${SITE_DATA.contact.email}`} className="text-[#2EBAEB] hover:underline">{SITE_DATA.contact.email}</a></p>
              <p className="text-gray-600">Tel: {SITE_DATA.contact.phone}</p>
            </div>
          </section>

          {/* Zero Tracking Badge */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 text-center mb-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Zero Tracciamento</h3>
            <p className="text-green-700">
              Naviga tranquillo: questo sito rispetta la tua privacy e non traccia le tue attività online
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
              to="/privacy-policy"
              className="flex-1 text-center py-3 px-6 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Leggi la Privacy Policy
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
