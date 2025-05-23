
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Video,
  MessageSquare,
  Users,
  Calendar,
  FileText,
  Bell,
  BookOpen,
  Check,
  X
} from "lucide-react";
import { toast } from "sonner";

// Mock data for Teams classes
const mockTeamsClasses = [
  {
    id: 1,
    name: "5º Ano A - Matemática",
    school: "E.M. Paulo Freire",
    teacher: "Maria Silva",
    students: 28,
    lastActive: "2025-05-20",
    status: "Ativo",
    synced: true
  },
  {
    id: 2,
    name: "4º Ano B - Língua Portuguesa",
    school: "E.M. Paulo Freire",
    teacher: "João Costa",
    students: 26,
    lastActive: "2025-05-21",
    status: "Ativo",
    synced: true
  },
  {
    id: 3,
    name: "3º Ano C - Ciências",
    school: "E.M. Anísio Teixeira",
    teacher: "Ana Oliveira",
    students: 24,
    lastActive: "2025-05-15",
    status: "Ativo",
    synced: false
  },
  {
    id: 4,
    name: "Conselho de Classe - 2º Trimestre",
    school: "E.M. Maria Montessori",
    teacher: "Coordenação Pedagógica",
    students: 12,
    lastActive: "2025-05-10",
    status: "Programado",
    synced: true
  }
];

// Mock data for upcoming meetings
const mockMeetings = [
  {
    id: 1,
    title: "Aula: Frações e Operações",
    class: "5º Ano A - Matemática",
    date: "2025-05-25",
    time: "08:00 - 09:30",
    host: "Maria Silva",
    participants: 28,
    status: "Agendado"
  },
  {
    id: 2,
    title: "Reunião: Planejamento Pedagógico",
    class: "Equipe de Professores",
    date: "2025-05-24",
    time: "14:00 - 16:00",
    host: "Coordenação",
    participants: 15,
    status: "Agendado"
  },
  {
    id: 3,
    title: "Aula: Literatura Infantil",
    class: "4º Ano B - Língua Portuguesa",
    date: "2025-05-25",
    time: "10:00 - 11:30",
    host: "João Costa",
    participants: 26,
    status: "Agendado"
  }
];

// Mock data for schools
const mockSchools = [
  { id: 1, name: "E.M. Paulo Freire" },
  { id: 2, name: "E.M. Anísio Teixeira" },
  { id: 3, name: "E.M. Maria Montessori" },
  { id: 4, name: "E.M. Jean Piaget" }
];

// Mock notification settings
const initialNotificationSettings = {
  newAssignments: true,
  dueDates: true,
  gradePosted: true,
  classAnnouncements: true,
  meetingInvites: true,
  feedbackRequests: false
};

const TeamsIntegration: React.FC = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState(initialNotificationSettings);
  const [classFilter, setClassFilter] = useState("all");
  
  const handleConnectTeams = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: "Conectando ao Microsoft Teams...",
        success: () => {
          setIsConnected(true);
          return "Conectado com sucesso ao Microsoft Teams!";
        },
        error: "Erro ao conectar. Tente novamente.",
      }
    );
  };
  
  const handleDisconnect = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: "Desconectando...",
        success: () => {
          setIsConnected(false);
          return "Desconectado do Microsoft Teams";
        },
        error: "Erro ao desconectar. Tente novamente.",
      }
    );
  };
  
  const handleSyncClasses = () => {
    if (!selectedSchool) {
      toast.error("Por favor, selecione uma escola para sincronizar");
      return;
    }
    
    setSyncInProgress(true);
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 3000)),
      {
        loading: "Sincronizando turmas com o Microsoft Teams...",
        success: () => {
          setSyncInProgress(false);
          return "Turmas sincronizadas com sucesso!";
        },
        error: () => {
          setSyncInProgress(false);
          return "Erro ao sincronizar. Tente novamente.";
        },
      }
    );
  };
  
  const toggleNotificationSetting = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast.success(`Configuração de notificação atualizada`);
  };

  // Filter classes based on class filter
  const filteredClasses = mockTeamsClasses.filter(cls => {
    if (classFilter === "all") return true;
    if (classFilter === "synced") return cls.synced;
    if (classFilter === "unsynced") return !cls.synced;
    return true;
  });

  return (
    <Card className="shadow-sm border-0">
      <CardHeader>
        <CardTitle className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-2">
            <path d="M19.25 4.5H4.75C3.51 4.5 2.5 5.51 2.5 6.75v10.5c0 1.24 1.01 2.25 2.25 2.25h14.5c1.24 0 2.25-1.01 2.25-2.25V6.75c0-1.24-1.01-2.25-2.25-2.25z" fill="#7B83EB" />
            <path d="M19.25 4.5H11v15h8.25c1.24 0 2.25-1.01 2.25-2.25V6.75c0-1.24-1.01-2.25-2.25-2.25z" fill="#5059C9" />
            <path d="M13.25 12c0 1.38 1.12 2.5 2.5 2.5 1.59 0 2.5-1.12 2.5-2.5S16.97 9.5 15.75 9.5c-1.38 0-2.5 1.12-2.5 2.5z" fill="#FFFFFF" />
            <path d="M16.08 15.25c-2.1 0-4.33.64-4.33 3.25h8c0-2.61-2.23-3.25-3.67-3.25z" fill="#FFFFFF" />
            <path d="M9 9.5H4.75v5H9v-5z" fill="#FFFFFF" />
          </svg>
          Microsoft Teams
        </CardTitle>
        <CardDescription>
          Integração completa com Microsoft Teams para aulas online e comunicação
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="classes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="classes">Turmas e Canais</TabsTrigger>
            <TabsTrigger value="meetings">Reuniões e Aulas</TabsTrigger>
            <TabsTrigger value="resources">Material Didático</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="classes" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="sm:w-1/2">
                <h3 className="text-lg font-medium mb-3">Sincronização de Turmas</h3>
                <div className="space-y-4 bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Status da conexão</p>
                      <p className="text-sm text-gray-500">
                        {isConnected 
                          ? "Conectado ao Microsoft Teams" 
                          : "Não conectado ao Microsoft Teams"}
                      </p>
                    </div>
                    {isConnected ? (
                      <Button 
                        variant="outline" 
                        onClick={handleDisconnect}
                        className="border-red-200 text-red-500 hover:bg-red-50"
                      >
                        Desconectar
                      </Button>
                    ) : (
                      <Button onClick={handleConnectTeams}>
                        Conectar
                      </Button>
                    )}
                  </div>
                  
                  {isConnected && (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="space-y-2">
                        <Label htmlFor="school-select">Selecione a escola para sincronizar</Label>
                        <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                          <SelectTrigger id="school-select">
                            <SelectValue placeholder="Selecione uma escola" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockSchools.map(school => (
                              <SelectItem key={school.id} value={school.id.toString()}>
                                {school.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button 
                        onClick={handleSyncClasses} 
                        disabled={!selectedSchool || syncInProgress}
                        className="w-full"
                      >
                        {syncInProgress ? "Sincronizando..." : "Sincronizar Turmas"}
                      </Button>
                      
                      <div className="text-sm text-gray-500">
                        <p>Última sincronização: 22/05/2025 às 14:32</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="sm:w-1/2">
                <h3 className="text-lg font-medium mb-3">Estatísticas de Uso</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center">
                        <Users className="h-8 w-8 text-education-primary mb-2" />
                        <div className="text-2xl font-bold">124</div>
                        <p className="text-xs text-gray-500">Turmas Ativas</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center">
                        <MessageSquare className="h-8 w-8 text-education-primary mb-2" />
                        <div className="text-2xl font-bold">5,472</div>
                        <p className="text-xs text-gray-500">Mensagens (30d)</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center">
                        <Video className="h-8 w-8 text-education-primary mb-2" />
                        <div className="text-2xl font-bold">87</div>
                        <p className="text-xs text-gray-500">Aulas Online (30d)</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center">
                        <FileText className="h-8 w-8 text-education-primary mb-2" />
                        <div className="text-2xl font-bold">328</div>
                        <p className="text-xs text-gray-500">Arquivos Compartilhados</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Turmas no Teams</h3>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="class-filter" className="text-sm">Filtrar:</Label>
                  <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger id="class-filter" className="w-[160px]">
                      <SelectValue placeholder="Todas as turmas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as turmas</SelectItem>
                      <SelectItem value="synced">Sincronizadas</SelectItem>
                      <SelectItem value="unsynced">Não sincronizadas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/20 text-sm">
                      <tr>
                        <th className="py-3 px-4 text-left">Turma</th>
                        <th className="py-3 px-4 text-left">Escola</th>
                        <th className="py-3 px-4 text-left">Professor(a)</th>
                        <th className="py-3 px-4 text-center">Alunos</th>
                        <th className="py-3 px-4 text-left">Última Atividade</th>
                        <th className="py-3 px-4 text-center">Status</th>
                        <th className="py-3 px-4 text-center">Sincronizado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredClasses.map(cls => (
                        <tr key={cls.id} className="bg-white">
                          <td className="py-3 px-4 font-medium">{cls.name}</td>
                          <td className="py-3 px-4">{cls.school}</td>
                          <td className="py-3 px-4">{cls.teacher}</td>
                          <td className="py-3 px-4 text-center">{cls.students}</td>
                          <td className="py-3 px-4">
                            {new Date(cls.lastActive).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`text-xs px-2 py-1 rounded-full ${cls.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                              {cls.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            {cls.synced ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-500 mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="meetings" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <h3 className="text-lg font-medium mb-4">Reuniões Agendadas</h3>
                
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/20 text-sm">
                      <tr>
                        <th className="py-3 px-4 text-left">Título</th>
                        <th className="py-3 px-4 text-left">Turma/Grupo</th>
                        <th className="py-3 px-4 text-left">Data e Hora</th>
                        <th className="py-3 px-4 text-left">Anfitrião</th>
                        <th className="py-3 px-4 text-center">Participantes</th>
                        <th className="py-3 px-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {mockMeetings.map(meeting => (
                        <tr key={meeting.id} className="bg-white">
                          <td className="py-3 px-4">
                            <div className="font-medium">{meeting.title}</div>
                          </td>
                          <td className="py-3 px-4">{meeting.class}</td>
                          <td className="py-3 px-4">
                            {new Date(meeting.date).toLocaleDateString('pt-BR')}
                            <div className="text-xs text-gray-500">{meeting.time}</div>
                          </td>
                          <td className="py-3 px-4">{meeting.host}</td>
                          <td className="py-3 px-4 text-center">{meeting.participants}</td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="outline" size="sm" className="mr-2">
                              <Video className="h-4 w-4 mr-1" />
                              <span>Entrar</span>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Agendar Nova Reunião</h3>
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="meeting-title">Título</Label>
                      <Input id="meeting-title" placeholder="Título da reunião" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="meeting-type">Tipo</Label>
                      <Select>
                        <SelectTrigger id="meeting-type">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="class">Aula Online</SelectItem>
                          <SelectItem value="meeting">Reunião</SelectItem>
                          <SelectItem value="webinar">Webinário</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="meeting-class">Turma/Grupo</Label>
                      <Select>
                        <SelectTrigger id="meeting-class">
                          <SelectValue placeholder="Selecione a turma" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockTeamsClasses.map(cls => (
                            <SelectItem key={cls.id} value={cls.id.toString()}>
                              {cls.name}
                            </SelectItem>
                          ))}
                          <SelectItem value="all-teachers">Todos os Professores</SelectItem>
                          <SelectItem value="coordination">Equipe de Coordenação</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="meeting-date">Data</Label>
                      <div className="relative">
                        <Input id="meeting-date" type="date" />
                        <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-time">Hora de início</Label>
                        <Input id="start-time" type="time" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-time">Hora de término</Label>
                        <Input id="end-time" type="time" />
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button className="w-full">
                        Agendar Reunião
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Material Didático Compartilhado</CardTitle>
                  <CardDescription>
                    Arquivos e recursos compartilhados no Microsoft Teams
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Input 
                        placeholder="Buscar arquivos..." 
                        className="max-w-xs"
                      />
                      <Button variant="outline">
                        Sincronizar Arquivos
                      </Button>
                    </div>
                    
                    <div className="rounded-md border overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted/20 text-sm">
                          <tr>
                            <th className="py-3 px-4 text-left">Arquivo</th>
                            <th className="py-3 px-4 text-left">Turma/Canal</th>
                            <th className="py-3 px-4 text-left">Compartilhado por</th>
                            <th className="py-3 px-4 text-left">Data</th>
                            <th className="py-3 px-4 text-center">Tamanho</th>
                            <th className="py-3 px-4 text-right">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {[
                            {
                              id: 1,
                              name: "Plano de Aula - Frações.docx",
                              class: "5º Ano A - Matemática",
                              author: "Maria Silva",
                              date: "2025-05-18",
                              size: "245 KB",
                              type: "document"
                            },
                            {
                              id: 2,
                              name: "Lista de Exercícios - Verbos.pdf",
                              class: "4º Ano B - Língua Portuguesa",
                              author: "João Costa",
                              date: "2025-05-20",
                              size: "1.2 MB",
                              type: "pdf"
                            },
                            {
                              id: 3,
                              name: "Apresentação - Sistema Solar.pptx",
                              class: "3º Ano C - Ciências",
                              author: "Ana Oliveira",
                              date: "2025-05-15",
                              size: "3.5 MB",
                              type: "presentation"
                            },
                            {
                              id: 4,
                              name: "Cronograma - Reuniões Pedagógicas.xlsx",
                              class: "Equipe de Professores",
                              author: "Coordenação",
                              date: "2025-05-10",
                              size: "480 KB",
                              type: "spreadsheet"
                            }
                          ].map(file => (
                            <tr key={file.id} className="bg-white">
                              <td className="py-3 px-4">
                                <div className="font-medium">{file.name}</div>
                              </td>
                              <td className="py-3 px-4">{file.class}</td>
                              <td className="py-3 px-4">{file.author}</td>
                              <td className="py-3 px-4">
                                {new Date(file.date).toLocaleDateString('pt-BR')}
                              </td>
                              <td className="py-3 px-4 text-center">{file.size}</td>
                              <td className="py-3 px-4 text-right">
                                <Button variant="ghost" size="sm">
                                  Visualizar
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recursos Disponíveis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="bg-gray-50 p-4 rounded-md flex items-center">
                      <div className="mr-4 p-2 bg-blue-100 rounded-md">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Biblioteca de Recursos</h4>
                        <p className="text-sm text-gray-500">Modelos, planos de aula e materiais didáticos</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-gray-50 p-4 rounded-md flex items-center">
                      <div className="mr-4 p-2 bg-purple-100 rounded-md">
                        <Video className="h-8 w-8 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Aulas Gravadas</h4>
                        <p className="text-sm text-gray-500">Repositório de gravações de aulas e treinamentos</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-gray-50 p-4 rounded-md flex items-center">
                      <div className="mr-4 p-2 bg-green-100 rounded-md">
                        <Users className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Comunidades</h4>
                        <p className="text-sm text-gray-500">Grupos de discussão e compartilhamento por área</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Acessar Centro de Recursos
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Configurações de Notificação</h3>
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <Label htmlFor="new-assignments" className="font-medium">
                          Novas Tarefas
                        </Label>
                        <p className="text-xs text-gray-500">Notificações quando novas atividades forem atribuídas</p>
                      </div>
                      <Switch 
                        id="new-assignments" 
                        checked={notificationSettings.newAssignments}
                        onCheckedChange={() => toggleNotificationSetting('newAssignments')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <Label htmlFor="due-dates" className="font-medium">
                          Prazos de Entrega
                        </Label>
                        <p className="text-xs text-gray-500">Lembretes de prazos de atividades</p>
                      </div>
                      <Switch 
                        id="due-dates" 
                        checked={notificationSettings.dueDates}
                        onCheckedChange={() => toggleNotificationSetting('dueDates')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <Label htmlFor="grade-posted" className="font-medium">
                          Notas Publicadas
                        </Label>
                        <p className="text-xs text-gray-500">Notificações quando novas notas forem publicadas</p>
                      </div>
                      <Switch 
                        id="grade-posted" 
                        checked={notificationSettings.gradePosted}
                        onCheckedChange={() => toggleNotificationSetting('gradePosted')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <Label htmlFor="class-announcements" className="font-medium">
                          Comunicados da Turma
                        </Label>
                        <p className="text-xs text-gray-500">Notificações de comunicados nas turmas</p>
                      </div>
                      <Switch 
                        id="class-announcements" 
                        checked={notificationSettings.classAnnouncements}
                        onCheckedChange={() => toggleNotificationSetting('classAnnouncements')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <Label htmlFor="meeting-invites" className="font-medium">
                          Convites para Reuniões
                        </Label>
                        <p className="text-xs text-gray-500">Notificações de novas reuniões e aulas online</p>
                      </div>
                      <Switch 
                        id="meeting-invites" 
                        checked={notificationSettings.meetingInvites}
                        onCheckedChange={() => toggleNotificationSetting('meetingInvites')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <Label htmlFor="feedback-requests" className="font-medium">
                          Solicitações de Feedback
                        </Label>
                        <p className="text-xs text-gray-500">Notificações de pedidos de feedback e avaliação</p>
                      </div>
                      <Switch 
                        id="feedback-requests" 
                        checked={notificationSettings.feedbackRequests}
                        onCheckedChange={() => toggleNotificationSetting('feedbackRequests')}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Configurações de Integração</h3>
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="default-view">Visualização padrão do Teams</Label>
                      <Select>
                        <SelectTrigger id="default-view">
                          <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="feed">Feed de Atividades</SelectItem>
                          <SelectItem value="classes">Turmas</SelectItem>
                          <SelectItem value="calendar">Calendário</SelectItem>
                          <SelectItem value="chat">Chat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sync-frequency">Frequência de sincronização</Label>
                      <Select>
                        <SelectTrigger id="sync-frequency">
                          <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">A cada 15 minutos</SelectItem>
                          <SelectItem value="30">A cada 30 minutos</SelectItem>
                          <SelectItem value="60">A cada hora</SelectItem>
                          <SelectItem value="daily">Uma vez ao dia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2 pt-4">
                      <h4 className="font-medium">Integração com Outros Sistemas</h4>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <p className="text-sm font-medium">Sistema de Gestão Escolar</p>
                          <p className="text-xs text-gray-500">Sincronizar calendários e dados dos alunos</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <p className="text-sm font-medium">Portal da Educação</p>
                          <p className="text-xs text-gray-500">Compartilhar notificações e eventos</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <p className="text-sm font-medium">Biblioteca Digital</p>
                          <p className="text-xs text-gray-500">Acesso a materiais didáticos</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4">Salvar Configurações</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TeamsIntegration;
