
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarIcon, Clock } from "lucide-react";
import { AgendaEvent, EventType } from "@/hooks/useAgenda";

interface EventFormProps {
  event?: AgendaEvent;
  onSubmit: (eventData: Omit<AgendaEvent, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const EventForm: React.FC<EventFormProps> = ({
  event,
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    start_datetime: event?.start_datetime ? new Date(event.start_datetime).toISOString().slice(0, 16) : '',
    end_datetime: event?.end_datetime ? new Date(event.end_datetime).toISOString().slice(0, 16) : '',
    location: event?.location || '',
    event_type: (event?.event_type || 'meeting') as EventType,
    all_day: event?.all_day || false,
    recurring: event?.recurring || false,
    school_id: event?.school_id || '',
    attendees: event?.attendees || []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title.trim()) {
      alert('Título é obrigatório');
      return;
    }

    if (!formData.start_datetime) {
      alert('Data e hora de início são obrigatórias');
      return;
    }

    if (!formData.end_datetime) {
      alert('Data e hora de fim são obrigatórias');
      return;
    }

    // Convert datetime-local format to ISO string
    const startDate = new Date(formData.start_datetime);
    const endDate = new Date(formData.end_datetime);

    // Validate dates
    if (isNaN(startDate.getTime())) {
      alert('Data de início inválida');
      return;
    }

    if (isNaN(endDate.getTime())) {
      alert('Data de fim inválida');
      return;
    }

    if (endDate <= startDate) {
      alert('Data de fim deve ser posterior à data de início');
      return;
    }

    try {
      await onSubmit({
        ...formData,
        start_datetime: startDate.toISOString(),
        end_datetime: endDate.toISOString(),
        created_by: undefined // Will be set by the server
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const eventTypes = [
    { value: 'meeting', label: 'Reunião' },
    { value: 'conference', label: 'Conferência' },
    { value: 'visit', label: 'Visita' },
    { value: 'event', label: 'Evento' }
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          {event ? 'Editar Evento' : 'Novo Evento'}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Digite o título do evento"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descrição do evento"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_datetime">Data e Hora de Início *</Label>
              <Input
                id="start_datetime"
                type="datetime-local"
                value={formData.start_datetime}
                onChange={(e) => handleInputChange('start_datetime', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_datetime">Data e Hora de Fim *</Label>
              <Input
                id="end_datetime"
                type="datetime-local"
                value={formData.end_datetime}
                onChange={(e) => handleInputChange('end_datetime', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Local</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Local do evento"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event_type">Tipo de Evento</Label>
            <Select
              value={formData.event_type}
              onValueChange={(value) => handleInputChange('event_type', value as EventType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
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

          <div className="flex items-center space-x-2">
            <Switch
              id="all_day"
              checked={formData.all_day}
              onCheckedChange={(checked) => handleInputChange('all_day', checked)}
            />
            <Label htmlFor="all_day">Evento de dia inteiro</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="recurring"
              checked={formData.recurring}
              onCheckedChange={(checked) => handleInputChange('recurring', checked)}
            />
            <Label htmlFor="recurring">Evento recorrente</Label>
          </div>

          <div className="flex gap-3 pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Salvando...' : event ? 'Atualizar Evento' : 'Criar Evento'}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventForm;
