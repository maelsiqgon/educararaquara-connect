
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, Send, X, Bot, User, Phone, Mail,
  AlertTriangle, Loader2
} from "lucide-react";
import { useChatbot } from '@/hooks/useChatbot';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick_reply' | 'contact' | 'ticket';
}

interface TicketFormData {
  title: string;
  description: string;
  priority: number;
  school_id?: string | null;
}

interface ChatbotProps {
  schoolId?: string;
  isSchoolChat?: boolean;
}

const Chatbot = ({ schoolId, isSchoolChat = false }: ChatbotProps) => {
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
  const [ticketForm, setTicketForm] = useState<TicketFormData>({
    title: '',
    description: '',
    priority: 1
  });
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

  const sendMessage = async (text: string) => {
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
      // Log conversation if authenticated user
      if (user) {
        await supabase.from('activity_logs').insert([{
          user_id: user.id,
          action: 'chatbot_message',
          resource_type: 'chatbot',
          details: { message: text, school_id: schoolId || null }
        }]);
      }

      // Query chatbot for response
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ticketForm.title.trim() || !ticketForm.description.trim()) {
      return;
    }
    
    setTicketSubmitting(true);
    
    try {
      await createTicket({
        title: ticketForm.title,
        description: ticketForm.description,
        priority: ticketForm.priority,
        status: 'open',
        school_id: schoolId
      });
      
      setTicketForm({
        title: '',
        description: '',
        priority: 1
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
        <CardHeader className="bg-education-primary text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">
                  {isSchoolChat ? 'Assistente da Escola' : 'Assistente da Secretaria'}
                </CardTitle>
                <div className="flex items-center gap-1 text-xs text-education-light">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Online
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {showTicketForm ? (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="bg-blue-50 text-blue-800 p-3 rounded-md text-sm flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>Por favor, preencha o formulário abaixo para enviar um ticket ao nosso atendimento.</span>
              </div>
              
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assunto</label>
                  <Input 
                    value={ticketForm.title}
                    onChange={e => setTicketForm({...ticketForm, title: e.target.value})}
                    placeholder="Resumo do assunto"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Descrição</label>
                  <Textarea 
                    value={ticketForm.description}
                    onChange={e => setTicketForm({...ticketForm, description: e.target.value})}
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
                    value={ticketForm.priority}
                    onChange={e => setTicketForm({...ticketForm, priority: parseInt(e.target.value)})}
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
                    onClick={() => setShowTicketForm(false)}
                    disabled={ticketSubmitting}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-education-primary hover:bg-education-dark"
                    disabled={ticketSubmitting}
                  >
                    {ticketSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : 'Enviar Ticket'}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      {message.sender === 'bot' && (
                        <div className="flex items-center gap-2 mb-1">
                          <Bot className="h-4 w-4 text-education-primary" />
                          <span className="text-xs text-gray-500">Assistente</span>
                        </div>
                      )}
                      
                      <div className={`p-3 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-education-primary text-white' 
                          : 'bg-white border border-gray-200'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        
                        {message.type === 'contact' && message.sender === 'bot' && (
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-2 text-education-primary">
                              <Phone className="h-4 w-4" />
                              <span className="text-sm">(16) 3301-1234</span>
                            </div>
                            <div className="flex items-center gap-2 text-education-primary">
                              <Mail className="h-4 w-4" />
                              <span className="text-sm">contato@educacao.araraquara.sp.gov.br</span>
                            </div>
                          </div>
                        )}
                        
                        {message.type === 'ticket' && message.sender === 'bot' && (
                          <Button
                            className="mt-3 bg-education-primary hover:bg-education-dark text-white text-xs py-1 px-2 h-auto"
                            onClick={() => setShowTicketForm(true)}
                          >
                            Abrir um ticket de suporte
                          </Button>
                        )}
                      </div>
                      
                      <div className="text-xs text-gray-400 mt-1">
                        {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    
                    {message.sender === 'user' && (
                      <div className="order-1 mr-2 mt-auto">
                        <User className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-3">
                      <Bot className="h-4 w-4 text-education-primary" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 2 && (
                <div className="p-4 border-t bg-white">
                  <p className="text-xs text-gray-500 mb-2">Sugestões:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.slice(0, 3).map((reply, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => sendMessage(reply)}
                        className="text-xs border-education-primary text-education-primary hover:bg-education-light"
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t bg-white">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 border-gray-300 focus-visible:ring-education-primary"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={() => sendMessage(inputMessage)}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-education-primary hover:bg-education-dark"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Powered by n8n • Integração WhatsApp Business
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;
