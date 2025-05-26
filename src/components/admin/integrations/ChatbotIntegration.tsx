
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Bot, MessageCircle, Settings, Zap, Phone, Globe, CheckCircle, AlertTriangle } from "lucide-react";

interface ChatbotConfig {
  enabled: boolean;
  n8nWebhookUrl: string;
  whatsappNumber: string;
  welcomeMessage: string;
  businessHours: {
    enabled: boolean;
    start: string;
    end: string;
    timezone: string;
  };
  autoResponses: {
    enabled: boolean;
    responses: { trigger: string; response: string }[];
  };
}

const ChatbotIntegration = () => {
  const [generalConfig, setGeneralConfig] = useState<ChatbotConfig>({
    enabled: true,
    n8nWebhookUrl: 'https://your-n8n-instance.com/webhook/chatbot',
    whatsappNumber: '+55 16 99999-9999',
    welcomeMessage: 'Olá! Sou o assistente virtual da Secretaria de Educação de Araraquara. Como posso ajudá-lo?',
    businessHours: {
      enabled: true,
      start: '08:00',
      end: '17:00',
      timezone: 'America/Sao_Paulo'
    },
    autoResponses: {
      enabled: true,
      responses: [
        { trigger: 'matrícula', response: 'Para informações sobre matrículas, acesse: https://matriculas.araraquara.sp.gov.br' },
        { trigger: 'horário', response: 'Nosso atendimento é de segunda a sexta, das 8h às 17h.' }
      ]
    }
  });

  const [schoolConfigs, setSchoolConfigs] = useState<{ [key: number]: ChatbotConfig }>({
    1: {
      enabled: true,
      n8nWebhookUrl: 'https://your-n8n-instance.com/webhook/school/1',
      whatsappNumber: '+55 16 98888-8888',
      welcomeMessage: 'Olá! Sou o assistente virtual da EMEI Criança Feliz. Como posso ajudá-lo?',
      businessHours: {
        enabled: true,
        start: '07:00',
        end: '17:00',
        timezone: 'America/Sao_Paulo'
      },
      autoResponses: {
        enabled: true,
        responses: [
          { trigger: 'horário', response: 'Nossa escola funciona das 7h às 17h, de segunda a sexta-feira.' }
        ]
      }
    }
  });

  const [activeTab, setActiveTab] = useState<'general' | 'schools'>('general');
  const [selectedSchool, setSelectedSchool] = useState(1);
  const [testMode, setTestMode] = useState(false);

  const handleSaveGeneral = () => {
    // Aqui seria feita a integração com a API
    toast.success("Configurações gerais do chatbot salvas com sucesso!");
  };

  const handleSaveSchool = () => {
    // Aqui seria feita a integração com a API
    toast.success(`Configurações da escola ${selectedSchool} salvas com sucesso!`);
  };

  const handleTestWebhook = async (webhookUrl: string) => {
    setTestMode(true);
    try {
      // Simular teste do webhook
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Webhook testado com sucesso! Conexão estabelecida.");
    } catch (error) {
      toast.error("Erro ao testar webhook. Verifique a URL e tente novamente.");
    } finally {
      setTestMode(false);
    }
  };

  const addAutoResponse = (config: ChatbotConfig, setConfig: (config: ChatbotConfig) => void) => {
    const newResponse = { trigger: '', response: '' };
    setConfig({
      ...config,
      autoResponses: {
        ...config.autoResponses,
        responses: [...config.autoResponses.responses, newResponse]
      }
    });
  };

  const removeAutoResponse = (index: number, config: ChatbotConfig, setConfig: (config: ChatbotConfig) => void) => {
    setConfig({
      ...config,
      autoResponses: {
        ...config.autoResponses,
        responses: config.autoResponses.responses.filter((_, i) => i !== index)
      }
    });
  };

  const renderConfigForm = (config: ChatbotConfig, setConfig: (config: ChatbotConfig) => void, isSchool = false) => (
    <div className="space-y-6">
      {/* Status e Configurações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Configurações Básicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">Status do Chatbot</h4>
              <p className="text-sm text-gray-600">
                {config.enabled ? 'Ativo e funcionando' : 'Desativado'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={config.enabled}
                onCheckedChange={(enabled) => setConfig({ ...config, enabled })}
              />
              <Badge variant={config.enabled ? "default" : "secondary"}>
                {config.enabled ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertTriangle className="h-3 w-3 mr-1" />}
                {config.enabled ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp">Número WhatsApp Business</Label>
              <Input
                id="whatsapp"
                value={config.whatsappNumber}
                onChange={(e) => setConfig({ ...config, whatsappNumber: e.target.value })}
                placeholder="+55 16 99999-9999"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">Fuso Horário</Label>
              <Select 
                value={config.businessHours.timezone} 
                onValueChange={(timezone) => setConfig({
                  ...config,
                  businessHours: { ...config.businessHours, timezone }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Sao_Paulo">São Paulo (UTC-3)</SelectItem>
                  <SelectItem value="America/Fortaleza">Fortaleza (UTC-3)</SelectItem>
                  <SelectItem value="America/Manaus">Manaus (UTC-4)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="welcome">Mensagem de Boas-vindas</Label>
            <Textarea
              id="welcome"
              value={config.welcomeMessage}
              onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
              placeholder="Digite a mensagem que será exibida quando alguém iniciar uma conversa"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Integração n8n */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Integração n8n
          </CardTitle>
          <CardDescription>
            Configure o webhook do n8n para processar as mensagens do chatbot
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook">URL do Webhook n8n</Label>
            <div className="flex gap-2">
              <Input
                id="webhook"
                value={config.n8nWebhookUrl}
                onChange={(e) => setConfig({ ...config, n8nWebhookUrl: e.target.value })}
                placeholder="https://your-n8n-instance.com/webhook/chatbot"
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={() => handleTestWebhook(config.n8nWebhookUrl)}
                disabled={testMode || !config.n8nWebhookUrl}
              >
                {testMode ? 'Testando...' : 'Testar'}
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Configuração do n8n</h4>
            <p className="text-sm text-blue-800 mb-3">
              Para configurar o workflow no n8n, siga estes passos:
            </p>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Crie um novo workflow no n8n</li>
              <li>Adicione um trigger "Webhook"</li>
              <li>Configure o método como POST</li>
              <li>Copie a URL do webhook acima</li>
              <li>Adicione os nós de processamento das mensagens</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Horário de Funcionamento */}
      <Card>
        <CardHeader>
          <CardTitle>Horário de Funcionamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Ativar horário comercial</Label>
            <Switch
              checked={config.businessHours.enabled}
              onCheckedChange={(enabled) => setConfig({
                ...config,
                businessHours: { ...config.businessHours, enabled }
              })}
            />
          </div>

          {config.businessHours.enabled && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">Horário de Início</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={config.businessHours.start}
                  onChange={(e) => setConfig({
                    ...config,
                    businessHours: { ...config.businessHours, start: e.target.value }
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end-time">Horário de Término</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={config.businessHours.end}
                  onChange={(e) => setConfig({
                    ...config,
                    businessHours: { ...config.businessHours, end: e.target.value }
                  })}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Respostas Automáticas */}
      <Card>
        <CardHeader>
          <CardTitle>Respostas Automáticas</CardTitle>
          <CardDescription>
            Configure respostas rápidas para palavras-chave comuns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Ativar respostas automáticas</Label>
            <Switch
              checked={config.autoResponses.enabled}
              onCheckedChange={(enabled) => setConfig({
                ...config,
                autoResponses: { ...config.autoResponses, enabled }
              })}
            />
          </div>

          {config.autoResponses.enabled && (
            <div className="space-y-4">
              {config.autoResponses.responses.map((response, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Palavra-chave</Label>
                      <Input
                        value={response.trigger}
                        onChange={(e) => {
                          const newResponses = [...config.autoResponses.responses];
                          newResponses[index] = { ...response, trigger: e.target.value };
                          setConfig({
                            ...config,
                            autoResponses: { ...config.autoResponses, responses: newResponses }
                          });
                        }}
                        placeholder="ex: matrícula"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Resposta</Label>
                      <div className="flex gap-2">
                        <Input
                          value={response.response}
                          onChange={(e) => {
                            const newResponses = [...config.autoResponses.responses];
                            newResponses[index] = { ...response, response: e.target.value };
                            setConfig({
                              ...config,
                              autoResponses: { ...config.autoResponses, responses: newResponses }
                            });
                          }}
                          placeholder="Resposta automática"
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeAutoResponse(index, config, setConfig)}
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                variant="outline"
                onClick={() => addAutoResponse(config, setConfig)}
                className="w-full"
              >
                Adicionar Resposta Automática
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-soft">
        <CardHeader className="bg-education-light rounded-t-lg">
          <CardTitle className="text-education-primary flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            Configuração do Chatbot Inteligente
          </CardTitle>
          <CardDescription>
            Configure o chatbot integrado com n8n e WhatsApp Business para atendimento automatizado
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'general'
                ? 'border-education-primary text-education-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Globe className="h-4 w-4 inline mr-2" />
            Secretaria (Geral)
          </button>
          <button
            onClick={() => setActiveTab('schools')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'schools'
                ? 'border-education-primary text-education-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Bot className="h-4 w-4 inline mr-2" />
            Escolas Individuais
          </button>
        </nav>
      </div>

      {activeTab === 'general' && (
        <div className="space-y-6">
          {renderConfigForm(generalConfig, setGeneralConfig)}
          
          <div className="flex justify-end">
            <Button onClick={handleSaveGeneral} className="bg-education-primary hover:bg-education-dark">
              Salvar Configurações Gerais
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'schools' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Selecionar Escola</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedSchool.toString()} onValueChange={(value) => setSelectedSchool(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">EMEI Criança Feliz</SelectItem>
                  <SelectItem value="2">EMEF Dom Pedro I</SelectItem>
                  <SelectItem value="3">EMEF Monteiro Lobato</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {schoolConfigs[selectedSchool] && renderConfigForm(
            schoolConfigs[selectedSchool], 
            (config) => setSchoolConfigs({ ...schoolConfigs, [selectedSchool]: config }),
            true
          )}
          
          <div className="flex justify-end">
            <Button onClick={handleSaveSchool} className="bg-education-primary hover:bg-education-dark">
              Salvar Configurações da Escola
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotIntegration;
