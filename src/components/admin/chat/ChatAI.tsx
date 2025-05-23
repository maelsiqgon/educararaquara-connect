
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  ThumbsUp, 
  ThumbsDown,
  File,
  Plus,
  Search
} from "lucide-react";
import { toast } from "sonner";

// Mock AI responses
const mockResponses: Record<string, string> = {
  "olá": "Olá! Em que posso ajudar você hoje?",
  "bom dia": "Bom dia! Como posso auxiliar você?",
  "ajuda": "Estou aqui para ajudar! Você pode me perguntar sobre procedimentos, calendários, eventos, matrículas ou qualquer outra informação relacionada ao sistema educacional.",
  "matrícula": "Para realizar uma nova matrícula, acesse o menu 'Alunos' > 'Nova Matrícula' e preencha o formulário com os dados do estudante. É necessário ter em mãos documentos como RG/CPF do aluno e responsável, comprovante de residência e histórico escolar. Posso ajudar com mais detalhes sobre cada etapa do processo?",
  "notas": "As notas dos alunos podem ser consultadas no módulo de avaliação. Os professores podem inserir notas por atividade ou avaliação, e o sistema calcula automaticamente as médias conforme os critérios configurados para cada nível de ensino. Alunos e responsáveis podem visualizar as notas na área específica do portal.",
  "calendário": "O calendário escolar está disponível na seção 'Calendário' do menu principal. Lá você encontrará todos os eventos programados, feriados, períodos de avaliação, férias e recessos. Você também pode filtrar por escola ou nível de ensino para ver informações específicas.",
  "recuperação de senha": "Para recuperar sua senha, clique em 'Esqueci minha senha' na tela de login. Você receberá um link de recuperação no e-mail cadastrado. Se não tiver acesso ao e-mail, entre em contato com o suporte técnico ou com a secretaria de sua escola.",
  "transferência": "Para solicitar a transferência de um aluno, acesse o módulo 'Alunos' > 'Perfil do Aluno' > 'Solicitar Transferência'. O sistema irá gerar a documentação necessária e orientará sobre os próximos passos. É importante verificar se todas as pendências estão regularizadas antes de iniciar o processo.",
  "reunião": "Para agendar uma reunião, acesse o módulo 'Comunicação' > 'Agendar Reunião'. Selecione os participantes, defina data, hora e pauta. O sistema enviará convites automaticamente e integrará com o Microsoft Teams para videoconferência, se necessário.",
  "boletim": "Os boletins são gerados automaticamente ao final de cada período avaliativo (bimestre/trimestre) com base nas notas inseridas pelos professores. Para emitir um boletim, acesse 'Avaliação' > 'Emitir Boletim', selecione a turma, aluno e período desejado."
};

// Mock FAQ questions
const mockFAQs = [
  {
    id: 1,
    question: "Como faço para recuperar minha senha?",
    answer: "Para recuperar sua senha, clique em 'Esqueci minha senha' na tela de login. Você receberá um link de recuperação no e-mail cadastrado."
  },
  {
    id: 2,
    question: "Onde encontro o calendário escolar?",
    answer: "O calendário escolar está disponível na seção 'Calendário' do menu principal. Lá você encontrará todos os eventos programados, feriados, períodos de avaliação, férias e recessos."
  },
  {
    id: 3,
    question: "Como emitir o boletim de um aluno?",
    answer: "Para emitir um boletim, acesse 'Avaliação' > 'Emitir Boletim', selecione a turma, aluno e período desejado. O sistema gerará um PDF que pode ser visualizado, baixado ou enviado por e-mail."
  }
];

// Types for messages
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatAI: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Olá! Sou o assistente virtual da Secretaria de Educação. Como posso ajudar você hoje?", 
      sender: 'ai', 
      timestamp: new Date() 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [searchFAQ, setSearchFAQ] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle user message and get AI response
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      let response = "Não encontrei uma resposta específica para essa pergunta. Você poderia reformular ou ser mais específico?";
      
      // Check for matching keywords in mock responses
      for (const [key, value] of Object.entries(mockResponses)) {
        if (input.toLowerCase().includes(key.toLowerCase())) {
          response = value;
          break;
        }
      }
      
      const aiMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };
  
  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Handle FAQ click
  const handleFAQClick = (faq: typeof mockFAQs[0]) => {
    setInput(faq.question);
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: faq.question,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        text: faq.answer,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  };
  
  // Function to format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Filter FAQs based on search term
  const filteredFAQs = mockFAQs.filter(faq => 
    faq.question.toLowerCase().includes(searchFAQ.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="md:col-span-3">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle>Chat Inteligente</CardTitle>
            <CardDescription>
              Tire suas dúvidas com o assistente virtual da Secretaria de Educação
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.map(message => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-2 ${
                      message.sender === 'user' ? 'bg-blue-100 ml-2' : 'bg-gray-100'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Bot className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-education-primary text-white rounded-tr-none' 
                        : 'bg-gray-100 rounded-tl-none'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex flex-row">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center mr-2 bg-gray-100">
                      <Bot className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="p-3 rounded-lg bg-gray-100 rounded-tl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-end gap-2">
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Plus className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <File className="h-5 w-5" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Digite sua mensagem aqui..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="pr-10"
                  />
                </div>
                <Button onClick={handleSendMessage} className="h-10">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              
              {messages.length > 2 && (
                <div className="mt-4 flex gap-2 justify-end">
                  <Label className="text-sm text-gray-500 self-center">Esta resposta foi útil?</Label>
                  <Button variant="outline" size="sm" className="h-8">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>Sim</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    <span>Não</span>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Perguntas Frequentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar perguntas..."
                className="pl-8"
                value={searchFAQ}
                onChange={(e) => setSearchFAQ(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              {filteredFAQs.map(faq => (
                <button
                  key={faq.id}
                  onClick={() => handleFAQClick(faq)}
                  className="w-full text-left p-3 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start">
                    <HelpCircle className="h-5 w-5 text-education-primary mr-2 mt-0.5" />
                    <span className="text-sm">{faq.question}</span>
                  </div>
                </button>
              ))}
              
              {filteredFAQs.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-2">
                  Nenhuma pergunta frequente encontrada.
                </p>
              )}
            </div>
            
            <div className="pt-2">
              <Button variant="outline" className="w-full" onClick={() => {
                toast.success("Solicitação enviada para o suporte humano");
              }}>
                Falar com um atendente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatAI;
