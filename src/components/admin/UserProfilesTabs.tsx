
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { userProfiles } from './mockData';
import SecretaryProfile from './profiles/SecretaryProfile';
import SchoolManagementProfile from './profiles/SchoolManagementProfile';
import TeacherProfile from './profiles/TeacherProfile';
import StudentProfile from './profiles/StudentProfile';
import ParentProfile from './profiles/ParentProfile';

const UserProfilesTabs = () => {
  const [activeProfile, setActiveProfile] = useState("secretary");
  const [viewingProfile, setViewingProfile] = useState<string | null>(null);
  
  if (viewingProfile) {
    let ProfileComponent;
    switch (viewingProfile) {
      case 'secretary':
        ProfileComponent = SecretaryProfile;
        break;
      case 'management':
        ProfileComponent = SchoolManagementProfile;
        break;
      case 'teachers':
        ProfileComponent = TeacherProfile;
        break;
      case 'students':
        ProfileComponent = StudentProfile;
        break;
      case 'parents':
        ProfileComponent = ParentProfile;
        break;
      default:
        ProfileComponent = SecretaryProfile;
    }

    return (
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-education-primary">
            {viewingProfile === 'secretary' && 'Secretaria Municipal'}
            {viewingProfile === 'management' && 'Gestão Escolar'}
            {viewingProfile === 'teachers' && 'Professores'}
            {viewingProfile === 'students' && 'Alunos'}
            {viewingProfile === 'parents' && 'Responsáveis'}
          </h2>
          <Button 
            variant="outline" 
            onClick={() => setViewingProfile(null)}
            className="flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Voltar
          </Button>
        </div>
        <ProfileComponent />
      </div>
    );
  }
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-education-primary mb-6">Funcionalidades por Perfil</h2>
      
      <Tabs defaultValue="secretary" onValueChange={setActiveProfile}>
        <TabsList className="bg-white shadow-sm border-0 p-1 rounded-lg mb-6 w-full flex overflow-x-auto">
          <TabsTrigger value="secretary" className="flex-grow data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Secretaria
          </TabsTrigger>
          <TabsTrigger value="management" className="flex-grow data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Gestão Escolar
          </TabsTrigger>
          <TabsTrigger value="teachers" className="flex-grow data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Professores
          </TabsTrigger>
          <TabsTrigger value="students" className="flex-grow data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Alunos
          </TabsTrigger>
          <TabsTrigger value="parents" className="flex-grow data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Responsáveis
          </TabsTrigger>
        </TabsList>
        
        {userProfiles.map((profile, index) => {
          const tabValue = index === 0 ? "secretary" : 
                           index === 1 ? "management" : 
                           index === 2 ? "teachers" : 
                           index === 3 ? "students" : "parents";
          
          return (
            <TabsContent key={profile.id} value={tabValue} className="space-y-4">
              <Card className="border-0 shadow-soft">
                <CardHeader className="bg-education-light rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-education-primary">{profile.name}</CardTitle>
                      <CardDescription>
                        Gerenciamento de funcionalidades para {profile.name.toLowerCase()}
                      </CardDescription>
                    </div>
                    <div className="bg-white p-4 rounded-full shadow-sm">
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
                        {profile.icon === "building" && <path d="M6 22V2h12v20H6Z" />}
                        {profile.icon === "building" && <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />}
                        {profile.icon === "building" && <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />}
                        {profile.icon === "building" && <path d="M10 6h4" />}
                        {profile.icon === "building" && <path d="M10 10h4" />}
                        {profile.icon === "building" && <path d="M10 14h4" />}
                        {profile.icon === "building" && <path d="M10 18h4" />}
                        
                        {profile.icon === "school" && <path d="m4 6 8-4 8 4" />}
                        {profile.icon === "school" && <path d="m18 10 4 2" />}
                        {profile.icon === "school" && <path d="m20 16-4 2" />}
                        {profile.icon === "school" && <path d="M12 12v8" />}
                        {profile.icon === "school" && <path d="M12 12 4 8" />}
                        {profile.icon === "school" && <path d="M12 12 4 8v10l8 4 8-4V8" />}
                        
                        {profile.icon === "user-check" && <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />}
                        {profile.icon === "user-check" && <circle cx="9" cy="7" r="4" />}
                        {profile.icon === "user-check" && <path d="m16 11 2 2 4-4" />}
                        
                        {profile.icon === "user" && <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />}
                        {profile.icon === "user" && <circle cx="12" cy="7" r="4" />}
                        
                        {profile.icon === "users" && <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />}
                        {profile.icon === "users" && <circle cx="9" cy="7" r="4" />}
                        {profile.icon === "users" && <path d="M22 21v-2a4 4 0 0 0-3-3.87" />}
                        {profile.icon === "users" && <path d="M16 3.13a4 4 0 0 1 0 7.75" />}
                      </svg>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="font-medium text-lg mb-4">Funcionalidades disponíveis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {profile.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="mr-3 bg-education-light/50 p-2 rounded-md">
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
                            className="text-education-primary"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5 bg-blue-100 p-1 rounded-md">
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
                          className="text-blue-600"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">Próximas atualizações</h4>
                        <p className="text-sm text-blue-700">
                          {tabValue === "secretary" && "Integração com Azure AD, gerenciamento em tempo real de redes sociais e análises avançadas estão em desenvolvimento."}
                          {tabValue === "management" && "Módulo completo de relatórios, sistema de gestão de eventos e mural digital para comunicados estão em desenvolvimento."}
                          {tabValue === "teachers" && "Integração completa com Microsoft Teams, sistema de avaliação digital e ferramentas de análise de desempenho estão em desenvolvimento."}
                          {tabValue === "students" && "Sistema de gamificação avançado, integração com materiais digitais e chat com sistema de IA para dúvidas estão em desenvolvimento."}
                          {tabValue === "parents" && "Aplicativo mobile para responsáveis, documentação digital e sistema de agendamento de reuniões estão em desenvolvimento."}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 bg-gray-50 rounded-b-lg">
                  <Button 
                    variant="outline" 
                    onClick={() => toast.success(`Configurações de ${profile.name.toLowerCase()} atualizadas`)}
                  >
                    Configurações
                  </Button>
                  <Button 
                    className="bg-education-primary hover:bg-education-dark"
                    onClick={() => setViewingProfile(tabValue)}
                  >
                    Visualizar
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default UserProfilesTabs;
