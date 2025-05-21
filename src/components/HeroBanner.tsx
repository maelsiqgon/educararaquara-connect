
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-br from-education-primary to-education-dark text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-dot-bg opacity-10"></div>
      
      <div className="araraquara-container py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block bg-education-accent text-black px-3 py-1 rounded-md text-sm font-semibold mb-2 shadow-sm">
              Portal Educacional
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight">
              Secretaria Municipal da Educação de Araraquara
            </h1>
            <p className="text-lg opacity-90 max-w-lg font-body">
              Um ambiente digital integrado para alunos, professores, responsáveis e gestores 
              educacionais da rede municipal de ensino.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-white text-education-primary hover:bg-gray-100 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                <Link to="/login">Acessar Portal</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 transition-all duration-300">
                <Link to="/conheca">Conheça mais</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4 text-center">
              {[
                {number: "70+", label: "Escolas"},
                {number: "2.500+", label: "Professores"},
                {number: "30.000+", label: "Alunos"}
              ].map((stat, index) => (
                <div key={index} className={`bg-white/10 backdrop-blur-sm p-3 rounded-md shadow-sm stagger-item opacity-0 animate-fade-in`}>
                  <div className="font-bold text-2xl">{stat.number}</div>
                  <div className="text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="hidden md:block relative animate-slide-in opacity-0">
            <div className="absolute -top-14 -right-14 w-40 h-40 rounded-full bg-education-accent opacity-20 blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-education-secondary opacity-20 blur-xl"></div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tl from-education-primary/30 to-transparent rounded-lg"></div>
              <img 
                src="https://www.araraquara.sp.gov.br/imagens/WhatsApp-Image-2023-05-04-at-17.52.05.jpeg/@@images/image" 
                alt="Estudantes em Araraquara"
                className="rounded-lg w-full h-auto shadow-xl transition-transform duration-500 hover:scale-[1.02] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden h-16 leading-0">
        <div className="relative h-full w-full bg-wave-pattern bg-no-repeat bg-bottom bg-[length:100%_100%]"></div>
      </div>
    </div>
  );
};

export default HeroBanner;
