
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Play, 
  Database, 
  Upload, 
  Users, 
  Shield,
  Mail,
  MessageCircle,
  Facebook,
  Instagram,
  Youtube,
  Server,
  HardDrive
} from "lucide-react";
import { toast } from "sonner";

interface TestResult {
  name: string;
  status: 'pending' | 'running' | 'success' | 'error';
  message?: string;
  duration?: number;
}

interface IntegrationConfig {
  name: string;
  icon: React.ReactNode;
  tests: string[];
  configFields: { key: string; label: string; type: string; placeholder: string }[];
}

const IntegrationTester = () => {
  const [testResults, setTestResults] = useState<Record<string, TestResult[]>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [configs, setConfigs] = useState<Record<string, Record<string, string>>>({});

  const integrations: IntegrationConfig[] = [
    {
      name: 'social_media',
      icon: <Facebook className="h-5 w-5" />,
      tests: ['Facebook API', 'Instagram Basic Display', 'YouTube Data API'],
      configFields: [
        { key: 'facebook_app_id', label: 'Facebook App ID', type: 'text', placeholder: 'Seu App ID do Facebook' },
        { key: 'facebook_app_secret', label: 'Facebook App Secret', type: 'password', placeholder: 'Seu App Secret do Facebook' },
        { key: 'instagram_token', label: 'Instagram Access Token', type: 'password', placeholder: 'Token de acesso do Instagram' },
        { key: 'youtube_api_key', label: 'YouTube API Key', type: 'password', placeholder: 'Chave da API do YouTube' }
      ]
    },
    {
      name: 'whatsapp',
      icon: <MessageCircle className="h-5 w-5" />,
      tests: ['Evolution API Connection', 'Instance Status', 'Message Send Test'],
      configFields: [
        { key: 'api_url', label: 'URL da API', type: 'text', placeholder: 'https://api.evolutionapi.com' },
        { key: 'api_key', label: 'Chave da API', type: 'password', placeholder: 'Sua chave da API' },
        { key: 'instance_name', label: 'Nome da Instância', type: 'text', placeholder: 'minha-instancia' },
        { key: 'test_phone', label: 'Telefone de Teste', type: 'text', placeholder: '5511999999999' }
      ]
    },
    {
      name: 'email',
      icon: <Mail className="h-5 w-5" />,
      tests: ['SMTP Connection', 'Template Rendering', 'Send Test Email'],
      configFields: [
        { key: 'provider', label: 'Provedor', type: 'select', placeholder: 'Resend' },
        { key: 'api_key', label: 'Chave da API', type: 'password', placeholder: 'Sua chave da API' },
        { key: 'from_email', label: 'E-mail Remetente', type: 'email', placeholder: 'noreply@secretaria.gov.br' },
        { key: 'test_email', label: 'E-mail de Teste', type: 'email', placeholder: 'teste@exemplo.com' }
      ]
    },
    {
      name: 'backup',
      icon: <HardDrive className="h-5 w-5" />,
      tests: ['Storage Connection', 'Backup Creation', 'Restoration Test'],
      configFields: [
        { key: 'storage_provider', label: 'Provedor de Storage', type: 'select', placeholder: 'AWS S3' },
        { key: 'access_key', label: 'Access Key', type: 'password', placeholder: 'Sua access key' },
        { key: 'secret_key', label: 'Secret Key', type: 'password', placeholder: 'Sua secret key' },
        { key: 'bucket_name', label: 'Nome do Bucket', type: 'text', placeholder: 'backups-secretaria' }
      ]
    },
    {
      name: 'monitoring',
      icon: <Server className="h-5 w-5" />,
      tests: ['System Health', 'Performance Metrics', 'Alert System'],
      configFields: [
        { key: 'monitoring_url', label: 'URL de Monitoramento', type: 'text', placeholder: 'https://monitoring.exemplo.com' },
        { key: 'api_token', label: 'Token da API', type: 'password', placeholder: 'Token de monitoramento' },
        { key: 'alert_email', label: 'E-mail para Alertas', type: 'email', placeholder: 'admin@secretaria.gov.br' }
      ]
    }
  ];

  const functionalityTests = [
    {
      category: 'crud',
      name: 'CRUD Operations',
      icon: <Database className="h-5 w-5" />,
      tests: ['Create User', 'Read Schools', 'Update News', 'Delete Media']
    },
    {
      category: 'upload',
      name: 'File Upload',
      icon: <Upload className="h-5 w-5" />,
      tests: ['Image Upload', 'Document Upload', 'File Validation', 'Storage Quota']
    },
    {
      category: 'auth',
      name: 'Authentication',
      icon: <Users className="h-5 w-5" />,
      tests: ['Login Flow', 'Token Refresh', 'Password Reset', 'Session Management']
    },
    {
      category: 'permissions',
      name: 'Permissions',
      icon: <Shield className="h-5 w-5" />,
      tests: ['Role Validation', 'Access Control', 'School Isolation', 'Admin Rights']
    }
  ];

  const handleConfigChange = (integration: string, field: string, value: string) => {
    setConfigs(prev => ({
      ...prev,
      [integration]: {
        ...prev[integration],
        [field]: value
      }
    }));
  };

  const runIntegrationTest = async (integrationName: string, testName: string) => {
    const startTime = Date.now();
    
    setTestResults(prev => ({
      ...prev,
      [integrationName]: (prev[integrationName] || []).map(test => 
        test.name === testName 
          ? { ...test, status: 'running' }
          : test
      )
    }));

    try {
      // Simular teste de API
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      // Simular resultado aleatório para demonstração
      const success = Math.random() > 0.3;
      const duration = Date.now() - startTime;
      
      setTestResults(prev => ({
        ...prev,
        [integrationName]: (prev[integrationName] || []).map(test => 
          test.name === testName 
            ? { 
                ...test, 
                status: success ? 'success' : 'error',
                message: success ? 'Teste executado com sucesso' : 'Falha na conexão com a API',
                duration
              }
            : test
        )
      }));

      if (success) {
        toast.success(`${testName} executado com sucesso`);
      } else {
        toast.error(`Falha no teste ${testName}`);
      }
    } catch (error) {
      toast.error(`Erro no teste ${testName}`);
    }
  };

  const runAllTests = async (integrationName: string) => {
    const integration = integrations.find(i => i.name === integrationName);
    if (!integration) return;

    setIsRunning(true);
    
    // Inicializar resultados
    setTestResults(prev => ({
      ...prev,
      [integrationName]: integration.tests.map(test => ({
        name: test,
        status: 'pending' as const
      }))
    }));

    // Executar testes sequencialmente
    for (const test of integration.tests) {
      await runIntegrationTest(integrationName, test);
    }

    setIsRunning(false);
  };

  const runFunctionalityTest = async (category: string, testName: string) => {
    const startTime = Date.now();
    
    setTestResults(prev => ({
      ...prev,
      [category]: (prev[category] || []).map(test => 
        test.name === testName 
          ? { ...test, status: 'running' }
          : test
      )
    }));

    try {
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1500));
      
      const success = Math.random() > 0.2;
      const duration = Date.now() - startTime;
      
      setTestResults(prev => ({
        ...prev,
        [category]: (prev[category] || []).map(test => 
          test.name === testName 
            ? { 
                ...test, 
                status: success ? 'success' : 'error',
                message: success ? 'Funcionalidade testada com sucesso' : 'Erro na validação',
                duration
              }
            : test
        )
      }));

      if (success) {
        toast.success(`${testName} testado com sucesso`);
      } else {
        toast.error(`Falha no teste ${testName}`);
      }
    } catch (error) {
      toast.error(`Erro no teste ${testName}`);
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running':
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sistema de Testes de Integração</CardTitle>
          <CardDescription>
            Valide todas as configurações de API e funcionalidades do sistema
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="integrations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="integrations">Integrações de API</TabsTrigger>
          <TabsTrigger value="functionality">Testes de Funcionalidade</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          {integrations.map((integration) => (
            <Card key={integration.name}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {integration.icon}
                    <CardTitle className="capitalize">
                      {integration.name.replace('_', ' ')}
                    </CardTitle>
                  </div>
                  <Button 
                    onClick={() => runAllTests(integration.name)}
                    disabled={isRunning}
                    size="sm"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Testar Tudo
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Configuração */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {integration.configFields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <Label htmlFor={`${integration.name}-${field.key}`}>
                        {field.label}
                      </Label>
                      <Input
                        id={`${integration.name}-${field.key}`}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={configs[integration.name]?.[field.key] || ''}
                        onChange={(e) => handleConfigChange(integration.name, field.key, e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                {/* Resultados dos Testes */}
                <div className="space-y-2">
                  <h4 className="font-medium">Resultados dos Testes:</h4>
                  {integration.tests.map((test) => {
                    const result = testResults[integration.name]?.find(r => r.name === test);
                    return (
                      <div key={test} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(result?.status || 'pending')}
                          <span className="font-medium">{test}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {result?.duration && (
                            <span className="text-sm text-gray-500">
                              {result.duration}ms
                            </span>
                          )}
                          <Badge variant={
                            result?.status === 'success' ? 'default' :
                            result?.status === 'error' ? 'destructive' :
                            result?.status === 'running' ? 'secondary' : 'outline'
                          }>
                            {result?.status || 'pending'}
                          </Badge>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => runIntegrationTest(integration.name, test)}
                            disabled={result?.status === 'running'}
                          >
                            Testar
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="functionality" className="space-y-4">
          {functionalityTests.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  {category.icon}
                  <CardTitle>{category.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {category.tests.map((test) => {
                    const result = testResults[category.category]?.find(r => r.name === test);
                    return (
                      <div key={test} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(result?.status || 'pending')}
                          <span className="font-medium">{test}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {result?.duration && (
                            <span className="text-sm text-gray-500">
                              {result.duration}ms
                            </span>
                          )}
                          <Badge variant={
                            result?.status === 'success' ? 'default' :
                            result?.status === 'error' ? 'destructive' :
                            result?.status === 'running' ? 'secondary' : 'outline'
                          }>
                            {result?.status || 'pending'}
                          </Badge>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => runFunctionalityTest(category.category, test)}
                            disabled={result?.status === 'running'}
                          >
                            Testar
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationTester;
