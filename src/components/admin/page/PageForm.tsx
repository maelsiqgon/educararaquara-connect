
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import WysiwygEditor from "../WysiwygEditor";
import ImageUploader from "../ImageUploader";

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft';
  featured: boolean;
  image_url?: string;
  category: string;
  author_id?: string;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

interface PageFormProps {
  page: Page;
  isCreating: boolean;
  categories: string[];
  onSave: () => void;
  onCancel: () => void;
  onPageChange: (page: Page) => void;
}

const PageForm: React.FC<PageFormProps> = ({
  page,
  isCreating,
  categories,
  onSave,
  onCancel,
  onPageChange
}) => {
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

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
              value={page.title}
              onChange={(e) => {
                const title = e.target.value;
                onPageChange({
                  ...page, 
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
              value={page.slug}
              onChange={(e) => onPageChange({...page, slug: e.target.value})}
              className="border-gray-300 focus-visible:ring-education-primary"
              placeholder="url-da-pagina"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="page-category">Categoria</Label>
            <Select 
              value={page.category} 
              onValueChange={(value) => onPageChange({...page, category: value})}
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
              value={page.tags?.join(', ') || ''}
              onChange={(e) => onPageChange({
                ...page, 
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
            value={page.meta_description || ""}
            onChange={(e) => onPageChange({...page, meta_description: e.target.value})}
            className="border-gray-300 focus-visible:ring-education-primary"
            placeholder="Descrição para mecanismos de busca (até 160 caracteres)"
            maxLength={160}
          />
          <p className="text-xs text-gray-500">
            {page.meta_description?.length || 0}/160 caracteres
          </p>
        </div>

        <div className="space-y-2">
          <Label>Imagem de Destaque</Label>
          <ImageUploader
            initialImage={page.image_url}
            onImageChange={(image) => onPageChange({...page, image_url: image})}
          />
        </div>

        <div className="space-y-2">
          <Label>Conteúdo *</Label>
          <WysiwygEditor
            initialValue={page.content}
            onChange={(content) => onPageChange({...page, content})}
          />
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center space-x-2">
            <Switch
              checked={page.status === 'published'}
              onCheckedChange={(checked) => 
                onPageChange({...page, status: checked ? 'published' : 'draft'})
              }
            />
            <Label>Publicar página</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              checked={page.featured}
              onCheckedChange={(featured) => onPageChange({...page, featured})}
            />
            <Label>Página em destaque</Label>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            onClick={onSave}
            className="bg-education-primary hover:bg-education-dark"
          >
            {isCreating ? "Criar Página" : "Salvar Alterações"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageForm;
