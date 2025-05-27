
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSchools } from '@/hooks/useSchools';
import { School, Settings, Eye, Edit, Plus, Loader2, Users, GraduationCap, Building } from "lucide-react";
import { Link } from "react-router-dom";

const SchoolContentManager = () => {
  const { schools, loading } = useSchools();

  if (loading) {
    return (
      <Card className="border-0 shadow-soft">
        <CardContent className="pt-6 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-education-primary">Gestão de Escolas</CardTitle>
            <CardDescription>
              Gerencie as escolas da rede municipal e seus painéis administrativos
            </CardDescription>
          </div>
          <Button asChild className="bg-education-primary hover:bg-education-dark">
            <Link to="/admin/escolas/criar">
              <Plus className="h-4 w-4 mr-2" />
              Nova Escola
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {schools.length === 0 ? (
          <div className="text-center py-12">
            <School className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Nenhuma escola cadastrada
            </h3>
            <p className="text-gray-500 mb-4">
              Comece criando a primeira escola da rede.
            </p>
            <Button asChild className="bg-education-primary hover:bg-education-dark">
              <Link to="/admin/escolas/criar">
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeira Escola
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((school) => (
              <Card key={school.id} className="border hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-education-primary line-clamp-2">
                        {school.name}
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Building className="h-4 w-4 mr-1" />
                        {school.type}
                      </CardDescription>
                    </div>
                    <Badge className={school.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {school.active ? 'Ativa' : 'Inativa'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {school.director && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Diretor(a):</span>
                        <span className="font-medium text-right flex-1 ml-2 truncate">{school.director}</span>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div className="flex flex-col items-center">
                        <Users className="h-4 w-4 text-education-primary mb-1" />
                        <span className="font-semibold text-education-primary">{school.students}</span>
                        <span className="text-xs text-gray-500">Alunos</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <GraduationCap className="h-4 w-4 text-education-primary mb-1" />
                        <span className="font-semibold text-education-primary">{school.teachers}</span>
                        <span className="text-xs text-gray-500">Professores</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Building className="h-4 w-4 text-education-primary mb-1" />
                        <span className="font-semibold text-education-primary">{school.classes}</span>
                        <span className="text-xs text-gray-500">Turmas</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button asChild className="w-full bg-education-primary hover:bg-education-dark">
                      <Link to={`/admin/escola/${school.id}`}>
                        <Settings className="h-4 w-4 mr-2" />
                        Painel da Escola
                      </Link>
                    </Button>
                    <div className="flex space-x-2">
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <Link to={`/escolas/${school.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <Link to={`/admin/escolas/editar/${school.id}`}>
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SchoolContentManager;
