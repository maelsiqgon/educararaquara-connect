
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockSchools } from "@/components/admin/mockData";
import { Search, MapPin, Phone, Users, GraduationCap, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const SchoolsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const schoolTypes = ["all", "Educação Infantil", "Ensino Fundamental", "EMEI", "EMEF"];

  const filteredSchools = mockSchools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || school.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <section className="py-16 bg-gradient-to-br from-education-light to-white">
      <div className="araraquara-container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-education-primary mb-4">
            Nossas Escolas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça as unidades educacionais da rede municipal de Araraquara. 
            Cada escola com sua identidade única e compromisso com a excelência educacional.
          </p>
        </div>

        {/* Filtros Interativos */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Buscar por nome ou endereço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus-visible:ring-education-primary"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {schoolTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className={selectedType === type ? "bg-education-primary hover:bg-education-dark" : ""}
                >
                  {type === "all" ? "Todas" : type}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            Encontradas {filteredSchools.length} escolas
          </div>
        </div>

        {/* Grid de Escolas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSchools.map((school) => (
            <Card key={school.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-education-primary group-hover:text-education-dark transition-colors line-clamp-2">
                      {school.name}
                    </CardTitle>
                    <Badge variant="secondary" className="mt-2 bg-education-light text-education-primary">
                      {school.type}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-education-primary hover:text-education-dark"
                    asChild
                  >
                    <Link to={`/escola/${school.id}`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 line-clamp-2">{school.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{school.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-education-primary">
                      <Users className="h-4 w-4" />
                      <span className="font-semibold">{school.students}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Alunos</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-education-primary">
                      <GraduationCap className="h-4 w-4" />
                      <span className="font-semibold">{school.classes}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Turmas</p>
                  </div>
                </div>

                <div className="pt-3">
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Direção:</strong> {school.director}
                  </p>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-education-primary hover:bg-education-dark"
                      asChild
                    >
                      <Link to={`/escola/${school.id}`}>
                        Ver Mais
                      </Link>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 border-education-primary text-education-primary hover:bg-education-light"
                    >
                      Contato
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSchools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhuma escola encontrada
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros ou termos de busca
            </p>
          </div>
        )}

        {/* Estatísticas */}
        <div className="mt-16 bg-education-primary rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">{mockSchools.length}</div>
              <div className="text-education-light">Escolas Municipais</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {mockSchools.reduce((acc, school) => acc + parseInt(school.students.toString()), 0).toLocaleString()}
              </div>
              <div className="text-education-light">Alunos Matriculados</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {mockSchools.reduce((acc, school) => acc + parseInt(school.classes.toString()), 0)}
              </div>
              <div className="text-education-light">Turmas Ativas</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-education-light">Cobertura Municipal</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolsSection;
