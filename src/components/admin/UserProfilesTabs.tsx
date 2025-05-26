import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { School, Users, BookOpen, MessageSquare, Settings, ArrowLeft } from "lucide-react";

// Componentes mockados para cada perfil
const SecretaryProfile = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-education-primary">Painel da Secretaria Municipal</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Gestão de Escolas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Cadastro e gerenciamento de todas as escolas da rede municipal</p>
          <Button className="mt-3 w-full">Acessar</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Indicadores</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Acompanhe indicadores educacionais em tempo real</p>
          <Button className="mt-3 w-full">Visualizar</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Redes Sociais</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Gerenciamento integrado das redes sociais</p>
          <Button className="mt-3 w-full">Gerenciar</Button>
        </CardContent>
      </Card>
    </div>
  </div>
);

const SchoolManagementProfile = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-education-primary">Painel de Gestão Escolar</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Painel da Escola</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Dashboard principal com informações da escola</p>
          <Button className="mt-3 w-full">Acessar Dashboard</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Turmas e Alunos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Cadastro e gestão de turmas e alunos</p>
          <Button className="mt-3 w-full">Gerenciar</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Comunicação</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Comunicação com responsáveis e comunidade</p>
          <Button className="mt-3 w-full">Acessar</Button>
        </CardContent>
      </Card>
    </div>
  </div>
);

const TeacherProfile = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-education-primary">Painel do Professor</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Minhas Turmas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Dashboard com todas as turmas que leciona</p>
          <Button className="mt-3 w-full">Ver Turmas</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Diário Digital</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Registro de atividades e avaliações</p>
          <Button className="mt-3 w-full">Acessar Diário</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Chat Interno</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Comunicação com alunos e outros professores</p>
          <Button className="mt-3 w-full">Abrir Chat</Button>
        </CardContent>
      </Card>
    </div>
  </div>
);

const StudentProfile = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-education-primary">Painel do Aluno</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Minhas Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Visualização e submissão de atividades</p>
          <Button className="mt-3 w-full">Ver Atividades</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Desempenho</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Acompanhe seu desempenho acadêmico</p>
          <Button className="mt-3 w-full">Ver Notas</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Gamificação</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Conquistas e atividades gamificadas</p>
          <Button className="mt-3 w-full">Ver Conquistas</Button>
        </CardContent>
      </Card>
    </div>
  </div>
);

const ParentProfile = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold text-education-primary">Painel do Responsável</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Desempenho do Filho</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Acompanhe o progresso acadêmico</p>
          <Button className="mt-3 w-full">Ver Relatório</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Comunicados</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Receba comunicados da escola</p>
          <Button className="mt-3 w-full">Ver Comunicados</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Autorizações</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Gerencie autorizações digitais</p>
          <Button className="mt-3 w-full">Gerenciar</Button>
        </CardContent>
      </Card>
    </div>
  </div>
);

const UserProfilesTabs = () => {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const profiles = [
    {
      id: "secretary",
      title: "Administrador Municipal",
      description: "Acesso completo ao sistema",
      permissions: ["Gerenciar todas as escolas", "Configurar sistema", "Relatórios globais"],
      users: 3,
      component: SecretaryProfile
    },
    {
      id: "school",
      title: "Diretor de Escola", 
      description: "Gestão completa da escola",
      permissions: ["Gerenciar conteúdo da escola", "Relatórios da escola", "Comunicação"],
      users: 12,
      component: SchoolManagementProfile
    },
    {
      id: "teacher",
      title: "Professor",
      description: "Gestão de turmas e conteúdo pedagógico",
      permissions: ["Dashboard com turmas", "Diário digital", "Chat interno"],
      users: 250,
      component: TeacherProfile
    },
    {
      id: "student", 
      title: "Aluno",
      description: "Acesso ao conteúdo educacional",
      permissions: ["Ver atividades", "Submeter trabalhos", "Chat com professores"],
      users: 15000,
      component: StudentProfile
    },
    {
      id: "parent",
      title: "Responsável",
      description: "Acompanhamento do desempenho",
      permissions: ["Ver relatórios", "Comunicação com escola", "Autorizações"],
      users: 8500,
      component: ParentProfile
    }
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-education-primary mb-6">Gestão de Usuários e Permissões</h2>
      
      <Tabs defaultValue="schools" className="space-y-6">
        <TabsList className="bg-white shadow-sm border-0 p-1 rounded-lg">
          <TabsTrigger value="schools" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Escolas
          </TabsTrigger>
          <TabsTrigger value="permissions" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Permissões
          </TabsTrigger>
          <TabsTrigger value="profiles" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Funcionalidades por Perfil
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schools" className="space-y-4">
          {/* ... keep existing code (schools grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                name: "EMEF Prof. Henrique Scabello",
                director: "Ana Silva",
                students: 520,
                type: "Ensino Fundamental",
                status: "Ativa"
              },
              {
                id: 2,
                name: "EMEI Maria Luísa Malzoni",
                director: "Carlos Santos",
                students: 180,
                type: "Educação Infantil",
                status: "Ativa"
              },
              {
                id: 3,
                name: "EMEF Waldemar Saffiotti",
                director: "Maria Oliveira",
                students: 450,
                type: "Ensino Fundamental",
                status: "Ativa"
              }
            ].map((school) => (
              <Card key={school.id} className="border-0 shadow-soft hover:shadow-md transition-shadow">
                <CardHeader className="bg-education-light rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <School className="h-8 w-8 text-education-primary" />
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {school.status}
                    </span>
                  </div>
                  <CardTitle className="text-education-primary">{school.name}</CardTitle>
                  <CardDescription>{school.type}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Diretor(a):</span>
                      <span className="text-sm font-medium">{school.director}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Alunos:</span>
                      <span className="text-sm font-medium">{school.students}</span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Button className="w-full bg-education-primary hover:bg-education-dark">
                      Acessar Painel da Escola
                    </Button>
                    <Button variant="outline" className="w-full">
                      Configurações
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          {/* ... keep existing code (permissions section) */}
          <Card className="border-0 shadow-soft">
            <CardHeader className="bg-education-light rounded-t-lg">
              <CardTitle className="text-education-primary">Níveis de Acesso</CardTitle>
              <CardDescription>
                Configure permissões para diferentes tipos de usuários
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profiles.slice(0, 4).map((role, idx) => (
                  <Card key={idx} className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{role.title}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium">Permissões:</span>
                          <ul className="text-sm text-gray-600 mt-1 space-y-1">
                            {role.permissions.map((permission, permIdx) => (
                              <li key={permIdx} className="flex items-center">
                                <div className="h-1.5 w-1.5 bg-green-500 rounded-full mr-2"></div>
                                {permission}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-sm text-gray-600">{role.users} usuários</span>
                          <Button variant="outline" size="sm">
                            Gerenciar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profiles" className="space-y-4">
          <Card className="border-0 shadow-soft">
            <CardHeader className="bg-education-light rounded-t-lg">
              <CardTitle className="text-education-primary">Funcionalidades por Perfil de Usuário</CardTitle>
              <CardDescription>
                Explore as funcionalidades disponíveis para cada tipo de usuário do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map((profile) => (
                  <Card key={profile.id} className="border hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-education-primary">{profile.title}</CardTitle>
                      <CardDescription>{profile.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium">Funcionalidades:</span>
                          <ul className="text-sm text-gray-600 mt-1 space-y-1">
                            {profile.permissions.slice(0, 3).map((permission, idx) => (
                              <li key={idx} className="flex items-center">
                                <div className="h-1.5 w-1.5 bg-education-primary rounded-full mr-2"></div>
                                {permission}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-sm text-gray-600">{profile.users} usuários</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedProfile(profile.id)}
                          >
                            Visualizar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog para visualizar funcionalidades do perfil */}
      <Dialog open={!!selectedProfile} onOpenChange={() => setSelectedProfile(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedProfile(null)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <DialogTitle>
                  {profiles.find(p => p.id === selectedProfile)?.title}
                </DialogTitle>
                <DialogDescription>
                  Funcionalidades disponíveis para este perfil de usuário
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          <div className="mt-4">
            {selectedProfile && (() => {
              const profile = profiles.find(p => p.id === selectedProfile);
              const ProfileComponent = profile?.component;
              return ProfileComponent ? <ProfileComponent /> : null;
            })()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfilesTabs;
