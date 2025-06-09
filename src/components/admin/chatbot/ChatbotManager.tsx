
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: number;
  created_at: string;
  user_id?: string;
  assigned_to?: string;
  school_id?: string;
  resolution?: string;
  resolved_at?: string;
  updated_at: string;
}

const ChatbotManager: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Convert data to match our interface
      const formattedTickets: SupportTicket[] = data.map(ticket => ({
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        status: ticket.status as 'open' | 'in_progress' | 'resolved' | 'closed',
        priority: ticket.priority,
        created_at: ticket.created_at,
        user_id: ticket.user_id,
        assigned_to: ticket.assigned_to,
        school_id: ticket.school_id,
        resolution: ticket.resolution,
        resolved_at: ticket.resolved_at,
        updated_at: ticket.updated_at
      }));
      
      setTickets(formattedTickets);
    } catch (error: any) {
      console.error('Error fetching tickets:', error);
      toast.error('Erro ao carregar tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const colors = {
      open: 'bg-red-500',
      in_progress: 'bg-yellow-500',
      resolved: 'bg-green-500',
      closed: 'bg-gray-500'
    };
    
    const labels = {
      open: 'Aberto',
      in_progress: 'Em Progresso',
      resolved: 'Resolvido',
      closed: 'Fechado'
    };

    return (
      <Badge className={`${colors[status as keyof typeof colors] || 'bg-gray-500'} text-white`}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Chatbot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-education-primary"></div>
            <span className="ml-2">Carregando...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Chatbot</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Input
            placeholder="Buscar tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button onClick={fetchTickets}>
            Atualizar
          </Button>
        </div>

        <div className="space-y-2">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-medium">{ticket.title}</p>
                  <p className="text-sm text-gray-500">{ticket.description}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(ticket.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                {getStatusBadge(ticket.status)}
                <Badge variant="outline">
                  Prioridade: {ticket.priority}
                </Badge>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          ))}

          {filteredTickets.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum ticket encontrado
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatbotManager;
