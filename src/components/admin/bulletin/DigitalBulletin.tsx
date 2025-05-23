
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Search,
  Users,
  Pin,
  Eye,
  Clock,
  Tag,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";
import WysiwygEditor from "../WysiwygEditor";
import ImageUploader from "../ImageUploader";

// Mock announcements data
const mockAnnouncements = [
  {
    id: 1,
    title: "Volta às aulas - 2º Semestre 2025",
    content: "<p>Informamos que as aulas do segundo semestre iniciarão no dia <strong>05/08/2025</strong>. Os horários continuam os mesmos do primeiro semestre. Lembramos aos pais e responsáveis que cheguem com 15 minutos de antecedência nos primeiros dias para adaptação.</p>",
    author: "Diretoria de Ensino",
    date: "2025-07-20",
    expirationDate: "2025-08-10",
    priority: "Alta",
    audience: ["Todos"],
    views: 1240,
    pinned: true,
    image: "https://placehold.co/600x400/4C51BF/FFFFFF/png?text=Volta+às+Aulas"
  },
  {
    id: 2,
    title: "Calendário de Provas - 2º Trimestre",
    content: "<p>O calendário de avaliações do segundo trimestre já está disponível no portal. Clique <a href='#'>aqui</a> para acessar o documento completo com as datas e conteúdos que serão cobrados.</p><ul><li>Língua Portuguesa: 15/08</li><li>Matemática: 17/08</li><li>Ciências: 20/08</li><li>História e Geografia: 22/08</li></ul>",
    author: "Coordenação Pedagógica",
    date: "2025-07-25",
    expirationDate: "2025-08-22",
    priority: "Média",
    audience: ["Alunos", "Responsáveis", "Professores"],
    views: 856,
    pinned: false,
    image: null
  },
  {
    id: 3,
    title: "Reunião de Pais e Mestres",
    content: "<p>Convidamos todos os pais e responsáveis para a reunião trimestral que acontecerá no dia <strong>18/08/2025</strong>, às <strong>19h</strong>, no auditório da escola. Serão discutidos os seguintes temas:</p><ol><li>Desempenho geral das turmas</li><li>Projetos do semestre</li><li>Orientações sobre os estudos em casa</li><li>Calendário de eventos</li></ol>",
    author: "Direção E.M. Paulo Freire",
    date: "2025-07-30",
    expirationDate: "2025-08-18",
    priority: "Média",
    audience: ["Responsáveis"],
    views: 420,
    pinned: true,
    image: null
  },
  {
    id: 4,
    title: "Formação Continuada de Professores",
    content: "<p>Informamos aos professores da rede municipal que nos dias <strong>01 e 02/08/2025</strong> acontecerá a formação continuada sobre Metodologias Ativas e Tecnologias na Educação. A formação é obrigatória e acontecerá no Centro de Formação de Professores, das 8h às 17h.</p>",
    author: "Secretaria Municipal de Educação",
    date: "2025-07-15",
    expirationDate: "2025-08-02",
    priority: "Alta",
    audience: ["Professores"],
    views: 156,
    pinned: false,
    image: null
  }
];

// Mock audience options
const audienceOptions = [
  { id: 1, name: "Todos" },
  { id: 2, name: "Alunos" },
  { id: 3, name: "Professores" },
  { id: 4, name: "Responsáveis" },
  { id: 5, name: "Gestão Escolar" },
  { id: 6, name: "Secretaria" }
];

// Mock priority options
const priorityOptions = [
  { id: 1, name: "Baixa" },
  { id: 2, name: "Média" },
  { id: 3, name: "Alta" },
  { id: 4, name: "Urgente" }
];

const DigitalBulletin: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [priority, setPriority] = useState("");
  const [audience, setAudience] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("all");
  
  // Handle form submission for new announcement
  const handleCreateAnnouncement = () => {
    if (!title || !content || !expirationDate || !priority || audience.length === 0) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    
    toast.success("Comunicado publicado com sucesso!");
    
    // Reset form
    setTitle("");
    setContent("");
    setExpirationDate("");
    setPriority("");
    setAudience([]);
    setImage(null);
  };
  
  // Filter announcements based on search term and audience filter
  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (audienceFilter === "all") return matchesSearch;
    return matchesSearch && announcement.audience.includes(audienceFilter);
  });
  
  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card className="shadow-sm border-0">
      <CardHeader>
        <CardTitle>Mural Digital</CardTitle>
        <CardDescription>
          Comunicados oficiais para diferentes perfis da comunidade escolar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="view" className="space-y-4">
          <TabsList>
            <TabsTrigger value="view">Visualizar Mural</TabsTrigger>
            <TabsTrigger value="create">Novo Comunicado</TabsTrigger>
            <TabsTrigger value="templates">Modelos</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
          </TabsList>
          
          <TabsContent value="view" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar comunicados..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={audienceFilter} onValueChange={setAudienceFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Público-alvo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {audienceOptions.map(option => (
                    <SelectItem key={option.id} value={option.name}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4">
              {filteredAnnouncements.map(announcement => (
                <Card key={announcement.id} className={`border ${announcement.pinned ? 'border-education-primary/30' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      {announcement.image && (
                        <div className="md:w-1/4">
                          <img 
                            src={announcement.image} 
                            alt={announcement.title}
                            className="rounded-md w-full h-auto object-cover"
                          />
                        </div>
                      )}
                      <div className={announcement.image ? "md:w-3/4" : "w-full"}>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">
                            {announcement.pinned && (
                              <Pin className="h-4 w-4 inline-block mr-1 text-education-primary" />
                            )}
                            {announcement.title}
                          </h3>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            announcement.priority === "Alta" ? "bg-red-100 text-red-800" :
                            announcement.priority === "Média" ? "bg-yellow-100 text-yellow-800" : 
                            "bg-green-100 text-green-800"
                          }`}>
                            {announcement.priority}
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-3" 
                             dangerouslySetInnerHTML={{ __html: announcement.content }} />
                        
                        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-3">
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>Publicado: {formatDate(announcement.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>Válido até: {formatDate(announcement.expirationDate)}</span>
                          </div>
                          <div className="flex items-center">
                            <Tag className="h-3.5 w-3.5 mr-1" />
                            <span>Para: {announcement.audience.join(", ")}</span>
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            <span>{announcement.views} visualizações</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-xs text-gray-500">
                            Por: {announcement.author}
                          </span>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="h-8">
                              Editar
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 text-red-500">
                              Remover
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="create" className="space-y-4">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="announcement-title">Título*</Label>
                    <Input 
                      id="announcement-title" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Digite o título do comunicado"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="announcement-content">Conteúdo*</Label>
                    <WysiwygEditor 
                      initialValue={content} 
                      onChange={setContent} 
                      className="min-h-[220px]"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Imagem (opcional)</Label>
                    <ImageUploader
                      initialImage={image || undefined}
                      onImageChange={setImage}
                      placeholderText="Upload de imagem para o comunicado"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expiration-date">Data de Expiração*</Label>
                    <div className="relative">
                      <Input 
                        id="expiration-date" 
                        type="date"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                      />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">Prioridade*</Label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityOptions.map(option => (
                          <SelectItem key={option.id} value={option.name}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Público-alvo*</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {audienceOptions.map(option => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id={`audience-${option.id}`} 
                            checked={audience.includes(option.name)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setAudience([...audience, option.name]);
                              } else {
                                setAudience(audience.filter(a => a !== option.name));
                              }
                            }}
                            className="rounded border-gray-300" 
                          />
                          <label htmlFor={`audience-${option.id}`} className="text-sm">
                            {option.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <input type="checkbox" id="pin-announcement" className="rounded border-gray-300" />
                    <Label htmlFor="pin-announcement" className="text-sm cursor-pointer">
                      Fixar no topo do mural
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="send-notification" className="rounded border-gray-300" />
                    <Label htmlFor="send-notification" className="text-sm cursor-pointer">
                      Enviar notificação por e-mail/app
                    </Label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" type="button">Cancelar</Button>
                <Button 
                  type="button" 
                  onClick={handleCreateAnnouncement}
                >
                  Publicar Comunicado
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  id: 1,
                  title: "Convite para Evento",
                  description: "Template para convidar a comunidade escolar para eventos e celebrações",
                  image: "https://placehold.co/300x200/4C51BF/FFFFFF/png?text=Convite"
                },
                {
                  id: 2,
                  title: "Aviso de Reunião",
                  description: "Comunicado sobre reuniões pedagógicas, de pais e mestres ou administrativas",
                  image: "https://placehold.co/300x200/4C51BF/FFFFFF/png?text=Reunião"
                },
                {
                  id: 3,
                  title: "Alteração de Calendário",
                  description: "Aviso sobre mudanças no calendário escolar, feriados ou reposições",
                  image: "https://placehold.co/300x200/4C51BF/FFFFFF/png?text=Calendário"
                },
                {
                  id: 4,
                  title: "Comunicado Oficial",
                  description: "Formato para comunicações oficiais da Secretaria de Educação",
                  image: "https://placehold.co/300x200/4C51BF/FFFFFF/png?text=Oficial"
                },
                {
                  id: 5,
                  title: "Lembrete de Prazo",
                  description: "Lembrete para entrega de documentos, matrículas ou inscrições",
                  image: "https://placehold.co/300x200/4C51BF/FFFFFF/png?text=Prazo"
                },
                {
                  id: 6,
                  title: "Conquista/Premiação",
                  description: "Celebração de resultados e conquistas da escola ou alunos",
                  image: "https://placehold.co/300x200/4C51BF/FFFFFF/png?text=Premiação"
                }
              ].map(template => (
                <Card key={template.id} className="overflow-hidden">
                  <img 
                    src={template.image} 
                    alt={template.title}
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{template.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Usar Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Alcance Total</CardTitle>
                  <CardDescription>Últimos 30 dias</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2,745</div>
                  <p className="text-sm text-green-600">+18% em relação ao mês anterior</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Taxa de Abertura</CardTitle>
                  <CardDescription>Notificações enviadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">72%</div>
                  <p className="text-sm text-green-600">+5% em relação ao mês anterior</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Público mais ativo</CardTitle>
                  <CardDescription>Por perfil</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">Professores</div>
                  <p className="text-sm text-gray-500">85% de visualizações</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Comunicados mais visualizados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnnouncements
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 3)
                    .map((announcement, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center mr-3">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{announcement.title}</h4>
                            <p className="text-xs text-gray-500">
                              {formatDate(announcement.date)} • {announcement.audience.join(", ")}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1 text-gray-500" />
                          <span className="text-sm font-medium">{announcement.views}</span>
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

export default DigitalBulletin;
