
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from 'lucide-react';

const eventTypes = [
  { value: 'meeting', label: 'Reunião' },
  { value: 'visit', label: 'Visita' },
  { value: 'event', label: 'Evento' },
  { value: 'conference', label: 'Conferência' }
];

interface AgendaFiltersProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

const AgendaFilters: React.FC<AgendaFiltersProps> = ({ filter, onFilterChange }) => {
  return (
    <div className="flex items-center gap-4">
      <Select value={filter} onValueChange={onFilterChange}>
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
  );
};

export default AgendaFilters;
