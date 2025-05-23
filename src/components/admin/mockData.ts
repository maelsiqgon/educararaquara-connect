
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

// Mock data para escolas
export const mockSchools = [
  {
    id: 1,
    name: "EMEF Prof. Henrique Scabello",
    type: "Ensino Fundamental",
    address: "Rua Carlos Gomes, 1220 - Centro",
    director: "Profa. Ana Silva",
    phone: "(16) 3333-5555",
    email: "escabello@educ.araraquara.sp.gov.br",
    students: 520,
    teachers: 32,
    classes: 18,
    image: "https://www.araraquara.sp.gov.br/imagens/escola.JPG/@@images/image",
    features: ["Laboratório de Informática", "Quadra Poliesportiva", "Biblioteca", "Sala de Ciências"]
  },
  {
    id: 2,
    name: "EMEI Maria Luísa Malzoni",
    type: "Educação Infantil",
    address: "Av. José Bonifácio, 785 - Vila Xavier",
    director: "Prof. Carlos Santos",
    phone: "(16) 3333-2222",
    email: "marialuisa@educ.araraquara.sp.gov.br",
    students: 210,
    teachers: 15,
    classes: 8,
    image: "https://www.araraquara.sp.gov.br/imagens/sala-de-aula.jpg/@@images/image",
    features: ["Parque Infantil", "Brinquedoteca", "Horta", "Sala Multimídia"]
  },
  {
    id: 3,
    name: "EMEF Waldemar Saffiotti",
    type: "Ensino Fundamental",
    address: "Rua Padre Duarte, 2821 - Santana",
    director: "Profa. Márcia Oliveira",
    phone: "(16) 3333-7777",
    email: "saffiotti@educ.araraquara.sp.gov.br",
    students: 480,
    teachers: 28,
    classes: 16,
    image: "https://www.araraquara.sp.gov.br/imagens/aula-de-informatica-lab-2.jpeg/@@images/image",
    features: ["Laboratório de Robótica", "Quadra Coberta", "Sala de Informática", "Biblioteca"]
  }
];

// Mock data para alunos
export const mockStudents = [
  {
    id: 1,
    name: "Miguel Santos",
    age: 10,
    grade: "5º ano",
    class: "B",
    school: "EMEF Prof. Henrique Scabello",
    parent: "Roberto Santos",
    parentContact: "(16) 99999-8888",
    attendance: 95,
    performance: "Ótimo"
  },
  {
    id: 2,
    name: "Sofia Oliveira",
    age: 8,
    grade: "3º ano",
    class: "A",
    school: "EMEF Prof. Henrique Scabello",
    parent: "Luísa Oliveira",
    parentContact: "(16) 99999-7777",
    attendance: 98,
    performance: "Excelente"
  },
  {
    id: 3,
    name: "Pedro Souza",
    age: 11,
    grade: "6º ano",
    class: "C",
    school: "EMEF Waldemar Saffiotti",
    parent: "Marcos Souza",
    parentContact: "(16) 99999-6666",
    attendance: 90,
    performance: "Bom"
  },
  {
    id: 4,
    name: "Laura Mendes",
    age: 4,
    grade: "Infantil II",
    class: "A",
    school: "EMEI Maria Luísa Malzoni",
    parent: "Juliana Mendes",
    parentContact: "(16) 99999-5555",
    attendance: 92,
    performance: "Ótimo"
  }
];

// Mock data para professores
export const mockTeachers = [
  {
    id: 1,
    name: "Maria Helena Ferreira",
    education: "Pedagogia",
    specialization: "Alfabetização",
    school: "EMEF Prof. Henrique Scabello",
    classes: ["2º ano A", "2º ano B"],
    subjects: ["Português", "Matemática", "Ciências"],
    contact: "mariahelena@educ.araraquara.sp.gov.br"
  },
  {
    id: 2,
    name: "João Paulo Silva",
    education: "Matemática",
    specialization: "Educação Matemática",
    school: "EMEF Waldemar Saffiotti",
    classes: ["6º ano A", "6º ano B", "7º ano A"],
    subjects: ["Matemática"],
    contact: "joaopaulo@educ.araraquara.sp.gov.br"
  },
  {
    id: 3,
    name: "Carolina Martins",
    education: "Pedagogia",
    specialization: "Educação Infantil",
    school: "EMEI Maria Luísa Malzoni",
    classes: ["Infantil II A"],
    subjects: ["Desenvolvimento Infantil"],
    contact: "carolina@educ.araraquara.sp.gov.br"
  }
];

// Mock data para responsáveis (pais e outros)
export const mockParents = [
  {
    id: 1,
    name: "Roberto Santos",
    relation: "Pai",
    children: ["Miguel Santos"],
    contact: "(16) 99999-8888",
    email: "roberto.santos@email.com",
    address: "Rua das Palmeiras, 123"
  },
  {
    id: 2,
    name: "Luísa Oliveira",
    relation: "Mãe",
    children: ["Sofia Oliveira"],
    contact: "(16) 99999-7777",
    email: "luisa.oliveira@email.com",
    address: "Av. São Carlos, 456"
  },
  {
    id: 3,
    name: "Marcos Souza",
    relation: "Pai",
    children: ["Pedro Souza"],
    contact: "(16) 99999-6666",
    email: "marcos.souza@email.com",
    address: "Rua Dr. Carlos Botelho, 789"
  }
];

// Mock data para projetos de contraturno
export const mockProjects = [
  {
    id: 1,
    name: "Oficina de Robótica",
    school: "EMEF Prof. Henrique Scabello",
    type: "Contraturno",
    description: "Introdução à robótica com kits LEGO para alunos do 4º e 5º anos",
    schedule: "Segunda e Quarta, 14h às 16h",
    vacancies: 20,
    enrolled: 18,
    teacher: "Prof. Marcos Soares",
    status: "Ativo"
  },
  {
    id: 2,
    name: "Reforço de Matemática",
    school: "EMEF Waldemar Saffiotti",
    type: "Reforço",
    description: "Atividades de reforço para alunos com dificuldade em matemática",
    schedule: "Terça e Quinta, 13h30 às 15h",
    vacancies: 15,
    enrolled: 12,
    teacher: "Profa. Carla Mendonça",
    status: "Ativo"
  },
  {
    id: 3,
    name: "Coral Infantil",
    school: "EMEI Maria Luísa Malzoni",
    type: "Oficina Cultural",
    description: "Iniciação musical através do canto coral para crianças",
    schedule: "Sexta, 9h às 10h30",
    vacancies: 25,
    enrolled: 22,
    teacher: "Prof. Ricardo Almeida",
    status: "Ativo"
  }
];

// Mock data para integrações de redes sociais
export const mockSocialNetworks = [
  {
    id: 1,
    platform: "Facebook",
    name: "Secretaria de Educação de Araraquara",
    url: "https://facebook.com/educararaquara",
    followers: 12500,
    connected: true,
    lastPost: "22/05/2025",
    scheduledPosts: 3
  },
  {
    id: 2,
    platform: "Instagram",
    name: "@educ_araraquara",
    url: "https://instagram.com/educ_araraquara",
    followers: 8300,
    connected: true,
    lastPost: "21/05/2025",
    scheduledPosts: 5
  },
  {
    id: 3,
    platform: "YouTube",
    name: "Canal Educação Araraquara",
    url: "https://youtube.com/educacaoararaquara",
    followers: 3200,
    connected: true,
    lastPost: "15/05/2025",
    scheduledPosts: 0
  }
];

// Mock data para conversas de IA
export const mockAIChats = [
  {
    id: 1,
    user: "Maria Helena Ferreira",
    userType: "Professor",
    question: "Como configurar uma atividade de matemática na plataforma?",
    answer: "Para configurar uma atividade de matemática, acesse o menu 'Atividades' no seu perfil de professor, clique em 'Nova Atividade', selecione o tipo 'Matemática' e preencha os campos solicitados. Você pode adicionar arquivos, links e definir data de entrega. Precisa de mais detalhes?",
    date: "22/05/2025 14:35",
    resolved: true
  },
  {
    id: 2,
    user: "Roberto Santos",
    userType: "Responsável",
    question: "Não consigo acessar as notas do meu filho",
    answer: "Verificamos que seu acesso ao boletim está com problemas. Por favor, confirme se você está usando o e-mail registrado no cadastro. Se o problema persistir, vou transferir você para um atendente da secretaria.",
    date: "21/05/2025 09:22",
    resolved: false,
    transferredTo: "Suporte Técnico"
  },
  {
    id: 3,
    user: "Pedro Souza",
    userType: "Aluno",
    question: "Como faço para entregar o trabalho de ciências?",
    answer: "Para entregar seu trabalho de ciências, acesse a plataforma com seu login, vá até 'Minhas Atividades', encontre a tarefa 'Trabalho de Ciências' e clique em 'Enviar Resposta'. Você pode anexar arquivos clicando no botão de clipe. Lembre-se que o prazo é até amanhã, 24/05/2025.",
    date: "22/05/2025 16:40",
    resolved: true
  }
];

// Mock data para tickets/chamados
export const mockTickets = [
  {
    id: 1,
    title: "Problema no acesso ao boletim",
    requester: "Roberto Santos (Pai)",
    type: "Suporte Técnico",
    priority: "Médio",
    status: "Em análise",
    createdAt: "21/05/2025 09:25",
    lastUpdate: "22/05/2025 10:15",
    assignedTo: "Suporte Técnico",
    description: "Não consigo visualizar as notas do meu filho Miguel Santos no boletim online."
  },
  {
    id: 2,
    title: "Solicitação de material para laboratório de ciências",
    requester: "Maria Helena Ferreira (Professora)",
    type: "Requisição",
    priority: "Baixo",
    status: "Pendente",
    createdAt: "20/05/2025 14:30",
    lastUpdate: "20/05/2025 14:30",
    assignedTo: "Coordenação de Materiais",
    description: "Solicito a compra de microscópios para o laboratório de ciências da EMEF Prof. Henrique Scabello."
  },
  {
    id: 3,
    title: "Erro ao registrar frequência no sistema",
    requester: "João Paulo Silva (Professor)",
    type: "Suporte Técnico",
    priority: "Alto",
    status: "Resolvido",
    createdAt: "19/05/2025 08:45",
    lastUpdate: "19/05/2025 13:20",
    assignedTo: "Equipe de TI",
    description: "Não consigo registrar a frequência dos alunos do 6º ano B no sistema. Aparece mensagem de erro."
  }
];
