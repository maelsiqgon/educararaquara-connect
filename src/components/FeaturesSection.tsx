
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-education-primary"
      >
        <path d="M3 7V5c0-1.1.9-2 2-2h2"></path>
        <path d="M17 3h2c1.1 0 2 .9 2 2v2"></path>
        <path d="M21 17v2c0 1.1-.9 2-2 2h-2"></path>
        <path d="M7 21H5c-1.1 0-2-.9-2-2v-2"></path>
        <rect width="7" height="5" x="7" y="7" rx="1"></rect>
        <rect width="7" height="5" x="10" y="12" rx="1"></rect>
      </svg>
    ),
    title: "Gestão Centralizada",
    description:
      "Administre escolas, usuários, turmas e projetos em um único ambiente integrado.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-education-primary"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" x2="8" y1="13" y2="13"></line>
        <line x1="16" x2="8" y1="17" y2="17"></line>
        <line x1="10" x2="8" y1="9" y2="9"></line>
      </svg>
    ),
    title: "Conteúdo Educacional",
    description:
      "Acesse materiais didáticos, atividades e recursos pedagógicos para todos os níveis de ensino.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-education-primary"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
      </svg>
    ),
    title: "Perfis Personalizados",
    description:
      "Experiência adaptada para alunos, professores, responsáveis e gestores educacionais.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-education-primary"
      >
        <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
        <path d="M21 8h-3a2 2 0 0 1-2-2V3"></path>
        <path d="M3 16h3a2 2 0 0 1 2 2v3"></path>
        <path d="M16 21v-3a2 2 0 0 1 2-2h3"></path>
        <circle cx="12" cy="12" r="4"></circle>
      </svg>
    ),
    title: "Integração Microsoft",
    description:
      "Sincronização completa com o ecossistema Microsoft 365 (Office + Teams) para colaboração em tempo real.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-education-primary"
      >
        <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4"></path>
        <path d="M3 9v4"></path>
        <path d="M21 9v4"></path>
        <rect width="18" height="4" x="3" y="5" rx="1"></rect>
        <path d="M12 9v12"></path>
      </svg>
    ),
    title: "Chat Inteligente",
    description:
      "Canal direto de comunicação entre secretaria, escolas, professores e responsáveis, com suporte de IA.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-education-primary"
      >
        <path d="m22 8-6 4 6 4V8Z"></path>
        <rect width="14" height="12" x="2" y="6" rx="2"></rect>
      </svg>
    ),
    title: "Mobile Friendly",
    description:
      "Acesse todas as funcionalidades do portal em qualquer dispositivo, a qualquer hora e em qualquer lugar.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-education-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 text-education-primary">Recursos do Portal</h2>
          <p className="text-gray-600 font-body">
            O EducAraraquara reúne ferramentas essenciais para facilitar a gestão educacional,
            promover a comunicação e aprimorar a experiência de aprendizagem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="card-hover border-0 shadow-soft overflow-hidden bg-white rounded-lg stagger-item opacity-0 animate-fade-in">
              <div className="absolute h-1 top-0 left-0 right-0 bg-gradient-to-r from-education-primary to-education-accent"></div>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="bg-education-light p-3 rounded-lg">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-education-primary">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 font-body">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
