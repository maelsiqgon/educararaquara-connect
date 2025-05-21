
import { Tab, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProfilesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Portal para Todos</h2>
          <p className="text-gray-600">
            O EducAraraquara oferece áreas específicas para cada perfil de usuário, 
            com ferramentas adaptadas às necessidades de cada grupo.
          </p>
        </div>
        
        <Tabs defaultValue="alunos" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="alunos">Alunos</TabsTrigger>
            <TabsTrigger value="professores">Professores</TabsTrigger>
            <TabsTrigger value="responsaveis">Responsáveis</TabsTrigger>
            <TabsTrigger value="escolas">Gestão Escolar</TabsTrigger>
            <TabsTrigger value="secretaria">Secretaria</TabsTrigger>
          </TabsList>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <TabsContent value="alunos" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-block bg-blue-100 text-education-primary px-3 py-1 rounded-full font-medium text-sm">
                    Portal do Aluno
                  </div>
                  <h3 className="text-2xl font-bold">Aprendizado interativo e acessível</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Acesso a conteúdos e tarefas
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Submissão de atividades online
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Acompanhamento de desempenho
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Comunicação com professores
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Calendário escolar e notificações
                    </li>
                  </ul>
                  <Button asChild className="mt-4">
                    <Link to="/login">Acesse o Portal</Link>
                  </Button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src="https://via.placeholder.com/600x400?text=Portal+do+Aluno" 
                    alt="Portal do Aluno"
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="professores" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-block bg-green-100 text-education-secondary px-3 py-1 rounded-full font-medium text-sm">
                    Portal do Professor
                  </div>
                  <h3 className="text-2xl font-bold">Ferramentas para aprimorar o ensino</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Dashboard com turmas e calendário
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Publicação de materiais didáticos
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Diário digital e registro de frequência
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Comunicação com alunos e famílias
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Criação e correção de avaliações
                    </li>
                  </ul>
                  <Button asChild className="mt-4">
                    <Link to="/login">Acesse o Portal</Link>
                  </Button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src="https://via.placeholder.com/600x400?text=Portal+do+Professor" 
                    alt="Portal do Professor"
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="responsaveis" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-block bg-yellow-100 text-education-accent px-3 py-1 rounded-full font-medium text-sm">
                    Portal do Responsável
                  </div>
                  <h3 className="text-2xl font-bold">Acompanhamento escolar completo</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Acesso ao desempenho escolar
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Acompanhamento de frequência
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Autorizações digitais
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Comunicação com professores e escola
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Notificações e comunicados
                    </li>
                  </ul>
                  <Button asChild className="mt-4">
                    <Link to="/login">Acesse o Portal</Link>
                  </Button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src="https://via.placeholder.com/600x400?text=Portal+do+Responsavel" 
                    alt="Portal do Responsável"
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="escolas" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium text-sm">
                    Gestão Escolar
                  </div>
                  <h3 className="text-2xl font-bold">Administração escolar simplificada</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Painel da escola com dados e agenda
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Gestão de turmas e matrículas
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Relatórios de desempenho
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Comunicação centralizada
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Mural digital e redes sociais
                    </li>
                  </ul>
                  <Button asChild className="mt-4">
                    <Link to="/login">Acesse o Portal</Link>
                  </Button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src="https://via.placeholder.com/600x400?text=Gestao+Escolar" 
                    alt="Gestão Escolar"
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="secretaria" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium text-sm">
                    Secretaria de Educação
                  </div>
                  <h3 className="text-2xl font-bold">Coordenação completa da rede municipal</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Cadastro e gestão de escolas
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Indicadores em tempo real
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Gestão de projetos especiais
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Comunicação centralizada
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      Moderação de conteúdo e redes sociais
                    </li>
                  </ul>
                  <Button asChild className="mt-4">
                    <Link to="/login">Acesse o Portal</Link>
                  </Button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src="https://via.placeholder.com/600x400?text=Secretaria+Educacao" 
                    alt="Secretaria de Educação"
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default ProfilesSection;
