interface Client {
  name: string
  href: string
}

const clients: Client[] = [
  { name: 'Macelleria Marcheto', href: 'https://macelleriamarcheto.it' },
  { name: '3B Padel', href: 'https://3bpadel.it' },
  { name: 'Aurora Ristorante', href: 'https://ristoranteaurora.it' },
  { name: 'Studio Legale Bianchi', href: '#' },
  { name: 'Ottica Visually', href: '#' },
  { name: 'Pizzeria da Mario', href: '#' },
  { name: 'Fitness Revolution', href: '#' },
]

export default function ClientsMarquee() {
  // Triplichiamo i clienti per un loop infinito senza spazi vuoti
  const duplicatedClients = [...clients, ...clients, ...clients]

  return (
    <div className="w-full h-full flex items-center overflow-hidden">
      <div
        className="flex animate-marquee"
        style={{
          animation: 'marquee 30s linear infinite',
        }}
      >
        {duplicatedClients.map((client, index) => (
          <div key={index} className="mx-4 flex-shrink-0">
            <a
              href={client.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-6 border border-gray-700/50 rounded-lg bg-gradient-to-b from-gray-800/50 to-gray-900/30 aspect-video group hover:border-gray-600 transition-all"
              style={{
                width: '200px',
                height: '112px',
                pointerEvents: client.href === '#' ? 'none' : 'auto'
              }}
            >
              <span className="text-gray-400 font-semibold text-sm group-hover:text-white transition-colors grayscale group-hover:grayscale-0">
                {client.name}
              </span>
            </a>
          </div>
        ))}
      </div>

      {/* CSS per l'animazione */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
