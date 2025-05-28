
import React, { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAgenda, AgendaEvent, EventType } from '@/hooks/useAgenda';
import { format, parseISO, startOfDay, endOfDay, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Plus, Clock, MapPin, Users, Bell, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const VisualAgendaCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AgendaEvent | null>(null);
  const [showNotifications, setShowNotifications] = useState(true);
  
  const { events, loading, createEvent, updateEvent, deleteEvent } = useAgenda();

  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    start_datetime: '',
    end_datetime: '',
    location: '',
    event_type: 'meeting' as EventType,
    all_day: false,
    recurring: false,
    attendees: [] as string[]
  });

  useEffect(() => {
    if (editingEvent) {
      setEventForm({
        title: editingEvent.title,
        description: editingEvent.description || '',
        start_datetime: editingEvent.start_datetime,
        end_datetime: editingEvent.end_datetime,
        location: editingEvent.location || '',
        event_type: editingEvent.event_type,
        all_day: editingEvent.all_day,
        recurring: editingEvent.recurring,
        attendees: editingEvent.attendees || []
      });
    } else {
      resetForm();
    }
  }, [editingEvent]);

  const resetForm = () => {
    const now = new Date();
    const defaultStart = new Date(selectedDate);
    defaultStart.setHours(9, 0, 0, 0);
    const defaultEnd = new Date(selectedDate);
    defaultEnd.setHours(10, 0, 0, 0);

    setEventForm({
      title: '',
      description: '',
      start_datetime: defaultStart.toISOString().slice(0, 16),
      end_datetime: defaultEnd.toISOString().slice(0, 16),
      location: '',
      event_type: 'meeting',
      all_day: false,
      recurring: false,
      attendees: []
    });
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      isSameDay(parseISO(event.start_datetime), date)
    );
  };

  const getEventTypeColor = (type: EventType) => {
    const colors = {
      meeting: 'bg-blue-500',
      conference: 'bg-purple-500',
      visit: 'bg-green-500',
      event: 'bg-orange-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  const getEventTypeLabel = (type: EventType) => {
    const labels = {
      meeting: 'Reunião',
      conference: 'Conferência',
      visit: 'Visita',
      event: 'Evento'
    };
    return labels[type] || type;
  };

  const handleCreateEvent = async () => {
    try {
      if (!eventForm.title.trim()) {
        toast.error('Título é obrigatório');
        return;
      }

      const eventData = {
        ...eventForm,
        start_datetime: new Date(eventForm.start_datetime).toISOString(),
        end_datetime: new Date(eventForm.end_datetime).toISOString(),
      };

      if (editingEvent) {
        await updateEvent(editingEvent.id, eventData);
      } else {
        await createEvent(eventData);
      }

      setShowEventModal(false);
      setEditingEvent(null);
      resetForm();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      try {
        await deleteEvent(eventId);
        setShowEventModal(false);
        setEditingEvent(null);
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const openEventModal = (event?: AgendaEvent) => {
    if (event) {
      setEditingEvent(event);
    } else {
      setEditingEvent(null);
    }
    setShowEventModal(true);
  };

  const upcomingEvents = events
    .filter(event => new Date(event.start_datetime) >= startOfDay(new Date()))
    .sort((a, b) => new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime())
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Calendário da Agenda</CardTitle>
            <Button onClick={() => openEventModal()}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Evento
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              locale={ptBR}
              className="rounded-md border"
            />
            
            <div className="space-y-4">
              <h3 className="font-semibold">
                Eventos para {format(selectedDate, 'dd/MM/yyyy', { locale: ptBR })}
              </h3>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {getEventsForDate(selectedDate).map((event) => (
                  <div 
                    key={event.id} 
                    className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => openEventModal(event)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.event_type)}`} />
                        <span className="font-medium">{event.title}</span>
                      </div>
                      <Badge variant="outline">{getEventTypeLabel(event.event_type)}</Badge>
                    </div>
                    
                    <div className="mt-2 space-y-1">
                      {!event.all_day && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-3 w-3 mr-1" />
                          {format(parseISO(event.start_datetime), 'HH:mm')} - {format(parseISO(event.end_datetime), 'HH:mm')}
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.location}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {getEventsForDate(selectedDate).length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    Nenhum evento para esta data
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Próximos Eventos
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <Switch 
                checked={showNotifications} 
                onCheckedChange={setShowNotifications}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{event.title}</span>
                  <Badge variant="outline" className="text-xs">
                    {getEventTypeLabel(event.event_type)}
                  </Badge>
                </div>
                <div className="mt-1 text-xs text-gray-600">
                  {format(parseISO(event.start_datetime), 'dd/MM - HH:mm', { locale: ptBR })}
                </div>
                {event.location && (
                  <div className="mt-1 text-xs text-gray-500">
                    📍 {event.location}
                  </div>
                )}
              </div>
            ))}
            
            {upcomingEvents.length === 0 && (
              <p className="text-gray-500 text-center py-4 text-sm">
                Nenhum evento próximo
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Event Modal */}
      {showEventModal && (
        <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? 'Editar Evento' : 'Novo Evento'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="Nome do evento"
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  placeholder="Detalhes do evento"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="event_type">Tipo</Label>
                  <Select 
                    value={eventForm.event_type} 
                    onValueChange={(value: EventType) => setEventForm({ ...eventForm, event_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Reunião</SelectItem>
                      <SelectItem value="conference">Conferência</SelectItem>
                      <SelectItem value="visit">Visita</SelectItem>
                      <SelectItem value="event">Evento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Local</Label>
                  <Input
                    id="location"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    placeholder="Local do evento"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={eventForm.all_day}
                    onCheckedChange={(checked) => setEventForm({ ...eventForm, all_day: checked })}
                  />
                  <Label>Dia inteiro</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={eventForm.recurring}
                    onCheckedChange={(checked) => setEventForm({ ...eventForm, recurring: checked })}
                  />
                  <Label>Recorrente</Label>
                </div>
              </div>

              {!eventForm.all_day && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start_datetime">Data/Hora Início</Label>
                    <Input
                      id="start_datetime"
                      type="datetime-local"
                      value={eventForm.start_datetime}
                      onChange={(e) => setEventForm({ ...eventForm, start_datetime: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="end_datetime">Data/Hora Fim</Label>
                    <Input
                      id="end_datetime"
                      type="datetime-local"
                      value={eventForm.end_datetime}
                      onChange={(e) => setEventForm({ ...eventForm, end_datetime: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="flex justify-between">
              <div>
                {editingEvent && (
                  <Button 
                    variant="destructive" 
                    onClick={() => handleDeleteEvent(editingEvent.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </Button>
                )}
              </div>
              
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setShowEventModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateEvent}>
                  {editingEvent ? 'Atualizar' : 'Criar'} Evento
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default VisualAgendaCalendar;
