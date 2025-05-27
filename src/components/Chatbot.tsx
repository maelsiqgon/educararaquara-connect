
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useChatbot } from '@/hooks/useChatbot';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { ChatMessage, TicketFormData, ChatbotProps } from '@/types/chatbot';
import ChatHeader from './chatbot/ChatHeader';
import TicketForm from './chatbot/TicketForm';
import MessagesList from './chatbot/MessagesList';
import ChatInput from './chatbot/ChatInput';

const Chatbot: React.FC<ChatbotProps> = ({ schoolId, isSchoolChat = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: isSchoolChat 
        ? 'Olá! Sou o assistente virtual da escola. Como posso ajudá-lo hoje?' 
        : 'Olá! Sou o assistente virtual da Secretaria de Educação de Araraquara. Como posso ajudá-lo?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketSubmitting, setTicketSubmitting] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { queryChat, createTicket } = useChatbot();
  const { user } = useAuth();

  const quickReplies = isSchoolChat ? [
    'Horários de funcionamento',
    'Documentos necessários',
    'Contato da direção',
    'Calendário escolar'
  ] : [
    'Matrículas 2025',
    'Lista de escolas',
    'Documentos necessários',
    'Falar com atendente'
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (text: string = inputMessage) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      if (user) {
        await supabase.from('activity_logs').insert([{
          user_id: user.id,
          action: 'chatbot_message',
          resource_type: 'chatbot',
          details: { message: text, school_id: schoolId || null }
        }]);
      }

      const response = await queryChat(text);
      
      setTimeout(() => {
        const botResponse: ChatMessage = {
          id: Date.now().toString() + '_bot',
          text: response.answer,
          sender: 'bot',
          timestamp: new Date(),
          type: response.found ? 'text' : 'ticket'
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000);
    } catch (error) {
      console.error('Error querying chatbot:', error);
      
      setTimeout(() => {
        const errorResponse: ChatMessage = {
          id: Date.now().toString() + '_error',
          text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.',
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        };
        
        setMessages(prev => [...prev, errorResponse]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleTicketSubmit = async (formData: TicketFormData) => {
    setTicketSubmitting(true);
    
    try {
      await createTicket({
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        status: 'open',
        user_id: user?.id || null,
        assigned_to: null,
        school_id: formData.school_id || null,
        resolution: null,
        resolved_at: null
      });
      
      setShowTicketForm(false);
      
      const botResponse: ChatMessage = {
        id: Date.now().toString() + '_bot',
        text: 'Seu ticket foi enviado com sucesso! Em breve um atendente entrará em contato.',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error creating ticket:', error);
      
      const errorResponse: ChatMessage = {
        id: Date.now().toString() + '_error',
        text: 'Desculpe, ocorreu um erro ao enviar seu ticket. Por favor, tente novamente mais tarde.',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setTicketSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-education-primary hover:bg-education-dark shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
        <div className="absolute -top-2 -right-2">
          <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] flex flex-col">
      <Card className="flex-1 flex flex-col shadow-2xl border-0">
        <ChatHeader 
          isSchoolChat={isSchoolChat} 
          onClose={() => setIsOpen(false)} 
        />

        <CardContent className="flex-1 flex flex-col p-0">
          {showTicketForm ? (
            <TicketForm
              onSubmit={handleTicketSubmit}
              onCancel={() => setShowTicketForm(false)}
              isSubmitting={ticketSubmitting}
              schoolId={schoolId}
            />
          ) : (
            <>
              <MessagesList
                messages={messages}
                isTyping={isTyping}
                onOpenTicketForm={() => setShowTicketForm(true)}
              />
              
              <ChatInput
                message={inputMessage}
                onMessageChange={setInputMessage}
                onSendMessage={sendMessage}
                isTyping={isTyping}
                quickReplies={quickReplies}
                showQuickReplies={messages.length <= 2}
              />
            </>
          )}
        </CardContent>
      </Card>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Chatbot;
