
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Plus, Edit, Trash2, Eye, ToggleLeft, ToggleRight, Star, StarOff } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Page } from '@/hooks/usePages';

interface PageListProps {
  pages: Page[];
  searchTerm: string;
  statusFilter: string;
  categoryFilter: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onCategoryFilterChange: (value: string) => void;
  onCreatePage: () => void;
  onEditPage: (page: Page) => void;
  onDeletePage: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onToggleFeatured: (id: string) => void;
  onPreview: (page: Page) => void;
}

const PageList: React.FC<PageListProps> = ({
  pages,
  searchTerm,
  statusFilter,
  categoryFilter,
  categories,
  onSearchChange,
  onStatusFilterChange,
  onCategoryFilterChange,
  onCreatePage,
  onEditPage,
  onDeletePage,
  onToggleStatus,
  onToggleFeatured,
  onPreview
}) => {
  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || page.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-education-primary">Gerenciar Páginas</CardTitle>
            <CardDescription>
              Gerencie todas as páginas do portal
            </CardDescription>
          </div>
          <Button 
            onClick={onCreatePage}
            className="bg-education-primary hover:bg-education-dark"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Página
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="search">Buscar</Label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Buscar páginas..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="published">Publicado</SelectItem>
                <SelectItem value="draft">Rascunho</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end">
            <div className="text-sm text-gray-500">
              {filteredPages.length} página(s) encontrada(s)
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Lista de páginas */}
        <div className="space-y-4">
          {filteredPages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500">
                {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' 
                  ? 'Nenhuma página encontrada com os filtros aplicados.'
                  : 'Nenhuma página criada ainda. Clique em "Nova Página" para começar.'
                }
              </div>
            </div>
          ) : (
            filteredPages.map((page) => (
              <Card key={page.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{page.title}</h3>
                        <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                          {page.status === 'published' ? 'Publicado' : 'Rascunho'}
                        </Badge>
                        <Badge variant="outline">{page.category}</Badge>
                        {page.featured && (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                            <Star className="h-3 w-3 mr-1" />
                            Destaque
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2">
                        Slug: /{page.slug}
                      </p>
                      
                      <p className="text-gray-500 text-sm">
                        Criado em {format(new Date(page.created_at), 'dd/MM/yyyy às HH:mm', { locale: ptBR })}
                      </p>
                      
                      {page.meta_description && (
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                          {page.meta_description}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onPreview(page)}
                        title="Visualizar"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onToggleStatus(page.id)}
                        title={page.status === 'published' ? 'Despublicar' : 'Publicar'}
                      >
                        {page.status === 'published' ? (
                          <ToggleRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ToggleLeft className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onToggleFeatured(page.id)}
                        title={page.featured ? 'Remover destaque' : 'Destacar página'}
                      >
                        {page.featured ? (
                          <Star className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <StarOff className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEditPage(page)}
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDeletePage(page.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PageList;
