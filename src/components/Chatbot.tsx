
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, X, Bot, User, Phone, Mail } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick_reply' | 'contact';
}

interface ChatbotProps {
  schoolId?: number;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = isSchoolChat ? [
    'Horários de funcionamento',
    'Documentos necessários',
    'Contato da direção',
    'Calendário escolar',
    'Cardápio da merenda'
  ] : [
    'Matrículas 2025',
    'Lista de escolas',
    'Documentos necessários',
    'Transporte escolar',
    'Falar com atendente'
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (text: string, isQuickReply = false) => {
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

    // Simular resposta do bot (em produção, integrar com n8n)
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateBotResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();
    
    let responseText = '';
    let responseType: 'text' | 'contact' = 'text';

    if (lowerMessage.includes('matrícula') || lowerMessage.includes('matricula')) {
      responseText = 'Para informações sobre matrículas 2025, você pode:\n\n• Acessar o portal online\n• Comparecer à secretaria da escola\n• Ligar para (16) 3301-1234\n\nPrecisa de mais alguma informação?';
    } else if (lowerMessage.includes('horário') || lowerMessage.includes('horario')) {
      responseText = isSchoolChat 
        ? 'Nossa escola funciona das 7h às 17h de segunda a sexta-feira. O atendimento da secretaria é das 8h às 16h.'
        : 'A Secretaria de Educação funciona das 8h às 17h de segunda a sexta-feira. Atendimento ao público das 8h às 16h.';
    } else if (lowerMessage.includes('documento')) {
      responseText = 'Documentos necessários para matrícula:\n\n• RG e CPF do responsável\n• Certidão de nascimento do aluno\n• Comprovante de residência\n• Carteira de vacinação\n• Declaração de transferência (se aplicável)';
    } else if (lowerMessage.includes('contato') || lowerMessage.includes('telefone')) {
      responseText = 'Aqui estão nossos contatos:';
      responseType = 'contact';
    } else if (lowerMessage.includes('atendente') || lowerMessage.includes('humano')) {
      responseText = 'Vou transferir você para um de nossos atendentes. Por favor, aguarde um momento...';
    } else {
      responseText = 'Entendi sua pergunta. Para uma resposta mais específica, posso conectá-lo com nossa equipe de atendimento. Você gostaria disso?';
    }

    return {
      id: Date.now().toString() + '_bot',
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
      type: responseType
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputMessage);
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
                    onClick={() => sendMessage(reply, true)}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;
