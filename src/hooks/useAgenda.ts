
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
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('agenda_events')
        .select('*')
        .order('start_datetime', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (err: any) {
      setError(err.message);
      toast.error('Erro ao carregar eventos');
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Omit<AgendaEvent, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('agenda_events')
        .insert([eventData])
        .select()
        .single();

      if (error) throw error;
      
      await fetchEvents();
      toast.success('Evento criado com sucesso!');
      return data;
    } catch (err: any) {
      toast.error('Erro ao criar evento: ' + err.message);
      throw err;
    }
  };

  const updateEvent = async (id: string, eventData: Partial<AgendaEvent>) => {
    try {
      const { error } = await supabase
        .from('agenda_events')
        .update(eventData)
        .eq('id', id);

      if (error) throw error;
      
      await fetchEvents();
      toast.success('Evento atualizado com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao atualizar evento: ' + err.message);
      throw err;
    }
  };

  const deleteEvent = async (id: string) => {
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
