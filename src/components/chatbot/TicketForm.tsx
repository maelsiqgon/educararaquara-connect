
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

interface TicketFormProps {
  onSubmit: (ticketData: any) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const TicketForm: React.FC<TicketFormProps> = ({ 
  onSubmit, 
  onCancel, 
  isSubmitting = false 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      status: 'open',
      priority: 1
    });

    setTitle('');
    setDescription('');
  };

  return (
    <div className="p-4 h-full">
      <div className="flex items-center mb-4">
        <Button
          onClick={onCancel}
          variant="ghost"
          size="sm"
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="font-medium">Abrir Ticket de Suporte</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Descreva brevemente o problema"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva detalhadamente o problema ou solicitação"
            rows={4}
            required
          />
        </div>

        <div className="flex space-x-2">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !title.trim() || !description.trim()}
            className="flex-1 bg-education-primary hover:bg-education-dark"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Ticket'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
