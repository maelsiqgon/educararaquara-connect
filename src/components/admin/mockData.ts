
// Mock data para o painel administrativo

// Imagens para a biblioteca de mídias
export const mockImages = [
  {
    id: 1,
    url: 'https://www.araraquara.sp.gov.br/imagens/escola.JPG/@@images/image',
    title: 'Escola Municipal',
    uploadedAt: '22/05/2025'
  },
  {
    id: 2,
    url: 'https://www.araraquara.sp.gov.br/imagens/aula-de-informatica-lab-2.jpeg/@@images/image',
    title: 'Laboratório de Informática',
    uploadedAt: '20/05/2025'
  },
  {
    id: 3,
    url: 'https://www.araraquara.sp.gov.br/imagens/cultura-escola.jpeg/@@images/image',
    title: 'Atividade Cultural',
    uploadedAt: '18/05/2025'
  },
  {
    id: 4,
    url: 'https://www.araraquara.sp.gov.br/imagens/WhatsApp-Image-2023-05-04-at-17.52.05.jpeg/@@images/image',
    title: 'Fachada da Secretaria',
    uploadedAt: '15/05/2025'
  },
  {
    id: 5,
    url: 'https://www.araraquara.sp.gov.br/imagens/ifood-banner.jpg/@@images/image',
    title: 'Banner Institucional',
    uploadedAt: '10/05/2025'
  },
  {
    id: 6,
    url: 'https://www.araraquara.sp.gov.br/imagens/sala-de-aula.jpg/@@images/image',
    title: 'Sala de Aula',
    uploadedAt: '05/05/2025'
  }
];

// Mock data para seções
export const initialSections = [
  { id: 1, name: "Banner Principal", active: true, order: 1 },
  { id: 2, name: "Recursos do Portal", active: true, order: 2 },
  { id: 3, name: "Perfis de Usuário", active: true, order: 3 },
  { id: 4, name: "Últimas Notícias", active: true, order: 4 },
  { id: 5, name: "Aplicativo Mobile", active: true, order: 5 },
  { id: 6, name: "Contato", active: true, order: 6 },
];

// Mock data para notícias
export const initialNews = [
  {
    id: 1, 
    title: "Matrícula online para o ano letivo 2026 já está disponível", 
    description: "Pais e responsáveis já podem realizar a matrícula dos estudantes para o próximo ano letivo através do portal EducAraraquara.",
    date: "18/05/2025", 
    category: "Matrículas",
    image: "https://www.araraquara.sp.gov.br/imagens/escola.JPG/@@images/image",
    featured: true
  },
  {
    id: 2, 
    title: "Escolas municipais recebem novos laboratórios de informática", 
    description: "A Secretaria de Educação entregou 15 novos laboratórios de informática em escolas da rede municipal, beneficiando mais de 8 mil alunos.",
    date: "12/05/2025", 
    category: "Infraestrutura",
    image: "https://www.araraquara.sp.gov.br/imagens/aula-de-informatica-lab-2.jpeg/@@images/image",
    featured: true
  },
  {
    id: 3, 
    title: "Mostra Cultural reunirá projetos de escolas municipais", 
    description: "Evento acontecerá no Centro Cultural e contará com apresentações de dança, música, teatro e exposições de trabalhos dos alunos.",
    date: "05/05/2025", 
    category: "Eventos",
    image: "https://www.araraquara.sp.gov.br/imagens/cultura-escola.jpeg/@@images/image",
    featured: true
  },
];

// Mock data para itens de menu
export const initialMenuItems = [
  { id: 1, name: "Início", url: "/", order: 1, visible: true },
  { id: 2, name: "Sobre", url: "/sobre", order: 2, visible: true },
  { id: 3, name: "Notícias", url: "/noticias", order: 3, visible: true },
  { id: 4, name: "Contato", url: "/contato", order: 4, visible: true }
];

// Mock data para funcionalidades por perfil
export const userProfiles = [
  {
    id: 1,
    name: "Secretaria Municipal",
    features: [
      "Cadastro e gestão de escolas",
      "Indicadores em tempo real",
      "Gestão de projetos",
      "Moderação de conteúdos",
      "Comunicação institucional",
      "Painel de redes sociais",
      "Sistema de chat com IA"
    ],
    icon: "building"
  },
  {
    id: 2,
    name: "Gestão Escolar",
    features: [
      "Painel da escola",
      "Cadastro de turmas e alunos",
      "Gestão de frequência",
      "Relatórios por turma",
      "Comunicação com responsáveis",
      "Mural digital da escola"
    ],
    icon: "school"
  },
  {
    id: 3,
    name: "Professores",
    features: [
      "Dashboard com turmas",
      "Publicação de conteúdos",
      "Agendamento de atividades",
      "Diário digital",
      "Comunicação via Teams",
      "Chat interno"
    ],
    icon: "user-check"
  },
  {
    id: 4,
    name: "Alunos",
    features: [
      "Visualização de conteúdos",
      "Submissão de atividades",
      "Calendário e notificações",
      "Painel de desempenho",
      "Gamificação",
      "Chat com professores e IA"
    ],
    icon: "user"
  },
  {
    id: 5,
    name: "Responsáveis",
    features: [
      "Acesso ao desempenho",
      "Autorizações digitais",
      "Comunicação com a escola",
      "Visualização de comunicados"
    ],
    icon: "users"
  }
];
