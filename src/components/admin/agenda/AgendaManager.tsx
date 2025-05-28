
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAgenda, AgendaEvent } from '@/hooks/useAgenda';
import EventForm from './EventForm';
import AgendaHeader from './AgendaHeader';
import AgendaFilters from './AgendaFilters';
import AgendaEventsList from './AgendaEventsList';

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
        <CardTitle className="text-education-primary">
          <AgendaHeader onCreateEvent={handleCreateEvent} />
        </CardTitle>
        <CardDescription>
          Gestão completa da agenda e eventos da Secretaria
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <AgendaFilters filter={filter} onFilterChange={setFilter} />
          
          <AgendaEventsList
            events={filteredEvents}
            loading={loading}
            onEdit={(event) => setSelectedEvent(event)}
            onDelete={handleDeleteEvent}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AgendaManager;
