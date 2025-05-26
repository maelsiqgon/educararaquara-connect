
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

// Mock data para notícias expandido
export const initialNews = [
  {
    id: 1, 
    title: "Matrícula online para o ano letivo 2026 já está disponível", 
    description: "Pais e responsáveis já podem realizar a matrícula dos estudantes para o próximo ano letivo através do portal EducAraraquara.",
    content: "O período de matrículas para o ano letivo de 2026 já está aberto. Pais e responsáveis podem acessar o sistema online através do portal EducAraraquara e realizar o processo de forma simples e rápida. As vagas são limitadas e serão preenchidas por ordem de inscrição.",
    date: "18/05/2025", 
    category: "Matrículas",
    image: "https://www.araraquara.sp.gov.br/imagens/escola.JPG/@@images/image",
    featured: true,
    author: "Secretaria de Educação",
    tags: ["matrícula", "2026", "online"]
  },
  {
    id: 2, 
    title: "Escolas municipais recebem novos laboratórios de informática", 
    description: "A Secretaria de Educação entregou 15 novos laboratórios de informática em escolas da rede municipal, beneficiando mais de 8 mil alunos.",
    content: "Investimento de R$ 2,5 milhões em tecnologia educacional beneficia 15 escolas da rede municipal. Os novos laboratórios contam com computadores modernos, internet de alta velocidade e softwares educacionais atualizados.",
    date: "12/05/2025", 
    category: "Infraestrutura",
    image: "https://www.araraquara.sp.gov.br/imagens/aula-de-informatica-lab-2.jpeg/@@images/image",
    featured: true,
    author: "Secretaria de Educação",
    tags: ["tecnologia", "laboratório", "informática"]
  },
  {
    id: 3, 
    title: "Mostra Cultural reunirá projetos de escolas municipais", 
    description: "Evento acontecerá no Centro Cultural e contará com apresentações de dança, música, teatro e exposições de trabalhos dos alunos.",
    content: "A tradicional Mostra Cultural das escolas municipais acontecerá nos dias 15 e 16 de junho no Centro Cultural de Araraquara. O evento reunirá mais de 3 mil estudantes em apresentações artísticas e exposições de projetos pedagógicos.",
    date: "05/05/2025", 
    category: "Eventos",
    image: "https://www.araraquara.sp.gov.br/imagens/cultura-escola.jpeg/@@images/image",
    featured: true,
    author: "Coordenação Cultural",
    tags: ["cultura", "arte", "apresentação"]
  },
  {
    id: 4,
    title: "Programa de Alimentação Escolar recebe selo de qualidade",
    description: "Araraquara é reconhecida pelo Ministério da Educação pela excelência na alimentação escolar oferecida aos estudantes.",
    content: "O programa de alimentação escolar de Araraquara recebeu o Selo de Qualidade do MEC, reconhecendo a excelência na oferta de refeições nutritivas e balanceadas para mais de 25 mil estudantes da rede municipal.",
    date: "28/04/2025",
    category: "Alimentação",
    image: "https://www.araraquara.sp.gov.br/imagens/escola.JPG/@@images/image",
    featured: false,
    author: "Coordenação de Alimentação",
    tags: ["alimentação", "qualidade", "reconhecimento"]
  },
  {
    id: 5,
    title: "Capacitação em educação inclusiva forma 200 professores",
    description: "Curso de 40 horas aborda estratégias pedagógicas para atendimento de estudantes com necessidades especiais.",
    content: "A Secretaria de Educação promoveu capacitação especializada em educação inclusiva para 200 professores da rede municipal. O curso abordou metodologias adaptadas, uso de tecnologias assistivas e estratégias de inclusão em sala de aula.",
    date: "22/04/2025",
    category: "Capacitação",
    image: "https://www.araraquara.sp.gov.br/imagens/aula-de-informatica-lab-2.jpeg/@@images/image",
    featured: false,
    author: "Coordenação Pedagógica",
    tags: ["inclusão", "capacitação", "professores"]
  }
];

// Mock data para itens de menu expandido
export const initialMenuItems = [
  { id: 1, name: "Início", url: "/", order: 1, visible: true, hasSubmenu: false, submenu: [] },
  { 
    id: 2, 
    name: "Institucional", 
    url: "/institucional", 
    order: 2, 
    visible: true, 
    hasSubmenu: true,
    submenu: [
      { id: 21, name: "História", url: "/institucional/historia" },
      { id: 22, name: "Missão e Visão", url: "/institucional/missao" },
      { id: 23, name: "Organograma", url: "/institucional/organograma" },
      { id: 24, name: "Legislação", url: "/institucional/legislacao" }
    ]
  },
  { id: 3, name: "Escolas", url: "/escolas", order: 3, visible: true, hasSubmenu: false, submenu: [] },
  { id: 4, name: "Projetos", url: "/projetos", order: 4, visible: true, hasSubmenu: false, submenu: [] },
  { id: 5, name: "Notícias", url: "/noticias", order: 5, visible: true, hasSubmenu: false, submenu: [] },
  { id: 6, name: "Contato", url: "/contato", order: 6, visible: true, hasSubmenu: false, submenu: [] }
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

// Mock data para 10 escolas completas
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
    established: "1985",
    description: "Escola tradicional no centro da cidade, referência em ensino fundamental com foco em tecnologia educacional.",
    image: "https://www.araraquara.sp.gov.br/imagens/escola.JPG/@@images/image",
    features: ["Laboratório de Informática", "Quadra Poliesportiva", "Biblioteca", "Sala de Ciências"],
    users: [
      { id: 1, name: "Ana Silva", role: "admin", email: "ana.silva@escola.com" },
      { id: 2, name: "Carlos Santos", role: "editor", email: "carlos.santos@escola.com" }
    ]
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
    established: "1992",
    description: "Especializada em educação infantil, oferece ambiente acolhedor e pedagogia lúdica para crianças de 3 a 5 anos.",
    image: "https://www.araraquara.sp.gov.br/imagens/sala-de-aula.jpg/@@images/image",
    features: ["Parque Infantil", "Brinquedoteca", "Horta", "Sala Multimídia"],
    users: [
      { id: 3, name: "Carlos Santos", role: "admin", email: "carlos.santos@emei.com" },
      { id: 4, name: "Maria Oliveira", role: "editor", email: "maria.oliveira@emei.com" }
    ]
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
    established: "1978",
    description: "Escola com tradição em projetos de robótica e inovação tecnológica, formando cidadãos preparados para o futuro.",
    image: "https://www.araraquara.sp.gov.br/imagens/aula-de-informatica-lab-2.jpeg/@@images/image",
    features: ["Laboratório de Robótica", "Quadra Coberta", "Sala de Informática", "Biblioteca"],
    users: [
      { id: 5, name: "Márcia Oliveira", role: "admin", email: "marcia.oliveira@escola.com" },
      { id: 6, name: "João Silva", role: "editor", email: "joao.silva@escola.com" }
    ]
  },
  {
    id: 4,
    name: "EMEF Dr. Carlos Botelho",
    type: "Ensino Fundamental",
    address: "Rua São Bento, 1456 - Centro",
    director: "Prof. Roberto Lima",
    phone: "(16) 3333-4444",
    email: "carlosbotelho@educ.araraquara.sp.gov.br",
    students: 390,
    teachers: 24,
    classes: 14,
    established: "1980",
    description: "Escola com foco em arte e cultura, desenvolvendo projetos musicais e teatrais reconhecidos regionalmente.",
    image: "https://www.araraquara.sp.gov.br/imagens/cultura-escola.jpeg/@@images/image",
    features: ["Teatro", "Sala de Música", "Ateliê de Arte", "Quadra Poliesportiva"],
    users: [
      { id: 7, name: "Roberto Lima", role: "admin", email: "roberto.lima@escola.com" },
      { id: 8, name: "Lucia Ferreira", role: "editor", email: "lucia.ferreira@escola.com" }
    ]
  },
  {
    id: 5,
    name: "CEMEI Jardim das Flores",
    type: "Centro Municipal",
    address: "Av. Braz Miraglia, 890 - Jardim das Flores",
    director: "Profa. Sandra Costa",
    phone: "(16) 3333-6666",
    email: "jardimflores@educ.araraquara.sp.gov.br",
    students: 320,
    teachers: 22,
    classes: 12,
    established: "1995",
    description: "Centro municipal que atende desde berçário até pré-escola, com metodologia baseada na pedagogia Waldorf.",
    image: "https://www.araraquara.sp.gov.br/imagens/escola.JPG/@@images/image",
    features: ["Berçário", "Lactário", "Parque Grande", "Horta Pedagógica"],
    users: [
      { id: 9, name: "Sandra Costa", role: "admin", email: "sandra.costa@cemei.com" },
      { id: 10, name: "Patricia Mendes", role: "editor", email: "patricia.mendes@cemei.com" }
    ]
  },
  {
    id: 6,
    name: "EMEF Vila Harmonia",
    type: "Ensino Fundamental",
    address: "Rua das Acácias, 567 - Vila Harmonia",
    director: "Prof. Fernando Aguiar",
    phone: "(16) 3333-8888",
    email: "vilaharmonia@educ.araraquara.sp.gov.br",
    students: 420,
    teachers: 26,
    classes: 15,
    established: "1988",
    description: "Escola comunitária com forte participação das famílias, desenvolvendo projetos de sustentabilidade e meio ambiente.",
    image: "https://www.araraquara.sp.gov.br/imagens/sala-de-aula.jpg/@@images/image",
    features: ["Laboratório de Ciências", "Horta Comunitária", "Sala de Leitura", "Quadra"],
    users: [
      { id: 11, name: "Fernando Aguiar", role: "admin", email: "fernando.aguiar@escola.com" },
      { id: 12, name: "Carla Rodrigues", role: "editor", email: "carla.rodrigues@escola.com" }
    ]
  },
  {
    id: 7,
    name: "EMEI Pequenos Exploradores",
    type: "Educação Infantil",
    address: "Rua Dom Pedro II, 234 - Centro",
    director: "Profa. Helena Machado",
    phone: "(16) 3333-9999",
    email: "pequenosexploradores@educ.araraquara.sp.gov.br",
    students: 180,
    teachers: 12,
    classes: 6,
    established: "1998",
    description: "EMEI com proposta pedagógica baseada na exploração e descoberta, estimulando a curiosidade natural das crianças.",
    image: "https://www.araraquara.sp.gov.br/imagens/cultura-escola.jpeg/@@images/image",
    features: ["Laboratório Sensorial", "Espaço Maker Infantil", "Biblioteca Infantil", "Parque Temático"],
    users: [
      { id: 13, name: "Helena Machado", role: "admin", email: "helena.machado@emei.com" },
      { id: 14, name: "Ricardo Alves", role: "editor", email: "ricardo.alves@emei.com" }
    ]
  },
  {
    id: 8,
    name: "EMEF São Francisco",
    type: "Ensino Fundamental",
    address: "Av. São Francisco, 1678 - São Francisco",
    director: "Prof. Alexandre Moreira",
    phone: "(16) 3333-1111",
    email: "saofrancisco@educ.araraquara.sp.gov.br",
    students: 450,
    teachers: 29,
    classes: 16,
    established: "1982",
    description: "Escola que prima pela excelência acadêmica e formação cidadã, com projetos de responsabilidade social.",
    image: "https://www.araraquara.sp.gov.br/imagens/aula-de-informatica-lab-2.jpeg/@@images/image",
    features: ["Laboratório Multidisciplinar", "Auditório", "Biblioteca Moderna", "Espaço Maker"],
    users: [
      { id: 15, name: "Alexandre Moreira", role: "admin", email: "alexandre.moreira@escola.com" },
      { id: 16, name: "Beatriz Silva", role: "editor", email: "beatriz.silva@escola.com" }
    ]
  },
  {
    id: 9,
    name: "CEMEI Arco-Íris",
    type: "Centro Municipal",
    address: "Rua das Palmeiras, 445 - Jardim Primavera",
    director: "Profa. Cristina Barbosa",
    phone: "(16) 3333-3333",
    email: "arcoiris@educ.araraquara.sp.gov.br",
    students: 280,
    teachers: 18,
    classes: 10,
    established: "2001",
    description: "Centro municipal inclusivo que atende crianças com e sem deficiência, promovendo a diversidade e inclusão.",
    image: "https://www.araraquara.sp.gov.br/imagens/escola.JPG/@@images/image",
    features: ["Sala de Recursos Multifuncionais", "Piscina Terapêutica", "Quadra Adaptada", "Jardim Sensorial"],
    users: [
      { id: 17, name: "Cristina Barbosa", role: "admin", email: "cristina.barbosa@cemei.com" },
      { id: 18, name: "Marcos Santos", role: "editor", email: "marcos.santos@cemei.com" }
    ]
  },
  {
    id: 10,
    name: "EMEF Monteiro Lobato",
    type: "Ensino Fundamental",
    address: "Rua Monteiro Lobato, 789 - Vila Lobato",
    director: "Profa. Daniela Campos",
    phone: "(16) 3333-5000",
    email: "monteirolobato@educ.araraquara.sp.gov.br",
    students: 380,
    teachers: 25,
    classes: 14,
    established: "1976",
    description: "Escola com tradição literária que incentiva a leitura e escrita criativa através de projetos inovadores.",
    image: "https://www.araraquara.sp.gov.br/imagens/sala-de-aula.jpg/@@images/image",
    features: ["Biblioteca Temática", "Oficina de Escrita", "Teatro de Fantoches", "Laboratório de Línguas"],
    users: [
      { id: 19, name: "Daniela Campos", role: "admin", email: "daniela.campos@escola.com" },
      { id: 20, name: "Pedro Oliveira", role: "editor", email: "pedro.oliveira@escola.com" }
    ]
  }
];

// Eventos por escola
export const mockSchoolEvents = {
  1: [
    { id: 1, title: "Festa Junina da Scabello", date: "15/06/2025", time: "18:00", location: "Quadra da Escola" },
    { id: 2, title: "Reunião de Pais 1º Bimestre", date: "28/05/2025", time: "19:00", location: "Salas de Aula" },
    { id: 3, title: "Mostra de Ciências", date: "20/08/2025", time: "14:00", location: "Laboratório" }
  ],
  2: [
    { id: 4, title: "Dia das Mães EMEI", date: "10/05/2025", time: "15:00", location: "Pátio Central" },
    { id: 5, title: "Apresentação Musical", date: "25/06/2025", time: "16:00", location: "Sala Multimídia" }
  ],
  3: [
    { id: 6, title: "Competição de Robótica", date: "30/07/2025", time: "08:00", location: "Lab. Robótica" },
    { id: 7, title: "Fair de Tecnologia", date: "15/09/2025", time: "14:00", location: "Pátio" }
  ]
};

// Notícias por escola
export const mockSchoolNews = {
  1: [
    {
      id: 1,
      title: "Nova quadra poliesportiva inaugurada na Scabello",
      content: "A EMEF Prof. Henrique Scabello inaugurou sua nova quadra poliesportiva, beneficiando mais de 500 alunos.",
      date: "20/05/2025",
      author: "Direção da Escola"
    }
  ],
  2: [
    {
      id: 2,
      title: "EMEI Maria Luísa implementa novo projeto de jardinagem",
      content: "Crianças da educação infantil participam de projeto pedagógico com horta escolar.",
      date: "18/05/2025",
      author: "Coordenação Pedagógica"
    }
  ]
};

// Mock data para alunos expandido
export const mockStudents = [
  {
    id: 1,
    name: "Miguel Santos",
    age: 10,
    grade: "5º ano",
    class: "B",
    school: "EMEF Prof. Henrique Scabello",
    schoolId: 1,
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
    schoolId: 1,
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
    schoolId: 3,
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
    schoolId: 2,
    parent: "Juliana Mendes",
    parentContact: "(16) 99999-5555",
    attendance: 92,
    performance: "Ótimo"
  }
];

// Mock data para professores expandido
export const mockTeachers = [
  {
    id: 1,
    name: "Maria Helena Ferreira",
    education: "Pedagogia",
    specialization: "Alfabetização",
    school: "EMEF Prof. Henrique Scabello",
    schoolId: 1,
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
    schoolId: 3,
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
    schoolId: 2,
    classes: ["Infantil II A"],
    subjects: ["Desenvolvimento Infantil"],
    contact: "carolina@educ.araraquara.sp.gov.br"
  }
];

// Mock data para responsáveis expandido
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

// Mock data para projetos expandido
export const mockProjects = [
  {
    id: 1,
    name: "Oficina de Robótica",
    school: "EMEF Prof. Henrique Scabello",
    schoolId: 1,
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
    schoolId: 3,
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
    schoolId: 2,
    type: "Oficina Cultural",
    description: "Iniciação musical através do canto coral para crianças",
    schedule: "Sexta, 9h às 10h30",
    vacancies: 25,
    enrolled: 22,
    teacher: "Prof. Ricardo Almeida",
    status: "Ativo"
  }
];

// Mock data para integrações de redes sociais expandido
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

// Mock data para conversas de IA expandido
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

// Mock data para tickets/chamados expandido
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

// Mock data para páginas do sistema
export const mockPages = [
  {
    id: 1,
    title: "Sobre a Secretaria",
    slug: "sobre-secretaria",
    content: "A Secretaria Municipal de Educação de Araraquara tem como missão garantir educação de qualidade para todos os cidadãos...",
    status: 'published',
    featured: true,
    image: "https://www.araraquara.sp.gov.br/imagens/WhatsApp-Image-2023-05-04-at-17.52.05.jpeg/@@images/image",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-15"
  },
  {
    id: 2,
    title: "História da Educação",
    slug: "historia-educacao",
    content: "A história da educação em Araraquara remonta ao século XIX...",
    status: 'published',
    featured: false,
    createdAt: "2025-01-10",
    updatedAt: "2025-01-20"
  },
  {
    id: 3,
    title: "Missão e Visão",
    slug: "missao-visao",
    content: "Nossa missão é promover uma educação inclusiva, inovadora e de qualidade...",
    status: 'published',
    featured: false,
    createdAt: "2025-01-15",
    updatedAt: "2025-01-22"
  }
];

// Configurações para servidor Ubuntu 24.04
export const serverConfig = {
  requirements: {
    node: ">=18.0.0",
    npm: ">=8.0.0",
    pm2: "latest"
  },
  environment: {
    NODE_ENV: "production",
    PORT: "3000"
  },
  scripts: {
    build: "npm run build",
    preview: "npm run preview",
    start: "pm2 start ecosystem.config.js"
  }
};
