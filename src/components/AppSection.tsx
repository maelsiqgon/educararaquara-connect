
import { Button } from "@/components/ui/button";

const AppSection = () => {
  return (
    <section className="py-16 bg-education-primary text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative md:order-2">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-education-accent rounded-full opacity-20"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-education-secondary rounded-full opacity-20"></div>
            
            <div className="relative bg-white rounded-xl shadow-2xl p-3 max-w-sm mx-auto">
              <div className="bg-gray-100 rounded-lg p-2 overflow-hidden">
                <div className="bg-gray-800 text-white text-xs p-1 text-center rounded-t-md">
                  EducAraraquara App
                </div>
                <img 
                  src="https://via.placeholder.com/300x600?text=App+EducAraraquara" 
                  alt="App EducAraraquara"
                  className="w-full h-auto rounded-b-md"
                />
              </div>
            </div>
          </div>
          
          <div className="md:order-1 space-y-6">
            <div className="inline-block bg-white text-education-primary px-4 py-1 rounded-full font-medium text-sm mb-2">
              App EducAraraquara
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Acesse o portal direto do seu celular
            </h2>
            <p className="text-lg opacity-90">
              Baixe nosso aplicativo móvel para ter acesso rápido a todas as funcionalidades 
              do portal, receber notificações importantes e interagir mesmo quando estiver offline.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="font-bold text-xl">Notificações</div>
                <div className="text-sm opacity-80">Receba alertas importantes em tempo real</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="font-bold text-xl">Modo Offline</div>
                <div className="text-sm opacity-80">Acesse conteúdos mesmo sem internet</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="bg-black hover:bg-gray-800 text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"></path><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M3 11h18"></path><path d="M19 16v3"></path><path d="M22 16h-6"></path></svg>
                App Store
              </Button>
              <Button className="bg-black hover:bg-gray-800 text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 15v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>
                Google Play
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSection;
