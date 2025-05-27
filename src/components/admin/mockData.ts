
// Mock data for the admin system

export const mockSchools = [
  {
    id: 1,
    name: "EMEF Prof. Henrique Scabello",
    type: "Ensino Fundamental",
    director: "Ana Silva Santos",
    address: "Rua Carlos Gomes, 1220 - Centro",
    phone: "(16) 3333-5555",
    cellphone: "(16) 99999-5555",
    whatsapp: "(16) 99999-5555",
    emails: [
      { type: "principal", email: "escabello@educ.araraquara.sp.gov.br" },
      { type: "diretor", email: "ana.silva@educ.araraquara.sp.gov.br" },
      { type: "coordenacao", email: "coord.escabello@educ.araraquara.sp.gov.br" }
    ],
    students: 520,
    classes: 18,
    teachers: 32,
    description: "Escola municipal de ensino fundamental com foco na educação integral e desenvolvimento cidadão.",
    users: [
      { id: 1, name: "Ana Silva Santos", email: "ana.silva@educ.araraquara.sp.gov.br", role: "admin" },
      { id: 2, name: "Carlos Roberto", email: "carlos.roberto@educ.araraquara.sp.gov.br", role: "editor" },
      { id: 3, name: "Maria José", email: "maria.jose@educ.araraquara.sp.gov.br", role: "viewer" }
    ]
  },
  {
    id: 2,
    name: "EMEI Criança Feliz",
    type: "Educação Infantil",
    director: "Marcia Oliveira",
    address: "Rua das Flores, 450 - Jardim América",
    phone: "(16) 3333-6666",
    cellphone: "(16) 99999-6666",
    whatsapp: "(16) 99999-6666",
    emails: [
      { type: "principal", email: "criancafeliz@educ.araraquara.sp.gov.br" },
      { type: "diretor", email: "marcia.oliveira@educ.araraquara.sp.gov.br" }
    ],
    students: 240,
    classes: 12,
    teachers: 18,
    description: "Centro de educação infantil focado no desenvolvimento lúdico e pedagógico das crianças.",
    users: [
      { id: 4, name: "Marcia Oliveira", email: "marcia.oliveira@educ.araraquara.sp.gov.br", role: "admin" },
      { id: 5, name: "João Pedro", email: "joao.pedro@educ.araraquara.sp.gov.br", role: "editor" }
    ]
  },
  {
    id: 3,
    name: "CEMEI Pequenos Sonhos",
    type: "Centro Municipal",
    director: "Patricia Costa",
    address: "Av. Bonfim, 890 - Vila Bonfim",
    phone: "(16) 3333-7777",
    cellphone: "(16) 99999-7777",
    whatsapp: "(16) 99999-7777",
    emails: [
      { type: "principal", email: "pequenossonhos@educ.araraquara.sp.gov.br" },
      { type: "diretor", email: "patricia.costa@educ.araraquara.sp.gov.br" }
    ],
    students: 380,
    classes: 16,
    teachers: 24,
    description: "Centro municipal de educação infantil e ensino fundamental.",
    users: [
      { id: 6, name: "Patricia Costa", email: "patricia.costa@educ.araraquara.sp.gov.br", role: "admin" }
    ]
  },
  {
    id: 4,
    name: "EMEF Dom Pedro II",
    type: "Ensino Fundamental",
    director: "Roberto Almeida",
    address: "Rua Voluntários da Pátria, 1150 - Centro",
    phone: "(16) 3333-8888",
    cellphone: "(16) 99999-8888",
    whatsapp: "(16) 99999-8888",
    emails: [
      { type: "principal", email: "dompedro@educ.araraquara.sp.gov.br" },
      { type: "diretor", email: "roberto.almeida@educ.araraquara.sp.gov.br" }
    ],
    students: 680,
    classes: 22,
    teachers: 40,
    description: "Tradicional escola municipal com mais de 50 anos de história na educação araraquarense.",
    users: [
      { id: 7, name: "Roberto Almeida", email: "roberto.almeida@educ.araraquara.sp.gov.br", role: "admin" },
      { id: 8, name: "Sandra Lima", email: "sandra.lima@educ.araraquara.sp.gov.br", role: "editor" }
    ]
  },
  {
    id: 5,
    name: "EMEI Mundo Colorido",
    type: "Educação Infantil",
    director: "Fernanda Silva",
    address: "Rua 7 de Setembro, 320 - Vila Xavier",
    phone: "(16) 3333-9999",
    cellphone: "(16) 99999-9999",
    whatsapp: "(16) 99999-9999",
    emails: [
      { type: "principal", email: "mundocolorido@educ.araraquara.sp.gov.br" },
      { type: "diretor", email: "fernanda.silva@educ.araraquara.sp.gov.br" }
    ],
    students: 180,
    classes: 9,
    teachers: 14,
    description: "Educação infantil com metodologia lúdica e desenvolvimento da criatividade.",
    users: [
      { id: 9, name: "Fernanda Silva", email: "fernanda.silva@educ.araraquara.sp.gov.br", role: "admin" }
    ]
  },
  {
    id: 6,
    name: "EMEF Nelson Mandela",
    type: "Ensino Fundamental",
    director: "Antonio Santos",
    address: "Rua da Paz, 780 - Jardim Paulistano",
    phone: "(16) 3333-1010",
    cellphone: "(16) 99999-1010",
    whatsapp: "(16) 99999-1010",
    emails: [
      { type: "principal", email: "nelsonmandela@educ.araraquara.sp.gov.br" },
      { type: "diretor", email: "antonio.santos@educ.araraquara.sp.gov.br" }
    ],
    students: 450,
    classes: 18,
    teachers: 28,
    description: "Escola com foco na educação cidadã e direitos humanos.",
    users: [
      { id: 10, name: "Antonio Santos", email: "antonio.santos@educ.araraquara.sp.gov.br", role: "admin" }
    ]
  },
  {
    id: 7,
    name: "CEMEI Futuro Brilhante",
    type: "Centro Municipal",
    director: "Claudia Rocha",
    address: "Av. Marginal, 1500 - Jardim Brasília",
    phone: "(16) 3333-1111",
    cellphone: "(16) 99999-1111",
    whatsapp: "(16) 99999-1111",
    emails: [
      { type: "principal", email: "futurobrilhante@educ.araraquara.sp.gov.br" },
      { type: "diretor", email: "claudia.rocha@educ.araraquara.sp.gov.br" }
    ],
    students: 320,
    classes: 14,
    teachers: 22,
    description: "Centro de educação com metodologia inovadora e tecnologia educacional.",
    users: [
      { id: 11, name: "Claudia Rocha", email: "claudia.rocha@educ.araraquara.sp.gov.br", role: "admin" }
    ]
  },
  {
    id: 8,
    name: "EMEF Monteiro Lobato",
    type: "Ensino Fundamental",
    director: "Paulo Henrique",
    address: "Rua do Saber, 650 - Vila Industrial",
    phone: "(16) 3333-1212",
    cellphone: "(16) 99999-1212",
    whatsapp: "(16) 99999-1212",
    emails: [
      { type: "principal", email: "monteirolobato@educ.araraquara.sp.gov.br" },
      { type: "diretor", email: "paulo.henrique@educ.araraquara.sp.gov.br" }
    ],
    students: 590,
    classes: 20,
    teachers: 35,
    description: "Escola com tradição na literatura e desenvolvimento da leitura.",
    users: [
      { id: 12, name: "Paulo Henrique", email: "paulo.henrique@educ.araraquara.sp.gov.br", role: "admin" }
    ]
  },
  {
    id: 9,
    name: "EMEI Arco-íris",
    type: "Educação Infantil",
    director: "Luciana Pereira",
    address: "Rua das Crianças, 250 - Jardim Europa",
    phone: "(16) 3333-1313",
    cellphone: "(16) 99999-1313",
    whatsapp: "(16) 99999-1313",
    emails: [
      { type: "principal", email: "arcoiris@educ.araraquara.sp.gov.br" },
      { type: "diretor", email: "luciana.pereira@educ.araraquara.sp.gov.br" }
    ],
    students: 200,
    classes: 10,
    teachers: 16,
    description: "Educação infantil com foco no desenvolvimento socioemocional.",
    users: [
      { id: 13, name: "Luciana Pereira", email: "luciana.pereira@educ.araraquara.sp.gov.br", role: "admin" }
    ]
  },
  {
    id: 10,
    name: "EMEF Professora Maria Helena",
    type: "Ensino Fundamental",
    director: "José Carlos",
    address: "Av. dos Estudantes, 1800 - Jardim das Flores",
    phone: "(16) 3333-1414",
    cellphone: "(16) 99999-1414",
    whatsapp: "(16) 99999-1414",
    emails: [
      { type: "principal", email: "mariahelena@educ.araraquara.sp.gov.br" },
      { type: "diretor", email: "jose.carlos@educ.araraquara.sp.gov.br" }
    ],
    students: 480,
    classes: 19,
    teachers: 30,
    description: "Escola com excelência em educação fundamental e projetos pedagógicos inovadores.",
    users: [
      { id: 14, name: "José Carlos", email: "jose.carlos@educ.araraquara.sp.gov.br", role: "admin" }
    ]
  }
];

export const mockPages = [
  {
    id: 1,
    title: "Sobre a Secretaria",
    slug: "sobre-secretaria",
    content: "A Secretaria Municipal de Educação de Araraquara tem como missão...",
    status: "published",
    featured: false,
    image: "/placeholder.svg",
    category: "Institucional",
    author: "Administrador",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-15",
    metaDescription: "Conheça a Secretaria Municipal de Educação de Araraquara",
    tags: ["educação", "araraquara", "institucional"]
  },
  {
    id: 2,
    title: "Programas Educacionais",
    slug: "programas-educacionais",
    content: "Conheça os principais programas educacionais oferecidos pela rede municipal...",
    status: "published",
    featured: true,
    image: "/placeholder.svg",
    category: "Educação",
    author: "Administrador",
    createdAt: "2025-01-10",
    updatedAt: "2025-01-20",
    metaDescription: "Programas educacionais da rede municipal de Araraquara",
    tags: ["programas", "educação", "ensino"]
  }
];

export const initialNews = [
  {
    id: 1,
    title: "Início do Ano Letivo 2025",
    description: "As aulas da rede municipal iniciam no dia 10 de fevereiro com novidades no currículo.",
    image: "/placeholder.svg",
    date: "2025-01-15",
    category: "Educação",
    content: "O ano letivo de 2025 da rede municipal de ensino de Araraquara...",
    status: "published",
    featured: true
  },
  {
    id: 2,
    title: "Matrículas Abertas para 2025",
    description: "Período de matrículas para novos alunos vai até 31 de janeiro.",
    image: "/placeholder.svg",
    date: "2025-01-10",
    category: "Matrículas",
    content: "Estão abertas as matrículas para novos alunos...",
    status: "published",
    featured: false
  },
  {
    id: 3,
    title: "Reforma das Escolas Municipais",
    description: "Investimentos em infraestrutura beneficiam 15 unidades escolares.",
    image: "/placeholder.svg",
    date: "2025-01-08",
    category: "Infraestrutura",
    content: "A Prefeitura de Araraquara está investindo na reforma...",
    status: "published",
    featured: true
  }
];

export const initialSections = [
  { id: 1, name: "Banner Principal", order: 1, active: true },
  { id: 2, name: "Destaques", order: 2, active: true },
  { id: 3, name: "Escolas", order: 3, active: true },
  { id: 4, name: "Notícias", order: 4, active: true },
  { id: 5, name: "Contato", order: 5, active: true },
  { id: 6, name: "Aplicativo", order: 6, active: false }
];

export const mockImages = [
  {
    id: 1,
    title: "Banner Principal",
    url: "/placeholder.svg",
    uploadedAt: "2025-01-01",
    size: "1.2 MB",
    type: "image/jpeg"
  },
  {
    id: 2,
    title: "Logo Secretaria",
    url: "/placeholder.svg",
    uploadedAt: "2025-01-02",
    size: "256 KB",
    type: "image/png"
  },
  {
    id: 3,
    title: "Escola EMEF Scabello",
    url: "/placeholder.svg",
    uploadedAt: "2025-01-03",
    size: "800 KB",
    type: "image/jpeg"
  },
  {
    id: 4,
    title: "Evento Formatura",
    url: "/placeholder.svg",
    uploadedAt: "2025-01-04",
    size: "1.5 MB",
    type: "image/jpeg"
  },
  {
    id: 5,
    title: "Reunião Pedagógica",
    url: "/placeholder.svg",
    uploadedAt: "2025-01-05",
    size: "950 KB",
    type: "image/jpeg"
  },
  {
    id: 6,
    title: "Atividade Recreativa",
    url: "/placeholder.svg",
    uploadedAt: "2025-01-06",
    size: "1.1 MB",
    type: "image/jpeg"
  }
];

export const initialMenuItems = [
  { id: 1, title: "Início", url: "/", order: 1, active: true, parent: null },
  { id: 2, title: "Institucional", url: "/institucional", order: 2, active: true, parent: null },
  { id: 3, title: "Escolas", url: "/escolas", order: 3, active: true, parent: null },
  { id: 4, title: "Notícias", url: "/noticias", order: 4, active: true, parent: null },
  { id: 5, title: "Projetos", url: "/projetos", order: 5, active: true, parent: null },
  { id: 6, title: "Contato", url: "/contato", order: 6, active: true, parent: null }
];

export const mockSocialNetworks = [
  {
    id: 1,
    name: "Facebook",
    platform: "facebook",
    connected: true,
    followers: 15420,
    posts: 245,
    engagement: 8.5,
    lastPost: "2025-01-20"
  },
  {
    id: 2,
    name: "Instagram",
    platform: "instagram",
    connected: true,
    followers: 12800,
    posts: 180,
    engagement: 12.3,
    lastPost: "2025-01-19"
  },
  {
    id: 3,
    name: "WhatsApp Business",
    platform: "whatsapp",
    connected: false,
    followers: 0,
    posts: 0,
    engagement: 0,
    lastPost: null
  }
];

export const mockAIChats = [
  {
    id: 1,
    title: "Dúvidas sobre Matrícula",
    messages: 245,
    resolved: 230,
    pending: 15,
    satisfaction: 95
  },
  {
    id: 2,
    title: "Informações Escolares",
    messages: 180,
    resolved: 175,
    pending: 5,
    satisfaction: 92
  }
];

export const mockTickets = [
  {
    id: 1,
    title: "Problema com matrícula online",
    priority: "high",
    status: "open",
    created: "2025-01-20",
    user: "Maria Silva"
  },
  {
    id: 2,
    title: "Dúvida sobre calendário escolar",
    priority: "medium",
    status: "in_progress",
    created: "2025-01-19",
    user: "João Santos"
  }
];

export const secretaryAgenda = [
  {
    id: 1,
    title: "Reunião com Diretores",
    date: "2025-02-01",
    time: "09:00",
    location: "Secretaria de Educação",
    description: "Reunião mensal com todos os diretores da rede municipal"
  },
  {
    id: 2,
    title: "Visita à EMEF Scabello",
    date: "2025-02-03",
    time: "14:00",
    location: "EMEF Prof. Henrique Scabello",
    description: "Visita técnica para acompanhamento pedagógico"
  },
  {
    id: 3,
    title: "Conselho Municipal de Educação",
    date: "2025-02-05",
    time: "19:00",
    location: "Câmara Municipal",
    description: "Reunião ordinária do Conselho Municipal de Educação"
  }
];

export const mockCouncils = [
  {
    id: "fundeb-cacs",
    name: "FUNDEB-CACS",
    description: "Conselho de Acompanhamento e Controle Social do FUNDEB",
    type: "fundeb",
    sections: {
      apresentacao: "O Conselho de Acompanhamento e Controle Social do FUNDEB...",
      atas: [
        { year: 2024, files: ["ata-janeiro-2024.pdf", "ata-fevereiro-2024.pdf"] },
        { year: 2023, files: ["ata-dezembro-2023.pdf"] }
      ],
      convocacoes: {
        ordinarias: [
          { year: 2024, files: ["convocacao-01-2024.pdf"] }
        ],
        extraordinarias: [
          { year: 2024, files: ["convocacao-extra-01-2024.pdf"] }
        ]
      },
      editais: ["edital-composicao-2024.pdf"],
      atribuicoes: "As atribuições do conselho incluem...",
      composicao: [
        { year: 2024, members: ["João Silva", "Maria Santos", "Pedro Oliveira"] }
      ],
      contatos: {
        endereco: "Rua da Educação, 123",
        email: "fundeb@araraquara.sp.gov.br",
        telefone: "(16) 3333-0000",
        presidente: "João Silva"
      },
      legislacao: ["lei-fundeb-2020.pdf", "resolucao-001-2024.pdf"],
      parecerConclusivo: [
        { year: 2024, files: ["parecer-conclusivo-2024.pdf"] }
      ],
      parecerConselho: [
        { year: 2024, files: ["parecer-conselho-2024.pdf"] }
      ],
      receitas: [
        { year: 2024, month: "janeiro", value: 1500000 },
        { year: 2024, month: "fevereiro", value: 1600000 }
      ],
      regimentoInterno: "O regimento interno do conselho estabelece...",
      relatorioVisitas: [
        { year: 2024, school: "EMEF Scabello", file: "relatorio-scabello-2024.pdf" }
      ],
      relatorioAtividades: "Relatório das atividades desenvolvidas no ano...",
      representante: "Representante do ente federado...",
      sessaoInstalacao: [
        { year: 2024, session: "1ª Sessão", file: "instalacao-2024.pdf" }
      ]
    }
  }
];
