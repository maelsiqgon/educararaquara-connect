
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { School, Users, BookOpen, MessageSquare, Settings } from "lucide-react";

const UserProfilesTabs = () => {
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
        </TabsList>

        <TabsContent value="schools" className="space-y-4">
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
          <Card className="border-0 shadow-soft">
            <CardHeader className="bg-education-light rounded-t-lg">
              <CardTitle className="text-education-primary">Níveis de Acesso</CardTitle>
              <CardDescription>
                Configure permissões para diferentes tipos de usuários
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Administrador Municipal",
                    description: "Acesso completo ao sistema",
                    permissions: ["Gerenciar todas as escolas", "Configurar sistema", "Relatórios globais"],
                    users: 3
                  },
                  {
                    title: "Diretor de Escola",
                    description: "Gestão completa da escola",
                    permissions: ["Gerenciar conteúdo da escola", "Relatórios da escola", "Comunicação"],
                    users: 12
                  },
                  {
                    title: "Editor de Conteúdo",
                    description: "Publicação e edição de conteúdo",
                    permissions: ["Criar notícias", "Gerenciar eventos", "Upload de mídia"],
                    users: 8
                  },
                  {
                    title: "Visualizador",
                    description: "Apenas visualização",
                    permissions: ["Ver conteúdos", "Acessar relatórios básicos"],
                    users: 25
                  }
                ].map((role, idx) => (
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
      </Tabs>
    </div>
  );
};

export default UserProfilesTabs;
