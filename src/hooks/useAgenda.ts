
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type EventType = 'meeting' | 'conference' | 'visit' | 'event';

export interface AgendaEvent {
  id: string;
  title: string;
  description?: string;
  start_datetime: string;
  end_datetime: string;
  location?: string;
  event_type: EventType;
  all_day: boolean;
  recurring: boolean;
  recurring_pattern?: any;
  attendees?: string[];
  external_calendar_id?: string;
  school_id?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export const useAgenda = () => {
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('agenda_events')
        .select(`
          *,
          school:schools(name)
        `)
        .order('start_datetime', { ascending: true });

      if (error) throw error;
      
      setEvents(data.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        start_datetime: event.start_datetime,
        end_datetime: event.end_datetime,
        location: event.location,
        event_type: event.event_type as EventType,
        all_day: event.all_day,
        recurring: event.recurring,
        recurring_pattern: event.recurring_pattern,
        attendees: event.attendees,
        external_calendar_id: event.external_calendar_id,
        school_id: event.school_id,
        created_by: event.created_by,
        created_at: event.created_at,
        updated_at: event.updated_at
      })));
    } catch (err: any) {
      setError(err.message);
      toast.error('Erro ao carregar eventos');
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Omit<AgendaEvent, 'id' | 'created_at' | 'updated_at'>): Promise<AgendaEvent> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('agenda_events')
        .insert([{
          ...eventData,
          created_by: user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      await fetchEvents();
      toast.success('Evento criado com sucesso!');
      return data as AgendaEvent;
    } catch (err: any) {
      toast.error('Erro ao criar evento: ' + err.message);
      throw err;
    }
  };

  const updateEvent = async (id: string, updates: Partial<AgendaEvent>): Promise<AgendaEvent> => {
    try {
      const { data, error } = await supabase
        .from('agenda_events')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchEvents();
      toast.success('Evento atualizado com sucesso!');
      return data as AgendaEvent;
    } catch (err: any) {
      toast.error('Erro ao atualizar evento: ' + err.message);
      throw err;
    }
  };

  const deleteEvent = async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('agenda_events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchEvents();
      toast.success('Evento removido com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao remover evento: ' + err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent
  };
};
