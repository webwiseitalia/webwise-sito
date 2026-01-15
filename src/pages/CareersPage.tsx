import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

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
    <div className="min-h-screen bg-black overflow-hidden">
      <Navbar />

      {/* Hero Section - Full width, titolo a sinistra */}
      <section className="relative w-full min-h-[70vh] bg-black flex items-end" style={{ padding: '0 50px 80px 50px' }}>
        <div className="w-full pt-32">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 text-sm"
          >
            <span>←</span>
            <span>TORNA AL SITO</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h1 className="text-white font-extralight tracking-tight leading-none" style={{ fontSize: 'clamp(40px, 6vw, 90px)' }}>
              CALLER /<br /> APPOINTMENT SETTER
            </h1>

            <div className="flex flex-wrap gap-3 lg:pb-2">
              <span className="text-white/60 text-sm border border-white/20 rounded-full px-4 py-2">Remote</span>
              <span className="text-white/60 text-sm border border-white/20 rounded-full px-4 py-2">Performance-based</span>
              <span className="text-white/60 text-sm border border-white/20 rounded-full px-4 py-2">No exp. required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro - Testo grande centrato */}
      <section className="w-full bg-black border-t border-white/10" style={{ padding: '100px 50px' }}>
        <p className="text-white text-2xl lg:text-4xl font-light leading-relaxed max-w-4xl">
          Webwise è una web agency in crescita, specializzata in siti web, marketing digitale e Google Ads.
          <span className="text-white/40"> Per supportare la nostra espansione, cerchiamo Caller / Appointment Setter da inserire nel team.</span>
        </p>
      </section>

      {/* Chi cerchiamo + Cosa farai - Due colonne affiancate */}
      <section className="w-full bg-black border-t border-white/10" style={{ padding: '80px 50px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Chi cerchiamo - a sinistra */}
          <div>
            <span className="text-gray-500 text-xs tracking-wider block mb-6">CHI CERCHIAMO</span>
            <p className="text-white text-xl lg:text-2xl font-light leading-relaxed">
              Persone motivate e orientate ai risultati. Il ruolo è ideale per chi ama il contatto diretto
              con le persone e desidera essere pagato in base ai risultati ottenuti.
            </p>
          </div>

          {/* Cosa farai - a destra */}
          <div>
            <span className="text-gray-500 text-xs tracking-wider block mb-6">COSA FARAI</span>
            <div className="space-y-4">
              <p className="text-white/70 text-base">→ Contattare telefonicamente potenziali clienti</p>
              <p className="text-white/70 text-base">→ Presentare Webwise e i suoi servizi</p>
              <p className="text-white/70 text-base">→ Qualificare l'interesse del prospect</p>
              <p className="text-white/70 text-base">→ Fissare appuntamenti per il team commerciale</p>
            </div>
            <p className="text-white/40 text-sm mt-8">
              Non devi vendere, ma creare opportunità reali e concrete.
            </p>
          </div>
        </div>
      </section>

      {/* Compenso - Layout asimmetrico */}
      <section className="w-full bg-black border-t border-white/10" style={{ padding: '80px 50px' }}>
        <div className="max-w-5xl">
          <span className="text-gray-500 text-xs tracking-wider block mb-6">COMPENSO</span>
          <p className="text-white text-xl lg:text-3xl font-light leading-relaxed mb-10">
            Modello a performance. La collaborazione è basata sui risultati, il guadagno è legato al numero di appuntamenti qualificati fissati.
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="text-white text-sm border border-white/20 rounded-full px-5 py-2">Nessun limite</span>
            <span className="text-white text-sm border border-white/20 rounded-full px-5 py-2">Meritocratico</span>
            <span className="text-white text-sm border border-white/20 rounded-full px-5 py-2">Trasparente</span>
          </div>
        </div>
      </section>

      {/* Requisiti + Perché Webwise - Due colonne invertite */}
      <section className="w-full bg-black border-t border-white/10" style={{ padding: '80px 50px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Perché Webwise - a sinistra */}
          <div>
            <span className="text-gray-500 text-xs tracking-wider block mb-6">PERCHÉ WEBWISE</span>
            <p className="text-white text-xl font-light leading-relaxed mb-6">
              Niente promesse irrealistiche. Approccio concreto e trasparente.
            </p>
            <p className="text-white/50 text-base leading-relaxed mb-3">
              Qualità over quantità — focus sugli appuntamenti qualificati.
            </p>
            <p className="text-white/50 text-base leading-relaxed">
              Crescita insieme — cerchiamo partner, non esecutori.
            </p>
          </div>

          {/* Requisiti - a destra */}
          <div>
            <span className="text-gray-500 text-xs tracking-wider block mb-6">REQUISITI</span>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="text-white text-sm border border-white/20 rounded-full px-4 py-2">Capacità comunicative</span>
              <span className="text-white text-sm border border-white/20 rounded-full px-4 py-2">Attitudine telefonica</span>
              <span className="text-white text-sm border border-white/20 rounded-full px-4 py-2">Orientamento obiettivi</span>
              <span className="text-white text-sm border border-white/20 rounded-full px-4 py-2">Autonomia</span>
            </div>
            <p className="text-white/40 text-sm">
              Esperienza nel cold calling è un plus, non obbligatoria.
            </p>
          </div>
        </div>
      </section>

      {/* Form candidatura - Layout asimmetrico con form a sinistra */}
      <section className="w-full bg-black border-t border-white/10" style={{ padding: '100px 50px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form - occupa più spazio */}
          <div className="lg:col-span-7">
            <span className="text-gray-500 text-xs tracking-wider block mb-8">CANDIDATI ORA</span>

            {submitSuccess ? (
              <div className="py-12">
                <h3 className="text-2xl text-white font-light mb-4">Candidatura inviata</h3>
                <p className="text-white/60">Grazie per il tuo interesse. Ti contatteremo presto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-gray-500 text-xs tracking-wider mb-3">NOME *</label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/20 text-white px-0 py-3 focus:outline-none focus:border-[#2EBAEB] transition-colors"
                      placeholder="Mario"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-xs tracking-wider mb-3">COGNOME *</label>
                    <input
                      type="text"
                      name="cognome"
                      value={formData.cognome}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/20 text-white px-0 py-3 focus:outline-none focus:border-[#2EBAEB] transition-colors"
                      placeholder="Rossi"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-gray-500 text-xs tracking-wider mb-3">EMAIL *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-white/20 text-white px-0 py-3 focus:outline-none focus:border-[#2EBAEB] transition-colors"
                      placeholder="mario@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 text-xs tracking-wider mb-3">TELEFONO</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 text-white px-0 py-3 focus:outline-none focus:border-[#2EBAEB] transition-colors"
                      placeholder="+39 333 1234567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-500 text-xs tracking-wider mb-3">PRESENTAZIONE *</label>
                  <textarea
                    name="presentazione"
                    value={formData.presentazione}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 text-white px-0 py-3 focus:outline-none focus:border-[#2EBAEB] transition-colors resize-none"
                    placeholder="Raccontaci chi sei e perché ti interessa questa posizione..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-3 border border-white/30 hover:border-[#2EBAEB] hover:text-[#2EBAEB] text-white rounded-full transition-colors disabled:opacity-50"
                  style={{ padding: '18px 40px', fontSize: '14px' }}
                >
                  {isSubmitting ? 'Invio in corso...' : 'INVIA CANDIDATURA'} <span>→</span>
                </button>
              </form>
            )}
          </div>

          {/* Info laterale - colonna stretta a destra */}
          <div className="lg:col-span-5 lg:pl-12 lg:border-l lg:border-white/10">
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Compila il form con i tuoi dati. Se il profilo è in linea, ti contatteremo per un confronto.
            </p>
            <div className="space-y-6">
              <div>
                <span className="text-gray-500 text-xs tracking-wider block mb-2">DOMANDE?</span>
                <a href="/#contatti" className="text-white hover:text-[#2EBAEB] transition-colors text-sm flex items-center gap-2">
                  Contattaci <span>→</span>
                </a>
              </div>
              <div>
                <span className="text-gray-500 text-xs tracking-wider block mb-2">RISPOSTA</span>
                <p className="text-white/60 text-sm">Entro 48 ore lavorative</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
