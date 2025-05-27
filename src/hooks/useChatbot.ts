
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ChatbotKnowledge {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  keywords: string[] | null;
  active: boolean;
  usage_count: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: number;
  user_id: string | null;
  assigned_to: string | null;
  school_id: string | null;
  resolution: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
  creator?: {
    id: string;
    name: string;
    email: string;
  };
  assignee?: {
    id: string;
    name: string;
    email: string;
  };
  school?: {
    id: string;
    name: string;
  };
  messages?: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  ticket_id: string;
  user_id: string | null;
  message: string;
  is_internal: boolean;
  created_at: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export const useChatbot = () => {
  const [knowledgeBase, setKnowledgeBase] = useState<ChatbotKnowledge[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [whatsappSettings, setWhatsappSettings] = useState<any>(null);

  const fetchKnowledgeBase = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('chatbot_knowledge')
        .select('*')
        .order('category')
        .order('question');

      if (error) throw error;
      setKnowledgeBase(data || []);
    } catch (err: any) {
      setError(err.message);
      toast.error('Erro ao carregar base de conhecimento');
    } finally {
      setLoading(false);
    }
  };

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('support_tickets')
        .select(`
          *,
          creator:profiles!user_id(id, name, email),
          assignee:profiles!assigned_to(id, name, email),
          school:schools(id, name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (err: any) {
      setError(err.message);
      toast.error('Erro ao carregar tickets');
    } finally {
      setLoading(false);
    }
  };

  const fetchWhatsappSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_settings')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') { // Ignore "No rows returned" error
        throw error;
      }
      setWhatsappSettings(data || null);
    } catch (err: any) {
      console.error('Error fetching WhatsApp settings:', err);
    }
  };

  const queryChat = async (question: string) => {
    try {
      // First try the local knowledge base
      const { data, error } = await supabase
        .from('chatbot_knowledge')
        .select('*')
        .or(`question.ilike.%${question}%,keywords.cs.{${question}}`)
        .eq('active', true)
        .order('usage_count', { ascending: false });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Increment usage count for the best match
        await supabase
          .from('chatbot_knowledge')
          .update({ usage_count: data[0].usage_count + 1 })
          .eq('id', data[0].id);
        
        return {
          answer: data[0].answer,
          found: true
        };
      }
      
      // If not found in local knowledge base, return default response
      return {
        answer: 'Desculpe, não encontrei uma resposta para sua pergunta. Posso ajudar com algo mais?',
        found: false
      };
    } catch (err: any) {
      console.error('Error querying chatbot:', err);
      return {
        answer: 'Ocorreu um erro ao processar sua pergunta. Por favor, tente novamente mais tarde.',
        found: false
      };
    }
  };

  const createKnowledgeEntry = async (entry: Omit<ChatbotKnowledge, 'id' | 'usage_count' | 'created_by' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('chatbot_knowledge')
        .insert([entry])
        .select()
        .single();

      if (error) throw error;
      
      await fetchKnowledgeBase();
      toast.success('Entrada adicionada com sucesso!');
      return data;
    } catch (err: any) {
      toast.error('Erro ao adicionar entrada: ' + err.message);
      throw err;
    }
  };

  const updateKnowledgeEntry = async (id: string, entry: Partial<Omit<ChatbotKnowledge, 'id' | 'created_by' | 'created_at' | 'updated_at'>>) => {
    try {
      const { error } = await supabase
        .from('chatbot_knowledge')
        .update(entry)
        .eq('id', id);

      if (error) throw error;
      
      await fetchKnowledgeBase();
      toast.success('Entrada atualizada com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao atualizar entrada: ' + err.message);
      throw err;
    }
  };

  const deleteKnowledgeEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('chatbot_knowledge')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchKnowledgeBase();
      toast.success('Entrada removida com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao remover entrada: ' + err.message);
      throw err;
    }
  };

  const createTicket = async (ticketData: Omit<SupportTicket, 'id' | 'created_at' | 'updated_at' | 'creator' | 'assignee' | 'school' | 'messages'>) => {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .insert([ticketData])
        .select()
        .single();

      if (error) throw error;
      
      await fetchTickets();
      toast.success('Ticket criado com sucesso!');
      return data;
    } catch (err: any) {
      toast.error('Erro ao criar ticket: ' + err.message);
      throw err;
    }
  };

  const updateTicket = async (id: string, ticketData: Partial<Omit<SupportTicket, 'id' | 'created_at' | 'updated_at' | 'creator' | 'assignee' | 'school' | 'messages'>>) => {
    try {
      const { error } = await supabase
        .from('support_tickets')
        .update(ticketData)
        .eq('id', id);

      if (error) throw error;
      
      await fetchTickets();
      toast.success('Ticket atualizado com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao atualizar ticket: ' + err.message);
      throw err;
    }
  };

  const resolveTicket = async (id: string, resolution: string) => {
    try {
      const { error } = await supabase
        .from('support_tickets')
        .update({
          status: 'resolved',
          resolution,
          resolved_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      await fetchTickets();
      toast.success('Ticket resolvido com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao resolver ticket: ' + err.message);
      throw err;
    }
  };

  const closeTicket = async (id: string) => {
    try {
      const { error } = await supabase
        .from('support_tickets')
        .update({
          status: 'closed'
        })
        .eq('id', id);

      if (error) throw error;
      
      await fetchTickets();
      toast.success('Ticket fechado com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao fechar ticket: ' + err.message);
      throw err;
    }
  };

  const getTicketById = async (id: string) => {
    try {
      // Get ticket data
      const { data: ticket, error: ticketError } = await supabase
        .from('support_tickets')
        .select(`
          *,
          creator:profiles!user_id(id, name, email),
          assignee:profiles!assigned_to(id, name, email),
          school:schools(id, name)
        `)
        .eq('id', id)
        .single();

      if (ticketError) throw ticketError;

      // Get ticket messages
      const { data: messages, error: messagesError } = await supabase
        .from('ticket_messages')
        .select(`
          *,
          user:profiles(id, name, email)
        `)
        .eq('ticket_id', id)
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;

      return {
        ...ticket,
        messages: messages || []
      };
    } catch (err: any) {
      toast.error('Erro ao carregar ticket: ' + err.message);
      throw err;
    }
  };

  const addTicketMessage = async (ticketId: string, message: string, isInternal: boolean = false) => {
    try {
      // Get user ID from auth context
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('ticket_messages')
        .insert([{
          ticket_id: ticketId,
          user_id: session.user.id,
          message,
          is_internal: isInternal
        }])
        .select()
        .single();

      if (error) throw error;

      // Update ticket's updated_at
      await supabase
        .from('support_tickets')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', ticketId);
      
      toast.success('Mensagem adicionada com sucesso!');
      return data;
    } catch (err: any) {
      toast.error('Erro ao adicionar mensagem: ' + err.message);
      throw err;
    }
  };

  const updateWhatsappSettings = async (settings: any) => {
    try {
      // Check if settings already exist
      const { data: existingSettings, error: checkError } = await supabase
        .from('whatsapp_settings')
        .select('id');

      if (checkError && checkError.code !== 'PGRST116') throw checkError;

      if (existingSettings && existingSettings.length > 0) {
        // Update existing settings
        const { error: updateError } = await supabase
          .from('whatsapp_settings')
          .update(settings)
          .eq('id', existingSettings[0].id);

        if (updateError) throw updateError;
      } else {
        // Create new settings
        const { error: createError } = await supabase
          .from('whatsapp_settings')
          .insert([settings]);

        if (createError) throw createError;
      }
      
      await fetchWhatsappSettings();
      toast.success('Configurações do WhatsApp atualizadas com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao atualizar configurações do WhatsApp: ' + err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchKnowledgeBase();
    fetchTickets();
    fetchWhatsappSettings();
  }, []);

  return {
    knowledgeBase,
    tickets,
    whatsappSettings,
    loading,
    error,
    queryChat,
    fetchKnowledgeBase,
    createKnowledgeEntry,
    updateKnowledgeEntry,
    deleteKnowledgeEntry,
    fetchTickets,
    createTicket,
    updateTicket,
    resolveTicket,
    closeTicket,
    getTicketById,
    addTicketMessage,
    updateWhatsappSettings
  };
};
