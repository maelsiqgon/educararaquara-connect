
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSchools, School } from '@/hooks/useSchools';
import { ArrowLeft, Users, Phone, MapPin, Mail, Calendar, School as SchoolIcon } from 'lucide-react';
import { toast } from 'sonner';

const EscolaDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const { getSchoolById } = useSchools();
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchool = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const schoolData = await getSchoolById(id);
        setSchool(schoolData);
      } catch (error) {
        toast.error('Escola não encontrada');
      } finally {
        setLoading(false);
      }
    };

    fetchSchool();
  }, [id, getSchoolById]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="bg-education-primary text-white py-16">
            <div className="araraquara-container">
              <div className="animate-pulse">
                <div className="h-8 bg-white/20 rounded w-64 mb-4"></div>
                <div className="h-6 bg-white/20 rounded w-96"></div>
              </div>
            </div>
          </div>
          
          <div className="py-16">
            <div className="araraquara-container">
              <div className="animate-pulse space-y-6">
                <div className="h-64 bg-gray-200 rounded-lg"></div>
                <div className="h-32 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="bg-education-primary text-white py-16">
            <div className="araraquara-container">
              <Link to="/escolas" className="inline-flex items-center text-white hover:text-gray-200 mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar às escolas
              </Link>
              <h1 className="text-4xl font-bold mb-4">Escola não encontrada</h1>
            </div>
          </div>
          
          <div className="py-16">
            <div className="araraquara-container text-center">
              <SchoolIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Escola não encontrada
              </h3>
              <p className="text-gray-500 mb-6">
                A escola solicitada não foi encontrada ou não existe.
              </p>
              <Button asChild>
                <Link to="/escolas">
                  Ver todas as escolas
                </Link>
              </Button>
            </div>
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
        <div className="bg-education-primary text-white py-16">
          <div className="araraquara-container">
            <Link to="/escolas" className="inline-flex items-center text-white hover:text-gray-200 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar às escolas
            </Link>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-4">{school.name}</h1>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="text-education-primary">
                    {school.type}
                  </Badge>
                  {!school.active && (
                    <Badge variant="destructive">
                      Inativa
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-16">
          <div className="araraquara-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Informações principais */}
              <div className="lg:col-span-2 space-y-6">
                {school.description && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Sobre a Escola</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{school.description}</p>
                    </CardContent>
                  </Card>
                )}

                {school.image_url && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Imagem da Escola</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={school.image_url}
                        alt={school.name}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Estatísticas */}
                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas</CardTitle>
                    <CardDescription>
                      Números atuais da escola
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6 text-center">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-3xl font-bold text-blue-600 mb-1">{school.students}</div>
                        <div className="text-sm text-gray-600">Alunos</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-3xl font-bold text-green-600 mb-1">{school.teachers}</div>
                        <div className="text-sm text-gray-600">Professores</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-3xl font-bold text-purple-600 mb-1">{school.classes}</div>
                        <div className="text-sm text-gray-600">Turmas</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar com informações de contato */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações de Contato</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {school.director && (
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-3 text-gray-500" />
                        <div>
                          <div className="font-medium">Diretor(a)</div>
                          <div className="text-sm text-gray-600">{school.director}</div>
                        </div>
                      </div>
                    )}

                    {school.address && (
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                        <div>
                          <div className="font-medium">Endereço</div>
                          <div className="text-sm text-gray-600">{school.address}</div>
                        </div>
                      </div>
                    )}

                    {school.contacts && school.contacts.length > 0 && (
                      <div className="space-y-3">
                        <div className="font-medium">Contatos</div>
                        {school.contacts.map((contact) => (
                          <div key={contact.id} className="flex items-center">
                            {contact.type === 'email' ? (
                              <Mail className="h-4 w-4 mr-3 text-gray-500" />
                            ) : (
                              <Phone className="h-4 w-4 mr-3 text-gray-500" />
                            )}
                            <div>
                              {contact.label && (
                                <div className="text-xs text-gray-500 uppercase tracking-wide">
                                  {contact.label}
                                </div>
                              )}
                              <div className="text-sm">{contact.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Informações Gerais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tipo de Ensino</span>
                      <Badge variant="outline">{school.type}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge variant={school.active ? "default" : "destructive"}>
                        {school.active ? "Ativa" : "Inativa"}
                      </Badge>
                    </div>

                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <div>
                        <div className="text-xs text-gray-500">Cadastrada em</div>
                        <div className="text-sm">
                          {new Date(school.created_at).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
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
