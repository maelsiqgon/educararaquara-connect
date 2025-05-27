
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockSchools } from "@/components/admin/mockData";
import { MapPin, Phone, Users, GraduationCap, Mail, Clock, Calendar } from "lucide-react";

const EscolaDetalhes = () => {
  const { schoolId } = useParams();
  const school = mockSchools.find(s => s.id === parseInt(schoolId || "0"));

  if (!school) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-600 mb-4">Escola não encontrada</h1>
            <p className="text-gray-500">A escola solicitada não foi encontrada em nosso sistema.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-education-primary text-white py-16">
          <div className="araraquara-container">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <Badge className="bg-education-light text-education-primary mb-4">
                  {school.type}
                </Badge>
                <h1 className="text-4xl font-bold mb-4">{school.name}</h1>
                <p className="text-xl text-education-light mb-6">
                  Uma escola comprometida com a excelência educacional e o desenvolvimento integral dos estudantes.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="secondary" className="bg-white text-education-primary hover:bg-gray-100">
                    Matricule-se
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-education-primary">
                    Contato
                  </Button>
                </div>
              </div>
              <div className="lg:w-96">
                <img
                  src={`https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop`}
                  alt={school.name}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="py-16">
          <div className="araraquara-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Informações Principais */}
              <div className="lg:col-span-2 space-y-8">
                {/* Sobre a Escola */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-education-primary">Sobre Nossa Escola</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      A {school.name} é uma instituição de ensino municipal que se destaca pela qualidade 
                      educacional e pelo compromisso com o desenvolvimento integral dos estudantes. Nossa 
                      missão é proporcionar um ambiente acolhedor e estimulante, onde cada criança possa 
                      desenvolver seu potencial máximo.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Com uma equipe de profissionais qualificados e uma infraestrutura adequada, 
                      oferecemos uma educação de qualidade que prepara nossos alunos para os desafios 
                      do futuro, sempre respeitando as individualidades e promovendo valores éticos 
                      e cidadãos.
                    </p>
                  </CardContent>
                </Card>

                {/* Últimas Notícias */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-education-primary">Últimas Notícias</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Festa Junina 2025",
                          date: "15/05/2025",
                          description: "Venha participar da nossa tradicional Festa Junina! Comidas típicas, quadrilha e muita diversão para toda a família."
                        },
                        {
                          title: "Projeto de Leitura",
                          date: "10/05/2025",
                          description: "Lançamento do novo projeto de incentivo à leitura com atividades interativas e contação de histórias."
                        },
                        {
                          title: "Reunião de Pais",
                          date: "05/05/2025",
                          description: "Convocação para reunião de pais e responsáveis. Venham conhecer o desenvolvimento dos seus filhos."
                        }
                      ].map((news, index) => (
                        <div key={index} className="border-l-4 border-education-primary pl-4">
                          <h4 className="font-semibold text-education-primary">{news.title}</h4>
                          <p className="text-sm text-gray-500 mb-2">{news.date}</p>
                          <p className="text-gray-600 text-sm">{news.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Projetos e Atividades */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-education-primary">Projetos e Atividades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Projeto de Leitura",
                        "Horta Escolar",
                        "Educação Ambiental",
                        "Arte e Cultura",
                        "Esporte e Recreação",
                        "Informática Educativa"
                      ].map((project, index) => (
                        <div key={index} className="bg-education-light rounded-lg p-4">
                          <h5 className="font-semibold text-education-primary">{project}</h5>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar com Informações */}
              <div className="space-y-6">
                {/* Informações de Contato */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-education-primary">Informações de Contato</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-education-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Endereço</p>
                        <p className="text-sm text-gray-600">{school.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-education-primary" />
                      <div>
                        <p className="font-medium">Telefone</p>
                        <p className="text-sm text-gray-600">{school.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-education-primary" />
                      <div>
                        <p className="font-medium">E-mail</p>
                        <p className="text-sm text-gray-600">{school.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-education-primary" />
                      <div>
                        <p className="font-medium">Horário de Funcionamento</p>
                        <p className="text-sm text-gray-600">7h às 17h</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Estatísticas */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-education-primary">Números da Escola</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-education-primary" />
                        <span>Alunos</span>
                      </div>
                      <span className="font-bold text-education-primary">{school.students}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-education-primary" />
                        <span>Turmas</span>
                      </div>
                      <span className="font-bold text-education-primary">{school.classes}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-education-primary" />
                        <span>Professores</span>
                      </div>
                      <span className="font-bold text-education-primary">25</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Direção */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-education-primary">Equipe Gestora</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-education-light rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="h-10 w-10 text-education-primary" />
                      </div>
                      <h4 className="font-semibold text-education-primary">{school.director}</h4>
                      <p className="text-sm text-gray-600">Diretora</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Próximos Eventos */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-education-primary">Próximos Eventos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { date: "12/06", event: "Festa Junina" },
                      { date: "20/06", event: "Reunião de Pais" },
                      { date: "15/07", event: "Mostra Cultural" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="bg-education-primary text-white rounded-lg p-2 text-center min-w-[50px]">
                          <Calendar className="h-4 w-4 mx-auto mb-1" />
                          <p className="text-xs font-bold">{item.date}</p>
                        </div>
                        <p className="text-sm">{item.event}</p>
                      </div>
                    ))}
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
