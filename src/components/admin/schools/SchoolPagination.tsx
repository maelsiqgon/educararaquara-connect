
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockSchools } from '../mockData';
import { School, Users, GraduationCap, Eye, Edit, MapPin, Phone } from "lucide-react";

interface School {
  id: number;
  name: string;
  type: string;
  director: string;
  address: string;
  phone: string;
  students: number;
  classes: number;
  image?: string;
}

const SchoolPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const schoolTypes = ["all", "Educação Infantil", "Ensino Fundamental", "Centro Municipal"];

  const filteredSchools = mockSchools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || school.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSchools = filteredSchools.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <Button key={1} variant="outline" onClick={() => handlePageChange(1)}>
          1
        </Button>
      );
      if (startPage > 2) {
        buttons.push(<span key="start-ellipsis">...</span>);
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? "bg-education-primary hover:bg-education-dark" : ""}
        >
          {page}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="end-ellipsis">...</span>);
      }
      buttons.push(
        <Button key={totalPages} variant="outline" onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary flex items-center">
          <School className="h-5 w-5 mr-2" />
          Gestão de Escolas - Lista Paginada
        </CardTitle>
        <CardDescription>
          Visualização paginada das escolas da rede municipal
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Filtros */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <Input
                placeholder="Buscar escolas..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-64"
              />
              <Select value={filterType} onValueChange={(value) => {
                setFilterType(value);
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {schoolTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "all" ? "Todos os tipos" : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Itens por página:</span>
              <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="24">24</SelectItem>
                  <SelectItem value="48">48</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Informações da busca */}
          <div className="text-sm text-gray-600">
            Mostrando {startIndex + 1}-{Math.min(endIndex, filteredSchools.length)} de {filteredSchools.length} escolas
            {searchTerm && ` para "${searchTerm}"`}
          </div>

          {/* Grid de Escolas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentSchools.map((school) => (
              <Card key={school.id} className="hover:shadow-lg transition-shadow border">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-education-light text-education-primary">
                        {school.type}
                      </Badge>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-center">
                      <img 
                        src={school.image || "/placeholder.svg"} 
                        alt={school.name}
                        className="w-16 h-16 mx-auto rounded-lg object-cover mb-2"
                      />
                      <h3 className="font-semibold text-sm text-education-primary line-clamp-2 min-h-[2.5rem]">
                        {school.name}
                      </h3>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-600 truncate">{school.address}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-600">{school.phone}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-education-primary">
                          <Users className="h-3 w-3" />
                          <span className="font-semibold text-sm">{school.students}</span>
                        </div>
                        <p className="text-xs text-gray-500">Alunos</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-education-primary">
                          <GraduationCap className="h-3 w-3" />
                          <span className="font-semibold text-sm">{school.classes}</span>
                        </div>
                        <p className="text-xs text-gray-500">Turmas</p>
                      </div>
                    </div>

                    <Button size="sm" className="w-full text-xs bg-education-primary hover:bg-education-dark">
                      Acessar Painel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Anterior
                </Button>
                
                <div className="flex items-center gap-1">
                  {renderPaginationButtons()}
                </div>
                
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Próximo
                </Button>
              </div>
              
              <div className="text-sm text-gray-600">
                Página {currentPage} de {totalPages}
              </div>
            </div>
          )}

          {/* Resultado vazio */}
          {filteredSchools.length === 0 && (
            <div className="text-center py-12">
              <School className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Nenhuma escola encontrada
              </h3>
              <p className="text-gray-500">
                Tente ajustar os filtros ou termos de busca
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolPagination;
