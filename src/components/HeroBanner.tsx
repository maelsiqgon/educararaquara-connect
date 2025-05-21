
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className="relative bg-education-primary text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-education-accent text-black px-4 py-1 rounded-full font-medium text-sm mb-4">
              Portal Educacional
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Conectando a comunidade escolar de Araraquara
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
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="font-bold text-2xl">70+</div>
                <div className="text-sm">Escolas</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="font-bold text-2xl">2.500+</div>
                <div className="text-sm">Professores</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="font-bold text-2xl">30.000+</div>
                <div className="text-sm">Alunos</div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <div className="absolute -top-14 -right-14 w-40 h-40 bg-education-accent rounded-full opacity-20"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-education-secondary rounded-full opacity-20"></div>
            <div className="relative bg-white p-4 rounded-xl shadow-xl">
              <img 
                src="https://via.placeholder.com/600x400?text=Educacao+Araraquara" 
                alt="Estudantes em Araraquara"
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
