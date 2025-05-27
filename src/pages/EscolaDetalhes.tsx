
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockSchools } from "@/components/admin/mockData";
import { MapPin, Phone, Mail, Users, GraduationCap, Calendar, FileText, Image } from "lucide-react";

const EscolaDetalhes = () => {
  const { id } = useParams();
  const school = mockSchools.find(s => s.id === parseInt(id || "0"));
  
  if (!school) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-600 mb-4">Escola não encontrada</h1>
            <Link to="/escolas">
              <Button>Voltar para Escolas</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const mockNews = [
    {
      id: 1,
      title: "Início das aulas na " + school.name,
      date: "15/01/2025",
      content: "As aulas iniciam no dia 10 de fevereiro com novidades no currículo."
    },
    {
      id: 2,
      title: "Reforma da quadra esportiva",
      date: "10/01/2025", 
      content: "Nova quadra poliesportiva será entregue em março."
    }
  ];

  const mockEvents = [
    {
      id: 1,
      title: "Reunião de Pais",
      date: "2025-02-15",
      time: "19:00",
      description: "Apresentação do plano pedagógico para 2025"
    },
    {
      id: 2,
      title: "Feira de Ciências",
      date: "2025-03-20",
      time: "14:00",
      description: "Exposição dos projetos dos alunos"
    }
  ];

  const mockGallery = [
    { id: 1, title: "Fachada da escola", url: "/placeholder.svg" },
    { id: 2, title: "Sala de aula", url: "/placeholder.svg" },
    { id: 3, title: "Biblioteca", url: "/placeholder.svg" },
    { id: 4, title: "Quadra esportiva", url: "/placeholder.svg" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-education-primary text-white py-16">
          <div className="araraquara-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <h1 className="text-4xl font-bold mb-4">{school.name}</h1>
                <Badge className="bg-white text-education-primary mb-4">{school.type}</Badge>
                <p className="text-xl text-education-light mb-6">{school.description}</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>{school.students} alunos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    <span>{school.classes} turmas</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <img 
                  src={school.image || "/placeholder.svg"} 
                  alt={school.name}
                  className="w-64 h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="py-12">
          <div className="araraquara-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="sobre" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="sobre">Sobre</TabsTrigger>
                    <TabsTrigger value="noticias">Notícias</TabsTrigger>
                    <TabsTrigger value="eventos">Eventos</TabsTrigger>
                    <TabsTrigger value="galeria">Galeria</TabsTrigger>
                  </TabsList>

                  <TabsContent value="sobre">
                    <Card>
                      <CardHeader>
                        <CardTitle>Sobre a Escola</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-700">{school.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Direção</h4>
                            <p className="text-gray-600">{school.director}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Professores</h4>
                            <p className="text-gray-600">{school.teachers} professores</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Missão</h4>
                          <p className="text-gray-700">
                            Proporcionar educação de qualidade, formando cidadãos críticos e 
                            participativos, capazes de transformar a realidade em que vivem.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Visão</h4>
                          <p className="text-gray-700">
                            Ser referência em educação municipal, reconhecida pela excelência 
                            no ensino e pela formação integral dos estudantes.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="noticias">
                    <div className="space-y-6">
                      {mockNews.map((news) => (
                        <Card key={news.id}>
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{news.title}</CardTitle>
                              <span className="text-sm text-gray-500">{news.date}</span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700">{news.content}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="eventos">
                    <div className="space-y-6">
                      {mockEvents.map((event) => (
                        <Card key={event.id}>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Calendar className="h-5 w-5 text-education-primary" />
                              {event.title}
                            </CardTitle>
                            <CardDescription>
                              {event.date} às {event.time}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700">{event.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="galeria">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {mockGallery.map((image) => (
                        <Card key={image.id}>
                          <CardContent className="p-0">
                            <img 
                              src={image.url} 
                              alt={image.title}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                              <h4 className="font-medium">{image.title}</h4>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Informações de Contato</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Endereço</p>
                        <p className="font-medium">{school.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Telefones</p>
                        <p className="font-medium">{school.phone}</p>
                        <p className="text-sm text-gray-600">Celular: {school.cellphone}</p>
                        <p className="text-sm text-gray-600">WhatsApp: {school.whatsapp}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Emails</p>
                        {school.emails.map((email, index) => (
                          <p key={index} className="text-sm">
                            <span className="font-medium">{email.type}:</span> {email.email}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Estatísticas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-education-primary">{school.students}</div>
                      <p className="text-sm text-gray-600">Alunos Matriculados</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-education-primary">{school.classes}</div>
                      <p className="text-sm text-gray-600">Turmas Ativas</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-education-primary">{school.teachers}</div>
                      <p className="text-sm text-gray-600">Professores</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ações Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Documentos da Escola
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Calendário Escolar
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Image className="h-4 w-4 mr-2" />
                      Galeria Completa
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EscolaDetalhes;
