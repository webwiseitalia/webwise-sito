// Dati centralizzati del sito Webwise
// Utilizzati in tutte le pagine per garantire coerenza

export const SITE_DATA = {
  // Informazioni base
  name: 'Webwise',
  fullName: 'Webwise Studio',
  domain: 'webwise.it',
  url: 'https://webwise.it',

  // SEO
  title: 'Webwise | Sviluppo Web, Software e Soluzioni Digitali su Misura',
  description: 'Webwise è un\'agenzia di sviluppo web e software con sede in Italia. Creiamo siti web, applicazioni e soluzioni digitali personalizzate per far crescere il tuo business online.',
  keywords: 'sviluppo web, web agency, software house, siti web, applicazioni, digital solutions, Italia, Darfo Boario Terme',

  // Contatti
  contact: {
    email: 'info@webwise.it',
    phone: '+39 0364 123456',
    phoneDisplay: '0364 123456',
  },

  // Indirizzo
  address: {
    street: 'Via Example 123',
    city: 'Darfo Boario Terme',
    province: 'BS',
    cap: '25047',
    country: 'Italia',
    full: 'Via Example 123, 25047 Darfo Boario Terme (BS), Italia',
  },

  // Dati legali
  legal: {
    companyName: 'Webwise S.r.l.',
    vatNumber: 'IT12345678901',
    fiscalCode: '12345678901',
    rea: 'BS-123456',
  },

  // Social media
  social: {
    instagram: 'https://instagram.com/webwise',
    facebook: 'https://facebook.com/webwise',
    linkedin: 'https://linkedin.com/company/webwise',
    twitter: 'https://twitter.com/webwise',
  },

  // Open Graph / Social sharing
  og: {
    image: '/og-image.jpg',
    imageAlt: 'Webwise - Sviluppo Web e Software',
    type: 'website',
  },

  // Colori brand
  colors: {
    primary: '#2EBAEB',
    background: '#000000',
    text: '#FFFFFF',
  },
} as const

// Tipo per TypeScript
export type SiteData = typeof SITE_DATA
