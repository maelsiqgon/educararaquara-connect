
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { mockAIChats, mockTickets } from "../mockData";

const ChatInterface = () => {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState(mockAIChats);
  const [tickets, setTickets] = useState(mockTickets);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simular uma resposta da IA após envio de mensagem
  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Adicionar mensagem do usuário à conversa ativa
    const updatedConversations = [...conversations];
    const chatIndex = conversations.findIndex(chat => chat.id === activeChat);
    
    if (chatIndex >= 0) {
      // Criar um objeto de conversa atualizado
      const updatedChat = {
        ...updatedConversations[chatIndex],
        question: message,
        date: new Date().toLocaleDateString("pt-BR") + " " + new Date().toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' }),
      };
      
      updatedConversations[chatIndex] = updatedChat;
      setConversations(updatedConversations);
      setMessage("");
      
      // Simular resposta da IA após 1 segundo
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 1000)),
        {
          loading: "IA processando resposta...",
          success: () => {
            const aiResponses = [
              "Com certeza! Você pode encontrar essa opção no menu 'Configurações' > 'Perfil' > 'Preferências'.",
              "Para resolver esse problema, tente limpar o cache do navegador ou utilizar outro navegador compatível.",
              "Essa funcionalidade está disponível apenas para usuários com perfil de professor ou gestor escolar.",
              "Vou transferir você para um atendente humano que poderá ajudar melhor com essa questão específica."
            ];
            
            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            
            const finalUpdatedConversations = [...updatedConversations];
            finalUpdatedConversations[chatIndex] = {
              ...finalUpdatedConversations[chatIndex],
              answer: randomResponse,
            };
            
            setConversations(finalUpdatedConversations);
            return "Resposta gerada com sucesso!";
          },
          error: "Erro ao processar resposta.",
        }
      );
    }
  };

  // Simulação de transferência para atendimento humano
  const handleTransferToHuman = (chatId: number) => {
    const chatIndex = conversations.findIndex(chat => chat.id === chatId);
    if (chatIndex >= 0) {
      // Criar novo ticket baseado na conversa
      const newTicket = {
        id: tickets.length + 1,
        title: `Atendimento a ${conversations[chatIndex].user}`,
        requester: `${conversations[chatIndex].user} (${conversations[chatIndex].userType})`,
        type: "Atendimento",
        priority: "Médio",
        status: "Aberto",
        createdAt: new Date().toLocaleDateString("pt-BR") + " " + new Date().toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' }),
        lastUpdate: new Date().toLocaleDateString("pt-BR") + " " + new Date().toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' }),
        assignedTo: "Equipe de Suporte",
        description: conversations[chatIndex].question,
      };

      setTickets([...tickets, newTicket]);
      
      // Atualizar conversa para indicar transferência
      const updatedConversations = [...conversations];
      updatedConversations[chatIndex] = {
        ...updatedConversations[chatIndex],
        resolved: false,
        transferredTo: "Equipe de Suporte",
        answer: updatedConversations[chatIndex].answer + " [Transferido para atendimento humano]",
      };
      
      setConversations(updatedConversations);
      
      toast.success("Conversa transferida para atendimento humano");
    }
  };
  
  // Rolar para o final das mensagens quando uma nova for adicionada
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversations]);

  return (
    <Card className="shadow-sm border-0">
      <CardHeader>
        <CardTitle>Chat Inteligente e Sistema de Tickets</CardTitle>
        <CardDescription>
          Atendimento via IA com encaminhamento para suporte humano
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chat" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chat">Chat com IA</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="knowledge">Base de Conhecimento</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
              {/* Lista de conversas */}
              <div className="border rounded-lg overflow-hidden md:col-span-1">
                <div className="bg-gray-50 p-3 border-b">
                  <h3 className="font-medium">Conversas</h3>
                </div>
                <div className="h-[540px] overflow-y-auto">
                  {conversations.map(chat => (
                    <div 
                      key={chat.id}
                      className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${activeChat === chat.id ? 'bg-gray-100' : ''}`}
                      onClick={() => setActiveChat(chat.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{chat.user}</h4>
                          <p className="text-sm text-gray-500">{chat.userType}</p>
                        </div>
                        <span className="text-xs text-gray-500">{chat.date.split(' ')[0]}</span>
                      </div>
                      <p className="text-sm mt-1 text-gray-600 truncate">
                        {chat.question}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className={`w-2 h-2 rounded-full ${chat.resolved ? 'bg-green-500' : 'bg-yellow-500'} mr-2`}></span>
                        <span className="text-xs">{chat.resolved ? 'Resolvido' : 'Em andamento'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Área de chat ativa */}
              <div className="border rounded-lg overflow-hidden md:col-span-2 flex flex-col">
                <div className="bg-gray-50 p-3 border-b">
                  <h3 className="font-medium">
                    {activeChat 
                      ? `Chat com ${conversations.find(c => c.id === activeChat)?.user}`
                      : 'Selecione uma conversa'}
                  </h3>
                </div>

                {activeChat ? (
                  <>
                    <div className="flex-grow p-4 overflow-y-auto h-[470px]">
                      {/* Conversa ativa */}
                      {conversations.find(c => c.id === activeChat) && (
                        <div className="space-y-4">
                          <div className="flex flex-col">
                            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%] self-end">
                              <p className="text-gray-800">
                                {conversations.find(c => c.id === activeChat)?.question}
                              </p>
                              <p className="text-xs text-gray-500 mt-1 text-right">
                                {conversations.find(c => c.id === activeChat)?.date}
                              </p>
                            </div>
                          </div>
                          
                          {conversations.find(c => c.id === activeChat)?.answer && (
                            <div className="flex flex-col">
                              <div className="bg-education-light rounded-lg p-3 max-w-[80%] self-start">
                                <div className="flex items-center mb-1">
                                  <div className="bg-education-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">
                                    AI
                                  </div>
                                  <span className="text-xs font-medium">Assistente IA</span>
                                </div>
                                <p className="text-gray-800">
                                  {conversations.find(c => c.id === activeChat)?.answer}
                                </p>
                              </div>
                            </div>
                          )}
                          
                          <div ref={messagesEndRef} />
                        </div>
                      )}
                    </div>

                    {/* Área de input */}
                    <div className="p-3 border-t bg-gray-50">
                      <div className="flex space-x-2">
                        <Textarea 
                          placeholder="Digite sua mensagem..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="min-h-[60px]"
                        />
                        <div className="flex flex-col space-y-2">
                          <Button onClick={handleSendMessage}>Enviar</Button>
                          <Button 
                            variant="outline"
                            onClick={() => handleTransferToHuman(activeChat)}
                          >
                            Transferir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Selecione uma conversa para começar</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tickets" className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">Título</th>
                    <th className="py-3 px-4 text-left">Solicitante</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Prioridade</th>
                    <th className="py-3 px-4 text-left">Atribuído a</th>
                    <th className="py-3 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {tickets.map(ticket => (
                    <tr key={ticket.id} className="bg-white">
                      <td className="py-3 px-4">#{ticket.id}</td>
                      <td className="py-3 px-4">{ticket.title}</td>
                      <td className="py-3 px-4">{ticket.requester}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          ticket.status === 'Resolvido' 
                            ? 'bg-green-100 text-green-800'
                            : ticket.status === 'Em análise'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                        }`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          ticket.priority === 'Alto' 
                            ? 'bg-red-100 text-red-800'
                            : ticket.priority === 'Médio'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4">{ticket.assignedTo}</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm" className="h-8 px-2">Ver</Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">Editar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="knowledge" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Base de Conhecimento</CardTitle>
                  <CardDescription>Artigos e tutoriais</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="border-b pb-2">
                      <h4 className="font-medium">Como registrar frequência</h4>
                      <p className="text-sm text-gray-500">Atualizado: 15/05/2025</p>
                    </div>
                    <div className="border-b pb-2">
                      <h4 className="font-medium">Configurando perfis de usuário</h4>
                      <p className="text-sm text-gray-500">Atualizado: 12/05/2025</p>
                    </div>
                    <div className="border-b pb-2">
                      <h4 className="font-medium">Matrícula online: tutorial</h4>
                      <p className="text-sm text-gray-500">Atualizado: 10/05/2025</p>
                    </div>
                    <div className="border-b pb-2">
                      <h4 className="font-medium">Integrando o Teams</h4>
                      <p className="text-sm text-gray-500">Atualizado: 05/05/2025</p>
                    </div>
                    <div>
                      <Button variant="link" className="p-0">Ver todos os artigos</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="md:col-span-2">
                <Card className="shadow-sm h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Perguntas Frequentes (FAQ)</CardTitle>
                    <CardDescription>Respostas rápidas para dúvidas comuns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-b pb-2">
                        <h4 className="font-medium">Como recuperar minha senha?</h4>
                        <p className="text-sm text-gray-700 mt-1">
                          Para recuperar sua senha, clique em "Esqueci minha senha" na tela de login. O sistema enviará um link para redefinição de senha para o e-mail cadastrado.
                        </p>
                      </div>
                      <div className="border-b pb-2">
                        <h4 className="font-medium">Como atualizar dados do aluno?</h4>
                        <p className="text-sm text-gray-700 mt-1">
                          Para atualizar os dados do aluno, acesse seu perfil no menu "Alunos", selecione o aluno desejado e clique em "Editar Perfil". Após as alterações, clique em "Salvar".
                        </p>
                      </div>
                      <div className="border-b pb-2">
                        <h4 className="font-medium">Onde encontrar o boletim escolar?</h4>
                        <p className="text-sm text-gray-700 mt-1">
                          O boletim escolar está disponível na área do aluno ou do responsável. Acesse o menu "Desempenho" e selecione "Boletim". É possível visualizar por período ou ano letivo.
                        </p>
                      </div>
                      <div className="border-b pb-2">
                        <h4 className="font-medium">Como justificar faltas?</h4>
                        <p className="text-sm text-gray-700 mt-1">
                          Para justificar faltas, acesse a área do aluno ou responsável, vá até "Frequência" e clique em "Justificar Falta". Preencha o formulário, anexe documentos se necessário e envie para análise.
                        </p>
                      </div>
                      <div>
                        <Button variant="link" className="p-0">Ver todas as perguntas frequentes</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
