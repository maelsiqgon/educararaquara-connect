
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  isTyping: boolean;
  quickReplies?: string[];
  showQuickReplies: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  message, 
  onMessageChange, 
  onSendMessage, 
  isTyping, 
  quickReplies = [],
  showQuickReplies 
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <>
      {showQuickReplies && (
        <div className="p-4 border-t bg-white">
          <p className="text-xs text-gray-500 mb-2">Sugestões:</p>
          <div className="flex flex-wrap gap-2">
            {quickReplies.slice(0, 3).map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => onSendMessage(reply)}
                className="text-xs border-education-primary text-education-primary hover:bg-education-light"
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1 border-gray-300 focus-visible:ring-education-primary"
            disabled={isTyping}
          />
          <Button
            onClick={onSendMessage}
            disabled={!message.trim() || isTyping}
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
  );
};

export default ChatInput;
