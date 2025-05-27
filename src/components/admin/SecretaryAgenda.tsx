
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Calendar, Clock, MapPin, Plus, Edit, Trash2, User } from "lucide-react";

interface AgendaEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'meeting' | 'visit' | 'event' | 'other';
  priority: 'high' | 'medium' | 'low';
}

const SecretaryAgenda = () => {
  const [events, setEvents] = useState<AgendaEvent[]>([
    {
      id: 1,
      title: "Reunião com Diretores",
      date: "2025-05-30",
      time: "09:00",
      location: "Secretaria de Educação",
      description: "Reunião mensal com todos os diretores da rede municipal",
      type: 'meeting',
      priority: 'high'
    },
    {
      id: 2,
      title: "Visita à EMEF Carlos Gomes",
      date: "2025-05-31",
      time: "14:00",
      location: "EMEF Carlos Gomes",
      description: "Visita técnica para acompanhamento das atividades pedagógicas",
      type: 'visit',
      priority: 'medium'
    },
    {
      id: 3,
      title: "Inauguração da Nova Quadra",
      date: "2025-06-02",
      time: "10:00",
      location: "EMEI Jardim das Flores",
      description: "Cerimônia de inauguração da nova quadra poliesportiva",
      type: 'event',
      priority: 'high'
    }
  ]);

  const [editingEvent, setEditingEvent] = useState<AgendaEvent | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateEvent = () => {
    setEditingEvent({
      id: 0,
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      type: 'meeting',
      priority: 'medium'
    });
    setIsCreating(true);
  };

  const handleSaveEvent = () => {
    if (!editingEvent) return;

    if (!editingEvent.title || !editingEvent.date || !editingEvent.time) {
      toast.error("Título, data e horário são obrigatórios!");
      return;
    }

    if (isCreating) {
      const newEvent = {
        ...editingEvent,
        id: Math.max(...events.map(e => e.id)) + 1
      };
      setEvents([...events, newEvent]);
      toast.success("Evento criado com sucesso!");
    } else {
      setEvents(events.map(e => e.id === editingEvent.id ? editingEvent : e));
      toast.success("Evento atualizado com sucesso!");
    }

    setEditingEvent(null);
    setIsCreating(false);
  };

  const handleDeleteEvent = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este evento?")) {
      setEvents(events.filter(e => e.id !== id));
      toast.success("Evento removido com sucesso!");
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'visit': return 'bg-green-100 text-green-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'meeting': return 'Reunião';
      case 'visit': return 'Visita';
      case 'event': return 'Evento';
      default: return 'Outro';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (editingEvent) {
    return (
      <Card className="border-0 shadow-soft">
        <CardHeader className="bg-education-light rounded-t-lg">
          <CardTitle className="text-education-primary">
            {isCreating ? "Novo Evento na Agenda" : "Editar Evento"}
          </CardTitle>
          <CardDescription>
            {isCreating ? "Adicione um novo compromisso à agenda" : "Modifique as informações do evento"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-title">Título *</Label>
                <Input
                  id="event-title"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                  className="border-gray-300 focus-visible:ring-education-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event-location">Local</Label>
                <Input
                  id="event-location"
                  value={editingEvent.location}
                  onChange={(e) => setEditingEvent({...editingEvent, location: e.target.value})}
                  className="border-gray-300 focus-visible:ring-education-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-date">Data *</Label>
                <Input
                  id="event-date"
                  type="date"
                  value={editingEvent.date}
                  onChange={(e) => setEditingEvent({...editingEvent, date: e.target.value})}
                  className="border-gray-300 focus-visible:ring-education-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event-time">Horário *</Label>
                <Input
                  id="event-time"
                  type="time"
                  value={editingEvent.time}
                  onChange={(e) => setEditingEvent({...editingEvent, time: e.target.value})}
                  className="border-gray-300 focus-visible:ring-education-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-type">Tipo</Label>
                <select 
                  id="event-type"
                  value={editingEvent.type}
                  onChange={(e) => setEditingEvent({...editingEvent, type: e.target.value as any})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-education-primary focus:border-education-primary"
                >
                  <option value="meeting">Reunião</option>
                  <option value="visit">Visita</option>
                  <option value="event">Evento</option>
                  <option value="other">Outro</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-priority">Prioridade</Label>
              <select 
                id="event-priority"
                value={editingEvent.priority}
                onChange={(e) => setEditingEvent({...editingEvent, priority: e.target.value as any})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-education-primary focus:border-education-primary"
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="event-description">Descrição</Label>
              <textarea
                id="event-description"
                value={editingEvent.description}
                onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-[100px] focus:ring-education-primary focus:border-education-primary"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingEvent(null);
                  setIsCreating(false);
                }}
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
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Agenda do Secretário
        </CardTitle>
        <CardDescription>
          Gerencie a agenda e compromissos da Secretaria de Educação
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Próximos Compromissos</h3>
            <Button onClick={handleCreateEvent} className="bg-education-primary hover:bg-education-dark">
              <Plus className="h-4 w-4 mr-2" />
              Novo Evento
            </Button>
          </div>

          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.id} className="border hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-education-primary">{event.title}</h4>
                        <Badge className={getTypeColor(event.type)}>
                          {getTypeText(event.type)}
                        </Badge>
                        <Badge className={getPriorityColor(event.priority)}>
                          {event.priority === 'high' ? 'Alta' : event.priority === 'medium' ? 'Média' : 'Baixa'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(event.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm">{event.description}</p>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingEvent(event)}
                        className="text-education-primary hover:text-education-dark"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center py-12">
              <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum compromisso agendado</p>
              <Button 
                onClick={handleCreateEvent} 
                className="mt-4 bg-education-primary hover:bg-education-dark"
              >
                <Plus className="h-4 w-4 mr-2" />
                Criar primeiro evento
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecretaryAgenda;
