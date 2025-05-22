
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { getCurrentUser, logout } from "@/components/AdminProtected";
import { useNavigate } from "react-router-dom";
import DashboardStats from "@/components/admin/DashboardStats";
import WysiwygEditor from "@/components/admin/WysiwygEditor";
import ImageUploader from "@/components/admin/ImageUploader";
import MediaLibrary from "@/components/admin/MediaLibrary";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// Mock data for sections management
const initialSections = [
  { id: 1, name: "Banner Principal", active: true, order: 1 },
  { id: 2, name: "Recursos do Portal", active: true, order: 2 },
  { id: 3, name: "Perfis de Usuário", active: true, order: 3 },
  { id: 4, name: "Últimas Notícias", active: true, order: 4 },
  { id: 5, name: "Aplicativo Mobile", active: true, order: 5 },
  { id: 6, name: "Contato", active: true, order: 6 },
];

// Mock data for news management
const initialNews = [
  {
    id: 1, 
    title: "Matrícula online para o ano letivo 2026 já está disponível", 
    description: "Pais e responsáveis já podem realizar a matrícula dos estudantes para o próximo ano letivo através do portal EducAraraquara.",
    date: "18/05/2025", 
    category: "Matrículas",
    image: "https://www.araraquara.sp.gov.br/imagens/escola.JPG/@@images/image",
    featured: true
  },
  {
    id: 2, 
    title: "Escolas municipais recebem novos laboratórios de informática", 
    description: "A Secretaria de Educação entregou 15 novos laboratórios de informática em escolas da rede municipal, beneficiando mais de 8 mil alunos.",
    date: "12/05/2025", 
    category: "Infraestrutura",
    image: "https://www.araraquara.sp.gov.br/imagens/aula-de-informatica-lab-2.jpeg/@@images/image",
    featured: true
  },
  {
    id: 3, 
    title: "Mostra Cultural reunirá projetos de escolas municipais", 
    description: "Evento acontecerá no Centro Cultural e contará com apresentações de dança, música, teatro e exposições de trabalhos dos alunos.",
    date: "05/05/2025", 
    category: "Eventos",
    image: "https://www.araraquara.sp.gov.br/imagens/cultura-escola.jpeg/@@images/image",
    featured: true
  },
];

const Admin = () => {
  const [sections, setSections] = useState(initialSections);
  const [news, setNews] = useState(initialNews);
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [editingNewsId, setEditingNewsId] = useState<number | null>(null);
  const [editingNewsData, setEditingNewsData] = useState<any>(null);
  const navigate = useNavigate();
  
  // Section management functions
  const toggleSectionActive = (id: number) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, active: !section.active } : section
      )
    );
    toast.success("Status da seção atualizado");
  };

  const updateSectionOrder = (id: number, newOrder: number) => {
    if (newOrder < 1 || newOrder > sections.length) {
      toast.error("Ordem inválida");
      return;
    }
    
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, order: newOrder } : section
      ).sort((a, b) => a.order - b.order)
    );
    toast.success("Ordem da seção atualizada");
  };

  // Drag and drop handler for sections
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Update order numbers
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1
    }));
    
    setSections(updatedItems);
    toast.success("Ordem das seções atualizada");
  };

  // News management functions
  const toggleNewsFeatured = (id: number) => {
    setNews(
      news.map((item) =>
        item.id === id ? { ...item, featured: !item.featured } : item
      )
    );
    toast.success("Status da notícia atualizado");
  };

  const deleteNews = (id: number) => {
    setNews(news.filter((item) => item.id !== id));
    toast.success("Notícia removida com sucesso");
  };
  
  const editNews = (id: number) => {
    const newsItem = news.find(item => item.id === id);
    if (newsItem) {
      setEditingNewsId(id);
      setEditingNewsData({ ...newsItem });
    }
  };
  
  const updateNews = () => {
    if (editingNewsId && editingNewsData) {
      setNews(
        news.map(item => 
          item.id === editingNewsId ? { ...editingNewsData } : item
        )
      );
      setEditingNewsId(null);
      setEditingNewsData(null);
      toast.success("Notícia atualizada com sucesso");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logout realizado com sucesso");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-education-lightgray">
      <header className="bg-education-primary text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
            <div className="flex gap-4 items-center">
              {currentUser && (
                <div className="text-sm text-white mr-4">
                  <span className="opacity-80">Logado como: </span>
                  <span className="font-medium">{currentUser.name}</span>
                  <span className="ml-2 bg-white/20 px-2 py-1 rounded text-xs">
                    {currentUser.role === "super_admin" 
                      ? "Super Admin" 
                      : currentUser.role === "content_editor"
                        ? "Editor de Conteúdo"
                        : "Visualizador"}
                  </span>
                </div>
              )}
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={handleLogout}
              >
                Sair
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <a href="/">Voltar ao Portal</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8 border-0 shadow-soft">
          <CardHeader className="bg-education-light rounded-t-lg">
            <CardTitle className="text-education-primary text-xl">Bem-vindo ao Painel Administrativo</CardTitle>
            <CardDescription>
              Gerenciamento de conteúdo do Portal EducAraraquara
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {currentUser && (
              <div className="mb-4 p-4 bg-education-light/50 rounded-lg">
                <h3 className="font-medium text-education-primary mb-2">Suas Permissões:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {currentUser.permissions.map((permission) => (
                    <div key={permission} className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span className="capitalize">{permission.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <p className="text-education-gray">
              Neste painel, você pode gerenciar as seções, notícias e outros elementos da página inicial.
              Utilize as abas abaixo para navegar entre as diferentes opções de gerenciamento.
            </p>
          </CardContent>
        </Card>
        
        {/* Dashboard Estatísticas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-education-primary mb-6">Dashboard</h2>
          <DashboardStats />
        </div>

        <Tabs defaultValue="sections" className="space-y-6">
          <TabsList className="bg-white shadow-sm border-0 p-1 rounded-lg">
            <TabsTrigger value="sections" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Seções
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Notícias
            </TabsTrigger>
            <TabsTrigger value="banner" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Banner Principal
            </TabsTrigger>
            <TabsTrigger value="menu" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Menu
            </TabsTrigger>
            <TabsTrigger value="media" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
              Biblioteca de Mídias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sections" className="space-y-4">
            <Card className="border-0 shadow-soft">
              <CardHeader className="bg-education-light rounded-t-lg">
                <CardTitle className="text-education-primary">Gerenciamento de Seções</CardTitle>
                <CardDescription>
                  Ative, desative e reorganize as seções da página inicial
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="sections">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <Table>
                          <TableHeader className="bg-gray-50">
                            <TableRow>
                              <TableHead>Nome</TableHead>
                              <TableHead>Ordem</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {sections
                              .sort((a, b) => a.order - b.order)
                              .map((section, index) => (
                                <Draggable 
                                  key={section.id} 
                                  draggableId={`section-${section.id}`} 
                                  index={index}
                                >
                                  {(provided) => (
                                    <TableRow 
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                    >
                                      <TableCell className="font-medium">
                                        <div {...provided.dragHandleProps} className="flex items-center">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="mr-2 text-gray-400 cursor-grab"
                                          >
                                            <path d="M5 9h14M5 15h14" />
                                          </svg>
                                          {section.name}
                                        </div>
                                      </TableCell>
                                      <TableCell>{section.order}</TableCell>
                                      <TableCell>
                                        <div className="flex items-center space-x-2">
                                          <Switch 
                                            id={`section-${section.id}`} 
                                            checked={section.active} 
                                            onCheckedChange={() => toggleSectionActive(section.id)} 
                                          />
                                          <Label htmlFor={`section-${section.id}`}>
                                            {section.active ? "Ativa" : "Inativa"}
                                          </Label>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-right">
                                        <Button 
                                          variant="ghost" 
                                          size="sm"
                                          className="text-education-primary hover:text-education-dark hover:bg-education-light"
                                          onClick={() => setEditingSectionId(section.id)}
                                        >
                                          Editar
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </Draggable>
                              ))}
                            {provided.placeholder}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </CardContent>
              <CardFooter className="flex justify-between bg-gray-50 rounded-b-lg">
                <div className="text-sm text-gray-500">
                  Total: {sections.length} seções
                </div>
                <Button 
                  className="bg-education-primary hover:bg-education-dark"
                  onClick={() => toast.success("Alterações salvas com sucesso!")}
                >
                  Salvar Alterações
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            {editingNewsId ? (
              <Card className="border-0 shadow-soft">
                <CardHeader className="bg-education-light rounded-t-lg">
                  <CardTitle className="text-education-primary">Editar Notícia</CardTitle>
                  <CardDescription>
                    Modifique os detalhes da notícia selecionada
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="news-title">Título</Label>
                    <Input
                      id="news-title"
                      value={editingNewsData?.title || ""}
                      onChange={(e) => setEditingNewsData({ ...editingNewsData, title: e.target.value })}
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Imagem de Capa</Label>
                    <ImageUploader
                      initialImage={editingNewsData?.image}
                      onImageChange={(imageUrl) => setEditingNewsData({ ...editingNewsData, image: imageUrl })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="news-date">Data</Label>
                      <Input
                        id="news-date"
                        value={editingNewsData?.date || ""}
                        onChange={(e) => setEditingNewsData({ ...editingNewsData, date: e.target.value })}
                        className="border-gray-300 focus-visible:ring-education-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="news-category">Categoria</Label>
                      <Input
                        id="news-category"
                        value={editingNewsData?.category || ""}
                        onChange={(e) => setEditingNewsData({ ...editingNewsData, category: e.target.value })}
                        className="border-gray-300 focus-visible:ring-education-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="news-description">Descrição</Label>
                    <WysiwygEditor
                      initialValue={editingNewsData?.description || ""}
                      onChange={(value) => setEditingNewsData({ ...editingNewsData, description: value })}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      id="news-featured"
                      checked={editingNewsData?.featured || false}
                      onCheckedChange={(checked) => setEditingNewsData({ ...editingNewsData, featured: checked })}
                    />
                    <Label htmlFor="news-featured">Destacar na página inicial</Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingNewsId(null);
                      setEditingNewsData(null);
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={updateNews}
                    className="bg-education-primary hover:bg-education-dark"
                  >
                    Salvar Alterações
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="border-0 shadow-soft">
                <CardHeader className="bg-education-light rounded-t-lg">
                  <CardTitle className="text-education-primary">Gerenciamento de Notícias</CardTitle>
                  <CardDescription>
                    Adicione, edite ou remova notícias do portal
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-4 border-b">
                    <Button className="bg-education-primary hover:bg-education-dark">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                      </svg>
                      Nova Notícia
                    </Button>
                  </div>
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Destaque</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {news.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium max-w-xs truncate">{item.title}</TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-education-light text-education-primary">
                              {item.category}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Switch 
                                id={`news-${item.id}`} 
                                checked={item.featured} 
                                onCheckedChange={() => toggleNewsFeatured(item.id)} 
                              />
                              <Label htmlFor={`news-${item.id}`}>
                                {item.featured ? "Sim" : "Não"}
                              </Label>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-education-primary hover:text-education-dark hover:bg-education-light"
                                onClick={() => editNews(item.id)}
                              >
                                Editar
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => deleteNews(item.id)}
                              >
                                Excluir
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between bg-gray-50 rounded-b-lg">
                  <div className="text-sm text-gray-500">
                    Total: {news.length} notícias
                  </div>
                  <Button 
                    className="bg-education-primary hover:bg-education-dark"
                    onClick={() => toast.success("Notícias atualizadas com sucesso!")}
                  >
                    Salvar Alterações
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="banner" className="space-y-4">
            <Card className="border-0 shadow-soft">
              <CardHeader className="bg-education-light rounded-t-lg">
                <CardTitle className="text-education-primary">Editar Banner Principal</CardTitle>
                <CardDescription>
                  Personalize o banner da página inicial
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="banner-title">Título</Label>
                  <Input 
                    id="banner-title" 
                    defaultValue="Secretaria Municipal da Educação de Araraquara" 
                    className="border-gray-300 focus-visible:ring-education-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banner-subtitle">Subtítulo</Label>
                  <Input 
                    id="banner-subtitle" 
                    defaultValue="Portal Educacional" 
                    className="border-gray-300 focus-visible:ring-education-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banner-description">Descrição</Label>
                  <WysiwygEditor
                    initialValue="Um ambiente digital integrado para alunos, professores, responsáveis e gestores educacionais da rede municipal de ensino."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Imagem de Fundo</Label>
                  <ImageUploader 
                    initialImage="https://www.araraquara.sp.gov.br/imagens/WhatsApp-Image-2023-05-04-at-17.52.05.jpeg/@@images/image" 
                  />
                  <p className="text-xs text-gray-500 mt-1">Tamanho recomendado: 1920x1080px</p>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="stat-1-number">Estatística 1 - Número</Label>
                    <Input 
                      id="stat-1-number" 
                      defaultValue="70+" 
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stat-1-label">Estatística 1 - Label</Label>
                    <Input 
                      id="stat-1-label" 
                      defaultValue="Escolas" 
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center space-x-2">
                      <Switch id="stat-1-active" defaultChecked />
                      <Label htmlFor="stat-1-active">Ativo</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stat-2-number">Estatística 2 - Número</Label>
                    <Input 
                      id="stat-2-number" 
                      defaultValue="2.500+" 
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stat-2-label">Estatística 2 - Label</Label>
                    <Input 
                      id="stat-2-label" 
                      defaultValue="Professores" 
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center space-x-2">
                      <Switch id="stat-2-active" defaultChecked />
                      <Label htmlFor="stat-2-active">Ativo</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stat-3-number">Estatística 3 - Número</Label>
                    <Input 
                      id="stat-3-number" 
                      defaultValue="30.000+" 
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stat-3-label">Estatística 3 - Label</Label>
                    <Input 
                      id="stat-3-label" 
                      defaultValue="Alunos" 
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center space-x-2">
                      <Switch id="stat-3-active" defaultChecked />
                      <Label htmlFor="stat-3-active">Ativo</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-end w-full">
                  <Button 
                    className="bg-education-primary hover:bg-education-dark"
                    onClick={() => toast.success("Banner atualizado com sucesso!")}
                  >
                    Salvar Alterações
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="menu" className="space-y-4">
            <Card className="border-0 shadow-soft">
              <CardHeader className="bg-education-light rounded-t-lg">
                <CardTitle className="text-education-primary">Gerenciar Menu de Navegação</CardTitle>
                <CardDescription>
                  Adicione, edite ou remova itens do menu principal
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <Button className="bg-education-primary hover:bg-education-dark">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                    Novo Item
                  </Button>
                </div>
                <DragDropContext onDragEnd={() => toast.success("Menu reordenado")}>
                  <Droppable droppableId="menu-items">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <Table>
                          <TableHeader className="bg-gray-50">
                            <TableRow>
                              <TableHead>Nome</TableHead>
                              <TableHead>URL</TableHead>
                              <TableHead>Ordem</TableHead>
                              <TableHead>Visível</TableHead>
                              <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {[
                              { id: 1, name: "Início", url: "/", order: 1, visible: true },
                              { id: 2, name: "Sobre", url: "/sobre", order: 2, visible: true },
                              { id: 3, name: "Notícias", url: "/noticias", order: 3, visible: true },
                              { id: 4, name: "Contato", url: "/contato", order: 4, visible: true }
                            ].map((item, index) => (
                              <Draggable 
                                key={item.id} 
                                draggableId={`menu-${item.id}`} 
                                index={index}
                              >
                                {(provided) => (
                                  <TableRow
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                  >
                                    <TableCell className="font-medium">
                                      <div {...provided.dragHandleProps} className="flex items-center">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          className="mr-2 text-gray-400 cursor-grab"
                                        >
                                          <path d="M5 9h14M5 15h14" />
                                        </svg>
                                        {item.name}
                                      </div>
                                    </TableCell>
                                    <TableCell>{item.url}</TableCell>
                                    <TableCell>{item.order}</TableCell>
                                    <TableCell>
                                      <div className="flex items-center space-x-2">
                                        <Switch id={`menu-${item.id}`} defaultChecked={item.visible} />
                                        <Label htmlFor={`menu-${item.id}`}>
                                          {item.visible ? "Sim" : "Não"}
                                        </Label>
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <div className="flex justify-end gap-2">
                                        <Button 
                                          variant="ghost" 
                                          size="sm"
                                          className="text-education-primary hover:text-education-dark hover:bg-education-light"
                                        >
                                          Editar
                                        </Button>
                                        <Button 
                                          variant="ghost" 
                                          size="sm"
                                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                          disabled={item.id === 1} // Não pode remover o item inicial
                                        >
                                          Excluir
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </CardContent>
              <CardFooter className="flex justify-between bg-gray-50 rounded-b-lg">
                <div className="text-sm text-gray-500">
                  Total: 4 itens
                </div>
                <Button 
                  className="bg-education-primary hover:bg-education-dark"
                  onClick={() => toast.success("Menu atualizado com sucesso!")}
                >
                  Salvar Alterações
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <Card className="border-0 shadow-soft">
              <CardHeader className="bg-education-light rounded-t-lg">
                <CardTitle className="text-education-primary">Biblioteca de Mídias</CardTitle>
                <CardDescription>
                  Gerencie todas as imagens e arquivos do portal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Upload de Nova Mídia</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ImageUploader 
                      placeholderText="Arraste uma imagem ou clique para selecionar"
                    />
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="media-title">Título</Label>
                        <Input
                          id="media-title"
                          placeholder="Digite um título para a mídia"
                          className="border-gray-300 focus-visible:ring-education-primary mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="media-alt">Descrição (texto alternativo)</Label>
                        <Input
                          id="media-alt"
                          placeholder="Descreva a imagem para acessibilidade"
                          className="border-gray-300 focus-visible:ring-education-primary mt-1"
                        />
                      </div>
                      <Button className="w-full bg-education-primary hover:bg-education-dark">
                        Adicionar à Biblioteca
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Mídias Existentes</h3>
                    <div className="relative w-64">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                      <Input
                        placeholder="Buscar mídia..."
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {mockImages.map((image) => (
                      <div key={image.id} className="border rounded-md overflow-hidden">
                        <div className="aspect-square relative bg-gray-100">
                          <img
                            src={image.url}
                            alt={image.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                            <div className="flex gap-1">
                              <Button size="sm" variant="secondary">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M12 20h9" />
                                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                </svg>
                              </Button>
                              <Button size="sm" variant="destructive">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M3 6h18" />
                                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                </svg>
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <p className="text-sm font-medium truncate">{image.title}</p>
                          <p className="text-xs text-gray-500">{image.uploadedAt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-500">
                  Exibindo 6 de 24 itens
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Anterior
                  </Button>
                  <Button variant="outline" size="sm">
                    Próximo
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
