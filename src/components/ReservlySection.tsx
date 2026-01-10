export default function ReservlySection() {
  return (
    <section
      id="reservly"
      className="w-full bg-black relative z-20 py-20 lg:py-32"
    >
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h2
          className="text-white text-5xl md:text-7xl lg:text-8xl mb-12"
          style={{ fontFamily: 'Moderniz, sans-serif' }}
        >
          RESERVLY
        </h2>

        <div className="space-y-6 text-lg md:text-xl lg:text-2xl leading-relaxed">
          <p className="text-white font-semibold italic">
            Reservly è la piattaforma di prenotazione pensata per il business moderno.
          </p>
          <p className="text-white/70">
            Una web app veloce e scalabile, affiancata da app mobile Flutter, progettata per semplificare le prenotazioni, automatizzare i flussi e migliorare l'esperienza di clienti e staff.
          </p>
          <p className="text-[#2EBAEB] font-medium">
            Meno gestione, più controllo. Tutto in un unico sistema.
          </p>
        </div>
      </div>
    </section>
  )
}
