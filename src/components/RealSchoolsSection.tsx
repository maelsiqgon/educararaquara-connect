
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSchools } from '@/hooks/useSchools';
import { School, Users, Phone, MapPin } from 'lucide-react';

const RealSchoolsSection = () => {
  const { schools, loading } = useSchools();

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="araraquara-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-education-primary mb-4">
              Nossas Escolas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Carregando informações das escolas...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-lg h-64"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const displaySchools = schools.slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="araraquara-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-education-primary mb-4">
            Nossas Escolas
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conheça as unidades educacionais da rede municipal de Araraquara. 
            {schools.length > 0 && ` ${schools.length} escolas ativas na rede.`}
          </p>
        </div>

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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {displaySchools.map((school) => (
                <Card key={school.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-education-primary line-clamp-2">
                          {school.name}
                        </CardTitle>
                        <CardDescription className="text-sm font-medium">
                          {school.type}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {school.director && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>Dir.: {school.director}</span>
                      </div>
                    )}
                    
                    {school.address && (
                      <div className="flex items-start text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{school.address}</span>
                      </div>
                    )}

                    {school.contacts && school.contacts.length > 0 && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{school.contacts[0].value}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
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

                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/escola/${school.id}`}>
                        Ver detalhes
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button asChild variant="outline" size="lg">
                <Link to="/escolas">
                  Ver todas as escolas ({schools.length})
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RealSchoolsSection;
