export type Locale = "en" | "it";
export const locales: Locale[] = ["en", "it"];
export const defaultLocale: Locale = "en";

export const nav = {
  en: {
    how: "How we work",
    domains: "Domains",
    models: "Models",
    enablement: "AI Enablement",
    work: "Work",
    about: "About",
    cta: "Start a project",
  },
  it: {
    how: "Come lavoriamo",
    domains: "Ambiti",
    models: "Modelli",
    enablement: "AI Enablement",
    work: "Lavori",
    about: "Azienda",
    cta: "Inizia un progetto",
  },
} as const;

export const home = {
  en: {
    hero: {
      tag: "Generative AI Company — Milano",
      h1a: "We build",
      h1b: "what AI makes",
      accent: "possible.",
      sub: "We design and deliver generative AI projects — in total outsourcing or co-sourcing with your team. From sales & marketing to finance, we turn AI into working products.",
      cta1: "Start a project",
      cta2: "See our work",
      scroll: "Scroll",
    },
    process: {
      tag: "How we work",
      title1: "Your project.",
      title2: "Our engine.",
      desc: "We integrate with your team or take full ownership — from concept to production, in weeks.",
      steps: [
        { num: "01", name: "Concept", text: "We analyze your business context, identify high-impact AI opportunities, and define a clear project scope together." },
        { num: "02", name: "Prototype", text: "Rapid, working prototypes — tested with real data, real models, and your team's feedback before scaling up." },
        { num: "03", name: "Craft", text: "Production-grade engineering — prompt design, model optimization, UX refinement, and infrastructure that scales with your business." },
        { num: "04", name: "Deliver", text: "We ship, monitor, and iterate. Full handover or ongoing management — you choose the model that works for you." },
      ],
    },
    domains: {
      tag: "Application domains",
      title1: "Generative AI,",
      title2: "applied where it matters.",
      desc: "We build across industries — wherever generative AI can create real competitive advantage.",
      cards: [
        { title: "Sales & Marketing", desc: "AI agents for lead generation, content at scale, campaign optimization, and customer intelligence. From automated outreach to personalized journeys powered by LLMs.", tags: ["Content generation","Lead scoring","Sales copilot","Campaign AI"] },
        { title: "Finance & Risk", desc: "Intelligent document processing, regulatory compliance automation, risk analysis, and AI-powered reporting for financial operations.", tags: ["Document AI","Compliance","Risk analysis","Reporting"] },
        { title: "Operations & Process", desc: "Workflow automation, knowledge management, intelligent routing, and AI copilots that augment your team's daily operations.", tags: ["Workflow AI","Knowledge base","Internal tools","RAG"] },
        { title: "Product & SaaS", desc: "AI-native products from scratch — MVPs, market validation, and scaling. We build your product as if it were ours.", tags: ["MVP","Product design","LLM integration","Scale"] },
      ],
    },
    enablement: {
      badge: "New",
      tag: "AI Enablement for SMEs",
      title1: "Not just products.",
      title2: "People enabled.",
      desc1: "Generative AI changes the way people work — but only if they know how to use it. We partner with Italian SMEs on their adoption journey: from understanding the fundamentals to real integration into daily business processes.",
      desc2: "Not generic training: programs built around your industry, your roles, and your workflows. The result is a team that uses AI with method, not trial and error.",
      cta: "Talk to us",
      pills: ["Sales & Marketing","Finance","Operations","Legal","HR","Customer Service"],
      cards: [
        { title: "AI Literacy for your team", desc: "Intensive workshops to bring all employees to an operational level: what generative AI is, what it can do in your sector, how to use it safely." },
        { title: "AI-ready process mapping", desc: "We analyze your operational flows and identify where AI can create real impact — prioritized by effort and return." },
        { title: "Applied prompt engineering", desc: "Hands-on training for each role: how to write effective prompts for your team's actual day-to-day tasks — not generic examples." },
        { title: "Ongoing programs", desc: "AI evolves every week. Structured programs with periodic updates, new tools, and Q&A sessions to always stay ahead." },
      ],
    },
    models: {
      tag: "Engagement models",
      title1: "Your terms.",
      title2: "Our execution.",
      desc: "Two ways to work together — choose the model that fits your organization.",
      cards: [
        { title: "Total Outsourcing", desc: "We take full ownership — from concept to production. You define the goals, we handle strategy, engineering, and delivery. No internal AI team needed.", tags: ["Full ownership","Dedicated team","End-to-end"] },
        { title: "Co-sourcing", desc: "We embed within your existing team — bringing AI expertise while you retain control and codebase ownership. Structured knowledge transfer throughout.", tags: ["Embedded team","Knowledge transfer","Shared ownership"] },
      ],
    },
    work: {
      tag: "Selected work",
      title1: "Built. Shipped.",
      title2: "Measured.",
      desc: "Real products, real results.",
      placeholders: [
        { title: "AI Sales Copilot", sector: "Sales & Marketing", desc: "Generative AI agent for B2B lead qualification, personalized outreach, and multi-channel follow-up — fully outsourced.", metric: "340%", label: "pipeline increase" },
        { title: "Document Intelligence", sector: "Finance", desc: "Automated extraction and analysis of financial documents for a banking group — co-sourced with internal compliance team.", metric: "85%", label: "processing time saved" },
        { title: "Knowledge Copilot", sector: "Operations", desc: "RAG-powered internal assistant trained on 50K+ company docs for a manufacturing enterprise — total outsourcing.", metric: "4.1x", label: "faster information retrieval" },
      ],
    },
    about: {
      tag: "About us",
      title: "AI-first. By design.",
      p1: "Brainlab is a generative AI company based in Milan. We develop AI projects end-to-end — in total outsourcing or co-sourcing with our clients' teams. Every engagement produces working software that delivers measurable business impact.",
      p2: "We work across industries — from sales & marketing to finance and operations — bringing deep expertise in LLMs, prompt engineering, AI agents, and production-grade AI systems.",
      p3: "We are a Società Benefit, legally committed to creating positive impact alongside business value. Responsible AI isn't optional — it's how we build.",
      values: [
        { title: "Ship fast", desc: "Working software over perfect plans. Weeks, not quarters." },
        { title: "Measure everything", desc: "If we can't measure the impact, we don't build it." },
        { title: "Stay technical", desc: "No slides without code. Everyone builds, tests, ships." },
        { title: "Think product", desc: "Tech is the means. The product and its users are the end." },
      ],
    },
    cta: {
      title1: "Let's build your",
      title2: "next AI project.",
      sub: "Whether you need a full outsourced team or AI expertise embedded in yours — let's talk about what generative AI can do for your business.",
      btn: "Get in touch",
    },
    footer: {
      copy: "© 2026 Brainlab S.r.l. S.B. — Corso Monforte 2, 20122 Milano",
    },
  },

  it: {
    hero: {
      tag: "Generative AI Company — Milano",
      h1a: "Costruiamo",
      h1b: "ciò che l'AI",
      accent: "rende possibile.",
      sub: "Progettiamo e consegniamo prodotti AI generativa — in total outsourcing o co-sourcing con il tuo team. Dalle vendite e marketing alla finanza, trasformiamo l'AI in prodotti funzionanti.",
      cta1: "Inizia un progetto",
      cta2: "Guarda i nostri lavori",
      scroll: "Scorri",
    },
    process: {
      tag: "Come lavoriamo",
      title1: "Il tuo progetto.",
      title2: "Il nostro motore.",
      desc: "Ci integriamo nel tuo team o prendiamo piena responsabilità — dal concept alla produzione, in settimane.",
      steps: [
        { num: "01", name: "Concept", text: "Analizziamo il tuo contesto di business, identifichiamo le opportunità AI ad alto impatto e definiamo insieme un perimetro di progetto chiaro." },
        { num: "02", name: "Prototype", text: "Prototipi funzionanti rapidi — testati con dati reali, modelli reali e il feedback del tuo team prima di scalare." },
        { num: "03", name: "Craft", text: "Engineering production-grade — prompt design, ottimizzazione dei modelli, UX refinement e infrastruttura che scala con il tuo business." },
        { num: "04", name: "Deliver", text: "Consegniamo, monitoriamo e iteriamo. Handover completo o gestione continuativa — scegli il modello che funziona per te." },
      ],
    },
    domains: {
      tag: "Ambiti applicativi",
      title1: "AI generativa,",
      title2: "dove conta davvero.",
      desc: "Costruiamo in tutti i settori — ovunque l'AI generativa crei un vantaggio competitivo reale.",
      cards: [
        { title: "Sales & Marketing", desc: "Agenti AI per lead generation, contenuti in scala, ottimizzazione delle campagne e customer intelligence. Dall'outreach automatizzato ai customer journey personalizzati da LLM.", tags: ["Content generation","Lead scoring","Sales copilot","Campaign AI"] },
        { title: "Finance & Risk", desc: "Elaborazione intelligente dei documenti, automazione della compliance normativa, analisi del rischio e reporting AI-powered per le operazioni finanziarie.", tags: ["Document AI","Compliance","Risk analysis","Reporting"] },
        { title: "Operations & Process", desc: "Automazione dei workflow, knowledge management, routing intelligente e AI copilot che potenziano le operazioni quotidiane del tuo team.", tags: ["Workflow AI","Knowledge base","Internal tools","RAG"] },
        { title: "Product & SaaS", desc: "Prodotti AI-native da zero — MVP, validazione di mercato e scaling. Costruiamo il tuo prodotto come se fosse il nostro.", tags: ["MVP","Product design","LLM integration","Scale"] },
      ],
    },
    enablement: {
      badge: "Nuovo",
      tag: "AI Enablement per le PMI",
      title1: "Non solo prodotti.",
      title2: "Persone abilitate.",
      desc1: "L'AI generativa cambia il modo in cui si lavora — ma solo se le persone sanno usarla. Affianchiamo le PMI italiane nel percorso di adozione: dalla comprensione dei fondamentali all'integrazione reale nei processi aziendali quotidiani.",
      desc2: "Non formazione generica: programmi costruiti sul tuo settore, sui tuoi ruoli e sui tuoi workflow. Il risultato è un team che usa l'AI con metodo, non per tentativi.",
      cta: "Parla con noi",
      pills: ["Sales & Marketing","Finance","Operations","Legal","HR","Customer Service"],
      cards: [
        { title: "AI Literacy per il team", desc: "Workshop intensivi per portare tutti i dipendenti a un livello operativo: cosa è l'AI generativa, cosa può fare nel tuo settore, come usarla in sicurezza." },
        { title: "Mappatura processi AI-ready", desc: "Analizziamo i tuoi flussi operativi e identifichiamo dove l'AI può creare impatto reale — con prioritizzazione per sforzo e ritorno." },
        { title: "Prompt engineering applicato", desc: "Formazione hands-on per ogni ruolo: come scrivere prompt efficaci per le attività concrete del tuo team — non esempi generici." },
        { title: "Programmi continuativi", desc: "AI evolve ogni settimana. Percorsi strutturati con aggiornamenti periodici, nuovi tool e sessioni Q&A per restare sempre al passo." },
      ],
    },
    models: {
      tag: "Modelli di ingaggio",
      title1: "Le tue condizioni.",
      title2: "La nostra execution.",
      desc: "Due modi di lavorare insieme — scegli il modello che si adatta alla tua organizzazione.",
      cards: [
        { title: "Total Outsourcing", desc: "Ci prendiamo piena responsabilità — dal concept alla produzione. Tu definisci gli obiettivi, noi gestiamo strategia, engineering e delivery. Nessun team AI interno richiesto.", tags: ["Full ownership","Team dedicato","End-to-end"] },
        { title: "Co-sourcing", desc: "Ci integriamo nel tuo team esistente — portando expertise AI mentre tu mantieni il controllo e la ownership della codebase. Knowledge transfer strutturato per tutta la durata.", tags: ["Team embedded","Knowledge transfer","Ownership condivisa"] },
      ],
    },
    work: {
      tag: "Lavori selezionati",
      title1: "Costruito. Rilasciato.",
      title2: "Misurato.",
      desc: "Prodotti reali, risultati reali.",
      placeholders: [
        { title: "AI Sales Copilot", sector: "Sales & Marketing", desc: "Agente AI generativa per qualificazione lead B2B, outreach personalizzato e follow-up multicanale — full outsourcing.", metric: "340%", label: "incremento pipeline" },
        { title: "Document Intelligence", sector: "Finance", desc: "Estrazione e analisi automatizzata di documenti finanziari per un gruppo bancario — co-sourced con il team di compliance.", metric: "85%", label: "tempo di elaborazione risparmiato" },
        { title: "Knowledge Copilot", sector: "Operations", desc: "Assistente interno RAG-powered addestrato su 50K+ documenti aziendali per un'impresa manifatturiera — total outsourcing.", metric: "4.1x", label: "recupero informazioni più veloce" },
      ],
    },
    about: {
      tag: "Chi siamo",
      title: "AI-first. By design.",
      p1: "Brainlab è un'azienda di AI generativa con sede a Milano. Sviluppiamo progetti AI end-to-end — in total outsourcing o co-sourcing con i team dei clienti. Ogni ingaggio produce software funzionante che genera impatto di business misurabile.",
      p2: "Lavoriamo in tutti i settori — dalle vendite e marketing alla finanza e alle operations — portando deep expertise in LLM, prompt engineering, AI agent e sistemi AI production-grade.",
      p3: "Siamo una Società Benefit, con impegno legale a creare impatto positivo accanto al valore di business. L'AI responsabile non è un'opzione — è il nostro modo di costruire.",
      values: [
        { title: "Ship fast", desc: "Software funzionante prima dei piani perfetti. Settimane, non trimestri." },
        { title: "Measure everything", desc: "Se non riusciamo a misurare l'impatto, non lo costruiamo." },
        { title: "Stay technical", desc: "Niente slide senza codice. Tutti costruiscono, testano, rilasciano." },
        { title: "Think product", desc: "La tech è il mezzo. Il prodotto e i suoi utenti sono il fine." },
      ],
    },
    cta: {
      title1: "Costruiamo insieme",
      title2: "il tuo prossimo progetto AI.",
      sub: "Che tu abbia bisogno di un team in full outsourcing o di expertise AI embedded nel tuo — parliamo di cosa l'AI generativa può fare per il tuo business.",
      btn: "Contattaci",
    },
    footer: {
      copy: "© 2026 Brainlab S.r.l. S.B. — Corso Monforte 2, 20122 Milano",
    },
  },
} as const;
