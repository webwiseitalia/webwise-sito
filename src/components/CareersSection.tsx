export default function CareersSection() {
  return (
    <section id="careers" className="w-full relative py-20 bg-gray-200 overflow-visible">
      {/* Cerchio sfumato cyan in alto a destra */}
      <div
        className="absolute -top-[400px] -right-[200px] w-[600px] h-[600px] rounded-full opacity-40 z-[1]"
        style={{
          background: '#06b6d4',
          filter: 'blur(240px)'
        }}
      />

      {/* Cerchio sfumato rosso in basso a sinistra */}
      <div
        className="absolute -bottom-[200px] left-2 w-[600px] h-[600px] rounded-full opacity-30 z-[1]"
        style={{
          background: '#dc2626',
          filter: 'blur(240px)'
        }}
      />

      {/* Contenuto */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-5 gap-3">
        {/* Colonna sinistra - Contenuto */}
        <div className="flex flex-col gap-2 lg:col-span-3">
          <h4 className="text-4xl uppercase font-medium tracking-tight text-gray-900">
            Vuoi unirti al team?{' '}
            <span className="text-gray-500">Mostraci il tuo talento</span>
          </h4>

          <p className="text-gray-700">
            Siamo sempre alla ricerca di persone talentuose e appassionate. Se credi di poter fare la differenza, inviaci la tua candidatura.
          </p>

          {/* Bottone Candidati */}
          <a
            href="#candidatura"
            className="mt-4 border border-gray-400/50 pl-3 pr-1 py-1 rounded-full bg-gray-100 flex items-center gap-2 group hover:rotate-3 transition-all w-fit"
          >
            <p className="text-gray-900">Candidati</p>
            <div className="relative flex p-1.5 overflow-hidden text-white bg-black rounded-full group-hover:bg-cyan-500 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all translate-y-0 group-hover:-translate-y-[105%]"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute transition-all translate-y-[130%] group-hover:translate-y-0"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </a>
        </div>

        {/* Colonna destra - Badge */}
        <div className="lg:col-span-2 flex justify-end items-start">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500 text-white text-xs font-medium">
            Stiamo assumendo!
          </span>
        </div>
      </div>

      {/* Icona stella/asterisco - posizionata a destra */}
      <svg
        className="absolute z-[1] left-4 lg:left-auto -bottom-6 lg:-bottom-12 lg:right-20 w-[150px] h-[150px] lg:w-[300px] lg:h-[300px] animate-spin-slow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 72 72"
        fill="none"
        style={{ animationDuration: '20s', animationDirection: 'reverse' }}
      >
        <path
          d="M40 0H32V26.3432L13.3726 7.71573L7.71573 13.3726L26.3431 32H0V40H26.3432L7.71573 58.6274L13.3726 64.2843L32 45.6569V72H40V45.6569L58.6274 64.2843L64.2843 58.6274L45.6568 40H72V32H45.6569L64.2843 13.3726L58.6274 7.71573L40 26.3432V0Z"
          fill="#e0e0e0"
        />
      </svg>
    </section>
  )
}
