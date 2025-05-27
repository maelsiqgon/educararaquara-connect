
import React from 'react';
import { Button } from "@/components/ui/button";
import { Bot, X } from "lucide-react";

interface ChatHeaderProps {
  isSchoolChat: boolean;
  onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ isSchoolChat, onClose }) => {
  return (
    <div className="bg-education-primary text-white p-4 rounded-t-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">
              {isSchoolChat ? 'Assistente da Escola' : 'Assistente da Secretaria'}
            </h3>
            <div className="flex items-center gap-1 text-xs text-education-light">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Online
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-white/20 h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
