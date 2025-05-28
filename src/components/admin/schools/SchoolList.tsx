
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSchools } from "@/hooks/useSchools";
import { School } from "@/types/school";
import { Edit, Trash2, Plus, Search, Users, GraduationCap, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface SchoolListProps {
  onEdit?: (school: School) => void;
  onDelete?: (schoolId: string) => void;
}

const SchoolList: React.FC<SchoolListProps> = ({ onEdit, onDelete }) => {
  const { schools, loading, deleteSchool } = useSchools();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.director?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || school.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleDelete = async (schoolId: string, schoolName: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a escola "${schoolName}"?`)) {
      try {
        await deleteSchool(schoolId);
        toast.success('Escola excluída com sucesso!');
        onDelete?.(schoolId);
      } catch (error) {
        toast.error('Erro ao excluir escola');
      }
    }
  };

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'infantil': 'Educação Infantil',
      'fundamental': 'Ensino Fundamental',
      'medio': 'Ensino Médio',
      'eja': 'EJA',
      'tecnico': 'Técnico'
    };
    return types[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'infantil': 'bg-pink-100 text-pink-800',
      'fundamental': 'bg-blue-100 text-blue-800',
      'medio': 'bg-green-100 text-green-800',
      'eja': 'bg-purple-100 text-purple-800',
      'tecnico': 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Carregando escolas...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar escolas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="all">Todos os tipos</option>
            <option value="infantil">Educação Infantil</option>
            <option value="fundamental">Ensino Fundamental</option>
            <option value="medio">Ensino Médio</option>
            <option value="eja">EJA</option>
            <option value="tecnico">Técnico</option>
          </select>
          
          <Button asChild>
            <Link to="/admin/schools/create">
              <Plus className="h-4 w-4 mr-2" />
              Nova Escola
            </Link>
          </Button>
        </div>
      </div>

      {/* Schools grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.map((school) => (
          <Card key={school.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-lg leading-tight">{school.name}</CardTitle>
                  <Badge className={getTypeColor(school.type)}>
                    {getTypeLabel(school.type)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {school.director && (
                <div className="text-sm text-gray-600">
                  <strong>Diretor(a):</strong> {school.director}
                </div>
              )}
              
              {school.address && (
                <div className="text-sm text-gray-600">
                  <strong>Endereço:</strong> {school.address}
                </div>
              )}

              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>{school.students || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4 text-green-500" />
                  <span>{school.teachers || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4 text-purple-500" />
                  <span>{school.classes || 0}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex gap-2 pt-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                asChild
              >
                <Link to={`/admin/schools/${school.id}/edit`}>
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Link>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(school.id, school.name)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredSchools.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            {searchTerm || typeFilter !== 'all' 
              ? 'Nenhuma escola encontrada com os filtros aplicados'
              : 'Nenhuma escola cadastrada ainda'
            }
          </div>
          {!searchTerm && typeFilter === 'all' && (
            <Button asChild>
              <Link to="/admin/schools/create">
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar primeira escola
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SchoolList;
