
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AgendaEvent {
  id: string;
  title: string;
  description: string | null;
  event_type: 'meeting' | 'conference' | 'visit' | 'other';
  start_datetime: string;
  end_datetime: string;
  location: string | null;
  attendees: string[] | null;
  school_id: string | null;
  created_by: string | null;
  all_day: boolean;
  recurring: boolean;
  recurring_pattern: any | null;
  external_calendar_id: string | null;
  created_at: string;
  updated_at: string;
  creator?: {
    id: string;
    name: string;
    email: string;
  };
  school?: {
    id: string;
    name: string;
  };
}

export const useAgenda = () => {
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async (startDate?: Date, endDate?: Date) => {
    try {
      setLoading(true);
      let query = supabase
        .from('agenda_events')
        .select(`
          *,
          creator:profiles!created_by(id, name, email),
          school:schools(id, name)
        `)
        .order('start_datetime', { ascending: true });

      if (startDate) {
        query = query.gte('start_datetime', startDate.toISOString());
      }

      if (endDate) {
        query = query.lte('start_datetime', endDate.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;
      setEvents(data || []);
    } catch (err: any) {
      setError(err.message);
      toast.error('Erro ao carregar eventos');
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Omit<AgendaEvent, 'id' | 'created_at' | 'updated_at' | 'creator' | 'school'>) => {
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

  const updateEvent = async (id: string, eventData: Partial<Omit<AgendaEvent, 'id' | 'created_at' | 'updated_at' | 'creator' | 'school'>>) => {
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

  const getEventById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('agenda_events')
        .select(`
          *,
          creator:profiles!created_by(id, name, email),
          school:schools(id, name)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err: any) {
      toast.error('Erro ao carregar evento: ' + err.message);
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
    deleteEvent,
    getEventById
  };
};
