
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import AdminHeader from "@/components/admin/AdminHeader";
import NewsManager from "@/components/admin/NewsManager";
import MediaLibraryManager from "@/components/admin/MediaLibraryManager";
import { Calendar, Image, FileText, Users } from "lucide-react";

const SchoolAdmin = () => {
  const { schoolId } = useParams();
  const [schoolData] = useState({
    id: schoolId || "1",
    name: "EMEF Prof. Henrique Scabello",
    director: "Ana Silva",
    address: "Rua Carlos Gomes, 1220 - Centro",
    phone: "(16) 3333-5555",
    email: "escabello@educ.araraquara.sp.gov.br",
    students: 520,
    teachers: 32,
    classes: 18
  });

  const handleSave = () => {
    toast.success("Dados salvos com sucesso!");
  };

  return (
    <div className="min-h-screen bg-education-lightgray">
      <AdminHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-education-primary mb-2">
            Painel Administrativo - {schoolData.name}
          </h1>
          <p className="text-gray-600">
            Gerencie o conteúdo e informações da sua escola
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold">{schoolData.students}</p>
                  <p className="text-gray-600">Alunos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold">{schoolData.teachers}</p>
                  <p className="text-gray-600">Professores</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold">{schoolData.classes}</p>
                  <p className="text-gray-600">Turmas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-amber-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-gray-600">Eventos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="info" className="space-y-6">
          <TabsList className="bg-white shadow-sm border-0 p-1 rounded-lg">
            <TabsTrigger value="info" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Informações
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Notícias
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Eventos
            </TabsTrigger>
            <TabsTrigger value="media" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Mídia
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Calendário
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <Card className="border-0 shadow-soft">
              <CardHeader className="bg-education-light rounded-t-lg">
                <CardTitle className="text-education-primary">Informações da Escola</CardTitle>
                <CardDescription>
                  Edite as informações básicas da sua escola
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="school-name">Nome da Escola</Label>
                      <Input 
                        id="school-name" 
                        defaultValue={schoolData.name}
                        className="border-gray-300 focus-visible:ring-education-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="director">Diretor(a)</Label>
                      <Input 
                        id="director" 
                        defaultValue={schoolData.director}
                        className="border-gray-300 focus-visible:ring-education-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input 
                      id="address" 
                      defaultValue={schoolData.address}
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input 
                        id="phone" 
                        defaultValue={schoolData.phone}
                        className="border-gray-300 focus-visible:ring-education-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input 
                        id="email" 
                        defaultValue={schoolData.email}
                        className="border-gray-300 focus-visible:ring-education-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição da Escola</Label>
                    <textarea 
                      id="description" 
                      className="w-full p-2 border border-gray-300 rounded-md h-[120px] focus:ring-education-primary focus:border-education-primary"
                      defaultValue="A EMEF Prof. Henrique Scabello é uma escola municipal que atende alunos do Ensino Fundamental, oferecendo educação de qualidade com foco no desenvolvimento integral dos estudantes."
                    />
                  </div>
                  
                  <Button onClick={handleSave} className="bg-education-primary hover:bg-education-dark">
                    Salvar Alterações
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            <NewsManager />
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <Card className="border-0 shadow-soft">
              <CardHeader className="bg-education-light rounded-t-lg">
                <CardTitle className="text-education-primary">Gerenciamento de Eventos</CardTitle>
                <CardDescription>
                  Crie e gerencie eventos da sua escola
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Eventos Programados</h3>
                    <Button className="bg-education-primary hover:bg-education-dark">
                      Novo Evento
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { title: "Festa Junina", date: "12/06/2025", time: "18:00", location: "Quadra Poliesportiva" },
                      { title: "Reunião de Pais", date: "05/06/2025", time: "19:00", location: "Todas as salas" },
                      { title: "Mostra Cultural", date: "20/09/2025", time: "14:00", location: "Pátio Principal" },
                      { title: "Formatura 5º Ano", date: "10/12/2025", time: "19:00", location: "Teatro Municipal" }
                    ].map((event, idx) => (
                      <Card key={idx} className="border">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{event.title}</h4>
                              <p className="text-sm text-gray-600">
                                {event.date} às {event.time} - {event.location}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Editar</Button>
                              <Button variant="outline" size="sm" className="text-red-600">Excluir</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <MediaLibraryManager />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card className="border-0 shadow-soft">
              <CardHeader className="bg-education-light rounded-t-lg">
                <CardTitle className="text-education-primary">Calendário Escolar</CardTitle>
                <CardDescription>
                  Gerencie o calendário acadêmico da escola
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Calendário em desenvolvimento</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Em breve você poderá gerenciar datas importantes, feriados e eventos acadêmicos
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SchoolAdmin;
