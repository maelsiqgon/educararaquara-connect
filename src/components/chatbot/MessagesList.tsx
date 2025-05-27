
import React from 'react';
import { Bot, User, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from '@/types/chatbot';

interface MessagesListProps {
  messages: ChatMessage[];
  isTyping: boolean;
  onOpenTicketForm: () => void;
}

const MessagesList: React.FC<MessagesListProps> = ({ 
  messages, 
  isTyping, 
  onOpenTicketForm 
}) => {
  return (
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
                  onClick={onOpenTicketForm}
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
    </div>
  );
};

export default MessagesList;
