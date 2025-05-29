
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Olá! Como posso ajudá-lo hoje?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies] = useState([
    'Horário de funcionamento',
    'Informações sobre matrícula',
    'Contato da escola',
    'Documentos necessários'
  ]);
  const [showQuickReplies] = useState(true);

  const sendMessage = async (text: string) => {
    // Adicionar mensagem do usuário
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Buscar resposta na base de conhecimento
      const { data: knowledgeData, error } = await supabase
        .from('chatbot_knowledge')
        .select('*')
        .or(`question.ilike.%${text}%,keywords.cs.{${text}}`)
        .eq('active', true)
        .limit(1);

      if (error) throw error;

      let botResponse = 'Desculpe, não encontrei uma resposta para sua pergunta. Você pode criar um ticket de suporte para que nossa equipe possa ajudá-lo melhor.';

      if (knowledgeData && knowledgeData.length > 0) {
        botResponse = knowledgeData[0].answer;
        
        // Incrementar contador de uso
        await supabase
          .from('chatbot_knowledge')
          .update({ usage_count: (knowledgeData[0].usage_count || 0) + 1 })
          .eq('id', knowledgeData[0].id);
      }

      // Simular delay de digitação
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);

    } catch (err: any) {
      console.error('Erro no chatbot:', err);
      setIsTyping(false);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Desculpe, ocorreu um erro. Tente novamente mais tarde.',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const createTicket = async (ticketData: {
    title: string;
    description: string;
    priority: number;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Você precisa estar logado para criar um ticket');
        return;
      }

      const { error } = await supabase
        .from('support_tickets')
        .insert([{
          title: ticketData.title,
          description: ticketData.description,
          priority: ticketData.priority,
          user_id: user.id,
          status: 'open'
        }]);

      if (error) throw error;

      toast.success('Ticket criado com sucesso! Nossa equipe entrará em contato em breve.');
      
      const confirmMessage: ChatMessage = {
        id: Date.now().toString(),
        text: 'Ticket criado com sucesso! Nossa equipe analisará sua solicitação e entrará em contato em breve.',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, confirmMessage]);

    } catch (err: any) {
      console.error('Erro ao criar ticket:', err);
      toast.error('Erro ao criar ticket: ' + err.message);
    }
  };

  return {
    messages,
    isTyping,
    sendMessage,
    createTicket,
    quickReplies,
    showQuickReplies
  };
};
