
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick_reply' | 'ticket';
}

export interface KnowledgeEntry {
  id: string;
  question: string;
  answer: string;
  category?: string;
  keywords?: string[];
  active: boolean;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Olá! Como posso ajudar você hoje?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [knowledge, setKnowledge] = useState<KnowledgeEntry[]>([]);
  const [quickReplies] = useState([
    'Como funciona a matrícula?',
    'Calendário escolar',
    'Documentos necessários',
    'Contato da escola'
  ]);
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  const fetchKnowledge = async () => {
    try {
      const { data, error } = await supabase
        .from('chatbot_knowledge')
        .select('*')
        .eq('active', true)
        .order('usage_count', { ascending: false });

      if (error) throw error;
      setKnowledge(data || []);
    } catch (err: any) {
      console.error('Erro ao carregar base de conhecimento:', err);
    }
  };

  const findAnswer = (userMessage: string): string | null => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Buscar na base de conhecimento
    for (const entry of knowledge) {
      const questionMatch = entry.question.toLowerCase().includes(lowerMessage) ||
                           lowerMessage.includes(entry.question.toLowerCase());
      
      const keywordMatch = entry.keywords?.some(keyword => 
        lowerMessage.includes(keyword.toLowerCase())
      );

      if (questionMatch || keywordMatch) {
        // Incrementar contador de uso
        supabase
          .from('chatbot_knowledge')
          .update({ usage_count: entry.usage_count + 1 })
          .eq('id', entry.id);
        
        return entry.answer;
      }
    }

    return null;
  };

  const sendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setShowQuickReplies(false);

    // Simular delay do bot
    setTimeout(() => {
      const answer = findAnswer(text);
      const botResponse = answer || 'Desculpe, não encontrei uma resposta para sua pergunta. Você gostaria de abrir um ticket de suporte?';

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Mostrar quick replies novamente se não encontrou resposta
      if (!answer) {
        setShowQuickReplies(true);
      }
    }, 1000);
  };

  const createTicket = async (ticketData: {
    title: string;
    description: string;
    priority: number;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('support_tickets')
        .insert([{
          ...ticketData,
          user_id: user?.id,
          status: 'open'
        }])
        .select()
        .single();

      if (error) throw error;

      const ticketMessage: ChatMessage = {
        id: Date.now().toString(),
        text: `Ticket #${data.id.slice(0, 8)} criado com sucesso! Nossa equipe entrará em contato em breve.`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'ticket'
      };

      setMessages(prev => [...prev, ticketMessage]);
      toast.success('Ticket criado com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao criar ticket: ' + err.message);
      throw err;
    }
  };

  const createKnowledgeEntry = async (entryData: Omit<KnowledgeEntry, 'id' | 'created_at' | 'updated_at' | 'usage_count'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('chatbot_knowledge')
        .insert([{
          ...entryData,
          created_by: user?.id,
          usage_count: 0
        }])
        .select()
        .single();

      if (error) throw error;
      
      await fetchKnowledge();
      toast.success('Entrada criada com sucesso!');
      return data;
    } catch (err: any) {
      toast.error('Erro ao criar entrada: ' + err.message);
      throw err;
    }
  };

  const updateKnowledgeEntry = async (id: string, entryData: Partial<KnowledgeEntry>) => {
    try {
      const { error } = await supabase
        .from('chatbot_knowledge')
        .update(entryData)
        .eq('id', id);

      if (error) throw error;
      
      await fetchKnowledge();
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
      
      await fetchKnowledge();
      toast.success('Entrada removida com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao remover entrada: ' + err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchKnowledge();
  }, []);

  return {
    messages,
    isTyping,
    knowledge,
    quickReplies,
    showQuickReplies,
    sendMessage,
    createTicket,
    createKnowledgeEntry,
    updateKnowledgeEntry,
    deleteKnowledgeEntry,
    fetchKnowledge
  };
};
