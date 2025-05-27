
import React from 'react';
import { Button } from "@/components/ui/button";
import { X, Minimize2, LifeBuoy } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
  onMinimize: () => void;
  onOpenTicket: () => void;
  isMinimized: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  onClose, 
  onMinimize, 
  onOpenTicket, 
  isMinimized 
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-education-primary text-white border-b">
      <div className="flex items-center">
        <h3 className="font-medium">Assistente Virtual</h3>
      </div>
      
      <div className="flex items-center space-x-2">
        {!isMinimized && (
          <Button
            onClick={onOpenTicket}
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <LifeBuoy className="h-4 w-4" />
          </Button>
        )}
        
        <Button
          onClick={onMinimize}
          size="sm"
          variant="ghost"
          className="text-white hover:bg-white/20"
        >
          <Minimize2 className="h-4 w-4" />
        </Button>
        
        <Button
          onClick={onClose}
          size="sm"
          variant="ghost"
          className="text-white hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
