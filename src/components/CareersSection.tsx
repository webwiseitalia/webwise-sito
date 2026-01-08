export default function CareersSection() {
  return (
    <section id="careers" className="w-full relative py-24 lg:py-32 bg-gray-200 overflow-hidden">
      {/* Cerchio sfumato cyan in alto a destra */}
      <div
        className="absolute -top-[300px] -right-[150px] w-[500px] h-[500px] rounded-full opacity-35 z-[1]"
        style={{
          background: '#2EBAEB',
          filter: 'blur(200px)'
        }}
      />

      {/* Cerchio sfumato rosso in basso a sinistra */}
      <div
        className="absolute -bottom-[150px] left-0 w-[500px] h-[500px] rounded-full opacity-25 z-[1]"
        style={{
          background: '#2EBAEB',
          filter: 'blur(200px)'
        }}
      />

      {/* Contenuto */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16">
        {/* Colonna sinistra - Contenuto */}
        <div className="flex flex-col gap-4 lg:w-2/3">
          <h4 className="text-3xl lg:text-4xl uppercase font-medium tracking-tight text-gray-900 leading-tight">
            Vuoi unirti al team?{' '}
            <span className="text-gray-500">Mostraci il tuo talento</span>
          </h4>

          <p className="text-gray-600 leading-relaxed max-w-xl">
            Siamo sempre alla ricerca di persone talentuose e appassionate. Se credi di poter fare la differenza, inviaci la tua candidatura.
          </p>

          {/* Bottone Candidati */}
          <a
            href="#candidatura"
            className="mt-2 border border-gray-400/50 pl-4 pr-1.5 py-1.5 rounded-full bg-gray-100 flex items-center gap-3 group hover:rotate-2 transition-all w-fit"
          >
            <span className="text-gray-900 font-medium">Candidati</span>
            <div className="relative flex p-2 overflow-hidden text-white bg-black rounded-full group-hover:bg-[#2EBAEB] transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all translate-y-0 group-hover:-translate-y-[105%]"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute transition-all translate-y-[130%] group-hover:translate-y-0"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </a>
        </div>

        {/* Colonna destra - Badge */}
        <div className="lg:w-1/3 flex lg:justify-end">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2EBAEB] text-white text-xs font-medium">
            Stiamo assumendo!
          </span>
        </div>
      </div>

      {/* Icona stella/asterisco - posizionata a destra */}
      <svg
        className="absolute z-[1] left-6 lg:left-auto bottom-6 lg:bottom-10 lg:right-12 w-[120px] h-[120px] lg:w-[200px] lg:h-[200px] animate-spin-slow opacity-60"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 72 72"
        fill="none"
        style={{ animationDuration: '20s', animationDirection: 'reverse' }}
      >
        <path
          d="M40 0H32V26.3432L13.3726 7.71573L7.71573 13.3726L26.3431 32H0V40H26.3432L7.71573 58.6274L13.3726 64.2843L32 45.6569V72H40V45.6569L58.6274 64.2843L64.2843 58.6274L45.6568 40H72V32H45.6569L64.2843 13.3726L58.6274 7.71573L40 26.3432V0Z"
          fill="#d1d5db"
        />
      </svg>
    </section>
  )
}
