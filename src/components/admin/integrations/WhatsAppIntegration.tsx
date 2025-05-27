
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Phone, Settings, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

interface WhatsAppSettings {
  id: string;
  instance_name: string;
  api_url: string;
  api_key: string;
  phone_number?: string;
  webhook_url?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

const WhatsAppIntegration = () => {
  const [settings, setSettings] = useState<WhatsAppSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [connected, setConnected] = useState(false);
  const [formData, setFormData] = useState({
    instance_name: '',
    api_url: '',
    api_key: '',
    phone_number: '',
    webhook_url: '',
    active: false
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('whatsapp_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setSettings(data);
        setFormData({
          instance_name: data.instance_name,
          api_url: data.api_url,
          api_key: data.api_key,
          phone_number: data.phone_number || '',
          webhook_url: data.webhook_url || '',
          active: data.active
        });
        setConnected(data.active);
      }
    } catch (err: any) {
      toast.error('Erro ao carregar configurações: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      
      if (!formData.instance_name || !formData.api_url || !formData.api_key) {
        toast.error('Preencha todos os campos obrigatórios');
        return;
      }

      const webhookUrl = `${window.location.origin}/api/whatsapp-webhook`;
      
      const settingsData = {
        ...formData,
        webhook_url: webhookUrl
      };

      if (settings) {
        const { error } = await supabase
          .from('whatsapp_settings')
          .update(settingsData)
          .eq('id', settings.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('whatsapp_settings')
          .insert([settingsData]);

        if (error) throw error;
      }

      await fetchSettings();
      toast.success('Configurações salvas com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao salvar configurações: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const testConnection = async () => {
    try {
      if (!formData.api_url || !formData.api_key) {
        toast.error('Configure a API URL e chave primeiro');
        return;
      }

      const response = await fetch(`${formData.api_url}/instance/status`, {
        headers: {
          'Authorization': `Bearer ${formData.api_key}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setConnected(true);
        toast.success('Conexão estabelecida com sucesso!');
      } else {
        setConnected(false);
        toast.error('Falha na conexão com a API');
      }
    } catch (err) {
      setConnected(false);
      toast.error('Erro ao testar conexão');
    }
  };

  const sendTestMessage = async () => {
    try {
      if (!formData.phone_number) {
        toast.error('Configure um número de telefone primeiro');
        return;
      }

      const testMessage = {
        phone: formData.phone_number,
        message: 'Teste de integração WhatsApp - Sistema da Secretaria de Educação'
      };

      const response = await fetch(`${formData.api_url}/message/text`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${formData.api_key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testMessage)
      });

      if (response.ok) {
        toast.success('Mensagem de teste enviada!');
      } else {
        toast.error('Erro ao enviar mensagem de teste');
      }
    } catch (err) {
      toast.error('Erro ao enviar mensagem de teste');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Integração WhatsApp/Evolution API
              </CardTitle>
              <CardDescription>
                Configure a integração com WhatsApp para comunicação automatizada
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
              <Label htmlFor="instance-name">Nome da Instância *</Label>
              <Input
                id="instance-name"
                value={formData.instance_name}
                onChange={(e) => setFormData(prev => ({ ...prev, instance_name: e.target.value }))}
                placeholder="minha-instancia"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-url">URL da API *</Label>
              <Input
                id="api-url"
                value={formData.api_url}
                onChange={(e) => setFormData(prev => ({ ...prev, api_url: e.target.value }))}
                placeholder="https://api.evolutionapi.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-key">Chave da API *</Label>
            <Input
              id="api-key"
              type="password"
              value={formData.api_key}
              onChange={(e) => setFormData(prev => ({ ...prev, api_key: e.target.value }))}
              placeholder="Sua chave da API"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone-number">Número do WhatsApp</Label>
              <Input
                id="phone-number"
                value={formData.phone_number}
                onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
                placeholder="5511999999999"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhook-url">URL do Webhook</Label>
              <Input
                id="webhook-url"
                value={`${window.location.origin}/api/whatsapp-webhook`}
                disabled
                className="bg-gray-100"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
            />
            <Label htmlFor="active">Ativar integração WhatsApp</Label>
          </div>

          <div className="flex gap-3">
            <Button onClick={saveSettings} disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar Configurações'}
            </Button>
            <Button variant="outline" onClick={testConnection}>
              Testar Conexão
            </Button>
            <Button variant="outline" onClick={sendTestMessage}>
              Enviar Teste
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações de Webhook
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Configure o Webhook na Evolution API:</h4>
            <p className="text-sm text-gray-600 mb-2">
              1. Acesse o painel da Evolution API
            </p>
            <p className="text-sm text-gray-600 mb-2">
              2. Configure a URL do webhook: <code className="bg-white px-2 py-1 rounded">{window.location.origin}/api/whatsapp-webhook</code>
            </p>
            <p className="text-sm text-gray-600">
              3. Ative os eventos de mensagem recebida
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppIntegration;
