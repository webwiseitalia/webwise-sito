import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface SoftwareData {
  id: string
  name: string
  tagline: string
  description: string
  heroTitle: string
  heroSubtitle: string
  features: {
    title: string
    description: string
    number: string
  }[]
  industries: string[]
  ctaTitle: string
}

const softwareData: Record<string, SoftwareData> = {
  'webwise-studio': {
    id: 'webwise-studio',
    name: 'WebWise Studio',
    tagline: 'Create without limits',
    description: 'La piattaforma AI-powered per creare siti web professionali senza scrivere una riga di codice.',
    heroTitle: 'Go beyond templates.',
    heroSubtitle: 'Creative Autonomy',
    features: [
      {
        title: 'Designed for AI\nwebsite builders',
        description: 'Build AI apps, agents, and agentic AI Workflow builder — an intuitive workspace designed with end-to-end AI builders in mind.',
        number: '01'
      },
      {
        title: 'Evaluate and ship\nwith confidence',
        description: 'Deploy your AI-driven workflows for production and iteratively improve them with world-best evaluation scoring.',
        number: '02'
      },
      {
        title: 'Accelerated AI\napplication\ndevelopment',
        description: 'Unifying SDK and tool software development in the greatest AI hub in the industry.',
        number: '03'
      },
      {
        title: 'Explore a curated\nlibrary of solutions\nand examples',
        description: 'AIP Solve makes it easy to discover best-of AI applications, templates, and battle-tested setups.',
        number: '04'
      }
    ],
    industries: [
      'AEROSPACE & AVIATION',
      'AUTOMOTIVE',
      'CONSTRUCTION & REAL ESTATE',
      'ENERGY & RENEWABLES',
      'FINANCIAL SERVICES & BANKING',
      'GOVERNMENT & SECURITY',
      'HEALTHCARE & LIFESCIENCES',
      'INSURANCE',
      'LOGISTICS',
      'MANUFACTURING & INDUSTRIALS',
      'MEDIA & TELECOMMUNICATION',
      'RETAIL & CONSUMER GOODS',
      'UTILITIES & CHEMICALS'
    ],
    ctaTitle: 'Build now with WebWise Studio'
  },
  'deepsite': {
    id: 'deepsite',
    name: 'DeepSite',
    tagline: 'Insights that matter',
    description: 'Analisi avanzata dei dati web con machine learning per insights strategici e decisioni data-driven.',
    heroTitle: 'Go beyond data.',
    heroSubtitle: 'Deep Intelligence',
    features: [
      {
        title: 'Designed for data\nanalysis experts',
        description: 'Build powerful analytics pipelines with AI-assisted data exploration and visualization tools.',
        number: '01'
      },
      {
        title: 'Real-time insights\nat scale',
        description: 'Process millions of data points in real-time with our distributed computing infrastructure.',
        number: '02'
      },
      {
        title: 'Machine learning\nintegration',
        description: 'Seamlessly integrate ML models into your analytics workflow for predictive insights.',
        number: '03'
      },
      {
        title: 'Collaborative\ndata exploration',
        description: 'Share dashboards and insights across teams with role-based access control.',
        number: '04'
      }
    ],
    industries: [
      'AEROSPACE & AVIATION',
      'AUTOMOTIVE',
      'CONSTRUCTION & REAL ESTATE',
      'ENERGY & RENEWABLES',
      'FINANCIAL SERVICES & BANKING',
      'GOVERNMENT & SECURITY',
      'HEALTHCARE & LIFESCIENCES',
      'INSURANCE',
      'LOGISTICS',
      'MANUFACTURING & INDUSTRIALS',
      'MEDIA & TELECOMMUNICATION',
      'RETAIL & CONSUMER GOODS',
      'UTILITIES & CHEMICALS'
    ],
    ctaTitle: 'Build now with DeepSite'
  },
  'flowengine': {
    id: 'flowengine',
    name: 'FlowEngine',
    tagline: 'Automate everything',
    description: 'Automazione dei processi aziendali con workflow intelligenti, integrati e scalabili.',
    heroTitle: 'Go beyond manual.',
    heroSubtitle: 'Process Autonomy',
    features: [
      {
        title: 'Designed for process\nautomation',
        description: 'Create complex workflows with our visual builder and AI-assisted process optimization.',
        number: '01'
      },
      {
        title: 'Integrate with\nany system',
        description: 'Connect to 500+ enterprise applications and custom APIs with pre-built connectors.',
        number: '02'
      },
      {
        title: 'Intelligent\nrouting',
        description: 'AI-powered decision making for complex business logic and exception handling.',
        number: '03'
      },
      {
        title: 'Monitor and\noptimize',
        description: 'Real-time dashboards and AI recommendations to continuously improve your processes.',
        number: '04'
      }
    ],
    industries: [
      'AEROSPACE & AVIATION',
      'AUTOMOTIVE',
      'CONSTRUCTION & REAL ESTATE',
      'ENERGY & RENEWABLES',
      'FINANCIAL SERVICES & BANKING',
      'GOVERNMENT & SECURITY',
      'HEALTHCARE & LIFESCIENCES',
      'INSURANCE',
      'LOGISTICS',
      'MANUFACTURING & INDUSTRIALS',
      'MEDIA & TELECOMMUNICATION',
      'RETAIL & CONSUMER GOODS',
      'UTILITIES & CHEMICALS'
    ],
    ctaTitle: 'Build now with FlowEngine'
  },
  'cloudsync': {
    id: 'cloudsync',
    name: 'CloudSync',
    tagline: 'Connected everywhere',
    description: 'Sincronizzazione e gestione centralizzata di dati multi-piattaforma in tempo reale.',
    heroTitle: 'Go beyond silos.',
    heroSubtitle: 'Data Harmony',
    features: [
      {
        title: 'Designed for\nmulti-cloud',
        description: 'Seamlessly sync data across AWS, Azure, GCP and on-premise infrastructure.',
        number: '01'
      },
      {
        title: 'Real-time\nsynchronization',
        description: 'Sub-second data replication with conflict resolution and version control.',
        number: '02'
      },
      {
        title: 'Enterprise\nsecurity',
        description: 'End-to-end encryption, compliance certifications, and granular access controls.',
        number: '03'
      },
      {
        title: 'Unified data\ngovernance',
        description: 'Single pane of glass for data lineage, quality monitoring, and policy enforcement.',
        number: '04'
      }
    ],
    industries: [
      'AEROSPACE & AVIATION',
      'AUTOMOTIVE',
      'CONSTRUCTION & REAL ESTATE',
      'ENERGY & RENEWABLES',
      'FINANCIAL SERVICES & BANKING',
      'GOVERNMENT & SECURITY',
      'HEALTHCARE & LIFESCIENCES',
      'INSURANCE',
      'LOGISTICS',
      'MANUFACTURING & INDUSTRIALS',
      'MEDIA & TELECOMMUNICATION',
      'RETAIL & CONSUMER GOODS',
      'UTILITIES & CHEMICALS'
    ],
    ctaTitle: 'Build now with CloudSync'
  },
  'securevault': {
    id: 'securevault',
    name: 'SecureVault',
    tagline: 'Protected always',
    description: 'Deploy autonomo, monitoraggio e gestione software su qualsiasi ambiente con sicurezza enterprise.',
    heroTitle: 'Go beyond security.',
    heroSubtitle: 'Total Protection',
    features: [
      {
        title: 'Designed for\nzero-trust',
        description: 'Implement zero-trust architecture with AI-powered threat detection and response.',
        number: '01'
      },
      {
        title: 'Autonomous\ndeployment',
        description: 'Self-healing infrastructure with automated patching and configuration management.',
        number: '02'
      },
      {
        title: 'Compliance\nautomation',
        description: 'Continuous compliance monitoring for SOC2, HIPAA, GDPR and industry standards.',
        number: '03'
      },
      {
        title: 'Incident\nresponse',
        description: 'AI-assisted threat hunting and automated incident response playbooks.',
        number: '04'
      }
    ],
    industries: [
      'AEROSPACE & AVIATION',
      'AUTOMOTIVE',
      'CONSTRUCTION & REAL ESTATE',
      'ENERGY & RENEWABLES',
      'FINANCIAL SERVICES & BANKING',
      'GOVERNMENT & SECURITY',
      'HEALTHCARE & LIFESCIENCES',
      'INSURANCE',
      'LOGISTICS',
      'MANUFACTURING & INDUSTRIALS',
      'MEDIA & TELECOMMUNICATION',
      'RETAIL & CONSUMER GOODS',
      'UTILITIES & CHEMICALS'
    ],
    ctaTitle: 'Build now with SecureVault'
  }
}

export default function SoftwarePage() {
  const { softwareId } = useParams<{ softwareId: string }>()
  const software = softwareData[softwareId || '']

  if (!software) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-4xl mb-4">Software non trovato</h1>
          <Link to="/" className="text-purple-400 hover:underline">Torna alla home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-black/50" />

        {/* Content */}
        <div className="relative z-10 w-full px-8 lg:px-24 pt-32 pb-20">
          {/* Logo e nome software grande */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 lg:w-28 lg:h-28 bg-white/10 rounded-2xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 lg:w-16 lg:h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 3L4 14h7v7l9-11h-7V3z" />
              </svg>
            </div>
            <h1 className="text-white text-6xl lg:text-8xl font-light tracking-tight">{software.name}</h1>
          </div>

          {/* Descrizione e link */}
          <div className="max-w-xl mb-16">
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              {software.description}
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#features" className="text-white/60 hover:text-white transition-colors">FEATURES</a>
              <a href="#industries" className="text-white/60 hover:text-white transition-colors">INDUSTRIES</a>
              <a href="#build" className="text-white/60 hover:text-white transition-colors">GET STARTED</a>
            </div>
          </div>

          {/* Placeholder per laptop/video */}
          <div className="relative w-full max-w-5xl mx-auto">
            <div className="aspect-video bg-black/40 rounded-xl border border-white/10 flex items-center justify-center">
              <span className="text-white/30 text-sm">Video / Image Placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* Go Beyond Section */}
      <section className="w-full bg-white py-32 lg:py-40">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <p className="text-gray-400 text-sm mb-8">Join agents and automations</p>
          <h2 className="text-4xl lg:text-6xl font-light text-gray-900 leading-tight">
            {software.heroTitle.split('.')[0]}.<br />
            <span className="text-purple-600">{software.heroSubtitle}</span>
          </h2>
        </div>
      </section>

      {/* Beyond Chat Section */}
      <section className="w-full bg-white py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
            <div>
              <p className="text-purple-600 text-sm font-medium mb-2">Beyond Chat</p>
              <p className="text-gray-500 text-sm">Powered by LLM</p>
            </div>
            <div className="flex gap-4 mt-4 lg:mt-0">
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                AI Automations
              </button>
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                AI Agents
              </button>
            </div>
          </div>

          {/* Placeholder per screenshot */}
          <div className="w-full aspect-[16/9] bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Screenshot Placeholder</span>
          </div>
        </div>
      </section>

      {/* Features Sections */}
      <section id="features" className="w-full bg-white">
        {software.features.map((feature, index) => (
          <div key={index} className="w-full py-24 lg:py-32 border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-8">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                {/* Left - Title */}
                <div className="lg:w-1/3">
                  <div className="flex items-start gap-4 mb-6">
                    <span className="text-gray-300 text-sm">{feature.number}</span>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-600" />
                      <div className="w-2 h-2 rounded-full bg-gray-300" />
                      <div className="w-2 h-2 rounded-full bg-gray-300" />
                    </div>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-light text-gray-900 leading-tight whitespace-pre-line">
                    {feature.title}
                  </h3>
                </div>

                {/* Right - Description + Image */}
                <div className="lg:w-2/3">
                  <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
                    {feature.description}
                  </p>

                  {/* Placeholder per immagine feature */}
                  <div className="w-full aspect-[4/3] bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Feature Image Placeholder</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Industries Section */}
      <section id="industries" className="w-full bg-[#0a0a0a] py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Left - Title */}
            <div className="lg:w-1/3">
              <h3 className="text-3xl lg:text-4xl font-light text-white leading-tight mb-4">
                Solving complex<br />
                problems across<br />
                all industries in<br />
                days, not years.
              </h3>
              <a href="#" className="text-white/60 text-sm hover:text-white transition-colors underline">
                Learn more
              </a>
            </div>

            {/* Right - Industries list */}
            <div className="lg:w-2/3">
              <div className="flex flex-wrap gap-3">
                {software.industries.map((industry, index) => (
                  <a
                    key={index}
                    href="#"
                    className="px-4 py-2 text-sm text-white/60 border border-white/20 rounded-full hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {industry}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Build Now CTA Section */}
      <section id="build" className="w-full bg-black py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-12">
            {software.ctaTitle}
          </h2>

          {/* Logo placeholder */}
          <div className="w-16 h-16 mx-auto mb-12 bg-white/10 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 3L4 14h7v7l9-11h-7V3z" />
            </svg>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors"
            >
              Build with {software.name}
            </a>
            <a
              href="#"
              className="px-8 py-4 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              Explore Demo
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
