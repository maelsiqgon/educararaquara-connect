
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Loader2 } from "lucide-react";
import { TicketFormData } from '@/types/chatbot';

interface TicketFormProps {
  onSubmit: (formData: TicketFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  schoolId?: string;
}

const TicketForm: React.FC<TicketFormProps> = ({ 
  onSubmit, 
  onCancel, 
  isSubmitting, 
  schoolId 
}) => {
  const [formData, setFormData] = useState<TicketFormData>({
    title: '',
    description: '',
    priority: 1,
    school_id: schoolId
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;
    onSubmit(formData);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="bg-blue-50 text-blue-800 p-3 rounded-md text-sm flex items-start">
        <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
        <span>Por favor, preencha o formulário abaixo para enviar um ticket ao nosso atendimento.</span>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Assunto</label>
          <Input 
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            placeholder="Resumo do assunto"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Descrição</label>
          <Textarea 
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            placeholder="Descreva detalhadamente sua solicitação"
            className="resize-none"
            rows={5}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Prioridade</label>
          <select 
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
            value={formData.priority}
            onChange={e => setFormData({...formData, priority: parseInt(e.target.value)})}
          >
            <option value={1}>Baixa</option>
            <option value={2}>Média</option>
            <option value={3}>Alta</option>
            <option value={4}>Urgente</option>
          </select>
        </div>
        
        <div className="flex justify-between pt-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button 
            type="submit"
            className="bg-education-primary hover:bg-education-dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : 'Enviar Ticket'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
