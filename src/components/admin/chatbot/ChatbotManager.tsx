
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { MessageCircle, Plus, Edit, Trash2, Search, Bot, Ticket, Brain } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

interface KnowledgeEntry {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  usage_count: number;
  active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: number;
  user_id: string;
  assigned_to?: string;
  school_id?: string;
  created_at: string;
  updated_at: string;
  creator?: {
    name: string;
    email: string;
  };
  assignee?: {
    name: string;
  };
  school?: {
    name: string;
  };
}

const ChatbotManager = () => {
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeEntry[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<KnowledgeEntry | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('knowledge');

  const categories = [
    'Escolas',
    'Matrícula',
    'Calendário',
    'Transporte',
    'Alimentação',
    'Documentos',
    'Outros'
  ];

  useEffect(() => {
    fetchKnowledgeBase();
    fetchTickets();
  }, []);

  const fetchKnowledgeBase = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('chatbot_knowledge')
        .select('*')
        .order('category')
        .order('question');

      if (error) throw error;
      setKnowledgeBase(data || []);
    } catch (error) {
      console.error('Error fetching knowledge base:', error);
      toast.error('Erro ao carregar base de conhecimento');
    } finally {
      setLoading(false);
    }
  };

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .select(`
          *,
          creator:profiles!user_id(name, email),
          assignee:profiles!assigned_to(name),
          school:schools(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Erro ao carregar tickets');
    }
  };

  const handleCreateEntry = () => {
    setSelectedEntry({
      id: '',
      question: '',
      answer: '',
      category: 'Outros',
      keywords: [],
      usage_count: 0,
      active: true,
      created_by: '',
      created_at: '',
      updated_at: ''
    });
    setIsCreating(true);
  };

  const handleSaveEntry = async () => {
    if (!selectedEntry || !selectedEntry.question.trim() || !selectedEntry.answer.trim()) {
      toast.error('Pergunta e resposta são obrigatórias');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const entryData = {
        ...selectedEntry,
        created_by: user.id
      };

      if (isCreating) {
        const { error } = await supabase
          .from('chatbot_knowledge')
          .insert([entryData]);
        
        if (error) throw error;
        toast.success('Entrada criada com sucesso!');
      } else {
        const { error } = await supabase
          .from('chatbot_knowledge')
          .update(entryData)
          .eq('id', selectedEntry.id);
        
        if (error) throw error;
        toast.success('Entrada atualizada com sucesso!');
      }

      setSelectedEntry(null);
      setIsCreating(false);
      fetchKnowledgeBase();
    } catch (error) {
      console.error('Error saving entry:', error);
      toast.error('Erro ao salvar entrada');
    }
  };

  const handleDeleteEntry = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta entrada?')) return;

    try {
      const { error } = await supabase
        .from('chatbot_knowledge')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Entrada excluída com sucesso!');
      fetchKnowledgeBase();
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast.error('Erro ao excluir entrada');
    }
  };

  const handleKeywordsChange = (value: string) => {
    if (!selectedEntry) return;
    
    const keywords = value.split(',').map(k => k.trim()).filter(k => k);
    setSelectedEntry({ ...selectedEntry, keywords });
  };

  const filteredEntries = knowledgeBase.filter(entry =>
    entry.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      open: 'Aberto',
      in_progress: 'Em Andamento',
      resolved: 'Resolvido',
      closed: 'Fechado'
    };
    return labels[status as keyof typeof labels] || status;
  };

  if (selectedEntry) {
    return (
      <Card className="border-0 shadow-soft">
        <CardHeader className="bg-education-light rounded-t-lg">
          <CardTitle className="text-education-primary">
            {isCreating ? 'Nova Entrada' : 'Editar Entrada'}
          </CardTitle>
          <CardDescription>
            {isCreating ? 'Adicionar nova resposta à base de conhecimento' : 'Modificar entrada existente'}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Pergunta *</Label>
              <Input
                value={selectedEntry.question}
                onChange={(e) => setSelectedEntry({...selectedEntry, question: e.target.value})}
                placeholder="Ex: Como faço para matricular meu filho?"
              />
            </div>

            <div className="space-y-2">
              <Label>Resposta *</Label>
              <Textarea
                value={selectedEntry.answer}
                onChange={(e) => setSelectedEntry({...selectedEntry, answer: e.target.value})}
                rows={4}
                placeholder="Resposta completa e detalhada..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Categoria</Label>
                <select 
                  value={selectedEntry.category}
                  onChange={(e) => setSelectedEntry({...selectedEntry, category: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2 flex items-center">
                <input
                  type="checkbox"
                  checked={selectedEntry.active}
                  onChange={(e) => setSelectedEntry({...selectedEntry, active: e.target.checked})}
                />
                <Label>Ativo</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Palavras-chave (separadas por vírgula)</Label>
              <Input
                value={selectedEntry.keywords.join(', ')}
                onChange={(e) => handleKeywordsChange(e.target.value)}
                placeholder="matrícula, escola, documentos"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedEntry(null);
                  setIsCreating(false);
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleSaveEntry} className="bg-education-primary hover:bg-education-dark">
                {isCreating ? 'Criar' : 'Salvar'} Entrada
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          Chatbot Avançado
        </CardTitle>
        <CardDescription>
          Gestão da base de conhecimento e sistema de tickets do chatbot
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="knowledge">Base de Conhecimento</TabsTrigger>
            <TabsTrigger value="tickets">Tickets de Suporte</TabsTrigger>
            <TabsTrigger value="ai-config">Configuração IA</TabsTrigger>
          </TabsList>

          <TabsContent value="knowledge" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Buscar na base de conhecimento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
              
              <Button onClick={handleCreateEntry} className="bg-education-primary hover:bg-education-dark">
                <Plus className="h-4 w-4 mr-2" />
                Nova Entrada
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8">Carregando base de conhecimento...</div>
            ) : (
              <div className="space-y-4">
                {filteredEntries.map((entry) => (
                  <Card key={entry.id} className="border">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{entry.question}</h4>
                            <Badge variant="outline">{entry.category}</Badge>
                            {!entry.active && <Badge variant="destructive">Inativo</Badge>}
                            <Badge className="bg-blue-100 text-blue-800">
                              {entry.usage_count} usos
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 mb-3 line-clamp-3">{entry.answer}</p>
                          
                          {entry.keywords.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {entry.keywords.map((keyword, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedEntry(entry)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredEntries.length === 0 && (
                  <div className="text-center py-12">
                    <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Nenhuma entrada encontrada</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="tickets" className="space-y-4">
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <Card key={ticket.id} className="border">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{ticket.title}</h4>
                          <Badge className={getStatusColor(ticket.status)}>
                            {getStatusLabel(ticket.status)}
                          </Badge>
                          <Badge variant="outline">
                            Prioridade {ticket.priority}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{ticket.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                          <div>
                            <strong>Criado por:</strong> {ticket.creator?.name}
                          </div>
                          {ticket.assignee && (
                            <div>
                              <strong>Responsável:</strong> {ticket.assignee.name}
                            </div>
                          )}
                          {ticket.school && (
                            <div>
                              <strong>Escola:</strong> {ticket.school.name}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {tickets.length === 0 && (
                <div className="text-center py-12">
                  <Ticket className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum ticket encontrado</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="ai-config" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuração da Integração IA</CardTitle>
                <CardDescription>
                  Configure as integrações com APIs de IA para melhorar as respostas do chatbot
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-blue-50">
                  <h4 className="font-medium text-blue-900 mb-2">APIs Suportadas</h4>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div>• OpenAI GPT-4 / GPT-3.5</div>
                    <div>• Google Gemini</div>
                    <div>• Anthropic Claude</div>
                    <div>• Outros modelos compatíveis com API REST</div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg bg-green-50">
                  <h4 className="font-medium text-green-900 mb-2">Recursos Preparados</h4>
                  <div className="space-y-2 text-sm text-green-800">
                    <div>• Processamento de linguagem natural</div>
                    <div>• Respostas contextuais inteligentes</div>
                    <div>• Aprendizado com base de conhecimento</div>
                    <div>• Integração com sistema de tickets</div>
                    <div>• Análise de sentimento</div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg bg-yellow-50">
                  <h4 className="font-medium text-yellow-900 mb-2">Próximos Passos</h4>
                  <div className="space-y-2 text-sm text-yellow-800">
                    <div>1. Escolha o provedor de IA desejado</div>
                    <div>2. Configure as credenciais da API</div>
                    <div>3. Teste a integração</div>
                    <div>4. Ative o modo inteligente</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ChatbotManager;
