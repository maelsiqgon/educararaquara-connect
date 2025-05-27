
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import ChatHeader from './chatbot/ChatHeader';
import MessagesList from './chatbot/MessagesList';
import ChatInput from './chatbot/ChatInput';
import TicketForm from './chatbot/TicketForm';
import { useChatbot } from '@/hooks/useChatbot';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  
  const {
    messages,
    isTyping,
    sendMessage,
    createTicket,
    quickReplies,
    showQuickReplies
  } = useChatbot();

  const handleSendMessage = async (text: string) => {
    await sendMessage(text);
  };

  const handleCreateTicket = async (ticketData: any) => {
    await createTicket(ticketData);
    setShowTicketForm(false);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={toggleChatbot}
        className="fixed bottom-4 right-4 z-50 rounded-full w-14 h-14 bg-education-primary hover:bg-education-dark shadow-lg"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 h-96 flex flex-col shadow-2xl">
      <ChatHeader 
        onClose={() => setIsOpen(false)}
        onMinimize={toggleMinimize}
        onOpenTicket={() => setShowTicketForm(true)}
        isMinimized={isMinimized}
      />
      
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-hidden">
            {showTicketForm ? (
              <TicketForm 
                onSubmit={handleCreateTicket}
                onCancel={() => setShowTicketForm(false)}
                isSubmitting={false}
              />
            ) : (
              <MessagesList 
                messages={messages} 
                isTyping={isTyping}
                onOpenTicketForm={() => setShowTicketForm(true)}
              />
            )}
          </div>
          
          {!showTicketForm && (
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isTyping}
              isTyping={isTyping}
              quickReplies={quickReplies}
              showQuickReplies={showQuickReplies}
            />
          )}
        </>
      )}
    </Card>
  );
};

export default Chatbot;
