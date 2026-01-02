interface Software {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

const softwares: Software[] = [
  {
    id: '/0.1',
    name: 'WebWise Studio',
    description: 'Crea siti web professionali con l\'intelligenza artificiale, senza scrivere codice.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 3L4 14h7v7l9-11h-7V3z" />
      </svg>
    )
  },
  {
    id: '/0.2',
    name: 'DeepSite',
    description: 'Analisi avanzata dei dati web con machine learning per insights strategici.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    )
  },
  {
    id: '/0.3',
    name: 'FlowEngine',
    description: 'Automazione dei processi aziendali con workflow intelligenti e integrati.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H6v-2h4V7h2v4h4v2h-4v4z" />
      </svg>
    )
  },
  {
    id: '/0.4',
    name: 'CloudSync',
    description: 'Sincronizzazione e gestione centralizzata di dati multi-piattaforma in tempo reale.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm1-10c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
      </svg>
    )
  },
  {
    id: '/0.5',
    name: 'SecureVault',
    description: 'Deploy autonomo, monitoraggio e gestione software su qualsiasi ambiente.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
      </svg>
    )
  }
]

export default function SoftwareSection() {
  return (
    <section id="software" className="w-full relative z-10">
      {/* Sezione NERA con testo piccolo a destra */}
      <div className="w-full bg-black py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="max-w-md ml-auto text-right">
            {/* Badge */}
            <span className="inline-block text-xs px-3 py-1 rounded-full border border-cyan-400/50 bg-cyan-400/10 text-cyan-400 mb-4">
              Come possiamo aiutarti
            </span>

            {/* Titolo */}
            <h3 className="text-white text-xl font-semibold mb-3">Servizi</h3>

            {/* Descrizione */}
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Capire esattamente quello che ti serve è il nostro pane quotidiano.
              Sviluppiamo soluzioni software personalizzate che si allineano
              perfettamente ai tuoi obiettivi. Il nostro approccio è un mix ben
              rodato di metodo e creatività, garantendo prodotti di qualità superiore
              e senza compromessi.
            </p>

            {/* Bottoni */}
            <div className="flex justify-end gap-3">
              <a
                href="#"
                className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 pl-4 pr-2 py-2 rounded-full text-white text-sm transition-all"
              >
                <span>Leggi di più</span>
                <span className="bg-black rounded-full p-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 7v14"></path>
                    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                  </svg>
                </span>
              </a>
              <a
                href="#contatti"
                className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 pl-4 pr-2 py-2 rounded-full text-white text-sm transition-all"
              >
                <span>Contattaci</span>
                <span className="bg-black rounded-full p-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sezione GRIGIA con software */}
      <div className="w-full bg-[#5a5a5a] py-24">
        <div className="max-w-6xl mx-auto px-8">
          {/* Callout Text - allineato a SINISTRA */}
          <p className="text-2xl md:text-3xl lg:text-[40px] leading-snug text-white mb-20 max-w-4xl">
            I nostri software alimentano decisioni in tempo reale,{' '}
            <span className="text-gray-400">AI-driven</span> per aziende
            e imprese, dalla produzione alla distribuzione.
          </p>

          {/* Section Title */}
          <h2 className="text-white/60 text-lg mb-6">I nostri Software</h2>

          {/* Software List */}
          <div className="flex flex-col">
            {softwares.map((software) => (
              <a
                key={software.id}
                href="#"
                className="group border-t border-white/20 py-8 grid grid-cols-12 gap-6 items-center hover:bg-white/5 transition-colors"
              >
                {/* Description + ID (left) */}
                <div className="col-span-12 md:col-span-3">
                  <p className="text-white/50 text-sm leading-relaxed mb-3">
                    {software.description}
                  </p>
                  <span className="text-white/30 text-xs">{software.id}</span>
                </div>

                {/* Icon (center-left) */}
                <div className="col-span-12 md:col-span-2 flex justify-start md:justify-center">
                  <div className="text-white/70 group-hover:text-white transition-colors">
                    {software.icon}
                  </div>
                </div>

                {/* Name (right - large) */}
                <div className="col-span-12 md:col-span-7 flex items-center">
                  <h3 className="text-white text-5xl md:text-6xl lg:text-8xl font-light tracking-tight">
                    {software.name}
                  </h3>
                </div>
              </a>
            ))}

            {/* Bottom border */}
            <div className="border-t border-white/20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
