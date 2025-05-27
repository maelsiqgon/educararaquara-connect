export const mockSchools = [
  {
    id: 1,
    name: "EMEF Prof. Henrique Scabello",
    type: "Ensino Fundamental",
    director: "Ana Silva Santos",
    address: "Rua Carlos Gomes, 1220 - Centro",
    phone: "(16) 3333-5555",
    email: "escabello@educ.araraquara.sp.gov.br",
    whatsapp: "(16) 99999-1001",
    students: "520",
    classes: "18",
    teachers: 32,
    users: [
      { id: 1, name: "Ana Silva Santos", email: "ana.santos@escola.gov.br", role: "admin" },
      { id: 2, name: "Carlos Eduardo Lima", email: "carlos.lima@escola.gov.br", role: "editor" },
      { id: 3, name: "Maria Fernanda Costa", email: "maria.costa@escola.gov.br", role: "viewer" }
    ]
  },
  {
    id: 2,
    name: "EMEI Jardim das Flores",
    type: "Educação Infantil",
    director: "Mariana Costa Lima",
    address: "Av. Bento de Abreu, 850 - Vila Xavier",
    phone: "(16) 3333-6666",
    email: "jardimflores@educ.araraquara.sp.gov.br",
    whatsapp: "(16) 99999-1002",
    students: "280",
    classes: "12",
    teachers: 18,
    users: [
      { id: 4, name: "Mariana Costa Lima", email: "mariana.lima@escola.gov.br", role: "admin" },
      { id: 5, name: "Roberto Silva Souza", email: "roberto.souza@escola.gov.br", role: "editor" }
    ]
  },
  {
    id: 3,
    name: "EMEF Profa. Adelaide de Oliveira",
    type: "Ensino Fundamental",
    director: "José Carlos Ferreira",
    address: "Rua Dom Pedro II, 445 - Centro",
    phone: "(16) 3333-7777",
    email: "adelaide@educ.araraquara.sp.gov.br",
    whatsapp: "(16) 99999-1003",
    students: "640",
    classes: "22",
    teachers: 38,
    users: [
      { id: 6, name: "José Carlos Ferreira", email: "jose.ferreira@escola.gov.br", role: "admin" },
      { id: 7, name: "Patricia Alves Santos", email: "patricia.santos@escola.gov.br", role: "editor" },
      { id: 8, name: "Fernando Lima Costa", email: "fernando.costa@escola.gov.br", role: "viewer" }
    ]
  },
  {
    id: 4,
    name: "CEMEI Vila Harmonia",
    type: "Centro Municipal",
    director: "Lucia Helena Oliveira",
    address: "Rua das Acácias, 123 - Vila Harmonia",
    phone: "(16) 3333-8888",
    email: "harmonia@educ.araraquara.sp.gov.br",
    whatsapp: "(16) 99999-1004",
    students: "350",
    classes: "15",
    teachers: 22,
    users: [
      { id: 9, name: "Lucia Helena Oliveira", email: "lucia.oliveira@escola.gov.br", role: "admin" },
      { id: 10, name: "Ricardo Pereira Silva", email: "ricardo.silva@escola.gov.br", role: "editor" }
    ]
  },
  {
    id: 5,
    name: "EMEF João Pessoa",
    type: "Ensino Fundamental",
    director: "Sandra Regina Machado",
    address: "Av. João Pessoa, 789 - Jardim Paulista",
    phone: "(16) 3333-9999",
    email: "joaopessoa@educ.araraquara.sp.gov.br",
    whatsapp: "(16) 99999-1005",
    students: "480",
    classes: "16",
    teachers: 28,
    users: [
      { id: 11, name: "Sandra Regina Machado", email: "sandra.machado@escola.gov.br", role: "admin" },
      { id: 12, name: "Eduardo Santos Lima", email: "eduardo.lima@escola.gov.br", role: "editor" }
    ]
  },
  {
    id: 6,
    name: "EMEI Pequenos Sonhadores",
    type: "Educação Infantil",
    director: "Carmen Lucia Santos",
    address: "Rua das Palmeiras, 234 - Jardim América",
    phone: "(16) 3333-1010",
    email: "sonhadores@educ.araraquara.sp.gov.br",
    whatsapp: "(16) 99999-1006",
    students: "320",
    classes: "14",
    teachers: 20,
    users: [
      { id: 13, name: "Carmen Lucia Santos", email: "carmen.santos@escola.gov.br", role: "admin" },
      { id: 14, name: "Marcos Antonio Silva", email: "marcos.silva@escola.gov.br", role: "viewer" }
    ]
  },
  {
    id: 7,
    name: "EMEF Monteiro Lobato",
    type: "Ensino Fundamental",
    director: "Paulo Roberto Alves",
    address: "Rua Monteiro Lobato, 567 - Vila Nova",
    phone: "(16) 3333-1111",
    email: "lobato@educ.araraquara.sp.gov.br",
    whatsapp: "(16) 99999-1007",
    students: "560",
    classes: "19",
    teachers: 33,
    users: [
      { id: 15, name: "Paulo Roberto Alves", email: "paulo.alves@escola.gov.br", role: "admin" },
      { id: 16, name: "Cristina Ferreira Lima", email: "cristina.lima@escola.gov.br", role: "editor" }
    ]
  },
  {
    id: 8,
    name: "CEMEI Arco-Íris",
    type: "Centro Municipal",
    director: "Eliana Cristina Souza",
    address: "Av. Feijó, 890 - Centro",
    phone: "(16) 3333-1212",
    email: "arcoiris@educ.araraquara.sp.gov.br",
    whatsapp: "(16) 99999-1008",
    students: "420",
    classes: "17",
    teachers: 26,
    users: [
      { id: 17, name: "Eliana Cristina Souza", email: "eliana.souza@escola.gov.br", role: "admin" },
      { id: 18, name: "Valter Jose Santos", email: "valter.santos@escola.gov.br", role: "editor" }
    ]
  },
  {
    id: 9,
    name: "EMEF Castro Alves",
    type: "Ensino Fundamental",
    director: "Regina Aparecida Costa",
    address: "Rua Castro Alves, 345 - Jardim Morumbi",
    phone: "(16) 3333-1313",
    email: "castroalves@educ.araraquara.sp.gov.br",
    whatsapp: "(16) 99999-1009",
    students: "680",
    classes: "24",
    teachers: 42,
    users: [
      { id: 19, name: "Regina Aparecida Costa", email: "regina.costa@escola.gov.br", role: "admin" },
      { id: 20, name: "Alfredo Silva Machado", email: "alfredo.machado@escola.gov.br", role: "editor" }
    ]
  },
  {
    id: 10,
    name: "EMEI Cantinho Feliz",
    type: "Educação Infantil",
    director: "Silvia Maria Rodrigues",
    address: "Rua do Bosque, 678 - Parque Industrial",
    phone: "(16) 3333-1414",
    email: "cantinhofeliz@educ.araraquara.sp.gov.br",
    whatsapp: "(16) 99999-1010",
    students: "260",
    classes: "11",
    teachers: 16,
    users: [
      { id: 21, name: "Silvia Maria Rodrigues", email: "silvia.rodrigues@escola.gov.br", role: "admin" },
      { id: 22, name: "Carlos Alberto Nunes", email: "carlos.nunes@escola.gov.br", role: "viewer" }
    ]
  }
];

export const initialNews = [
  {
    id: 1,
    title: "Nova Escola Municipal será inaugurada em junho",
    description: "A nova unidade do CEMEI Vila Esperança atenderá 300 crianças da região sul da cidade, com estrutura moderna e completa para educação infantil.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    date: "15/05/2025",
    category: "Infraestrutura",
    content: "<p>A Secretaria Municipal de Educação de Araraquara anuncia com satisfação a próxima inauguração do CEMEI Vila Esperança...</p>",
    status: "published"
  },
  {
    id: 2,
    title: "Programa de Alimentação Escolar recebe certificação nacional",
    description: "O programa municipal foi reconhecido pelo Ministério da Educação como modelo de excelência em nutrição escolar.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    date: "12/05/2025",
    category: "Programas",
    content: "<p>O Programa de Alimentação Escolar de Araraquara conquistou reconhecimento nacional...</p>",
    status: "published"
  },
  {
    id: 3,
    title: "Festival de Arte e Cultura movimenta escolas municipais",
    description: "Evento anual promove a criatividade e o talento dos estudantes com apresentações, exposições e oficinas culturais.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    date: "10/05/2025",
    category: "Eventos",
    content: "<p>O tradicional Festival de Arte e Cultura das escolas municipais está movimentando toda a rede de ensino...</p>",
    status: "published"
  }
];

export const mockPages = [
  {
    id: 1,
    title: "Sobre a Secretaria",
    slug: "sobre-secretaria",
    content: "<p>A Secretaria Municipal de Educação de Araraquara tem como missão promover uma educação de qualidade...</p>",
    status: "published",
    featured: true,
    createdAt: "2025-01-15",
    updatedAt: "2025-05-20"
  },
  {
    id: 2,
    title: "Processo de Matrícula",
    slug: "processo-matricula",
    content: "<p>Informações sobre o processo de matrícula para o ano letivo...</p>",
    status: "published",
    featured: false,
    createdAt: "2025-02-01",
    updatedAt: "2025-05-18"
  }
];
