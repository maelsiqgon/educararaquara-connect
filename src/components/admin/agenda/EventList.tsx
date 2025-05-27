
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Edit, Trash2 } from "lucide-react";
import { EventType } from '@/hooks/useAgenda';

interface AgendaEvent {
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

interface EventListProps {
  events: AgendaEvent[];
  onEdit: (event: AgendaEvent) => void;
  onDelete: (id: string) => void;
}

const eventTypes = [
  { value: 'meeting', label: 'Reunião', color: 'bg-blue-100 text-blue-800' },
  { value: 'visit', label: 'Visita', color: 'bg-green-100 text-green-800' },
  { value: 'event', label: 'Evento', color: 'bg-purple-100 text-purple-800' },
  { value: 'conference', label: 'Conferência', color: 'bg-orange-100 text-orange-800' }
];

const EventList: React.FC<EventListProps> = ({ events, onEdit, onDelete }) => {
  const getTypeColor = (type: EventType) => {
    const eventType = eventTypes.find(t => t.value === type);
    return eventType?.color || 'bg-gray-100 text-gray-800';
  };

  const getTypeLabel = (type: EventType) => {
    const eventType = eventTypes.find(t => t.value === type);
    return eventType?.label || type;
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Nenhum evento encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id} className="border">
          <CardContent className="pt-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">{event.title}</h4>
                  <Badge className={getTypeColor(event.event_type)}>
                    {getTypeLabel(event.event_type)}
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
                  onClick={() => onEdit(event)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onDelete(event.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EventList;
