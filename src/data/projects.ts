// Dati centralizzati dei progetti
import scarpaHeroDesk from '../assets/case-studies/casascarpa/scarpa-hero-desk.webp'
import scarpaHeroMob from '../assets/case-studies/casascarpa/scarpa-hero-mob.webp'
import scarpaDettaglio1 from '../assets/case-studies/casascarpa/scarpa-dettaglio-1.webp'
import scarpaDettaglio2 from '../assets/case-studies/casascarpa/scarpa-dettaglio-2.webp'
import auroraHeroDesk from '../assets/case-studies/aurora/aurora-hero-desktop.webp'
import auroraHeroMob from '../assets/case-studies/aurora/aurora-hero-mobile.webp'
import auroraDettaglio1 from '../assets/case-studies/aurora/aurora-dettaglio-1.webp'
import auroraDettaglio2 from '../assets/case-studies/aurora/aurora-dettaglio-2.webp'
import padelHeroDesk from '../assets/case-studies/3bpadel/3bpadel-hero-desktop.webp'
import padelHeroMob from '../assets/case-studies/3bpadel/3bpadel-hero-mob.webp'
import padelDettaglio1 from '../assets/case-studies/3bpadel/3bpadel-dettaglio-1.webp'
import padelDettaglio2 from '../assets/case-studies/3bpadel/3bpadel-dettaglio-2.webp'
import marchetoHeroDesk from '../assets/case-studies/marcheto/marcheto-hero-desktop.webp'
import marchetoHeroMob from '../assets/case-studies/marcheto/marcheto-hero-mobile.webp'
import marchetoDettaglio1 from '../assets/case-studies/marcheto/marcheto-dettaglio-1.webp'
import marchetoDettaglio2 from '../assets/case-studies/marcheto/marcheto-dettaglio-2.webp'

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
  mobileHeroImage?: string
  desktopDetailImages?: string[]
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
    year: '2025',
    industry: 'Food & Ristorazione',
    service: 'Web Design, Sviluppo sito web',
    category: 'Website',
    tools: ['React', 'Vite', 'JavaScript'],
    description: 'Sito web ufficiale per una delle macellerie-ristoranti più apprezzate della Val Camonica, punto di riferimento per chi cerca vera carne di altissima qualità.',
    fullDescription: 'Macelleria Marcheto rappresenta l\'eccellenza nella lavorazione e nella degustazione della carne a Malonno. La qualità del prodotto, l\'atmosfera autentica del locale e il personale super coinvolgente rendono l\'esperienza unica, tanto da essere diventata anche la sede della nostra cena aziendale.\n\nUn luogo già molto conosciuto e apprezzato offline, capace di sorprendere chiunque vi entri per la prima volta. L\'obiettivo era creare una presenza digitale coerente con la qualità e la notorietà della realtà offline: un punto di riferimento online ufficiale che comunicasse identità, atmosfera e qualità del locale.\n\nAbbiamo progettato e sviluppato un sito web moderno, chiaro e orientato all\'esperienza dell\'utente. La struttura è stata studiata per accompagnare il visitatore dalla scoperta del locale fino al contatto e alla prenotazione, valorizzando ogni aspetto dell\'esperienza offerta.',
    heroImage: marchetoHeroDesk,
    galleryImages: [],
    mobileHeroImage: marchetoHeroMob,
    desktopDetailImages: [marchetoDettaglio1, marchetoDettaglio2],
    technologies: [
      { name: 'React', icon: '', color: '#61DAFB' },
      { name: 'Vite', icon: '', color: '#646CFF' },
      { name: 'JavaScript', icon: '', color: '#F7DF1E' },
      { name: 'HTML5', icon: '', color: '#E34F26' },
      { name: 'CSS3', icon: '', color: '#1572B6' },
    ],
    link: 'https://marcheto.it',
    results: 'Dopo il lancio del sito web, Macelleria Marcheto registra circa 1.000 visite mensili. Le visite si traducono in richieste di informazioni e prenotazioni, rendendo la comunicazione più chiara, efficace e coerente con la qualità del locale.'
  },
  {
    id: '2',
    slug: '3b-padel',
    name: '3B Padel',
    client: '3B Padel',
    year: '2025',
    industry: 'Sport / Padel',
    service: 'Web Design, Ottimizzazione SEO, Performance',
    category: 'Website',
    tools: ['React', 'Vite', 'JavaScript'],
    description: 'Sito web ottimizzato e indicizzato per un\'azienda specializzata nella rivendita di campi da padel, operante in un settore altamente competitivo.',
    fullDescription: '3B Padel è un\'azienda specializzata nella rivendita di campi da padel, una realtà strutturata e in forte crescita all\'interno di un mercato estremamente competitivo. Sin dai primi contatti si sono mostrati molto interessati al progetto, consapevoli del fatto che la loro presenza online non rispecchiava la reale grandezza e professionalità dell\'azienda.\n\nL\'obiettivo era chiaro fin dall\'inizio: valorizzare il brand e rendere il sito web uno strumento reale di visibilità e contatto.\n\n3B Padel disponeva già di un sito web, ma questo non risultava indicizzato correttamente sui motori di ricerca. Il sito era lento, poco performante e non ottimizzato dal punto di vista SEO, rendendo difficile per potenziali clienti trovare l\'azienda online.\n\nSiamo intervenuti partendo dal sito esistente, analizzandone criticità tecniche e strutturali. Il lavoro ha previsto una profonda ottimizzazione delle performance e una riorganizzazione completa dei contenuti, culminata nello sviluppo di un nuovo sito web, più moderno, veloce e orientato alla conversione.\n\nLa nuova struttura comunica in modo chiaro il metodo di lavoro di 3B Padel, la loro esperienza e l\'affidabilità dell\'azienda, rendendo il sito un vero punto di riferimento per chi cerca soluzioni nel mondo del padel.',
    heroImage: padelHeroDesk,
    galleryImages: [],
    mobileHeroImage: padelHeroMob,
    desktopDetailImages: [padelDettaglio1, padelDettaglio2],
    technologies: [
      { name: 'React', icon: '', color: '#61DAFB' },
      { name: 'Vite', icon: '', color: '#646CFF' },
      { name: 'JavaScript', icon: '', color: '#F7DF1E' },
      { name: 'HTML5', icon: '', color: '#E34F26' },
      { name: 'CSS3', icon: '', color: '#1572B6' },
      { name: 'SEO', icon: '', color: '#4CAF50' },
    ],
    link: 'https://3bpadel.it',
    results: 'Sin dalle prime settimane dopo il lancio del nuovo sito web, 3B Padel ha riscontrato un incremento nel numero di chiamate e richieste di contatto. Nonostante l\'elevata concorrenza del settore, il sito genera una buona visibilità online e rappresenta oggi in modo chiaro la solidità e la professionalità dell\'azienda. Grazie ai risultati ottenuti, 3B Padel ha scelto di proseguire la collaborazione richiedendo supporto anche su ulteriori servizi digitali, tra cui gestione social, automazioni e ottimizzazione dei processi.'
  },
  {
    id: '3',
    slug: 'aurora-ristorante',
    name: 'Aurora',
    client: 'Aurora – Ristorante Ranzanico',
    location: 'Ranzanico (BG)',
    year: '2025',
    industry: 'Food & Ristorazione',
    service: 'Web Design, CMS gestionale, Prenotazioni online',
    category: 'Website',
    tools: ['React', 'Vite', 'JavaScript'],
    description: 'Sito web e gestionale CMS per un ristorante di famiglia a Ranzanico, con sistema avanzato di prenotazioni, gestione tavoli e pubblicazione menù e eventi.',
    fullDescription: 'Aurora è un ristorante gestito da una famiglia della nostra zona, già conosciuta grazie all\'attività precedente, il Ristorante Vannia a Cividate. Abbiamo sempre apprezzato la qualità del locale e, conoscendo personalmente la realtà, il contatto iniziale è nato in modo naturale.\n\nLa collaborazione è iniziata con lo sviluppo di un sito web per il Ristorante Vannia, già molto conosciuto localmente ma senza alcun riferimento digitale. Questo progetto ha permesso al cliente di comprendere appieno le potenzialità dei nostri servizi e il valore aggiunto che potevamo offrire.\n\nIl cliente è una famiglia che gestisce due ristoranti: Ristorante Vannia a Cividate e Ristorante Aurora a Ranzanico. Entrambe le attività erano già molto conosciute nella zona, ma non avevano una presenza online efficace. Gestire prenotazioni e aggiornamenti del menù manualmente comportava una perdita di tempo considerevole.\n\nAbbiamo sviluppato un sito web e un gestionale CMS avanzato che permette di gestire tutte le prenotazioni tramite un form collegato direttamente al sito, confermare prenotazioni e inviare promemoria automatici via WhatsApp grazie alle API integrate, visualizzare in una dashboard completa tutte le prenotazioni, statistiche, gestione tavoli e piantina del locale, e pubblicare autonomamente menù del giorno, immagini, eventi o post.',
    heroImage: auroraHeroDesk,
    galleryImages: [],
    mobileHeroImage: auroraHeroMob,
    desktopDetailImages: [auroraDettaglio1, auroraDettaglio2],
    technologies: [
      { name: 'React', icon: '', color: '#61DAFB' },
      { name: 'Vite', icon: '', color: '#646CFF' },
      { name: 'JavaScript', icon: '', color: '#F7DF1E' },
      { name: 'HTML5', icon: '', color: '#E34F26' },
      { name: 'CSS3', icon: '', color: '#1572B6' },
      { name: 'CMS', icon: '', color: '#FF6B6B' },
      { name: 'WhatsApp API', icon: '', color: '#25D366' },
    ],
    link: 'https://ristoranteaurora.it',
    results: 'Gestione prenotazioni semplificata e automatizzata, pubblicazione autonoma di menù, immagini e eventi, dashboard con statistiche, report e gestione tavoli. Migliore esperienza per clienti e staff con incremento dell\'efficienza operativa. La famiglia ha compreso pienamente il valore della nostra proposta, estendendo la collaborazione anche a servizi digitali aggiuntivi come gestione social, automazioni e ottimizzazione continua dei flussi operativi.'
  },
  {
    id: '4',
    slug: 'casa-della-scarpa',
    name: 'Casa della Scarpa',
    client: 'Casa della Scarpa di Carrettoni',
    year: '2025',
    industry: 'Retail / Calzature',
    service: 'E-commerce Shopify, Mercati Europei, Supporto grafico, Link hub personalizzato',
    category: 'E-commerce',
    tools: ['Shopify', 'Mercati Europei', 'Grafica'],
    description: 'E-commerce Shopify e supporto digitale per un negozio a conduzione familiare specializzato in calzature tecniche, da lavoro e per il tempo libero, con apertura al mercato europeo.',
    fullDescription: 'Casa della Scarpa di Carrettoni è un negozio a conduzione familiare specializzato nella vendita di scarponi e calzature di qualità, tra cui scarpe da lavoro, da caccia, da trekking e calzature per l\'uso quotidiano come ciabatte e articoli affini.\n\nLa collaborazione con il cliente dura da oltre un anno e si è sviluppata nel tempo in modo naturale, con l\'obiettivo di affiancare l\'attività nella crescita digitale e nella valorizzazione del prodotto anche al di fuori del contesto locale.\n\nCasa della Scarpa di Carrettoni è una realtà solida e ben conosciuta sul territorio, presente anche in mercati e fiere di settore. Prima del nostro intervento, tuttavia, mancava una struttura e-commerce efficace che potesse rappresentare adeguatamente l\'offerta e permettere all\'attività di espandersi online in modo concreto.\n\nAbbiamo sviluppato un e-commerce su Shopify, progettato per essere chiaro, affidabile e orientato alla vendita. All\'interno del sito è stata introdotta anche la funzionalità dei mercati europei, permettendo all\'attività di vendere in modo strutturato anche fuori dall\'Italia.\n\nGrazie a un\'indicizzazione generale sul mercato europeo, il sito ha iniziato a generare vendite anche all\'estero, in particolare in Grecia, risultato che ha sorpreso positivamente il cliente e dimostrato il potenziale del progetto.\n\nOltre all\'e-commerce, abbiamo fornito un link hub personalizzato, completamente sviluppato da noi, che raccoglie tutti i riferimenti digitali dell\'attività senza l\'utilizzo di servizi esterni standard.',
    heroImage: scarpaHeroDesk,
    galleryImages: [],
    mobileHeroImage: scarpaHeroMob,
    desktopDetailImages: [scarpaDettaglio1, scarpaDettaglio2],
    technologies: [
      { name: 'Shopify', icon: '', color: '#96BF48' },
      { name: 'Mercati Europei', icon: '', color: '#003399' },
      { name: 'Ottimizzazione E-commerce', icon: '', color: '#FF6B6B' },
      { name: 'Link Hub Custom', icon: '', color: '#2EBAEB' },
      { name: 'Grafica Promozionale', icon: '', color: '#FF9500' },
    ],
    link: 'https://casadellascarpa.it',
    results: 'Vendite generate anche all\'estero, in particolare sul mercato greco. Cliente estremamente soddisfatto dei risultati ottenuti. E-commerce stabile e facilmente gestibile. Presenza digitale coerente con l\'identità del negozio. Supporto concreto alle attività fieristiche e promozionali. Nel corso della collaborazione abbiamo supportato Casa della Scarpa anche con grafiche per fiere e mercati, materiali promozionali trasformati in volantini inseriti nei pacchi di spedizione, e un link hub personalizzato per collegare tutti i canali digitali.'
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getRelatedProjects(currentSlug: string, limit: number = 3): Project[] {
  return projects.filter(p => p.slug !== currentSlug).slice(0, limit)
}
