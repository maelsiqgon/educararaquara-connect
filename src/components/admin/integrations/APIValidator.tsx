
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Copy, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface APIEndpoint {
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  requiredHeaders?: Record<string, string>;
  samplePayload?: object;
}

const APIValidator = () => {
  const [selectedAPI, setSelectedAPI] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [customUrl, setCustomUrl] = useState<string>('');
  const [customPayload, setCustomPayload] = useState<string>('{}');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const apiEndpoints: Record<string, APIEndpoint[]> = {
    'Facebook': [
      {
        name: 'Get Page Info',
        url: 'https://graph.facebook.com/v18.0/{page-id}',
        method: 'GET',
        description: 'Obter informações da página do Facebook',
        requiredHeaders: { 'Authorization': 'Bearer {access-token}' }
      },
      {
        name: 'Post Message',
        url: 'https://graph.facebook.com/v18.0/{page-id}/feed',
        method: 'POST',
        description: 'Publicar mensagem na página do Facebook',
        samplePayload: { message: 'Hello from Education System!' }
      }
    ],
    'Instagram': [
      {
        name: 'Get User Media',
        url: 'https://graph.instagram.com/me/media',
        method: 'GET',
        description: 'Obter mídia do usuário Instagram',
        requiredHeaders: { 'Authorization': 'Bearer {access-token}' }
      }
    ],
    'YouTube': [
      {
        name: 'Get Channel Info',
        url: 'https://www.googleapis.com/youtube/v3/channels',
        method: 'GET',
        description: 'Obter informações do canal YouTube',
        requiredHeaders: { 'Authorization': 'Bearer {api-key}' }
      }
    ],
    'WhatsApp': [
      {
        name: 'Instance Status',
        url: '/instance/status',
        method: 'GET',
        description: 'Verificar status da instância WhatsApp'
      },
      {
        name: 'Send Message',
        url: '/message/text',
        method: 'POST',
        description: 'Enviar mensagem de texto',
        samplePayload: { 
          phone: '5511999999999', 
          message: 'Teste de integração do Sistema de Educação' 
        }
      }
    ],
    'Email': [
      {
        name: 'Send Email (Resend)',
        url: 'https://api.resend.com/emails',
        method: 'POST',
        description: 'Enviar email via Resend API',
        samplePayload: {
          from: 'sistema@secretaria.gov.br',
          to: 'teste@exemplo.com',
          subject: 'Teste de Integração',
          html: '<p>Teste do sistema de emails</p>'
        }
      }
    ]
  };

  const validateAPI = async (endpoint: APIEndpoint) => {
    if (!apiKey && endpoint.requiredHeaders) {
      toast.error('API Key é obrigatória para este endpoint');
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      const url = customUrl || endpoint.url;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...endpoint.requiredHeaders
      };

      // Substituir placeholders
      Object.keys(headers).forEach(key => {
        if (headers[key].includes('{access-token}') || headers[key].includes('{api-key}')) {
          headers[key] = headers[key].replace('{access-token}', apiKey).replace('{api-key}', apiKey);
        }
      });

      const options: RequestInit = {
        method: endpoint.method,
        headers,
      };

      if (endpoint.method !== 'GET' && (endpoint.samplePayload || customPayload !== '{}')) {
        try {
          const payload = customPayload !== '{}' ? JSON.parse(customPayload) : endpoint.samplePayload;
          options.body = JSON.stringify(payload);
        } catch (error) {
          toast.error('Payload JSON inválido');
          setLoading(false);
          return;
        }
      }

      // Simular chamada da API (em produção, isso seria feito via edge function)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular resposta de sucesso
      const mockResponse = {
        status: 200,
        data: {
          success: true,
          message: 'API validada com sucesso',
          timestamp: new Date().toISOString(),
          endpoint: endpoint.name
        }
      };

      setResponse(mockResponse);
      toast.success(`${endpoint.name} validado com sucesso!`);

    } catch (error: any) {
      const errorResponse = {
        status: 500,
        error: error.message || 'Erro na validação da API'
      };
      setResponse(errorResponse);
      toast.error('Erro na validação da API');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copiado para a área de transferência');
  };

  const generateCurlCommand = (endpoint: APIEndpoint) => {
    const url = customUrl || endpoint.url;
    let curl = `curl -X ${endpoint.method} "${url}"`;
    
    if (endpoint.requiredHeaders) {
      Object.entries(endpoint.requiredHeaders).forEach(([key, value]) => {
        const headerValue = value.replace('{access-token}', apiKey).replace('{api-key}', apiKey);
        curl += ` \\\n  -H "${key}: ${headerValue}"`;
      });
    }

    if (endpoint.method !== 'GET' && endpoint.samplePayload) {
      curl += ` \\\n  -d '${JSON.stringify(endpoint.samplePayload, null, 2)}'`;
    }

    return curl;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Validador de APIs</CardTitle>
          <CardDescription>
            Teste e valide as configurações de API para todas as integrações
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Seleção de API */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="api-select">Selecionar API</Label>
              <select
                id="api-select"
                className="w-full p-2 border rounded-md"
                value={selectedAPI}
                onChange={(e) => setSelectedAPI(e.target.value)}
              >
                <option value="">Selecione uma API</option>
                {Object.keys(apiEndpoints).map((api) => (
                  <option key={api} value={api}>{api}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-key">API Key / Token</Label>
              <div className="relative">
                <Input
                  id="api-key"
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Insira sua API Key ou Token"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* URL Customizada */}
          <div className="space-y-2">
            <Label htmlFor="custom-url">URL Customizada (opcional)</Label>
            <Input
              id="custom-url"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://api.exemplo.com/endpoint"
            />
          </div>

          {/* Payload Customizado */}
          <div className="space-y-2">
            <Label htmlFor="custom-payload">Payload Customizado (JSON)</Label>
            <Textarea
              id="custom-payload"
              value={customPayload}
              onChange={(e) => setCustomPayload(e.target.value)}
              placeholder='{"key": "value"}'
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Endpoints Disponíveis */}
      {selectedAPI && (
        <Card>
          <CardHeader>
            <CardTitle>Endpoints - {selectedAPI}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apiEndpoints[selectedAPI].map((endpoint, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant={endpoint.method === 'GET' ? 'default' : 'secondary'}>
                        {endpoint.method}
                      </Badge>
                      <h4 className="font-medium">{endpoint.name}</h4>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(generateCurlCommand(endpoint))}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        cURL
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => validateAPI(endpoint)}
                        disabled={loading}
                      >
                        {loading ? 'Testando...' : 'Testar'}
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">{endpoint.description}</p>
                  
                  <div className="text-sm">
                    <strong>URL:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{endpoint.url}</code>
                  </div>

                  {endpoint.samplePayload && (
                    <div className="text-sm">
                      <strong>Payload de Exemplo:</strong>
                      <pre className="bg-gray-100 p-2 rounded mt-1 text-xs overflow-x-auto">
                        {JSON.stringify(endpoint.samplePayload, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resultado da Validação */}
      {response && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {response.status < 400 ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              <span>Resultado da Validação</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant={response.status < 400 ? 'default' : 'destructive'}>
                  Status: {response.status}
                </Badge>
              </div>
              
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                {JSON.stringify(response, null, 2)}
              </pre>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(JSON.stringify(response, null, 2))}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copiar Resposta
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default APIValidator;
