
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Eye, Edit, File, Plus, Settings } from "lucide-react";
import WysiwygEditor from "./WysiwygEditor";
import ImageUploader from "./ImageUploader";

interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft';
  featured: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

const mockPages: Page[] = [
  {
    id: 1,
    title: "Sobre a Secretaria",
    slug: "sobre-secretaria",
    content: "Conteúdo sobre a secretaria...",
    status: 'published',
    featured: true,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-15"
  },
  {
    id: 2,
    title: "História da Educação",
    slug: "historia-educacao",
    content: "História da educação em Araraquara...",
    status: 'published',
    featured: false,
    createdAt: "2025-01-10",
    updatedAt: "2025-01-20"
  }
];

const PageManager = () => {
  const [pages, setPages] = useState<Page[]>(mockPages);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreatePage = () => {
    setEditingPage({
      id: 0,
      title: "",
      slug: "",
      content: "",
      status: 'draft',
      featured: false,
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10)
    });
    setIsCreating(true);
  };

  const handleSavePage = () => {
    if (!editingPage) return;

    if (isCreating) {
      const newPage = {
        ...editingPage,
        id: Math.max(...pages.map(p => p.id)) + 1,
        slug: editingPage.title.toLowerCase().replace(/\s+/g, '-')
      };
      setPages([...pages, newPage]);
      toast.success("Página criada com sucesso!");
    } else {
      setPages(pages.map(p => p.id === editingPage.id ? editingPage : p));
      toast.success("Página atualizada com sucesso!");
    }

    setEditingPage(null);
    setIsCreating(false);
  };

  const handleDeletePage = (id: number) => {
    setPages(pages.filter(p => p.id !== id));
    toast.success("Página removida com sucesso!");
  };

  const togglePageStatus = (id: number) => {
    setPages(pages.map(p => 
      p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p
    ));
    toast.success("Status da página atualizado!");
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
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="page-title">Título da Página</Label>
              <Input
                id="page-title"
                value={editingPage.title}
                onChange={(e) => setEditingPage({...editingPage, title: e.target.value})}
                className="border-gray-300 focus-visible:ring-education-primary"
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

          <div className="space-y-2">
            <Label>Imagem de Destaque</Label>
            <ImageUploader
              initialImage={editingPage.image}
              onImageChange={(image) => setEditingPage({...editingPage, image})}
            />
          </div>

          <div className="space-y-2">
            <Label>Conteúdo</Label>
            <WysiwygEditor
              initialValue={editingPage.content}
              onChange={(content) => setEditingPage({...editingPage, content})}
            />
          </div>

          <div className="flex items-center space-x-4">
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

          <div className="flex justify-end space-x-4">
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
        <div className="p-4 border-b">
          <Button onClick={handleCreatePage} className="bg-education-primary hover:bg-education-dark">
            <Plus className="h-4 w-4 mr-2" />
            Nova Página
          </Button>
        </div>
        
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Destaque</TableHead>
              <TableHead>Última Atualização</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.title}</TableCell>
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
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setEditingPage(page)}
                      className="text-education-primary hover:text-education-dark"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => togglePageStatus(page.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeletePage(page.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PageManager;
