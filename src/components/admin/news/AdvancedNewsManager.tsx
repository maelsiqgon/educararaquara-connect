
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Calendar, Clock, Image, Video, FileText, Eye, Edit, Trash2, Send, Save } from "lucide-react";
import WysiwygEditor from "../WysiwygEditor";
import ImageUploader from "../ImageUploader";

interface AdvancedNews {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  featured: boolean;
  image?: string;
  gallery?: string[];
  video?: string;
  attachments?: { name: string; url: string; type: string }[];
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  scheduledAt?: string;
  views: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  socialMedia: {
    facebookPost?: string;
    instagramPost?: string;
    autoPost: boolean;
  };
}

const AdvancedNewsManager = () => {
  const [news, setNews] = useState<AdvancedNews[]>([
    {
      id: 1,
      title: "Início do Ano Letivo 2025",
      slug: "inicio-ano-letivo-2025",
      content: "<p>As aulas da rede municipal iniciam no dia 10 de fevereiro com novidades no currículo.</p>",
      excerpt: "As aulas da rede municipal iniciam no dia 10 de fevereiro com novidades no currículo.",
      status: "published",
      featured: true,
      image: "/placeholder.svg",
      gallery: ["/placeholder.svg", "/placeholder.svg"],
      category: "Educação",
      tags: ["educação", "ano letivo", "2025"],
      author: "Secretaria de Educação",
      createdAt: "2025-01-15T10:00:00Z",
      updatedAt: "2025-01-15T10:00:00Z",
      publishedAt: "2025-01-15T10:00:00Z",
      views: 1250,
      seo: {
        metaTitle: "Início do Ano Letivo 2025 - Secretaria de Educação",
        metaDescription: "Confira as novidades para o ano letivo de 2025 na rede municipal de ensino",
        keywords: ["educação", "ano letivo", "araraquara"]
      },
      socialMedia: {
        autoPost: true
      }
    }
  ]);

  const [selectedNews, setSelectedNews] = useState<AdvancedNews | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState("list");
  const [filters, setFilters] = useState({
    status: "all",
    category: "all",
    search: ""
  });

  const categories = ["Educação", "Eventos", "Infraestrutura", "Projetos", "Matrículas"];
  const statusOptions = [
    { value: "draft", label: "Rascunho", color: "bg-gray-100 text-gray-800" },
    { value: "scheduled", label: "Agendado", color: "bg-yellow-100 text-yellow-800" },
    { value: "published", label: "Publicado", color: "bg-green-100 text-green-800" },
    { value: "archived", label: "Arquivado", color: "bg-red-100 text-red-800" }
  ];

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

  const handleCreateNews = () => {
    setSelectedNews({
      id: 0,
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      status: "draft",
      featured: false,
      category: categories[0],
      tags: [],
      author: "Administrador",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: []
      },
      socialMedia: {
        autoPost: false
      }
    });
    setIsCreating(true);
    setActiveTab("form");
  };

  const handleEditNews = (newsItem: AdvancedNews) => {
    setSelectedNews(newsItem);
    setIsCreating(false);
    setActiveTab("form");
  };

  const handleSaveNews = (publish: boolean = false) => {
    if (!selectedNews) return;

    if (!selectedNews.title.trim()) {
      toast.error("Título é obrigatório!");
      return;
    }

    const updatedNews = {
      ...selectedNews,
      slug: selectedNews.slug || generateSlug(selectedNews.title),
      updatedAt: new Date().toISOString(),
      status: publish ? "published" : selectedNews.status,
      publishedAt: publish ? new Date().toISOString() : selectedNews.publishedAt
    };

    if (isCreating) {
      const newNews = {
        ...updatedNews,
        id: Math.max(...news.map(n => n.id)) + 1
      };
      setNews([...news, newNews]);
      toast.success(`Notícia ${publish ? 'publicada' : 'salva'} com sucesso!`);
    } else {
      setNews(news.map(n => n.id === selectedNews.id ? updatedNews : n));
      toast.success(`Notícia ${publish ? 'publicada' : 'atualizada'} com sucesso!`);
    }

    setSelectedNews(null);
    setIsCreating(false);
    setActiveTab("list");
  };

  const handleScheduleNews = () => {
    if (!selectedNews?.scheduledAt) {
      toast.error("Defina uma data para agendamento!");
      return;
    }

    const updatedNews = {
      ...selectedNews!,
      status: "scheduled" as const,
      updatedAt: new Date().toISOString()
    };

    if (isCreating) {
      const newNews = {
        ...updatedNews,
        id: Math.max(...news.map(n => n.id)) + 1
      };
      setNews([...news, newNews]);
    } else {
      setNews(news.map(n => n.id === selectedNews!.id ? updatedNews : n));
    }

    toast.success("Notícia agendada com sucesso!");
    setSelectedNews(null);
    setIsCreating(false);
    setActiveTab("list");
  };

  const handleDeleteNews = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta notícia?")) {
      setNews(news.filter(n => n.id !== id));
      toast.success("Notícia excluída com sucesso!");
    }
  };

  const addAttachment = () => {
    if (!selectedNews) return;
    
    const newAttachment = {
      name: "Documento.pdf",
      url: "/documents/documento.pdf",
      type: "application/pdf"
    };

    setSelectedNews({
      ...selectedNews,
      attachments: [...(selectedNews.attachments || []), newAttachment]
    });
  };

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(s => s.value === status);
    return statusOption?.color || "bg-gray-100 text-gray-800";
  };

  const filteredNews = news.filter(item => {
    const matchesStatus = filters.status === "all" || item.status === filters.status;
    const matchesCategory = filters.category === "all" || item.category === filters.category;
    const matchesSearch = !filters.search || 
      item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.content.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Sistema Avançado de Notícias
        </CardTitle>
        <CardDescription>
          Criação, edição e publicação de notícias com recursos multimídia e agendamento
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">Notícias</TabsTrigger>
            <TabsTrigger value="form">Editor</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-wrap gap-4 items-center">
                <Input
                  placeholder="Buscar notícias..."
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  className="w-64"
                />
                <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    {statusOptions.map(status => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleCreateNews} className="bg-education-primary hover:bg-education-dark">
                <FileText className="h-4 w-4 mr-2" />
                Nova Notícia
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Visualizações</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNews.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          {item.featured && <Badge variant="secondary">Destaque</Badge>}
                          {item.image && <Image className="h-4 w-4" />}
                          {item.video && <Video className="h-4 w-4" />}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {statusOptions.find(s => s.value === item.status)?.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-gray-400" />
                        {item.views.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(item.createdAt).toLocaleDateString('pt-BR')}</div>
                        {item.scheduledAt && (
                          <div className="text-yellow-600 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(item.scheduledAt).toLocaleDateString('pt-BR')}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditNews(item)}
                          className="text-education-primary hover:text-education-dark"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteNews(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="form" className="space-y-6">
            {selectedNews && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    {isCreating ? "Nova Notícia" : "Editar Notícia"}
                  </h3>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setActiveTab("list")}>
                      Voltar
                    </Button>
                    <Button variant="outline" onClick={() => handleSaveNews(false)}>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Rascunho
                    </Button>
                    <Button variant="outline" onClick={handleScheduleNews}>
                      <Clock className="h-4 w-4 mr-2" />
                      Agendar
                    </Button>
                    <Button onClick={() => handleSaveNews(true)} className="bg-education-primary hover:bg-education-dark">
                      <Send className="h-4 w-4 mr-2" />
                      Publicar
                    </Button>
                  </div>
                </div>

                <Tabs defaultValue="content" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="content">Conteúdo</TabsTrigger>
                    <TabsTrigger value="media">Mídia</TabsTrigger>
                    <TabsTrigger value="seo">SEO</TabsTrigger>
                    <TabsTrigger value="social">Redes Sociais</TabsTrigger>
                    <TabsTrigger value="schedule">Agendamento</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="news-title">Título *</Label>
                        <Input
                          id="news-title"
                          value={selectedNews.title}
                          onChange={(e) => {
                            const title = e.target.value;
                            setSelectedNews({
                              ...selectedNews,
                              title,
                              slug: generateSlug(title)
                            });
                          }}
                          className="border-gray-300 focus-visible:ring-education-primary"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="news-slug">URL (slug)</Label>
                        <Input
                          id="news-slug"
                          value={selectedNews.slug}
                          onChange={(e) => setSelectedNews({...selectedNews, slug: e.target.value})}
                          className="border-gray-300 focus-visible:ring-education-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="news-category">Categoria</Label>
                        <Select 
                          value={selectedNews.category} 
                          onValueChange={(value) => setSelectedNews({...selectedNews, category: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
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
                        <Label htmlFor="news-tags">Tags (separadas por vírgula)</Label>
                        <Input
                          id="news-tags"
                          value={selectedNews.tags.join(', ')}
                          onChange={(e) => setSelectedNews({
                            ...selectedNews,
                            tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                          })}
                          className="border-gray-300 focus-visible:ring-education-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="news-excerpt">Resumo</Label>
                      <Textarea
                        id="news-excerpt"
                        value={selectedNews.excerpt}
                        onChange={(e) => setSelectedNews({...selectedNews, excerpt: e.target.value})}
                        className="border-gray-300 focus-visible:ring-education-primary"
                        rows={3}
                        maxLength={200}
                      />
                      <p className="text-xs text-gray-500">
                        {selectedNews.excerpt.length}/200 caracteres
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Conteúdo *</Label>
                      <WysiwygEditor
                        initialValue={selectedNews.content}
                        onChange={(content) => setSelectedNews({...selectedNews, content})}
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={selectedNews.featured}
                          onCheckedChange={(featured) => setSelectedNews({...selectedNews, featured})}
                        />
                        <Label>Notícia em destaque</Label>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="media" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-medium">Imagem Principal</Label>
                        <ImageUploader
                          initialImage={selectedNews.image}
                          onImageChange={(image) => setSelectedNews({...selectedNews, image})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="news-video">Vídeo (URL do YouTube/Vimeo)</Label>
                        <Input
                          id="news-video"
                          value={selectedNews.video || ""}
                          onChange={(e) => setSelectedNews({...selectedNews, video: e.target.value})}
                          className="border-gray-300 focus-visible:ring-education-primary"
                          placeholder="https://www.youtube.com/watch?v=..."
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label className="text-base font-medium">Anexos</Label>
                          <Button variant="outline" onClick={addAttachment}>
                            Adicionar Anexo
                          </Button>
                        </div>
                        {selectedNews.attachments?.map((attachment, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded">
                            <span>{attachment.name}</span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                const newAttachments = selectedNews.attachments?.filter((_, i) => i !== index);
                                setSelectedNews({...selectedNews, attachments: newAttachments});
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="seo" className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="meta-title">Título SEO</Label>
                        <Input
                          id="meta-title"
                          value={selectedNews.seo.metaTitle}
                          onChange={(e) => setSelectedNews({
                            ...selectedNews,
                            seo: {...selectedNews.seo, metaTitle: e.target.value}
                          })}
                          className="border-gray-300 focus-visible:ring-education-primary"
                          maxLength={60}
                        />
                        <p className="text-xs text-gray-500">
                          {selectedNews.seo.metaTitle.length}/60 caracteres
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="meta-description">Meta Descrição</Label>
                        <Textarea
                          id="meta-description"
                          value={selectedNews.seo.metaDescription}
                          onChange={(e) => setSelectedNews({
                            ...selectedNews,
                            seo: {...selectedNews.seo, metaDescription: e.target.value}
                          })}
                          className="border-gray-300 focus-visible:ring-education-primary"
                          maxLength={160}
                          rows={3}
                        />
                        <p className="text-xs text-gray-500">
                          {selectedNews.seo.metaDescription.length}/160 caracteres
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="keywords">Palavras-chave (separadas por vírgula)</Label>
                        <Input
                          id="keywords"
                          value={selectedNews.seo.keywords.join(', ')}
                          onChange={(e) => setSelectedNews({
                            ...selectedNews,
                            seo: {
                              ...selectedNews.seo,
                              keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)
                            }
                          })}
                          className="border-gray-300 focus-visible:ring-education-primary"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="social" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={selectedNews.socialMedia.autoPost}
                          onCheckedChange={(checked) => setSelectedNews({
                            ...selectedNews,
                            socialMedia: {...selectedNews.socialMedia, autoPost: checked}
                          })}
                        />
                        <Label>Publicar automaticamente nas redes sociais</Label>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="facebook-post">Texto para Facebook</Label>
                        <Textarea
                          id="facebook-post"
                          value={selectedNews.socialMedia.facebookPost || ""}
                          onChange={(e) => setSelectedNews({
                            ...selectedNews,
                            socialMedia: {...selectedNews.socialMedia, facebookPost: e.target.value}
                          })}
                          className="border-gray-300 focus-visible:ring-education-primary"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="instagram-post">Texto para Instagram</Label>
                        <Textarea
                          id="instagram-post"
                          value={selectedNews.socialMedia.instagramPost || ""}
                          onChange={(e) => setSelectedNews({
                            ...selectedNews,
                            socialMedia: {...selectedNews.socialMedia, instagramPost: e.target.value}
                          })}
                          className="border-gray-300 focus-visible:ring-education-primary"
                          rows={3}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="schedule" className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="scheduled-date">Data de Publicação</Label>
                        <Input
                          id="scheduled-date"
                          type="datetime-local"
                          value={selectedNews.scheduledAt?.slice(0, 16) || ""}
                          onChange={(e) => setSelectedNews({
                            ...selectedNews,
                            scheduledAt: e.target.value ? new Date(e.target.value).toISOString() : undefined
                          })}
                          className="border-gray-300 focus-visible:ring-education-primary"
                        />
                      </div>

                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-medium text-yellow-800 mb-2">Agendamento</h4>
                        <p className="text-sm text-yellow-700">
                          Quando você agendar uma notícia, ela será automaticamente publicada na data e hora especificadas.
                          Você pode alterar ou cancelar o agendamento a qualquer momento antes da publicação.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-education-primary">{news.length}</div>
                    <p className="text-sm text-gray-600">Total de Notícias</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {news.filter(n => n.status === 'published').length}
                    </div>
                    <p className="text-sm text-gray-600">Publicadas</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {news.filter(n => n.status === 'scheduled').length}
                    </div>
                    <p className="text-sm text-gray-600">Agendadas</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {news.reduce((total, n) => total + n.views, 0).toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">Total de Visualizações</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Notícias Mais Visualizadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {news
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((item, index) => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-gray-500">{item.category}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{item.views.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">visualizações</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedNewsManager;
