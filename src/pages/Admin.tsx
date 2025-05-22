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
                    {sections.map((section) => (
                      <TableRow key={section.id}>
                        <TableCell className="font-medium">{section.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 w-24">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0" 
                              onClick={() => updateSectionOrder(section.id, section.order - 1)}
                              disabled={section.order === 1}
                            >
                              <span className="sr-only">Mover para cima</span>
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
                                <path d="m18 15-6-6-6 6" />
                              </svg>
                            </Button>
                            {section.order}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0" 
                              onClick={() => updateSectionOrder(section.id, section.order + 1)}
                              disabled={section.order === sections.length}
                            >
                              <span className="sr-only">Mover para baixo</span>
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
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </Button>
                          </div>
                        </TableCell>
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
                    ))}
                  </TableBody>
                </Table>
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
                  <Input 
                    id="banner-description" 
                    defaultValue="Um ambiente digital integrado para alunos, professores, responsáveis e gestores educacionais da rede municipal de ensino." 
                    className="border-gray-300 focus-visible:ring-education-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banner-image">Imagem (URL)</Label>
                  <Input 
                    id="banner-image" 
                    defaultValue="https://www.araraquara.sp.gov.br/imagens/WhatsApp-Image-2023-05-04-at-17.52.05.jpeg/@@images/image" 
                    className="border-gray-300 focus-visible:ring-education-primary"
                  />
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
                    <TableRow>
                      <TableCell className="font-medium">Início</TableCell>
                      <TableCell>/</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch id="menu-home" defaultChecked />
                          <Label htmlFor="menu-home">Sim</Label>
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
                            disabled
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            Excluir
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sobre</TableCell>
                      <TableCell>/sobre</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch id="menu-about" defaultChecked />
                          <Label htmlFor="menu-about">Sim</Label>
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
                          >
                            Excluir
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Notícias</TableCell>
                      <TableCell>/noticias</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch id="menu-news" defaultChecked />
                          <Label htmlFor="menu-news">Sim</Label>
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
                          >
                            Excluir
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Contato</TableCell>
                      <TableCell>/contato</TableCell>
                      <TableCell>4</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch id="menu-contact" defaultChecked />
                          <Label htmlFor="menu-contact">Sim</Label>
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
                          >
                            Excluir
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
