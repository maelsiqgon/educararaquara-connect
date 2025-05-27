
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSchools } from '@/hooks/useSchools';
import { Users, Phone, MapPin, Mail, School } from 'lucide-react';

const Escolas = () => {
  const { schools, loading } = useSchools();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="bg-education-primary text-white py-16">
            <div className="araraquara-container">
              <h1 className="text-4xl font-bold mb-4">Nossas Escolas</h1>
              <p className="text-xl">Carregando informações das escolas...</p>
            </div>
          </div>
          
          <div className="py-16">
            <div className="araraquara-container">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-lg h-64"></div>
                  </div>
                ))}
              </div>
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
            <h1 className="text-4xl font-bold mb-4">Nossas Escolas</h1>
            <p className="text-xl">
              Conheça as {schools.length} unidades educacionais da rede municipal
            </p>
          </div>
        </div>
        
        <div className="py-16">
          <div className="araraquara-container">
            {schools.length === 0 ? (
              <div className="text-center py-12">
                <School className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Nenhuma escola cadastrada
                </h3>
                <p className="text-gray-500">
                  As escolas aparecerão aqui quando forem cadastradas no sistema.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schools.map((school) => (
                  <Card key={school.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {school.type}
                        </Badge>
                        {!school.active && (
                          <Badge variant="destructive" className="text-xs">
                            Inativa
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-education-primary">{school.name}</CardTitle>
                      {school.description && (
                        <CardDescription className="line-clamp-2">
                          {school.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {school.director && (
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-gray-500" />
                          <span><strong>Diretor(a):</strong> {school.director}</span>
                        </div>
                      )}
                      
                      {school.address && (
                        <div className="flex items-start text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                          <span><strong>Endereço:</strong> {school.address}</span>
                        </div>
                      )}

                      {school.contacts && school.contacts.length > 0 && (
                        <div className="space-y-1">
                          {school.contacts.slice(0, 2).map((contact) => (
                            <div key={contact.id} className="flex items-center text-sm">
                              {contact.type === 'email' ? (
                                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                              ) : (
                                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                              )}
                              <span>
                                {contact.label && <strong>{contact.label}:</strong>} {contact.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="grid grid-cols-3 gap-2 text-center text-sm bg-gray-50 rounded-lg p-3">
                        <div>
                          <div className="font-semibold text-education-primary">{school.students}</div>
                          <div className="text-gray-500 text-xs">Alunos</div>
                        </div>
                        <div>
                          <div className="font-semibold text-education-primary">{school.teachers}</div>
                          <div className="text-gray-500 text-xs">Professores</div>
                        </div>
                        <div>
                          <div className="font-semibold text-education-primary">{school.classes}</div>
                          <div className="text-gray-500 text-xs">Turmas</div>
                        </div>
                      </div>

                      <Button asChild className="w-full">
                        <Link to={`/escola/${school.id}`}>
                          Ver detalhes da escola
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Escolas;
