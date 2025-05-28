
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";

interface AgendaHeaderProps {
  onCreateEvent: () => void;
}

const AgendaHeader: React.FC<AgendaHeaderProps> = ({ onCreateEvent }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Calendar className="h-5 w-5 mr-2 text-education-primary" />
        <h3 className="text-lg font-medium">Agenda do Secretário</h3>
      </div>
      
      <Button onClick={onCreateEvent} className="bg-education-primary hover:bg-education-dark">
        <Plus className="h-4 w-4 mr-2" />
        Novo Evento
      </Button>
    </div>
  );
};

export default AgendaHeader;
