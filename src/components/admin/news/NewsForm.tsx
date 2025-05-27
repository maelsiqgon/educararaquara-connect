
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import FileUploadComponent from '@/components/admin/FileUploadComponent';
import { useNews } from '@/hooks/useNews';
import { useNewsCategories } from '@/hooks/useNewsCategories';
import { useSchools } from '@/hooks/useSchools';
import { toast } from 'sonner';
import { Calendar, Eye, Save, Send } from 'lucide-react';

interface NewsFormProps {
  newsId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const NewsForm: React.FC<NewsFormProps> = ({ newsId, onSuccess, onCancel }) => {
  const { news, createNews, updateNews, getNewsById } = useNews();
  const { categories } = useNewsCategories();
  const { schools } = useSchools();
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    status: 'draft' as const,
    featured: false,
    category_id: '',
    school_id: '',
    meta_title: '',
    meta_description: '',
    tags: [] as string[],
    scheduled_at: ''
  });

  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (newsId) {
      const existingNews = news.find(n => n.id === newsId);
      if (existingNews) {
        setFormData({
          title: existingNews.title,
          slug: existingNews.slug,
          excerpt: existingNews.excerpt || '',
          content: existingNews.content,
          image_url: existingNews.image_url || '',
          status: existingNews.status,
          featured: existingNews.featured,
          category_id: existingNews.category_id || '',
          school_id: existingNews.school_id || '',
          meta_title: existingNews.meta_title || '',
          meta_description: existingNews.meta_description || '',
          tags: existingNews.tags || [],
          scheduled_at: existingNews.scheduled_at || ''
        });
      }
    }
  }, [newsId, news]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-gerar slug quando o título muda
    if (field === 'title') {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      
      setFormData(prev => ({
        ...prev,
        slug
      }));
    }
  };

  const handleImageUpload = (result: { url: string; path: string }) => {
    setFormData(prev => ({
      ...prev,
      image_url: result.url
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async (status: 'draft' | 'published') => {
    setIsSubmitting(true);

    try {
      const dataToSave = {
        ...formData,
        status,
        published_at: status === 'published' ? new Date().toISOString() : null
      };

      if (newsId) {
        await updateNews(newsId, dataToSave);
      } else {
        await createNews(dataToSave);
      }
      
      toast.success(
        status === 'published' 
          ? 'Notícia publicada com sucesso!' 
          : 'Rascunho salvo com sucesso!'
      );
      onSuccess?.();
    } catch (error) {
      toast.error('Erro ao salvar notícia');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSchedule = async () => {
    if (!formData.scheduled_at) {
      toast.error('Selecione uma data e hora para agendamento');
      return;
    }

    setIsSubmitting(true);

    try {
      const dataToSave = {
        ...formData,
        status: 'scheduled' as const
      };

      if (newsId) {
        await updateNews(newsId, dataToSave);
      } else {
        await createNews(dataToSave);
      }
      
      toast.success('Notícia agendada com sucesso!');
      onSuccess?.();
    } catch (error) {
      toast.error('Erro ao agendar notícia');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (previewMode) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Preview da Notícia</h2>
          <Button onClick={() => setPreviewMode(false)}>
            Voltar à Edição
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-6">
            {formData.image_url && (
              <img
                src={formData.image_url}
                alt={formData.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            )}
            <h1 className="text-3xl font-bold mb-2">{formData.title}</h1>
            {formData.excerpt && (
              <p className="text-lg text-gray-600 mb-4">{formData.excerpt}</p>
            )}
            <div className="prose max-w-none">
              {formData.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
            {formData.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {newsId ? 'Editar' : 'Criar'} Notícia
        </h2>
        <div className="flex space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setPreviewMode(true)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conteúdo Principal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Título da notícia"
              required
            />
          </div>

          <div>
            <Label htmlFor="slug">URL Amigável</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => handleInputChange('slug', e.target.value)}
              placeholder="url-amigavel-da-noticia"
            />
          </div>

          <div>
            <Label htmlFor="excerpt">Resumo</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              placeholder="Breve resumo da notícia"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="content">Conteúdo *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Conteúdo completo da notícia"
              rows={10}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Imagem de Destaque</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUploadComponent
            bucket="news-images"
            folder="news"
            onUploadSuccess={handleImageUpload}
            accept="image/*"
            label="Imagem da Notícia"
            description="Adicione uma imagem de destaque"
            initialPreview={formData.image_url}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select value={formData.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="school">Escola (opcional)</Label>
              <Select value={formData.school_id} onValueChange={(value) => handleInputChange('school_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma escola" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nenhuma escola</SelectItem>
                  {schools.map(school => (
                    <SelectItem key={school.id} value={school.id}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => handleInputChange('featured', checked)}
            />
            <Label htmlFor="featured">Notícia em destaque</Label>
          </div>

          <Separator />

          <div>
            <Label>Tags</Label>
            <div className="flex space-x-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Nova tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag}>
                Adicionar
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator />

          <div>
            <Label htmlFor="scheduled_at">Agendar Publicação</Label>
            <Input
              id="scheduled_at"
              type="datetime-local"
              value={formData.scheduled_at}
              onChange={(e) => handleInputChange('scheduled_at', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="meta_title">Título SEO</Label>
            <Input
              id="meta_title"
              value={formData.meta_title}
              onChange={(e) => handleInputChange('meta_title', e.target.value)}
              placeholder="Título para mecanismos de busca"
            />
          </div>

          <div>
            <Label htmlFor="meta_description">Descrição SEO</Label>
            <Textarea
              id="meta_description"
              value={formData.meta_description}
              onChange={(e) => handleInputChange('meta_description', e.target.value)}
              placeholder="Descrição para mecanismos de busca"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSave('draft')}
          disabled={isSubmitting}
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar Rascunho
        </Button>

        {formData.scheduled_at && (
          <Button
            type="button"
            variant="outline"
            onClick={handleSchedule}
            disabled={isSubmitting}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Agendar
          </Button>
        )}

        <Button
          type="button"
          onClick={() => handleSave('published')}
          disabled={isSubmitting}
        >
          <Send className="h-4 w-4 mr-2" />
          Publicar
        </Button>
      </div>
    </div>
  );
};

export default NewsForm;
