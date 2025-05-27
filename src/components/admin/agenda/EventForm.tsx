
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

interface EventFormProps {
  event: AgendaEvent | null;
  isCreating: boolean;
  onSave: () => void;
  onCancel: () => void;
  onChange: (event: AgendaEvent) => void;
}

const eventTypes = [
  { value: 'meeting', label: 'Reunião', color: 'bg-blue-100 text-blue-800' },
  { value: 'visit', label: 'Visita', color: 'bg-green-100 text-green-800' },
  { value: 'event', label: 'Evento', color: 'bg-purple-100 text-purple-800' },
  { value: 'conference', label: 'Conferência', color: 'bg-orange-100 text-orange-800' }
];

const EventForm: React.FC<EventFormProps> = ({ event, isCreating, onSave, onCancel, onChange }) => {
  if (!event) return null;

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
                value={event.title}
                onChange={(e) => onChange({...event, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Tipo de Evento</Label>
              <Select 
                value={event.event_type} 
                onValueChange={(value) => onChange({...event, event_type: value as EventType})}
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
              value={event.description || ''}
              onChange={(e) => onChange({...event, description: e.target.value})}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data/Hora Início</Label>
              <Input
                type="datetime-local"
                value={event.start_datetime}
                onChange={(e) => onChange({...event, start_datetime: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Data/Hora Fim</Label>
              <Input
                type="datetime-local"
                value={event.end_datetime}
                onChange={(e) => onChange({...event, end_datetime: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Local</Label>
            <Input
              value={event.location || ''}
              onChange={(e) => onChange({...event, location: e.target.value})}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={event.all_day}
              onChange={(e) => onChange({...event, all_day: e.target.checked})}
            />
            <Label>Evento de dia inteiro</Label>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button onClick={onSave} className="bg-education-primary hover:bg-education-dark">
              {isCreating ? 'Criar' : 'Salvar'} Evento
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventForm;
