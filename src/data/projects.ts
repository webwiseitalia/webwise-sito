// Dati centralizzati dei progetti
export interface Project {
  id: string
  slug: string
  name: string
  client: string
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
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'consorzio-vado',
    name: 'Consorzio Vadò',
    client: 'Consorzio Vadò',
    year: '2025',
    industry: 'Industry',
    service: 'Web Development',
    category: 'Website',
    tools: ['React', 'Tailwind'],
    description: 'Piattaforma web moderna per il consorzio industriale Vadò, con focus su user experience e performance.',
    fullDescription: 'Abbiamo sviluppato una piattaforma web completamente custom per il Consorzio Vadò, un importante polo industriale italiano. Il progetto ha richiesto un\'attenta analisi delle esigenze degli utenti e una progettazione UX/UI orientata alla semplicità d\'uso. La piattaforma integra un sistema di gestione contenuti headless e offre performance ottimali grazie all\'utilizzo di tecnologie moderne come React e Tailwind CSS.',
    heroImage: '',
    galleryImages: [],
    technologies: [
      { name: 'React', icon: '⚛️', color: '#61DAFB' },
      { name: 'Tailwind', icon: '🎨', color: '#06B6D4' },
      { name: 'TypeScript', icon: '📘', color: '#3178C6' },
    ],
    link: 'https://consorziovado.it'
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
  {
    id: '4',
    slug: 'top-gear',
    name: 'Top Gear',
    client: 'Top Gear Italia',
    year: '2022',
    industry: 'Automotive',
    service: 'Web Development',
    category: 'Website',
    tools: ['Drupal', 'PHP'],
    description: 'Portale editoriale per il magazine automobilistico con sistema di gestione contenuti avanzato.',
    fullDescription: 'Top Gear Italia ci ha affidato lo sviluppo del loro portale editoriale, un progetto complesso che richiede la gestione di migliaia di articoli, recensioni auto e contenuti multimediali. Abbiamo implementato un CMS custom basato su Drupal con funzionalità avanzate di categorizzazione, ricerca e SEO. Il sito supporta alti volumi di traffico e offre un\'esperienza di lettura ottimale su tutti i dispositivi.',
    heroImage: '',
    galleryImages: [],
    technologies: [
      { name: 'Drupal', icon: '💧', color: '#0678BE' },
      { name: 'PHP', icon: '🐘', color: '#777BB4' },
      { name: 'MySQL', icon: '🗄️', color: '#4479A1' },
    ],
    link: 'https://topgear.it'
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getRelatedProjects(currentSlug: string, limit: number = 3): Project[] {
  return projects.filter(p => p.slug !== currentSlug).slice(0, limit)
}
