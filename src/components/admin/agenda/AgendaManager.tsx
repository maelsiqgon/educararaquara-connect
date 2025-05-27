
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Calendar, Plus, Filter } from "lucide-react";
import { useAgenda, AgendaEvent, EventType } from '@/hooks/useAgenda';
import EventForm from './EventForm';
import EventList from './EventList';

const eventTypes = [
  { value: 'meeting', label: 'Reunião', color: 'bg-blue-100 text-blue-800' },
  { value: 'visit', label: 'Visita', color: 'bg-green-100 text-green-800' },
  { value: 'event', label: 'Evento', color: 'bg-purple-100 text-purple-800' },
  { value: 'conference', label: 'Conferência', color: 'bg-orange-100 text-orange-800' }
];

const AgendaManager = () => {
  const { events, loading, createEvent, updateEvent, deleteEvent } = useAgenda();
  const [selectedEvent, setSelectedEvent] = useState<AgendaEvent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleCreateEvent = () => {
    setSelectedEvent({
      id: '',
      title: '',
      description: '',
      start_datetime: new Date().toISOString().slice(0, 16),
      end_datetime: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
      location: '',
      event_type: 'meeting',
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
      if (isCreating) {
        await createEvent(selectedEvent);
      } else {
        await updateEvent(selectedEvent.id, selectedEvent);
      }

      setSelectedEvent(null);
      setIsCreating(false);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este evento?')) return;

    try {
      await deleteEvent(id);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    return event.event_type === filter;
  });

  if (selectedEvent) {
    return (
      <EventForm
        event={selectedEvent}
        isCreating={isCreating}
        onSave={handleSaveEvent}
        onCancel={() => {
          setSelectedEvent(null);
          setIsCreating(false);
        }}
        onChange={setSelectedEvent}
      />
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
            <EventList
              events={filteredEvents}
              onEdit={(event) => setSelectedEvent(event)}
              onDelete={handleDeleteEvent}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgendaManager;
