
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock news data
const newsItems = [
  {
    id: 1,
    title: "Matrícula online para o ano letivo 2026 já está disponível",
    description: "Pais e responsáveis já podem realizar a matrícula dos estudantes para o próximo ano letivo através do portal EducAraraquara.",
    date: "18/05/2025",
    category: "Matrículas",
    image: "https://www.araraquara.sp.gov.br/imagens/escola.JPG/@@images/image",
  },
  {
    id: 2,
    title: "Escolas municipais recebem novos laboratórios de informática",
    description: "A Secretaria de Educação entregou 15 novos laboratórios de informática em escolas da rede municipal, beneficiando mais de 8 mil alunos.",
    date: "12/05/2025",
    category: "Infraestrutura",
    image: "https://www.araraquara.sp.gov.br/imagens/aula-de-informatica-lab-2.jpeg/@@images/image",
  },
  {
    id: 3,
    title: "Mostra Cultural reunirá projetos de escolas municipais",
    description: "Evento acontecerá no Centro Cultural e contará com apresentações de dança, música, teatro e exposições de trabalhos dos alunos.",
    date: "05/05/2025",
    category: "Eventos",
    image: "https://www.araraquara.sp.gov.br/imagens/cultura-escola.jpeg/@@images/image",
  },
];

const NewsSection = () => {
  return (
    <section className="py-20 bg-education-lightgray relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-dot-bg opacity-5"></div>
      
      <div className="araraquara-container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="section-title pb-4 md:mb-0">Últimas Notícias</h2>
          <Button asChild variant="outline" className="border-education-primary text-education-primary hover:bg-education-light shadow-sm hover:shadow-md transition-all duration-300">
            <Link to="/noticias">Ver todas</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <Card key={item.id} className="overflow-hidden card-hover border-0 shadow-soft rounded-lg opacity-0 stagger-item animate-fade-in">
              <div className="h-56 overflow-hidden relative gradient-overlay">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-white bg-education-primary px-3 py-1 rounded-full shadow-sm">
                    {item.category}
                  </span>
                  <span className="text-xs text-education-gray">{item.date}</span>
                </div>
                <CardTitle className="text-xl text-education-primary hover:text-education-dark transition-colors duration-200">
                  <Link to={`/noticias/${item.id}`}>{item.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-education-gray line-clamp-3 font-body">
                  {item.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" size="sm" className="text-education-primary hover:text-education-dark hover:bg-education-light group flex items-center gap-1">
                  <Link to={`/noticias/${item.id}`}>
                    Leia mais
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="transition-transform duration-300 transform group-hover:translate-x-1"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
