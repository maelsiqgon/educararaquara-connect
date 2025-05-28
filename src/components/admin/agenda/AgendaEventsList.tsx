
import React from 'react';
import { AgendaEvent } from '@/hooks/useAgenda';
import EventList from './EventList';

interface AgendaEventsListProps {
  events: AgendaEvent[];
  loading: boolean;
  onEdit: (event: AgendaEvent) => void;
  onDelete: (id: string) => void;
}

const AgendaEventsList: React.FC<AgendaEventsListProps> = ({ 
  events, 
  loading, 
  onEdit, 
  onDelete 
}) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        Carregando eventos...
      </div>
    );
  }

  return (
    <EventList
      events={events}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

export default AgendaEventsList;
