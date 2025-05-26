
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Eye, Edit, File, Plus, Settings, Trash2, Search } from "lucide-react";
import WysiwygEditor from "./WysiwygEditor";
import ImageUploader from "./ImageUploader";
import { mockPages } from './mockData';

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

const PageManager = () => {
  const [pages, setPages] = useState<Page[]>(() => 
    mockPages.map(page => ({
      ...page,
      category: 'Geral',
      author: 'Administrador',
      metaDescription: page.content.substring(0, 150) + '...',
      tags: ['educação', 'araraquara']
    }))
  );
  
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = ['Geral', 'Institucional', 'Educação', 'Eventos', 'Projetos'];

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || page.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || page.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleCreatePage = () => {
    setEditingPage({
      id: 0,
      title: "",
      slug: "",
      content: "",
      status: 'draft',
      featured: false,
      category: 'Geral',
      author: 'Administrador',
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
      metaDescription: "",
      tags: []
    });
    setIsCreating(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const handleSavePage = () => {
    if (!editingPage) return;

    if (!editingPage.title.trim()) {
      toast.error("O título da página é obrigatório!");
      return;
    }

    const slug = editingPage.slug || generateSlug(editingPage.title);
    const now = new Date().toISOString().slice(0, 10);

    if (isCreating) {
      const newPage = {
        ...editingPage,
        id: Math.max(...pages.map(p => p.id)) + 1,
        slug,
        createdAt: now,
        updatedAt: now
      };
      setPages([...pages, newPage]);
      toast.success("Página criada com sucesso!");
    } else {
      setPages(pages.map(p => p.id === editingPage.id ? {...editingPage, slug, updatedAt: now} : p));
      toast.success("Página atualizada com sucesso!");
    }

    setEditingPage(null);
    setIsCreating(false);
  };

  const handleDeletePage = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta página?")) {
      setPages(pages.filter(p => p.id !== id));
      toast.success("Página removida com sucesso!");
    }
  };

  const togglePageStatus = (id: number) => {
    setPages(pages.map(p => 
      p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p
    ));
    toast.success("Status da página atualizado!");
  };

  const handlePreview = (page: Page) => {
    // Em um sistema real, abriria uma nova aba com preview da página
    toast.info(`Visualizando página: ${page.title}`);
  };

  if (editingPage) {
    return (
      <Card className="border-0 shadow-soft">
        <CardHeader className="bg-education-light rounded-t-lg">
          <CardTitle className="text-education-primary">
            {isCreating ? "Criar Nova Página" : "Editar Página"}
          </CardTitle>
          <CardDescription>
            {isCreating ? "Adicione uma nova página ao site" : "Modifique o conteúdo da página"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="page-title">Título da Página *</Label>
              <Input
                id="page-title"
                value={editingPage.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setEditingPage({
                    ...editingPage, 
                    title,
                    slug: generateSlug(title)
                  });
                }}
                className="border-gray-300 focus-visible:ring-education-primary"
                placeholder="Digite o título da página"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="page-slug">URL (slug)</Label>
              <Input
                id="page-slug"
                value={editingPage.slug}
                onChange={(e) => setEditingPage({...editingPage, slug: e.target.value})}
                className="border-gray-300 focus-visible:ring-education-primary"
                placeholder="url-da-pagina"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="page-category">Categoria</Label>
              <Select 
                value={editingPage.category} 
                onValueChange={(value) => setEditingPage({...editingPage, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="page-tags">Tags (separadas por vírgula)</Label>
              <Input
                id="page-tags"
                value={editingPage.tags.join(', ')}
                onChange={(e) => setEditingPage({
                  ...editingPage, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                })}
                className="border-gray-300 focus-visible:ring-education-primary"
                placeholder="educação, araraquara, notícia"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta-description">Meta Descrição (SEO)</Label>
            <Input
              id="meta-description"
              value={editingPage.metaDescription || ""}
              onChange={(e) => setEditingPage({...editingPage, metaDescription: e.target.value})}
              className="border-gray-300 focus-visible:ring-education-primary"
              placeholder="Descrição para mecanismos de busca (até 160 caracteres)"
              maxLength={160}
            />
            <p className="text-xs text-gray-500">
              {editingPage.metaDescription?.length || 0}/160 caracteres
            </p>
          </div>

          <div className="space-y-2">
            <Label>Imagem de Destaque</Label>
            <ImageUploader
              initialImage={editingPage.image}
              onImageChange={(image) => setEditingPage({...editingPage, image})}
            />
          </div>

          <div className="space-y-2">
            <Label>Conteúdo *</Label>
            <WysiwygEditor
              initialValue={editingPage.content}
              onChange={(content) => setEditingPage({...editingPage, content})}
            />
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center space-x-2">
              <Switch
                checked={editingPage.status === 'published'}
                onCheckedChange={(checked) => 
                  setEditingPage({...editingPage, status: checked ? 'published' : 'draft'})
                }
              />
              <Label>Publicar página</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                checked={editingPage.featured}
                onCheckedChange={(featured) => setEditingPage({...editingPage, featured})}
              />
              <Label>Página em destaque</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setEditingPage(null);
                setIsCreating(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSavePage}
              className="bg-education-primary hover:bg-education-dark"
            >
              {isCreating ? "Criar Página" : "Salvar Alterações"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

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
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="published">Publicados</SelectItem>
                  <SelectItem value="draft">Rascunhos</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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
            
            <Button onClick={handleCreatePage} className="bg-education-primary hover:bg-education-dark">
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
                    onCheckedChange={() => {
                      setPages(pages.map(p => 
                        p.id === page.id ? {...p, featured: !p.featured} : p
                      ));
                      toast.success("Status de destaque atualizado!");
                    }}
                  />
                </TableCell>
                <TableCell className="text-sm text-gray-600">{page.updatedAt}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handlePreview(page)}
                      title="Visualizar"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setEditingPage(page)}
                      className="text-education-primary hover:text-education-dark"
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => togglePageStatus(page.id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Alterar status"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeletePage(page.id)}
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
                onClick={handleCreatePage} 
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

export default PageManager;
