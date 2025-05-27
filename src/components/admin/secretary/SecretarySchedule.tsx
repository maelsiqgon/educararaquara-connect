
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Calendar, Clock, MapPin, Users, Plus, Edit, Trash2, Bell, FileText } from "lucide-react";

interface ScheduleEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  type: 'reuniao' | 'visita' | 'evento' | 'audiencia' | 'conferencia';
  participants: string[];
  status: 'agendado' | 'realizado' | 'cancelado' | 'adiado';
  priority: 'baixa' | 'media' | 'alta';
  attachments?: { name: string; url: string }[];
  notifications: {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
    beforeMinutes: number;
  };
  createdAt: string;
  updatedAt: string;
}

const SecretarySchedule = () => {
  const [events, setEvents] = useState<ScheduleEvent[]>([
    {
      id: 1,
      title: "Reunião com Diretores",
      description: "Reunião mensal com todos os diretores da rede municipal para discussão do planejamento pedagógico",
      date: "2025-02-01",
      time: "09:00",
      endTime: "11:00",
      location: "Secretaria de Educação - Sala de Reuniões",
      type: "reuniao",
      participants: ["Ana Silva Santos", "Marcia Oliveira", "Patricia Costa"],
      status: "agendado",
      priority: "alta",
      notifications: {
        email: true,
        sms: false,
        whatsapp: true,
        beforeMinutes: 30
      },
      createdAt: "2025-01-15T10:00:00Z",
      updatedAt: "2025-01-15T10:00:00Z"
    },
    {
      id: 2,
      title: "Visita à EMEF Scabello",
      description: "Visita técnica para acompanhamento das obras de reforma da quadra esportiva",
      date: "2025-02-03",
      time: "14:00",
      endTime: "16:00",
      location: "EMEF Prof. Henrique Scabello",
      type: "visita",
      participants: ["Ana Silva Santos", "Engenheiro Responsável"],
      status: "agendado",
      priority: "media",
      notifications: {
        email: true,
        sms: true,
        whatsapp: true,
        beforeMinutes: 60
      },
      createdAt: "2025-01-16T14:00:00Z",
      updatedAt: "2025-01-16T14:00:00Z"
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState("calendar");
  const [currentDate, setCurrentDate] = useState(new Date());

  const eventTypes = [
    { value: "reuniao", label: "Reunião", color: "bg-blue-100 text-blue-800" },
    { value: "visita", label: "Visita", color: "bg-green-100 text-green-800" },
    { value: "evento", label: "Evento", color: "bg-purple-100 text-purple-800" },
    { value: "audiencia", label: "Audiência", color: "bg-orange-100 text-orange-800" },
    { value: "conferencia", label: "Conferência", color: "bg-red-100 text-red-800" }
  ];

  const statusOptions = [
    { value: "agendado", label: "Agendado", color: "bg-blue-100 text-blue-800" },
    { value: "realizado", label: "Realizado", color: "bg-green-100 text-green-800" },
    { value: "cancelado", label: "Cancelado", color: "bg-red-100 text-red-800" },
    { value: "adiado", label: "Adiado", color: "bg-yellow-100 text-yellow-800" }
  ];

  const priorityOptions = [
    { value: "baixa", label: "Baixa", color: "bg-gray-100 text-gray-800" },
    { value: "media", label: "Média", color: "bg-yellow-100 text-yellow-800" },
    { value: "alta", label: "Alta", color: "bg-red-100 text-red-800" }
  ];

  const handleCreateEvent = () => {
    setSelectedEvent({
      id: 0,
      title: "",
      description: "",
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      endTime: "10:00",
      location: "",
      type: "reuniao",
      participants: [],
      status: "agendado",
      priority: "media",
      notifications: {
        email: true,
        sms: false,
        whatsapp: false,
        beforeMinutes: 30
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    setIsCreating(true);
    setActiveTab("form");
  };

  const handleEditEvent = (event: ScheduleEvent) => {
    setSelectedEvent(event);
    setIsCreating(false);
    setActiveTab("form");
  };

  const handleSaveEvent = () => {
    if (!selectedEvent) return;

    if (!selectedEvent.title.trim()) {
      toast.error("Título é obrigatório!");
      return;
    }

    const updatedEvent = {
      ...selectedEvent,
      updatedAt: new Date().toISOString()
    };

    if (isCreating) {
      const newEvent = {
        ...updatedEvent,
        id: Math.max(...events.map(e => e.id)) + 1
      };
      setEvents([...events, newEvent]);
      toast.success("Evento criado com sucesso!");
    } else {
      setEvents(events.map(e => e.id === selectedEvent.id ? updatedEvent : e));
      toast.success("Evento atualizado com sucesso!");
    }

    setSelectedEvent(null);
    setIsCreating(false);
    setActiveTab("calendar");
  };

  const handleDeleteEvent = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este evento?")) {
      setEvents(events.filter(e => e.id !== id));
      toast.success("Evento excluído com sucesso!");
    }
  };

  const addParticipant = () => {
    if (!selectedEvent) return;
    
    setSelectedEvent({
      ...selectedEvent,
      participants: [...selectedEvent.participants, ""]
    });
  };

  const updateParticipant = (index: number, value: string) => {
    if (!selectedEvent) return;
    
    const updatedParticipants = [...selectedEvent.participants];
    updatedParticipants[index] = value;
    
    setSelectedEvent({
      ...selectedEvent,
      participants: updatedParticipants
    });
  };

  const removeParticipant = (index: number) => {
    if (!selectedEvent) return;
    
    setSelectedEvent({
      ...selectedEvent,
      participants: selectedEvent.participants.filter((_, i) => i !== index)
    });
  };

  const getTypeColor = (type: string) => {
    const eventType = eventTypes.find(t => t.value === type);
    return eventType?.color || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(s => s.value === status);
    return statusOption?.color || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority: string) => {
    const priorityOption = priorityOptions.find(p => p.value === priority);
    return priorityOption?.color || "bg-gray-100 text-gray-800";
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    const today = new Date().toDateString();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toDateString();
      const dayEvents = getEventsForDate(date);
      const isToday = dateStr === today;

      days.push(
        <div
          key={day}
          className={`p-2 border min-h-[100px] ${
            isToday ? 'bg-education-light border-education-primary' : 'bg-white'
          }`}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-education-primary' : ''}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded cursor-pointer ${getTypeColor(event.type)}`}
                onClick={() => handleEditEvent(event)}
              >
                <div className="font-medium truncate">{event.title}</div>
                <div className="truncate">{event.time}</div>
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">
                +{dayEvents.length - 2} mais
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Agenda do Secretário
        </CardTitle>
        <CardDescription>
          Gestão completa da agenda do Secretário de Educação
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
            <TabsTrigger value="list">Lista de Eventos</TabsTrigger>
            <TabsTrigger value="form">Formulário</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => navigateMonth(-1)}>
                  ←
                </Button>
                <h3 className="text-lg font-medium">
                  {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                </h3>
                <Button variant="outline" onClick={() => navigateMonth(1)}>
                  →
                </Button>
              </div>
              <Button onClick={handleCreateEvent} className="bg-education-primary hover:bg-education-dark">
                <Plus className="h-4 w-4 mr-2" />
                Novo Evento
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-0 border">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                <div key={day} className="p-2 bg-gray-50 border-b font-medium text-center">
                  {day}
                </div>
              ))}
              {renderCalendar()}
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Próximos Eventos</h3>
              <Button onClick={handleCreateEvent} className="bg-education-primary hover:bg-education-dark">
                <Plus className="h-4 w-4 mr-2" />
                Novo Evento
              </Button>
            </div>

            <div className="space-y-4">
              {events
                .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
                .map((event) => (
                  <Card key={event.id} className="border">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{event.title}</h4>
                            <Badge className={getTypeColor(event.type)}>
                              {eventTypes.find(t => t.value === event.type)?.label}
                            </Badge>
                            <Badge className={getStatusColor(event.status)}>
                              {statusOptions.find(s => s.value === event.status)?.label}
                            </Badge>
                            <Badge className={getPriorityColor(event.priority)}>
                              {priorityOptions.find(p => p.value === event.priority)?.label}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 mb-3">{event.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span>{new Date(event.date).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span>{event.time} - {event.endTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          
                          {event.participants.length > 0 && (
                            <div className="mt-3">
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4 text-gray-400" />
                                <span className="font-medium">Participantes:</span>
                                <span>{event.participants.join(', ')}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditEvent(event)}
                            className="text-education-primary hover:text-education-dark"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteEvent(event.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="form" className="space-y-6">
            {selectedEvent && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    {isCreating ? "Novo Evento" : "Editar Evento"}
                  </h3>
                  <Button variant="outline" onClick={() => setActiveTab("calendar")}>
                    Voltar
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-title">Título *</Label>
                    <Input
                      id="event-title"
                      value={selectedEvent.title}
                      onChange={(e) => setSelectedEvent({...selectedEvent, title: e.target.value})}
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="event-type">Tipo de Evento</Label>
                    <Select 
                      value={selectedEvent.type} 
                      onValueChange={(value) => setSelectedEvent({...selectedEvent, type: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event-description">Descrição</Label>
                  <Textarea
                    id="event-description"
                    value={selectedEvent.description}
                    onChange={(e) => setSelectedEvent({...selectedEvent, description: e.target.value})}
                    className="border-gray-300 focus-visible:ring-education-primary"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-date">Data</Label>
                    <Input
                      id="event-date"
                      type="date"
                      value={selectedEvent.date}
                      onChange={(e) => setSelectedEvent({...selectedEvent, date: e.target.value})}
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="event-time">Hora Início</Label>
                    <Input
                      id="event-time"
                      type="time"
                      value={selectedEvent.time}
                      onChange={(e) => setSelectedEvent({...selectedEvent, time: e.target.value})}
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="event-end-time">Hora Fim</Label>
                    <Input
                      id="event-end-time"
                      type="time"
                      value={selectedEvent.endTime}
                      onChange={(e) => setSelectedEvent({...selectedEvent, endTime: e.target.value})}
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event-location">Local</Label>
                  <Input
                    id="event-location"
                    value={selectedEvent.location}
                    onChange={(e) => setSelectedEvent({...selectedEvent, location: e.target.value})}
                    className="border-gray-300 focus-visible:ring-education-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-status">Status</Label>
                    <Select 
                      value={selectedEvent.status} 
                      onValueChange={(value) => setSelectedEvent({...selectedEvent, status: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="event-priority">Prioridade</Label>
                    <Select 
                      value={selectedEvent.priority} 
                      onValueChange={(value) => setSelectedEvent({...selectedEvent, priority: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityOptions.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>
                            {priority.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-medium">Participantes</Label>
                    <Button variant="outline" onClick={addParticipant}>
                      <Users className="h-4 w-4 mr-2" />
                      Adicionar Participante
                    </Button>
                  </div>
                  
                  {selectedEvent.participants.map((participant, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={participant}
                        onChange={(e) => updateParticipant(index, e.target.value)}
                        placeholder="Nome do participante"
                        className="border-gray-300 focus-visible:ring-education-primary"
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => removeParticipant(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Card className="border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <Bell className="h-4 w-4 mr-2" />
                      Notificações
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedEvent.notifications.email}
                          onChange={(e) => setSelectedEvent({
                            ...selectedEvent,
                            notifications: {...selectedEvent.notifications, email: e.target.checked}
                          })}
                        />
                        <Label>E-mail</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedEvent.notifications.sms}
                          onChange={(e) => setSelectedEvent({
                            ...selectedEvent,
                            notifications: {...selectedEvent.notifications, sms: e.target.checked}
                          })}
                        />
                        <Label>SMS</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedEvent.notifications.whatsapp}
                          onChange={(e) => setSelectedEvent({
                            ...selectedEvent,
                            notifications: {...selectedEvent.notifications, whatsapp: e.target.checked}
                          })}
                        />
                        <Label>WhatsApp</Label>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="notification-time">Avisar antes (min)</Label>
                        <Input
                          id="notification-time"
                          type="number"
                          value={selectedEvent.notifications.beforeMinutes}
                          onChange={(e) => setSelectedEvent({
                            ...selectedEvent,
                            notifications: {...selectedEvent.notifications, beforeMinutes: parseInt(e.target.value)}
                          })}
                          className="border-gray-300 focus-visible:ring-education-primary"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("calendar")}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSaveEvent}
                    className="bg-education-primary hover:bg-education-dark"
                  >
                    {isCreating ? "Criar Evento" : "Salvar Alterações"}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-education-primary">{events.length}</div>
                    <p className="text-sm text-gray-600">Total de Eventos</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {events.filter(e => e.status === 'realizado').length}
                    </div>
                    <p className="text-sm text-gray-600">Realizados</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {events.filter(e => e.status === 'agendado').length}
                    </div>
                    <p className="text-sm text-gray-600">Agendados</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {events.filter(e => e.priority === 'alta').length}
                    </div>
                    <p className="text-sm text-gray-600">Alta Prioridade</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Próximos Eventos por Tipo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventTypes.map((type) => {
                    const typeEvents = events.filter(e => e.type === type.value && e.status === 'agendado');
                    return (
                      <div key={type.value} className="flex justify-between items-center p-3 border rounded">
                        <div className="flex items-center gap-3">
                          <Badge className={type.color}>{type.label}</Badge>
                          <span className="font-medium">{typeEvents.length} eventos agendados</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Relatório
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SecretarySchedule;
