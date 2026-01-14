// Dati centralizzati dei progetti
export interface Project {
  id: string
  slug: string
  name: string
  client: string
  location?: string
  year: string
  industry: string
  service: string
  category: string
  tools: string[]
  description: string
  fullDescription: string
  heroImage: string
  galleryImages: string[]
  technologies: {
    name: string
    icon: string
    color: string
  }[]
  link?: string
  results?: string
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'macelleria-marcheto',
    name: 'Macelleria Marcheto',
    client: 'Macelleria Marcheto',
    location: 'Malonno (BS)',
    year: '2024',
    industry: 'Food & Ristorazione',
    service: 'Web Design, Sviluppo sito web',
    category: 'Website',
    tools: ['React', 'Vite', 'JavaScript'],
    description: 'Sito web ufficiale per una delle macellerie-ristoranti più apprezzate della Val Camonica, punto di riferimento per chi cerca vera carne di altissima qualità.',
    fullDescription: 'Macelleria Marcheto rappresenta l\'eccellenza nella lavorazione e nella degustazione della carne a Malonno. La qualità del prodotto, l\'atmosfera autentica del locale e il personale super coinvolgente rendono l\'esperienza unica, tanto da essere diventata anche la sede della nostra cena aziendale.\n\nUn luogo già molto conosciuto e apprezzato offline, capace di sorprendere chiunque vi entri per la prima volta. L\'obiettivo era creare una presenza digitale coerente con la qualità e la notorietà della realtà offline: un punto di riferimento online ufficiale che comunicasse identità, atmosfera e qualità del locale.\n\nAbbiamo progettato e sviluppato un sito web moderno, chiaro e orientato all\'esperienza dell\'utente. La struttura è stata studiata per accompagnare il visitatore dalla scoperta del locale fino al contatto e alla prenotazione, valorizzando ogni aspetto dell\'esperienza offerta.',
    heroImage: '',
    galleryImages: [],
    technologies: [
      { name: 'React', icon: '', color: '#61DAFB' },
      { name: 'Vite', icon: '', color: '#646CFF' },
      { name: 'JavaScript', icon: '', color: '#F7DF1E' },
      { name: 'HTML5', icon: '', color: '#E34F26' },
      { name: 'CSS3', icon: '', color: '#1572B6' },
    ],
    link: 'https://macelleriamarcheto.it',
    results: 'Dopo il lancio del sito web, Macelleria Marcheto registra circa 1.000 visite mensili. Le visite si traducono in richieste di informazioni e prenotazioni, rendendo la comunicazione più chiara, efficace e coerente con la qualità del locale.'
  },
  {
    id: '2',
    slug: 'medusa',
    name: 'Medusa',
    client: 'Medusa Labs',
    year: '2024',
    industry: 'Blockchain',
    service: 'Web3 Development',
    category: 'Software',
    tools: ['Next.js', 'Solidity'],
    description: 'Piattaforma decentralizzata per la gestione di asset digitali e NFT con integrazione blockchain.',
    fullDescription: 'Medusa è una piattaforma Web3 all\'avanguardia che permette agli utenti di gestire, scambiare e creare asset digitali sulla blockchain. Abbiamo sviluppato smart contract sicuri in Solidity e un\'interfaccia utente intuitiva con Next.js. Il progetto include un marketplace NFT, wallet integration e un sistema di governance decentralizzato.',
    heroImage: '',
    galleryImages: [],
    technologies: [
      { name: 'Next.js', icon: '▲', color: '#000000' },
      { name: 'Solidity', icon: '💎', color: '#363636' },
      { name: 'Ethereum', icon: '⟠', color: '#627EEA' },
      { name: 'TypeScript', icon: '📘', color: '#3178C6' },
    ],
    link: 'https://medusa.io'
  },
  {
    id: '3',
    slug: 'quercetti',
    name: 'Quercetti S.p.A.',
    client: 'Quercetti S.p.A.',
    year: '2021',
    industry: 'Toys',
    service: 'E-commerce Development',
    category: 'Ecommerce',
    tools: ['Shopify', 'Liquid'],
    description: 'E-commerce completo per lo storico marchio italiano di giocattoli educativi.',
    fullDescription: 'Per Quercetti, storico brand italiano di giocattoli educativi fondato nel 1950, abbiamo realizzato un e-commerce completo su piattaforma Shopify. Il progetto ha incluso la personalizzazione del tema, l\'integrazione con il gestionale aziendale, l\'ottimizzazione SEO e la configurazione di un sistema di spedizioni internazionale. L\'esperienza d\'acquisto è stata progettata per riflettere i valori del brand: creatività, qualità e tradizione italiana.',
    heroImage: '',
    galleryImages: [],
    technologies: [
      { name: 'Shopify', icon: '🛒', color: '#96BF48' },
      { name: 'Liquid', icon: '💧', color: '#7AB55C' },
      { name: 'JavaScript', icon: '📜', color: '#F7DF1E' },
    ],
    link: 'https://quercetti.com'
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getRelatedProjects(currentSlug: string, limit: number = 3): Project[] {
  return projects.filter(p => p.slug !== currentSlug).slice(0, limit)
}
