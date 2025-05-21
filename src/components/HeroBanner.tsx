
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className="relative bg-education-primary text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>
      
      <div className="araraquara-container py-16 md:py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-education-accent text-black px-3 py-1 rounded-sm text-sm font-semibold mb-2">
              Portal Educacional
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight">
              Secretaria Municipal da Educação de Araraquara
            </h1>
            <p className="text-lg opacity-90 max-w-lg">
              Um ambiente digital integrado para alunos, professores, responsáveis e gestores 
              educacionais da rede municipal de ensino.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-white text-education-primary hover:bg-gray-100">
                <Link to="/login">Acessar Portal</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-education-dark">
                <Link to="/conheca">Conheça mais</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-sm">
                <div className="font-bold text-2xl">70+</div>
                <div className="text-sm">Escolas</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-sm">
                <div className="font-bold text-2xl">2.500+</div>
                <div className="text-sm">Professores</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-sm">
                <div className="font-bold text-2xl">30.000+</div>
                <div className="text-sm">Alunos</div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <div className="absolute -top-14 -right-14 w-40 h-40 bg-education-accent rounded-full opacity-20"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-education-secondary rounded-full opacity-20"></div>
            <div className="relative bg-white p-3 rounded-sm shadow-xl">
              <img 
                src="https://www.araraquara.sp.gov.br/imagens/WhatsApp-Image-2023-05-04-at-17.52.05.jpeg/@@images/image" 
                alt="Estudantes em Araraquara"
                className="rounded-sm w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
        <svg className="relative block w-full h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                fill="#ffffff"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroBanner;
