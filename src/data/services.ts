export interface AccordionItem {
  title: string
  content: string
}

export interface Service {
  id: string
  name: string
  shortDescription: string
  longDescription: string
  tags: string[]
  icon: string // SVG path
  accordionItems: AccordionItem[]
}

export const services: Service[] = [
  {
    id: 'seo',
    name: 'SEO',
    shortDescription: 'Ottimizzazione per i motori di ricerca e miglioramento del posizionamento su Google.',
    longDescription: 'Portiamo il tuo sito web in cima ai risultati di ricerca con strategie SEO avanzate e personalizzate. Analizziamo il tuo settore, i tuoi competitor e il comportamento degli utenti per costruire una strategia che generi traffico qualificato e conversioni reali.',
    tags: ['Google', 'Posizionamento'],
    icon: 'M11 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm10 8l-4.3-4.3',
    accordionItems: [
      {
        title: 'Analisi e Strategia',
        content: 'Effettuiamo un\'analisi approfondita del tuo sito, dei competitor e delle keyword più rilevanti per il tuo business. Creiamo una strategia SEO su misura basata su dati concreti.'
      },
      {
        title: 'Ottimizzazione On-Page',
        content: 'Ottimizziamo ogni aspetto del tuo sito: meta tag, struttura URL, contenuti, immagini, velocità di caricamento e esperienza utente per massimizzare la visibilità.'
      },
      {
        title: 'Lo sapevi che...',
        content: 'Il 75% degli utenti non scorre mai oltre la prima pagina dei risultati di Google. Essere in prima pagina può aumentare il tuo traffico organico fino al 200%.'
      }
    ]
  },
  {
    id: 'siti-web',
    name: 'Siti Web',
    shortDescription: 'Progettazione e sviluppo di siti web personalizzati, responsive e performanti.',
    longDescription: 'Creiamo siti web che non sono solo belli da vedere, ma che funzionano. Ogni progetto è pensato per offrire un\'esperienza utente impeccabile, performance elevate e un design che rispecchia l\'identità del tuo brand.',
    tags: ['Responsive', 'Performanti'],
    icon: 'M3 3h18v18H3V3zm0 6h18M9 21V9',
    accordionItems: [
      {
        title: 'Design Su Misura',
        content: 'Niente template preconfezionati. Ogni sito che creiamo è unico, progettato specificamente per le tue esigenze e per comunicare efficacemente i valori del tuo brand.'
      },
      {
        title: 'Performance Ottimizzate',
        content: 'Utilizziamo le tecnologie più moderne (React, Next.js, Vite) per garantire tempi di caricamento rapidissimi e un\'esperienza fluida su ogni dispositivo.'
      },
      {
        title: 'Lo sapevi che...',
        content: 'Il 53% degli utenti mobile abbandona un sito se impiega più di 3 secondi a caricarsi. I nostri siti sono ottimizzati per caricarsi in meno di 2 secondi.'
      }
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    shortDescription: 'Realizzazione di negozi online completi, con sistemi di pagamento e gestione prodotti.',
    longDescription: 'Trasformiamo la tua idea in un negozio online di successo. Dalla gestione del catalogo ai pagamenti sicuri, creiamo e-commerce completi e scalabili che convertono visitatori in clienti.',
    tags: ['Pagamenti', 'Gestione prodotti'],
    icon: 'M8 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm11 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12',
    accordionItems: [
      {
        title: 'Esperienza d\'Acquisto Fluida',
        content: 'Progettiamo checkout ottimizzati, carrelli intuitivi e processi d\'acquisto semplificati per ridurre l\'abbandono e aumentare le conversioni.'
      },
      {
        title: 'Integrazioni Complete',
        content: 'Colleghiamo il tuo e-commerce con i principali gateway di pagamento (Stripe, PayPal), corrieri, gestionali e CRM per automatizzare ogni processo.'
      },
      {
        title: 'Lo sapevi che...',
        content: 'L\'ottimizzazione del checkout può aumentare le conversioni fino al 35%. Ogni click in meno nel processo d\'acquisto significa più vendite completate.'
      }
    ]
  },
  {
    id: 'social',
    name: 'Gestione Social',
    shortDescription: 'Gestione professionale dei social media, creazione contenuti e crescita della presenza online.',
    longDescription: 'I social media sono il volto digitale del tuo brand. Li gestiamo con strategia, creatività e costanza per costruire una community engaged e trasformare i follower in clienti.',
    tags: ['Contenuti', 'Crescita'],
    icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
    accordionItems: [
      {
        title: 'Strategia e Pianificazione',
        content: 'Analizziamo il tuo target, studiamo i competitor e creiamo un piano editoriale su misura con contenuti che parlano al tuo pubblico.'
      },
      {
        title: 'Contenuti Creativi',
        content: 'Produciamo grafiche, video, copy e stories che catturano l\'attenzione e generano engagement. Ogni contenuto è pensato per raccontare il tuo brand.'
      },
      {
        title: 'Lo sapevi che...',
        content: 'I brand che pubblicano contenuti consistenti sui social vedono un aumento del 67% nella generazione di lead rispetto a chi non lo fa.'
      }
    ]
  },
  {
    id: 'app',
    name: 'App e Web App',
    shortDescription: 'Sviluppo di applicazioni mobile e web su misura per aziende e progetti digitali.',
    longDescription: 'Sviluppiamo applicazioni web e mobile che risolvono problemi reali. Dalla progettazione al lancio, creiamo soluzioni digitali scalabili, sicure e intuitive.',
    tags: ['Mobile', 'Su misura'],
    icon: 'M2 6h7v12H2V6zm15 0h7v12h-7V6zM9 6h6M9 18h6M9 12h6',
    accordionItems: [
      {
        title: 'Sviluppo Cross-Platform',
        content: 'Utilizziamo tecnologie come React Native e Flutter per creare app che funzionano perfettamente sia su iOS che su Android, riducendo tempi e costi.'
      },
      {
        title: 'Web App Progressive',
        content: 'Le nostre PWA combinano il meglio del web e delle app native: installabili, veloci, funzionanti anche offline e sempre aggiornate.'
      },
      {
        title: 'Lo sapevi che...',
        content: 'Le web app progressive possono aumentare l\'engagement degli utenti fino al 137% rispetto ai siti web tradizionali.'
      }
    ]
  },
  {
    id: 'automazioni',
    name: 'Automazioni e AI',
    shortDescription: 'Automazione dei processi aziendali e integrazione di soluzioni basate su AI.',
    longDescription: 'L\'intelligenza artificiale non è il futuro, è il presente. Integriamo AI e automazioni nel tuo business per eliminare task ripetitivi, ridurre errori e liberare tempo per ciò che conta davvero.',
    tags: ['Intelligenza Artificiale', 'Processi'],
    icon: 'M12 8V4H8M4 8h16v12H4V8zM2 14h2M20 14h2M15 13v2M9 13v2',
    accordionItems: [
      {
        title: 'Chatbot e Assistenti AI',
        content: 'Creiamo chatbot intelligenti che rispondono ai clienti 24/7, qualificano lead e automatizzano il customer service senza perdere il tocco umano.'
      },
      {
        title: 'Workflow Automation',
        content: 'Automatizziamo processi ripetitivi: dalla gestione email all\'elaborazione documenti, dal data entry alla reportistica.'
      },
      {
        title: 'Lo sapevi che...',
        content: 'Le aziende che implementano automazioni AI risparmiano in media 6 ore a settimana per dipendente su task ripetitivi.'
      }
    ]
  },
  {
    id: 'ads',
    name: 'ADS',
    shortDescription: 'Gestione di campagne pubblicitarie su Google Ads e piattaforme social.',
    longDescription: 'Investire in pubblicità senza strategia è come bruciare soldi. Gestiamo le tue campagne con precisione chirurgica: targeting mirato, budget ottimizzato e ROI misurabile.',
    tags: ['Google Ads', 'Social Ads'],
    icon: 'M3 3v18h18M19 9l-5 5-4-4-3 3',
    accordionItems: [
      {
        title: 'Campagne Multi-Piattaforma',
        content: 'Gestiamo campagne su Google Ads, Meta (Facebook/Instagram), LinkedIn e TikTok Ads, scegliendo i canali più efficaci per il tuo target.'
      },
      {
        title: 'Ottimizzazione Continua',
        content: 'Monitoriamo le performance in tempo reale, testiamo creatività e copy, ottimizziamo il targeting per massimizzare ogni euro investito.'
      },
      {
        title: 'Lo sapevi che...',
        content: 'Con una gestione professionale delle campagne ADS si può ridurre il costo per acquisizione (CPA) fino al 50% rispetto a campagne non ottimizzate.'
      }
    ]
  },
  {
    id: 'reservly',
    name: 'Reservly',
    shortDescription: 'Piattaforma di prenotazione per il business moderno: web app e app mobile per semplificare appuntamenti.',
    longDescription: 'Reservly è la nostra soluzione completa per la gestione delle prenotazioni. Una piattaforma moderna che permette ai tuoi clienti di prenotare in autonomia, 24/7, mentre tu ti concentri sul tuo lavoro.',
    tags: ['Prenotazioni', 'Gestione appuntamenti'],
    icon: 'M8 2v4M16 2v4M3 4h18v18H3V4zM3 10h18M9 16h6',
    accordionItems: [
      {
        title: 'Prenotazioni Online 24/7',
        content: 'I tuoi clienti possono prenotare quando vogliono, da qualsiasi dispositivo. Tu ricevi notifiche in tempo reale e gestisci tutto da un\'unica dashboard.'
      },
      {
        title: 'Sincronizzazione Calendario',
        content: 'Reservly si integra con Google Calendar, Outlook e altri calendari per evitare doppie prenotazioni e mantenere tutto sincronizzato.'
      },
      {
        title: 'Lo sapevi che...',
        content: 'Le attività che offrono prenotazioni online vedono un aumento del 40% negli appuntamenti rispetto a chi accetta solo chiamate telefoniche.'
      }
    ]
  }
]
