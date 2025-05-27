
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick_reply' | 'contact' | 'ticket';
}

export interface TicketFormData {
  title: string;
  description: string;
  priority: number;
  school_id?: string | null;
}

export interface ChatbotProps {
  schoolId?: string;
  isSchoolChat?: boolean;
}
