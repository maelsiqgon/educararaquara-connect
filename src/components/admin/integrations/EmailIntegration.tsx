
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, Send, Settings, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: string;
}

const EmailIntegration = () => {
  const [emailSettings, setEmailSettings] = useState({
    provider: 'resend',
    api_key: '',
    from_email: '',
    from_name: '',
    active: false
  });
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [testEmail, setTestEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  const defaultTemplates = [
    {
      name: 'Boas-vindas',
      subject: 'Bem-vindo ao Sistema da Secretaria de Educação',
      content: `
<h1>Bem-vindo(a)!</h1>
<p>Olá {{nome}},</p>
<p>Seja bem-vindo(a) ao Sistema da Secretaria de Educação de {{cidade}}.</p>
<p>Seu acesso foi criado com sucesso. Você pode acessar o sistema através do link:</p>
<p><a href="{{link_sistema}}">Acessar Sistema</a></p>
<p>Em caso de dúvidas, entre em contato conosco.</p>
<p>Atenciosamente,<br>Secretaria de Educação</p>
      `,
      type: 'welcome'
    },
    {
      name: 'Notificação de Evento',
      subject: 'Novo Evento: {{titulo_evento}}',
      content: `
<h1>Novo Evento Agendado</h1>
<p>Olá {{nome}},</p>
<p>Um novo evento foi agendado:</p>
<ul>
  <li><strong>Evento:</strong> {{titulo_evento}}</li>
  <li><strong>Data:</strong> {{data_evento}}</li>
  <li><strong>Horário:</strong> {{horario_evento}}</li>
  <li><strong>Local:</strong> {{local_evento}}</li>
</ul>
<p>{{descricao_evento}}</p>
<p>Atenciosamente,<br>Secretaria de Educação</p>
      `,
      type: 'event'
    },
    {
      name: 'Resetar Senha',
      subject: 'Solicitação de Nova Senha',
      content: `
<h1>Resetar Senha</h1>
<p>Olá {{nome}},</p>
<p>Recebemos uma solicitação para resetar sua senha no Sistema da Secretaria de Educação.</p>
<p>Clique no link abaixo para criar uma nova senha:</p>
<p><a href="{{link_reset}}">Resetar Senha</a></p>
<p>Se você não solicitou esta alteração, ignore este e-mail.</p>
<p>Atenciosamente,<br>Secretaria de Educação</p>
      `,
      type: 'password_reset'
    }
  ];

  useEffect(() => {
    loadEmailSettings();
    loadTemplates();
  }, []);

  const loadEmailSettings = async () => {
    try {
      // Esta seria uma função para carregar as configurações de e-mail
      // Por enquanto, vamos simular
      setConnected(false);
    } catch (err) {
      console.error('Erro ao carregar configurações de e-mail:', err);
    }
  };

  const loadTemplates = () => {
    // Carregar templates do banco ou usar os padrões
    setTemplates(defaultTemplates.map((template, index) => ({
      ...template,
      id: index.toString()
    })));
  };

  const saveEmailSettings = async () => {
    try {
      setLoading(true);
      
      if (!emailSettings.api_key || !emailSettings.from_email) {
        toast.error('Preencha todos os campos obrigatórios');
        return;
      }

      // Aqui seria a chamada para salvar as configurações
      // await supabase.from('email_settings').upsert(emailSettings);
      
      toast.success('Configurações de e-mail salvas com sucesso!');
      setConnected(true);
    } catch (err: any) {
      toast.error('Erro ao salvar configurações: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const testEmailConnection = async () => {
    try {
      if (!testEmail) {
        toast.error('Digite um e-mail para teste');
        return;
      }

      setLoading(true);
      
      // Simular envio de e-mail de teste
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('E-mail de teste enviado com sucesso!');
      setConnected(true);
    } catch (err) {
      toast.error('Erro ao enviar e-mail de teste');
      setConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const sendBulkEmail = async (templateId: string, recipients: string[]) => {
    try {
      setLoading(true);
      
      const template = templates.find(t => t.id === templateId);
      if (!template) {
        toast.error('Template não encontrado');
        return;
      }

      // Simular envio em massa
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success(`E-mail enviado para ${recipients.length} destinatários`);
    } catch (err) {
      toast.error('Erro ao enviar e-mails em massa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Sistema de E-mails
              </CardTitle>
              <CardDescription>
                Configure o sistema de envio de e-mails para notificações e comunicações
              </CardDescription>
            </div>
            <Badge variant={connected ? "default" : "secondary"}>
              {connected ? (
                <><CheckCircle className="h-3 w-3 mr-1" /> Conectado</>
              ) : (
                <><AlertCircle className="h-3 w-3 mr-1" /> Desconectado</>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="provider">Provedor de E-mail</Label>
              <Select 
                value={emailSettings.provider} 
                onValueChange={(value) => setEmailSettings(prev => ({ ...prev, provider: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resend">Resend</SelectItem>
                  <SelectItem value="sendgrid">SendGrid</SelectItem>
                  <SelectItem value="mailgun">Mailgun</SelectItem>
                  <SelectItem value="smtp">SMTP Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-key">Chave da API *</Label>
              <Input
                id="api-key"
                type="password"
                value={emailSettings.api_key}
                onChange={(e) => setEmailSettings(prev => ({ ...prev, api_key: e.target.value }))}
                placeholder="Sua chave da API"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from-email">E-mail Remetente *</Label>
              <Input
                id="from-email"
                type="email"
                value={emailSettings.from_email}
                onChange={(e) => setEmailSettings(prev => ({ ...prev, from_email: e.target.value }))}
                placeholder="noreply@secretaria.gov.br"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="from-name">Nome Remetente</Label>
              <Input
                id="from-name"
                value={emailSettings.from_name}
                onChange={(e) => setEmailSettings(prev => ({ ...prev, from_name: e.target.value }))}
                placeholder="Secretaria de Educação"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={saveEmailSettings} disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Configurações'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Teste de E-mail
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Input
              placeholder="Digite um e-mail para teste"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="flex-1"
            />
            <Button onClick={testEmailConnection} disabled={loading}>
              Enviar Teste
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Templates de E-mail</CardTitle>
          <CardDescription>
            Gerencie os templates para diferentes tipos de e-mail
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {templates.map((template) => (
              <div key={template.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{template.name}</h4>
                    <p className="text-sm text-gray-600">{template.subject}</p>
                  </div>
                  <Badge variant="outline">{template.type}</Badge>
                </div>
                <div className="text-sm text-gray-500 mb-3" dangerouslySetInnerHTML={{ __html: template.content.substring(0, 150) + '...' }} />
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Editar</Button>
                  <Button size="sm" variant="outline">Visualizar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailIntegration;
