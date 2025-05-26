
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminWelcome from "@/components/admin/AdminWelcome";
import SectionsManager from "@/components/admin/SectionsManager";
import NewsManager from "@/components/admin/NewsManager";
import BannerEditor from "@/components/admin/BannerEditor";
import MenuManager from "@/components/admin/MenuManager";
import MediaLibraryManager from "@/components/admin/MediaLibraryManager";
import DashboardStats from "@/components/admin/DashboardStats";
import UserProfilesTabs from "@/components/admin/UserProfilesTabs";
import IntegrationTabs from "@/components/admin/integrations/IntegrationTabs";
import EducationLevelTabs from "@/components/admin/EducationLevelTabs";
import ContentManager from "@/components/admin/ContentManager";
import SchoolContentManager from "@/components/admin/SchoolContentManager";
import PageManager from "@/components/admin/PageManager";
import SchoolUserManager from "@/components/admin/SchoolUserManager";
import SchoolCreator from "@/components/admin/SchoolCreator";

const Admin = () => {
  return (
    <div className="min-h-screen bg-education-lightgray">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8">
        <AdminWelcome />
        
        {/* Dashboard Estatísticas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-education-primary mb-6">Dashboard</h2>
          <DashboardStats />
        </div>

        <Tabs defaultValue="schools" className="space-y-6">
          <TabsList className="bg-white shadow-sm border-0 p-1 rounded-lg flex-wrap h-auto">
            <TabsTrigger value="schools" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Escolas
            </TabsTrigger>
            <TabsTrigger value="create-school" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Nova Escola
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Usuários
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Notícias
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Conteúdo
            </TabsTrigger>
            <TabsTrigger value="pages" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Páginas
            </TabsTrigger>
            <TabsTrigger value="banner" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Banner Principal
            </TabsTrigger>
            <TabsTrigger value="menu" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Menu
            </TabsTrigger>
            <TabsTrigger value="media" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Biblioteca de Mídias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schools" className="space-y-4">
            <SchoolContentManager />
          </TabsContent>

          <TabsContent value="create-school" className="space-y-4">
            <SchoolCreator />
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <SchoolUserManager />
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            <NewsManager />
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <ContentManager />
          </TabsContent>

          <TabsContent value="pages" className="space-y-4">
            <PageManager />
          </TabsContent>

          <TabsContent value="banner" className="space-y-4">
            <BannerEditor />
          </TabsContent>

          <TabsContent value="menu" className="space-y-4">
            <MenuManager />
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <MediaLibraryManager />
          </TabsContent>
        </Tabs>

        {/* Seção de Perfis de Usuário */}
        <UserProfilesTabs />
        
        {/* Integrações Técnicas */}
        <IntegrationTabs />
        
        {/* Funcionalidades por Nível de Ensino */}
        <EducationLevelTabs />
        
        {/* Acessibilidade e Design Responsivo */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-education-primary mb-6">Design, Usabilidade e Acessibilidade</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg text-education-primary mb-3">Responsividade</h3>
              <div className="flex space-x-3 mb-4">
                <div className="bg-education-light rounded p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-education-primary">
                    <rect width="16" height="20" x="4" y="2" rx="2" />
                    <line x1="12" x2="12.01" y1="18" y2="18" />
                  </svg>
                </div>
                <div className="bg-education-light rounded p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-education-primary">
                    <rect width="18" height="12" x="3" y="6" rx="2" />
                    <line x1="12" x2="12.01" y1="17" y2="17" />
                  </svg>
                </div>
                <div className="bg-education-light rounded p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-education-primary">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <line x1="12" x2="12.01" y1="20" y2="20" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Interface moderna completamente responsiva, adaptada para visualização em dispositivos móveis, 
                tablets e desktops, com prioridade para experiência mobile.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg text-education-primary mb-3">Acessibilidade</h3>
              <div className="flex space-x-3 mb-4">
                <span className="bg-education-light rounded p-2 text-education-primary font-bold">
                  Aa
                </span>
                <span className="bg-education-light rounded p-2 text-education-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0-6 6c0 5 7 10 9 11.5 2-1.5 9-6.5 9-11.5a6 6 0 0 0-6-6Z" />
                    <circle cx="12" cy="9" r="2" />
                  </svg>
                </span>
                <span className="bg-education-light rounded p-2 text-education-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m15 9-6 6" />
                    <path d="m9 9 6 6" />
                  </svg>
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Conformidade com WCAG 2.1, suporte a alto contraste, fonte escalável, navegação por teclado
                e compatibilidade com leitores de tela.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg text-education-primary mb-3">Modo Offline (PWA)</h3>
              <div className="flex space-x-3 mb-4">
                <span className="bg-education-light rounded p-2 text-education-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                    <path d="M9 14l6 0" />
                  </svg>
                </span>
                <span className="bg-education-light rounded p-2 text-education-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 13h18M3 13v7a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-7M3 13v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7" />
                    <path d="m8 21-1-1v-4" />
                    <path d="m16 21 1-1v-4" />
                  </svg>
                </span>
                <span className="bg-education-light rounded p-2 text-education-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5" />
                    <path d="M5 12h14" />
                  </svg>
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Aplicativo progressivo (PWA) com funcionamento offline para formulários, visualização
                de conteúdo salvo e sincronização automática quando retornar online.
              </p>
            </div>
          </div>
        </div>

        {/* Seção de configurações para servidor */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-education-primary mb-6">Configurações do Servidor</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg text-education-primary mb-3">Instruções para Deploy no Ubuntu Server 24.04</h3>
            <div className="bg-gray-50 p-4 rounded-lg text-sm font-mono">
              <p className="mb-2"># 1. Instalar Node.js e npm</p>
              <p className="mb-2">curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -</p>
              <p className="mb-2">sudo apt-get install -y nodejs</p>
              <p className="mb-4"></p>
              <p className="mb-2"># 2. Clonar o repositório</p>
              <p className="mb-2">git clone [URL_DO_REPOSITORIO]</p>
              <p className="mb-2">cd [NOME_DO_PROJETO]</p>
              <p className="mb-4"></p>
              <p className="mb-2"># 3. Instalar dependências</p>
              <p className="mb-2">npm install</p>
              <p className="mb-4"></p>
              <p className="mb-2"># 4. Build do projeto</p>
              <p className="mb-2">npm run build</p>
              <p className="mb-4"></p>
              <p className="mb-2"># 5. Instalar PM2 para produção</p>
              <p className="mb-2">sudo npm install -g pm2</p>
              <p className="mb-4"></p>
              <p className="mb-2"># 6. Executar em produção</p>
              <p className="mb-2">pm2 start npm --name "educ-portal" -- run preview</p>
              <p className="mb-2">pm2 save</p>
              <p className="mb-2">pm2 startup</p>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              O sistema estará disponível na porta 4173. Configure um proxy reverso (nginx) se necessário.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
