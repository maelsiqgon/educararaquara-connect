
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Usar apenas os tipos que existem no banco atualmente
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
      toast.error('Erro ao carregar eventos: ' + err.message);
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Omit<AgendaEvent, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      console.log('Criando evento:', eventData);

      // Validar e formatar dados
      const formattedData = {
        title: eventData.title,
        description: eventData.description || null,
        start_datetime: eventData.start_datetime,
        end_datetime: eventData.end_datetime,
        location: eventData.location || null,
        event_type: eventData.event_type,
        all_day: eventData.all_day || false,
        recurring: eventData.recurring || false,
        recurring_pattern: eventData.recurring_pattern || null,
        attendees: eventData.attendees || null,
        external_calendar_id: eventData.external_calendar_id || null,
        school_id: eventData.school_id || null,
        created_by: eventData.created_by || null
      };

      // Garantir que as datas sejam válidas
      if (!formattedData.start_datetime || formattedData.start_datetime === '') {
        throw new Error('Data de início é obrigatória');
      }
      
      if (!formattedData.end_datetime || formattedData.end_datetime === '') {
        throw new Error('Data de fim é obrigatória');
      }

      // Validar que a data de fim é posterior à data de início
      if (new Date(formattedData.end_datetime) <= new Date(formattedData.start_datetime)) {
        throw new Error('Data de fim deve ser posterior à data de início');
      }

      const { data, error } = await supabase
        .from('agenda_events')
        .insert([formattedData])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      await fetchEvents();
      toast.success('Evento criado com sucesso!');
      return data;
    } catch (err: any) {
      console.error('Error creating event:', err);
      toast.error('Erro ao criar evento: ' + err.message);
      throw err;
    }
  };

  const updateEvent = async (id: string, eventData: Partial<AgendaEvent>) => {
    try {
      // Validar datas se estão sendo atualizadas
      if (eventData.start_datetime && eventData.start_datetime === '') {
        throw new Error('Data de início não pode estar vazia');
      }
      
      if (eventData.end_datetime && eventData.end_datetime === '') {
        throw new Error('Data de fim não pode estar vazia');
      }

      const { error } = await supabase
        .from('agenda_events')
        .update(eventData)
        .eq('id', id);

      if (error) throw error;
      
      await fetchEvents();
      toast.success('Evento atualizado com sucesso!');
    } catch (err: any) {
      console.error('Error updating event:', err);
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
      console.error('Error deleting event:', err);
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
