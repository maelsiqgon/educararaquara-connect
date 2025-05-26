
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { mockSchools } from './mockData';
import { School, Settings, Eye, Edit } from "lucide-react";
import { Link } from "react-router-dom";

const SchoolContentManager = () => {
  const [schools] = useState(mockSchools);

  const handleCreateSchool = () => {
    toast.success("Nova escola criada com sucesso!");
  };

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary">Gestão de Escolas</CardTitle>
        <CardDescription>
          Gerencie as escolas da rede municipal e seus painéis administrativos
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Escolas Cadastradas</h3>
            <Button className="bg-education-primary hover:bg-education-dark">
              <School className="h-4 w-4 mr-2" />
              Nova Escola
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((school) => (
              <Card key={school.id} className="border hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-education-primary">{school.name}</CardTitle>
                      <CardDescription>{school.type}</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Ativa
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Diretor(a):</span>
                      <span className="font-medium">{school.director}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Alunos:</span>
                      <span className="font-medium">{school.students}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Turmas:</span>
                      <span className="font-medium">{school.classes}</span>
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
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Cadastrar Nova Escola</CardTitle>
              <CardDescription>
                Adicione uma nova escola à rede municipal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-school-name">Nome da Escola</Label>
                    <Input 
                      id="new-school-name" 
                      placeholder="Ex: EMEF Exemplo"
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="school-type">Tipo de Ensino</Label>
                    <select 
                      id="school-type" 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-education-primary focus:border-education-primary"
                    >
                      <option value="">Selecione o tipo</option>
                      <option value="EMEI">Educação Infantil (EMEI)</option>
                      <option value="EMEF">Ensino Fundamental (EMEF)</option>
                      <option value="CEMEI">Centro Municipal (CEMEI)</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="director-name">Diretor(a)</Label>
                    <Input 
                      id="director-name" 
                      placeholder="Nome do diretor"
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="school-phone">Telefone</Label>
                    <Input 
                      id="school-phone" 
                      placeholder="(16) 3333-0000"
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="school-address">Endereço</Label>
                  <Input 
                    id="school-address" 
                    placeholder="Endereço completo"
                    className="border-gray-300 focus-visible:ring-education-primary"
                  />
                </div>
                
                <Button onClick={handleCreateSchool} className="bg-education-primary hover:bg-education-dark">
                  Cadastrar Escola
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolContentManager;
