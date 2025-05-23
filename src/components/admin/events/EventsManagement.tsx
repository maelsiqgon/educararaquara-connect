
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
  SelectValue 
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Search,
  Tag,
  Check,
  X
} from "lucide-react";
import { toast } from "sonner";
import ImageUploader from "../ImageUploader";

// Mock event types
const eventTypes = [
  { id: 1, name: "Reunião Pedagógica" },
  { id: 2, name: "Festa Escolar" },
  { id: 3, name: "Palestra" },
  { id: 4, name: "Formação de Professores" },
  { id: 5, name: "Conselho de Classe" },
  { id: 6, name: "Oficina" },
  { id: 7, name: "Apresentação Cultural" },
  { id: 8, name: "Evento Esportivo" }
];

// Mock schools
const schools = [
  { id: 1, name: "E.M. Paulo Freire" },
  { id: 2, name: "E.M. Anísio Teixeira" },
  { id: 3, name: "E.M. Maria Montessori" },
  { id: 4, name: "E.M. Jean Piaget" },
  { id: 5, name: "Secretaria Municipal de Educação" }
];

// Mock events
const mockEvents = [
  {
    id: 1,
    title: "Reunião de Pais e Mestres",
    date: "2025-06-15",
    time: "19:00",
    location: "E.M. Paulo Freire",
    type: "Reunião Pedagógica",
    attendees: 120,
    registrations: 150,
    status: "Agendado",
    description: "Reunião trimestral para discussão do desempenho dos alunos e planejamento das atividades pedagógicas."
  },
  {
    id: 2,
    title: "Festa Junina",
    date: "2025-06-24",
    time: "14:00",
    location: "E.M. Anísio Teixeira",
    type: "Festa Escolar",
    attendees: 320,
    registrations: 400,
    status: "Agendado",
    description: "Celebração tradicional com comidas típicas, danças folclóricas e brincadeiras para toda a comunidade escolar."
  },
  {
    id: 3,
    title: "Workshop de Tecnologias Educacionais",
    date: "2025-05-28",
    time: "08:30",
    location: "Secretaria Municipal de Educação",
    type: "Formação de Professores",
    attendees: 45,
    registrations: 50,
    status: "Concluído",
    description: "Capacitação para professores sobre o uso de ferramentas digitais em sala de aula e metodologias ativas de ensino."
  },
  {
    id: 4,
    title: "Olimpíadas de Matemática",
    date: "2025-07-10",
    time: "09:00",
    location: "E.M. Maria Montessori",
    type: "Evento Esportivo",
    attendees: 0,
    registrations: 200,
    status: "Agendado",
    description: "Competição interescolar de matemática com provas adequadas para cada faixa etária e premiação para os destaques."
  }
];

const EventsManagement: React.FC = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const handleCreateEvent = () => {
    if (!eventTitle || !eventDate || !eventTime || !eventLocation || !eventType) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    
    toast.success("Evento criado com sucesso!");
    
    // Reset form
    setEventTitle("");
    setEventDate("");
    setEventTime("");
    setEventLocation("");
    setEventType("");
    setEventDescription("");
    setEventImage(null);
  };
  
  // Filter events based on search term and status
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && event.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <Card className="shadow-sm border-0">
      <CardHeader>
        <CardTitle>Gestão de Eventos</CardTitle>
        <CardDescription>
          Planeje, organize e acompanhe eventos escolares e da secretaria de educação
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Próximos Eventos</TabsTrigger>
            <TabsTrigger value="create">Criar Evento</TabsTrigger>
            <TabsTrigger value="registrations">Inscrições</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar eventos..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="agendado">Agendado</SelectItem>
                  <SelectItem value="concluído">Concluído</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEvents.map(event => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-blue-100 to-indigo-100 relative">
                    {event.status === "Concluído" && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Concluído
                      </div>
                    )}
                    {event.status === "Cancelado" && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Cancelado
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-800">
                          {new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                        </div>
                        <div className="text-sm text-gray-600">{event.time}</div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1 line-clamp-1">{event.title}</h3>
                    <div className="flex flex-wrap gap-y-1 text-sm text-gray-500">
                      <div className="flex items-center mr-4">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-3.5 w-3.5 mr-1" />
                        <span>{event.type}</span>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600 line-clamp-2">
                      {event.description}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-3.5 w-3.5 mr-1" />
                        <span>{event.attendees}/{event.registrations} participantes</span>
                      </div>
                      <Button variant="outline" size="sm">Ver detalhes</Button>
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
                    <Label htmlFor="event-title">Título do Evento*</Label>
                    <Input 
                      id="event-title" 
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      placeholder="Digite o título do evento"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-date">Data*</Label>
                      <div className="relative">
                        <Input 
                          id="event-date" 
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                        />
                        <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-time">Hora*</Label>
                      <div className="relative">
                        <Input 
                          id="event-time" 
                          type="time"
                          value={eventTime}
                          onChange={(e) => setEventTime(e.target.value)}
                        />
                        <Clock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="event-location">Local*</Label>
                    <Select value={eventLocation} onValueChange={setEventLocation}>
                      <SelectTrigger id="event-location">
                        <SelectValue placeholder="Selecione o local" />
                      </SelectTrigger>
                      <SelectContent>
                        {schools.map(school => (
                          <SelectItem key={school.id} value={school.id.toString()}>
                            {school.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="event-type">Tipo de Evento*</Label>
                    <Select value={eventType} onValueChange={setEventType}>
                      <SelectTrigger id="event-type">
                        <SelectValue placeholder="Selecione o tipo do evento" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map(type => (
                          <SelectItem key={type.id} value={type.id.toString()}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="event-description">Descrição</Label>
                    <Textarea 
                      id="event-description" 
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      placeholder="Descreva o evento"
                      rows={4}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Imagem do Evento</Label>
                    <ImageUploader
                      initialImage={eventImage || undefined}
                      onImageChange={setEventImage}
                      placeholderText="Upload de imagem para o evento"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registration-limit">Limite de Participantes (opcional)</Label>
                    <Input id="registration-limit" type="number" min="0" placeholder="Deixe em branco para ilimitado" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registration-deadline">Prazo de Inscrição (opcional)</Label>
                    <div className="relative">
                      <Input id="registration-deadline" type="date" />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-5">
                    <input type="checkbox" id="notify-participants" className="rounded border-gray-300" />
                    <Label htmlFor="notify-participants" className="text-sm cursor-pointer">Notificar participantes por e-mail</Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="add-to-calendar" className="rounded border-gray-300" />
                    <Label htmlFor="add-to-calendar" className="text-sm cursor-pointer">Adicionar ao calendário escolar</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" type="button">Cancelar</Button>
                <Button type="button" onClick={handleCreateEvent}>Criar Evento</Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="registrations" className="space-y-4">
            <div className="rounded-md border overflow-hidden">
              <div className="bg-muted/40 p-4 font-medium">Registros de Inscrições</div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/20 text-sm">
                    <tr>
                      <th className="py-3 px-4 text-left">Evento</th>
                      <th className="py-3 px-4 text-left">Inscritos</th>
                      <th className="py-3 px-4 text-left">Prazo</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {mockEvents.map(event => (
                      <tr key={`reg-${event.id}`} className="bg-white">
                        <td className="py-3 px-4">
                          <div className="font-medium">{event.title}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(event.date).toLocaleDateString('pt-BR')} - {event.location}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {event.registrations}/{event.registrations + 50}
                        </td>
                        <td className="py-3 px-4">
                          {new Date(event.date).getTime() > new Date().getTime() ? 
                            new Date(new Date(event.date).getTime() - 7*24*60*60*1000).toLocaleDateString('pt-BR') :
                            "Encerrado"
                          }
                        </td>
                        <td className="py-3 px-4">
                          {event.status === "Concluído" ? (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Concluído</span>
                          ) : event.status === "Cancelado" ? (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Cancelado</span>
                          ) : (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Aberto</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">Ver Lista</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Eventos Realizados</CardTitle>
                  <CardDescription>2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">27</div>
                  <p className="text-sm text-green-600">+15% em relação a 2024</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Taxa de Participação</CardTitle>
                  <CardDescription>Média anual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">78%</div>
                  <p className="text-sm text-green-600">+5% em relação a 2024</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Satisfação</CardTitle>
                  <CardDescription>Avaliação média</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4.7/5</div>
                  <p className="text-sm text-green-600">+0.3 em relação a 2024</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="pt-4">
              <Button variant="outline" className="mr-2">Exportar Relatório</Button>
              <Button variant="outline">Programar Relatórios</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EventsManagement;
