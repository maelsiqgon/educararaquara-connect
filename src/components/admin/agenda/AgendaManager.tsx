
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Calendar, Clock, MapPin, Plus, Edit, Trash2, Bell, Users, Filter } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

interface AgendaEvent {
  id: string;
  title: string;
  description: string;
  start_datetime: string;
  end_datetime: string;
  location: string;
  event_type: 'meeting' | 'visit' | 'event' | 'conference';
  attendees: string[];
  all_day: boolean;
  recurring: boolean;
  recurring_pattern?: any;
  school_id?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

const AgendaManager = () => {
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<AgendaEvent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [currentDate, setCurrentDate] = useState(new Date());

  const eventTypes = [
    { value: 'meeting', label: 'Reunião', color: 'bg-blue-100 text-blue-800' },
    { value: 'visit', label: 'Visita', color: 'bg-green-100 text-green-800' },
    { value: 'event', label: 'Evento', color: 'bg-purple-100 text-purple-800' },
    { value: 'conference', label: 'Conferência', color: 'bg-orange-100 text-orange-800' }
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('agenda_events')
        .select(`
          *,
          creator:profiles!created_by(name),
          school:schools(name)
        `)
        .order('start_datetime', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Erro ao carregar eventos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = () => {
    setSelectedEvent({
      id: '',
      title: '',
      description: '',
      start_datetime: new Date().toISOString().slice(0, 16),
      end_datetime: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
      location: '',
      event_type: 'meeting',
      attendees: [],
      all_day: false,
      recurring: false,
      created_by: '',
      created_at: '',
      updated_at: ''
    });
    setIsCreating(true);
  };

  const handleSaveEvent = async () => {
    if (!selectedEvent || !selectedEvent.title.trim()) {
      toast.error('Título é obrigatório');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const eventData = {
        ...selectedEvent,
        created_by: user.id,
        start_datetime: new Date(selectedEvent.start_datetime).toISOString(),
        end_datetime: new Date(selectedEvent.end_datetime).toISOString()
      };

      if (isCreating) {
        const { error } = await supabase
          .from('agenda_events')
          .insert([eventData]);
        
        if (error) throw error;
        toast.success('Evento criado com sucesso!');
      } else {
        const { error } = await supabase
          .from('agenda_events')
          .update(eventData)
          .eq('id', selectedEvent.id);
        
        if (error) throw error;
        toast.success('Evento atualizado com sucesso!');
      }

      setSelectedEvent(null);
      setIsCreating(false);
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Erro ao salvar evento');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este evento?')) return;

    try {
      const { error } = await supabase
        .from('agenda_events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Evento excluído com sucesso!');
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Erro ao excluir evento');
    }
  };

  const getTypeColor = (type: string) => {
    const eventType = eventTypes.find(t => t.value === type);
    return eventType?.color || 'bg-gray-100 text-gray-800';
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    return event.event_type === filter;
  });

  if (selectedEvent) {
    return (
      <Card className="border-0 shadow-soft">
        <CardHeader className="bg-education-light rounded-t-lg">
          <CardTitle className="text-education-primary">
            {isCreating ? 'Novo Evento' : 'Editar Evento'}
          </CardTitle>
          <CardDescription>
            {isCreating ? 'Criar um novo evento na agenda' : 'Modificar informações do evento'}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Título *</Label>
                <Input
                  value={selectedEvent.title}
                  onChange={(e) => setSelectedEvent({...selectedEvent, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Tipo de Evento</Label>
                <Select 
                  value={selectedEvent.event_type} 
                  onValueChange={(value) => setSelectedEvent({...selectedEvent, event_type: value as any})}
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
              <Label>Descrição</Label>
              <Textarea
                value={selectedEvent.description}
                onChange={(e) => setSelectedEvent({...selectedEvent, description: e.target.value})}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data/Hora Início</Label>
                <Input
                  type="datetime-local"
                  value={selectedEvent.start_datetime}
                  onChange={(e) => setSelectedEvent({...selectedEvent, start_datetime: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Data/Hora Fim</Label>
                <Input
                  type="datetime-local"
                  value={selectedEvent.end_datetime}
                  onChange={(e) => setSelectedEvent({...selectedEvent, end_datetime: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Local</Label>
              <Input
                value={selectedEvent.location}
                onChange={(e) => setSelectedEvent({...selectedEvent, location: e.target.value})}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedEvent.all_day}
                onChange={(e) => setSelectedEvent({...selectedEvent, all_day: e.target.checked})}
              />
              <Label>Evento de dia inteiro</Label>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedEvent(null);
                  setIsCreating(false);
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleSaveEvent} className="bg-education-primary hover:bg-education-dark">
                {isCreating ? 'Criar' : 'Salvar'} Evento
              </Button>
            </div>
          </div>
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
          Gestão completa da agenda e eventos da Secretaria
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button onClick={handleCreateEvent} className="bg-education-primary hover:bg-education-dark">
                <Plus className="h-4 w-4 mr-2" />
                Novo Evento
              </Button>
              
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Eventos</SelectItem>
                  {eventTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">Carregando eventos...</div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="border">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{event.title}</h4>
                          <Badge className={getTypeColor(event.event_type)}>
                            {eventTypes.find(t => t.value === event.event_type)?.label}
                          </Badge>
                          {event.all_day && (
                            <Badge variant="outline">Dia Inteiro</Badge>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-3">{event.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{new Date(event.start_datetime).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>
                              {new Date(event.start_datetime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - 
                              {new Date(event.end_datetime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedEvent(event)}
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
              
              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum evento encontrado</p>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgendaManager;
