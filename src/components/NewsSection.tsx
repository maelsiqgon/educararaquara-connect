
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
    image: "https://via.placeholder.com/600x400?text=Matriculas",
  },
  {
    id: 2,
    title: "Escolas municipais recebem novos laboratórios de informática",
    description: "A Secretaria de Educação entregou 15 novos laboratórios de informática em escolas da rede municipal, beneficiando mais de 8 mil alunos.",
    date: "12/05/2025",
    category: "Infraestrutura",
    image: "https://via.placeholder.com/600x400?text=Laboratorios",
  },
  {
    id: 3,
    title: "Mostra Cultural reunirá projetos de escolas municipais",
    description: "Evento acontecerá no Centro Cultural e contará com apresentações de dança, música, teatro e exposições de trabalhos dos alunos.",
    date: "05/05/2025",
    category: "Eventos",
    image: "https://via.placeholder.com/600x400?text=Mostra+Cultural",
  },
];

const NewsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Últimas Notícias</h2>
          <Button asChild variant="outline">
            <Link to="/noticias">Ver todas</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <Card key={item.id} className="overflow-hidden card-hover">
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-education-primary bg-education-light px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 line-clamp-3">
                  {item.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" size="sm" className="text-education-primary hover:text-education-dark hover:bg-education-light">
                  <Link to={`/noticias/${item.id}`}>Leia mais</Link>
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
