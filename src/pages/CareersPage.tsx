import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import logoWebwise from '../assets/logo-webwise-anduril-_1_.svg'

export default function CareersPage() {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    presentazione: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitSuccess(true)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-black/80 backdrop-blur-md border-b border-white/10">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoWebwise} alt="Webwise" className="w-8 h-8 invert" />
          <span className="text-white font-semibold text-lg">WEBWISE</span>
          <span className="text-white/40 text-lg">/</span>
          <span className="text-[#2EBAEB] text-lg">Careers</span>
        </Link>
        <Link to="/" className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Torna al sito
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 lg:px-16 relative overflow-hidden">
        {/* Gradient blob */}
        <div
          className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: '#2EBAEB', filter: 'blur(150px)' }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <span className="inline-block text-xs px-3 py-1 rounded-full border border-[#2EBAEB]/50 bg-[#2EBAEB]/10 text-[#2EBAEB] mb-6">
            POSIZIONE APERTA
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white leading-[1.1] mb-6">
            Unisciti a Webwise come<br />
            <span className="text-[#2EBAEB]">Caller / Appointment Setter</span>
          </h1>
          <p className="text-white/60 text-lg lg:text-xl max-w-3xl leading-relaxed">
            Webwise è una web agency in crescita, specializzata in siti web, marketing digitale, Google Ads e soluzioni pensate per far crescere concretamente le attività locali e le PMI.
          </p>
        </div>
      </section>

      {/* Chi cerchiamo */}
      <section className="py-20 px-8 lg:px-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-white/40 text-xs uppercase tracking-wider">01</span>
              <h2 className="text-white text-3xl lg:text-4xl font-semibold mt-2 mb-6">Chi stiamo cercando</h2>
            </div>
            <div>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Cerchiamo persone <strong className="text-white">motivate, determinate e orientate ai risultati</strong>, che abbiano voglia di lavorare in un contesto dinamico e meritocratico.
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                Il ruolo è ideale per chi ama il contatto diretto con le persone e desidera essere pagato in base ai risultati ottenuti, non alle ore passate al telefono.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Il Ruolo */}
      <section className="py-20 px-8 lg:px-16 bg-[#111] border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-white/40 text-xs uppercase tracking-wider">02</span>
              <h2 className="text-white text-3xl lg:text-4xl font-semibold mt-2 mb-6">Il Ruolo</h2>
              <p className="text-white/60 leading-relaxed">
                In qualità di Caller / Appointment Setter per Webwise ti occuperai di:
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-[#2EBAEB]/20 border border-[#2EBAEB]/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#2EBAEB]/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2EBAEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <p className="text-white/80 text-lg">Contattare telefonicamente potenziali clienti (PMI, negozi, attività locali)</p>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-[#2EBAEB]/20 border border-[#2EBAEB]/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#2EBAEB]/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2EBAEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <p className="text-white/80 text-lg">Presentare in modo chiaro e semplice Webwise e i suoi servizi</p>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-[#2EBAEB]/20 border border-[#2EBAEB]/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#2EBAEB]/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2EBAEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <p className="text-white/80 text-lg">Capire se l'attività ha un reale interesse per migliorare la propria presenza online</p>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-[#2EBAEB]/20 border border-[#2EBAEB]/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#2EBAEB]/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2EBAEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                </div>
                <p className="text-white/80 text-lg">Fissare appuntamenti qualificati per il team commerciale</p>
              </div>

              <div className="mt-8 p-6 bg-black border border-[#2EBAEB]/30 rounded-xl">
                <p className="text-[#2EBAEB] text-lg font-medium">
                  Il tuo compito non è vendere, ma creare opportunità reali e concrete.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modello di compenso */}
      <section className="py-20 px-8 lg:px-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-white/40 text-xs uppercase tracking-wider">03</span>
            <h2 className="text-white text-3xl lg:text-4xl font-semibold mt-2 mb-4">Modello di Compenso</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              La collaborazione è basata su un <strong className="text-white">modello a performance</strong>.
              Il guadagno è legato ai risultati ottenuti, in particolare al numero di appuntamenti qualificati fissati.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111] border border-white/10 rounded-xl p-8 hover:border-[#2EBAEB]/50 transition-colors group">
              <div className="w-12 h-12 bg-[#2EBAEB] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Nessun limite fisso</h3>
              <p className="text-white/60">Il tuo guadagno non ha un tetto massimo</p>
            </div>
            <div className="bg-[#111] border border-white/10 rounded-xl p-8 hover:border-[#2EBAEB]/50 transition-colors group">
              <div className="w-12 h-12 bg-[#2EBAEB] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Meritocratico</h3>
              <p className="text-white/60">Più produci valore, maggiore sarà il compenso</p>
            </div>
            <div className="bg-[#111] border border-white/10 rounded-xl p-8 hover:border-[#2EBAEB]/50 transition-colors group">
              <div className="w-12 h-12 bg-[#2EBAEB] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Trasparente</h3>
              <p className="text-white/60">Dettagli chiari fin dal primo contatto</p>
            </div>
          </div>

          <p className="text-white/40 text-sm text-center mt-8">
            I dettagli economici vengono spiegati in modo chiaro durante il primo contatto.
          </p>
        </div>
      </section>

      {/* Requisiti */}
      <section className="py-20 px-8 lg:px-16 bg-[#111] border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-white/40 text-xs uppercase tracking-wider">04</span>
              <h2 className="text-white text-3xl lg:text-4xl font-semibold mt-2 mb-6">Cosa richiediamo</h2>
              <p className="text-white/50 text-sm mt-8">
                L'esperienza nel settore commerciale o nel cold calling è un plus, ma non è obbligatoria.
              </p>
            </div>
            <div className="space-y-4">
              {[
                'Buone capacità comunicative e dialettiche',
                'Attitudine al contatto telefonico',
                'Serietà, affidabilità e orientamento agli obiettivi',
                'Autonomia nella gestione del lavoro'
              ].map((req, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-black/50 border border-white/10 rounded-lg hover:border-[#2EBAEB]/30 transition-colors">
                  <div className="w-8 h-8 bg-[#2EBAEB] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <p className="text-white/90">{req}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Perché Webwise */}
      <section className="py-20 px-8 lg:px-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <span className="text-white/40 text-xs uppercase tracking-wider">05</span>
              <h2 className="text-white text-3xl lg:text-4xl font-semibold mt-2 mb-6">Perché Webwise</h2>
              <p className="text-white/60 leading-relaxed">
                In Webwise crediamo in un approccio semplice e concreto.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-[#2EBAEB] text-2xl">→</span>
                <p className="text-white/80 text-lg">Niente promesse irrealistiche</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-[#2EBAEB] text-2xl">→</span>
                <p className="text-white/80 text-lg">Focus sulla qualità degli appuntamenti, non sui numeri a caso</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-[#2EBAEB] text-2xl">→</span>
                <p className="text-white/80 text-lg">Possibilità di crescere insieme se il rapporto funziona</p>
              </div>

              <div className="mt-8 p-6 bg-[#111] border border-white/10 rounded-xl">
                <p className="text-white text-lg font-medium">
                  Cerchiamo collaboratori con cui costruire un percorso, non semplici esecutori.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form candidatura */}
      <section className="py-24 px-8 lg:px-16 bg-[#111] border-t border-white/10 relative overflow-hidden">
        {/* Gradient blob */}
        <div
          className="absolute -bottom-[200px] -left-[200px] w-[600px] h-[600px] rounded-full opacity-15"
          style={{ background: '#2EBAEB', filter: 'blur(150px)' }}
        />

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block text-xs px-3 py-1 rounded-full border border-[#2EBAEB]/50 bg-[#2EBAEB]/10 text-[#2EBAEB] mb-4">
              CANDIDATI ORA
            </span>
            <h2 className="text-white text-3xl lg:text-4xl font-semibold mb-4">Come candidarti</h2>
            <p className="text-white/60">
              Compila il form inserendo i tuoi dati e una breve presentazione.<br />
              Se il tuo profilo è in linea, verrai contattato per un primo confronto conoscitivo.
            </p>
          </div>

          {submitSuccess ? (
            <div className="text-center py-16 bg-black/50 border border-[#2EBAEB]/30 rounded-2xl">
              <div className="w-20 h-20 bg-[#2EBAEB] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h3 className="text-2xl text-white font-semibold mb-4">Candidatura inviata!</h3>
              <p className="text-white/60">
                Grazie per il tuo interesse. Ti contatteremo presto.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-black/30 border border-white/10 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Nome *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#2EBAEB] transition-colors"
                    placeholder="Il tuo nome"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Cognome *</label>
                  <input
                    type="text"
                    name="cognome"
                    value={formData.cognome}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#2EBAEB] transition-colors"
                    placeholder="Il tuo cognome"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#2EBAEB] transition-colors"
                    placeholder="La tua email"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Telefono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#2EBAEB] transition-colors"
                    placeholder="Il tuo numero"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-sm mb-2">Breve presentazione *</label>
                <textarea
                  name="presentazione"
                  value={formData.presentazione}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-black/50 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#2EBAEB] transition-colors resize-none"
                  placeholder="Raccontaci brevemente chi sei e perché ti interessa questa posizione..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2EBAEB] hover:bg-[#25a8d6] text-white font-semibold py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Invio in corso...
                  </>
                ) : (
                  <>
                    Invia candidatura
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CTA finale */}
      <section className="py-20 px-8 lg:px-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/80 text-xl lg:text-2xl font-medium leading-relaxed">
            Entra a far parte di <span className="text-[#2EBAEB]">Webwise</span> e contribuisci attivamente alla crescita dell'agenzia.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
