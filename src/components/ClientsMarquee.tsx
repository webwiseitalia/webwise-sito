import padelHero from '../assets/3bpadel-casestudy/3bpadel-hero-desktop.webp'
import auroraHero from '../assets/aurora-casestudy/aurora-hero-desktop.webp'
import scarpaHero from '../assets/casascarpa-casestudy/scarpa-hero-desk.webp'
import marchetoHero from '../assets/marcheto-casestudy/marcheto-hero-desktop.webp'
import scsburgerHero from '../assets/sliderclienti/scsburger.webp'
import prozacHero from '../assets/sliderclienti/prozacbodypiercing.webp'
import daemHero from '../assets/sliderclienti/daemsrl.webp'
import loschicosHero from '../assets/sliderclienti/loschicosbuenos.webp'

interface Client {
  name: string
  href: string
  image?: string
}

const clients: Client[] = [
  { name: '3B Padel', href: 'https://3bpadel.it', image: padelHero },
  { name: 'Aurora Ristorante', href: 'https://ristoranteaurora.it', image: auroraHero },
  { name: 'Casa della Scarpa', href: 'https://casadellascarpa.it', image: scarpaHero },
  { name: 'Macelleria Marcheto', href: 'https://macelleriamarcheto.it', image: marchetoHero },
  { name: 'SCS Burger', href: '#', image: scsburgerHero },
  { name: 'Prozac Body Piercing', href: '#', image: prozacHero },
  { name: 'Daem SRL', href: '#', image: daemHero },
  { name: 'Los Chicos Buenos', href: '#', image: loschicosHero },
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
              className="flex items-center justify-center border border-gray-700/50 rounded-lg bg-gradient-to-b from-gray-800/50 to-gray-900/30 aspect-video group hover:border-gray-600 transition-all overflow-hidden cursor-pointer"
              style={{
                width: '200px',
                height: '112px'
              }}
              onClick={(e) => { if (client.href === '#') e.preventDefault() }}
            >
              {client.image ? (
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                <span className="text-gray-400 font-semibold text-sm group-hover:text-white transition-colors">
                  {client.name}
                </span>
              )}
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
