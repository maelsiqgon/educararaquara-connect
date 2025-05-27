
// Mock data for the admin system

export interface MenuItem {
  id: number;
  title: string;
  name: string;
  url: string;
  order: number;
  active: boolean;
  visible: boolean;
  parent: number | null;
}

export interface SocialNetwork {
  id: number;
  name: string;
  platform: string;
  connected: boolean;
  followers: number;
  posts: number;
  engagement: number;
  lastPost: string | null;
  url?: string;
  scheduledPosts?: number;
}

export interface AIChat {
  id: number;
  user: string;
  userType: string;
  question: string;
  answer?: string;
  date: string;
  resolved: boolean;
  transferredTo?: string;
}

export interface Ticket {
  id: number;
  title: string;
  requester: string;
  type: string;
  priority: string;
  status: string;
  createdAt: string;
  lastUpdate: string;
  assignedTo: string;
  description: string;
}

export interface School {
  id: number;
  name: string;
  type: string;
  director: string;
  address: string;
  phone: string;
  cellphone: string;
  whatsapp: string;
  emails: { type: string; email: string; }[];
  students: number;
  classes: number;
  teachers: number;
  description: string;
  image?: string;
  users: { id: number; name: string; email: string; role: string; }[];
}

export const mockSchools: School[] = [
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
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
    users: [
      { id: 4, name: "Marcia Oliveira", email: "marcia.oliveira@educ.araraquara.sp.gov.br", role: "admin" },
      { id: 5, name: "João Pedro", email: "joao.pedro@educ.araraquara.sp.gov.br", role: "editor" }
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
    featured: true,
    scheduledDate: null,
    author: "Admin"
  }
];

export const initialSections = [
  { id: 1, name: "Banner Principal", order: 1, active: true },
  { id: 2, name: "Destaques", order: 2, active: true },
  { id: 3, name: "Escolas", order: 3, active: true },
  { id: 4, name: "Notícias", order: 4, active: true },
  { id: 5, name: "Contato", order: 5, active: true }
];

export const initialMenuItems: MenuItem[] = [
  { id: 1, title: "Início", name: "Início", url: "/", order: 1, active: true, visible: true, parent: null },
  { id: 2, title: "Institucional", name: "Institucional", url: "/institucional", order: 2, active: true, visible: true, parent: null },
  { id: 3, title: "Escolas", name: "Escolas", url: "/escolas", order: 3, active: true, visible: true, parent: null },
  { id: 4, title: "Notícias", name: "Notícias", url: "/noticias", order: 4, active: true, visible: true, parent: null },
  { id: 5, title: "Projetos", name: "Projetos", url: "/projetos", order: 5, active: true, visible: true, parent: null },
  { id: 6, title: "Contato", name: "Contato", url: "/contato", order: 6, active: true, visible: true, parent: null }
];

export const mockSocialNetworks: SocialNetwork[] = [
  {
    id: 1,
    name: "Facebook",
    platform: "facebook",
    connected: true,
    followers: 15420,
    posts: 245,
    engagement: 8.5,
    lastPost: "2025-01-20",
    url: "https://facebook.com/secretariaeducacao",
    scheduledPosts: 5
  },
  {
    id: 2,
    name: "Instagram",
    platform: "instagram",
    connected: true,
    followers: 12800,
    posts: 180,
    engagement: 12.3,
    lastPost: "2025-01-19",
    url: "https://instagram.com/secretariaeducacao",
    scheduledPosts: 3
  }
];

export const mockAIChats: AIChat[] = [
  {
    id: 1,
    user: "Maria Silva",
    userType: "Responsável",
    question: "Como faço para matricular meu filho?",
    answer: "Para matricular seu filho, você deve acessar o portal de matrículas...",
    date: "2025-01-20 09:30",
    resolved: true
  },
  {
    id: 2,
    user: "João Santos",
    userType: "Professor",
    question: "Onde encontro o calendário escolar?",
    answer: "O calendário escolar está disponível na seção...",
    date: "2025-01-19 14:15",
    resolved: true
  }
];

export const mockTickets: Ticket[] = [
  {
    id: 1,
    title: "Problema com matrícula online",
    requester: "Maria Silva (Responsável)",
    type: "Atendimento",
    priority: "Alto",
    status: "Aberto",
    createdAt: "2025-01-20 09:00",
    lastUpdate: "2025-01-20 09:30",
    assignedTo: "Equipe de Suporte",
    description: "Usuário não consegue finalizar matrícula online"
  }
];

export const secretaryAgenda = [
  {
    id: 1,
    title: "Reunião com Diretores",
    date: "2025-02-01",
    time: "09:00",
    location: "Secretaria de Educação",
    description: "Reunião mensal com todos os diretores da rede municipal",
    type: "reuniao",
    status: "agendado"
  }
];

export const mockImages = [
  {
    id: 1,
    title: "Banner Principal",
    url: "/placeholder.svg",
    uploadedAt: "2025-01-01",
    size: "1.2 MB",
    type: "image/jpeg",
    category: "banners"
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
        { year: 2024, files: ["ata-janeiro-2024.pdf", "ata-fevereiro-2024.pdf"] }
      ],
      convocacoes: {
        ordinarias: [{ year: 2024, files: ["convocacao-01-2024.pdf"] }],
        extraordinarias: [{ year: 2024, files: ["convocacao-extra-01-2024.pdf"] }]
      },
      editais: ["edital-composicao-2024.pdf"],
      atribuicoes: "As atribuições do conselho incluem...",
      composicao: [{ year: 2024, members: ["João Silva", "Maria Santos"] }],
      contatos: {
        endereco: "Rua da Educação, 123",
        email: "fundeb@araraquara.sp.gov.br",
        telefone: "(16) 3333-0000",
        presidente: "João Silva"
      },
      legislacao: ["lei-fundeb-2020.pdf"],
      parecerConclusivo: [{ year: 2024, files: ["parecer-conclusivo-2024.pdf"] }],
      parecerConselho: [{ year: 2024, files: ["parecer-conselho-2024.pdf"] }],
      receitas: [{ year: 2024, month: "janeiro", value: 1500000 }],
      regimentoInterno: "O regimento interno do conselho estabelece...",
      relatorioVisitas: [{ year: 2024, school: "EMEF Scabello", file: "relatorio-scabello-2024.pdf" }],
      relatorioAtividades: "Relatório das atividades desenvolvidas no ano...",
      representante: "Representante do ente federado...",
      sessaoInstalacao: [{ year: 2024, session: "1ª Sessão", file: "instalacao-2024.pdf" }]
    }
  }
];
