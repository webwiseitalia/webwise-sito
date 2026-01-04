import { Link } from 'react-router-dom'

interface Software {
  id: string
  slug: string
  name: string
  description: string
  icon: React.ReactNode
}

const softwares: Software[] = [
  {
    id: '/0.1',
    slug: 'webwise-studio',
    name: 'WebWise Studio',
    description: 'Crea siti web professionali con l\'intelligenza artificiale, senza scrivere codice.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 3L4 14h7v7l9-11h-7V3z" />
      </svg>
    )
  },
  {
    id: '/0.2',
    slug: 'deepsite',
    name: 'DeepSite',
    description: 'Analisi avanzata dei dati web con machine learning per insights strategici.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    )
  },
  {
    id: '/0.3',
    slug: 'flowengine',
    name: 'FlowEngine',
    description: 'Automazione dei processi aziendali con workflow intelligenti e integrati.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H6v-2h4V7h2v4h4v2h-4v4z" />
      </svg>
    )
  },
  {
    id: '/0.4',
    slug: 'cloudsync',
    name: 'CloudSync',
    description: 'Sincronizzazione e gestione centralizzata di dati multi-piattaforma in tempo reale.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z" />
      </svg>
    )
  },
  {
    id: '/0.5',
    slug: 'securevault',
    name: 'SecureVault',
    description: 'Deploy autonomo, monitoraggio e gestione software su qualsiasi ambiente.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
      </svg>
    )
  }
]

export default function SoftwareSection() {
  return (
    <section id="software" className="w-full">
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
                    <path d="M12 7v14" />
                    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
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
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sezione GRIGIA con software - Full Width */}
      <div className="w-full bg-black">
        {/* Header con callout text */}
        <div className="w-full px-6 lg:px-12 py-20 flex justify-center">
          <p className="text-2xl md:text-3xl lg:text-[42px] leading-tight text-white max-w-5xl text-center">
            I nostri software alimentano decisioni in tempo reale,{' '}
            <span className="text-gray-500">AI-driven</span> per aziende
            e imprese, dalla produzione alla distribuzione.
          </p>
        </div>

        {/* Software List - Full Width */}
        <div className="w-full">
          {softwares.map((software) => (
            <Link
              key={software.id}
              to={`/software/${software.slug}`}
              className="group block border-t border-white/10 hover:bg-white/5 transition-all duration-300"
            >
              <div className="w-full px-6 lg:px-12 py-10 lg:py-16 flex flex-col lg:flex-row lg:items-center gap-8">
                {/* Left side: Description + Number */}
                <div className="lg:w-[300px] flex-shrink-0">
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    {software.description}
                  </p>
                  <span className="text-white/30 text-sm font-mono">{software.id}</span>
                </div>

                {/* Center: Icon */}
                <div className="lg:flex-shrink-0 lg:w-[150px] flex lg:justify-center">
                  <div className="text-white/40 group-hover:text-white transition-colors duration-300">
                    {software.icon}
                  </div>
                </div>

                {/* Right side: Name (large) + Number */}
                <div className="flex-1 flex items-end justify-between gap-4">
                  <h3 className="text-white text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                    {software.name}
                  </h3>
                  <span className="text-white/30 text-sm font-mono hidden lg:block">{software.id}</span>
                </div>
              </div>
            </Link>
          ))}

          {/* Bottom border */}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  )
}
