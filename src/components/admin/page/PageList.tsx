
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Eye, Edit, Settings, Trash2, Search, Plus, File } from "lucide-react";

interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft';
  featured: boolean;
  image?: string;
  category: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  metaDescription?: string;
  tags: string[];
}

interface PageListProps {
  pages: Page[];
  searchTerm: string;
  statusFilter: string;
  categoryFilter: string;
  categories: string[];
  onSearchChange: (term: string) => void;
  onStatusFilterChange: (status: string) => void;
  onCategoryFilterChange: (category: string) => void;
  onCreatePage: () => void;
  onEditPage: (page: Page) => void;
  onDeletePage: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onToggleFeatured: (id: number) => void;
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
    const matchesStatus = statusFilter === "all" || page.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || page.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary">Gerenciamento de Páginas</CardTitle>
        <CardDescription>
          Crie, edite e gerencie todas as páginas do site
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 border-b space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar páginas..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="published">Publicados</SelectItem>
                  <SelectItem value="draft">Rascunhos</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Categoria" />
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
            
            <Button onClick={onCreatePage} className="bg-education-primary hover:bg-education-dark">
              <Plus className="h-4 w-4 mr-2" />
              Nova Página
            </Button>
          </div>
          
          <div className="text-sm text-gray-600">
            Exibindo {filteredPages.length} de {pages.length} páginas
          </div>
        </div>
        
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Destaque</TableHead>
              <TableHead>Última Atualização</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPages.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-medium">{page.title}</div>
                    {page.metaDescription && (
                      <div className="text-xs text-gray-500 mt-1">
                        {page.metaDescription.length > 50 
                          ? page.metaDescription.substring(0, 50) + '...'
                          : page.metaDescription
                        }
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    {page.category}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-gray-600">/{page.slug}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    page.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {page.status === 'published' ? 'Publicada' : 'Rascunho'}
                  </span>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={page.featured}
                    onCheckedChange={() => onToggleFeatured(page.id)}
                  />
                </TableCell>
                <TableCell className="text-sm text-gray-600">{page.updatedAt}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onPreview(page)}
                      title="Visualizar"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onEditPage(page)}
                      className="text-education-primary hover:text-education-dark"
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onToggleStatus(page.id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Alterar status"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onDeletePage(page.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Excluir"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredPages.length === 0 && (
          <div className="text-center py-12">
            <File className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {searchTerm || statusFilter !== "all" || categoryFilter !== "all" 
                ? "Nenhuma página encontrada com os filtros aplicados" 
                : "Nenhuma página criada ainda"
              }
            </p>
            {!searchTerm && statusFilter === "all" && categoryFilter === "all" && (
              <Button 
                onClick={onCreatePage} 
                className="mt-4 bg-education-primary hover:bg-education-dark"
              >
                <Plus className="h-4 w-4 mr-2" />
                Criar primeira página
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PageList;
