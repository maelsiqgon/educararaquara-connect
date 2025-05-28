
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SocialMediaIntegration from './SocialMediaIntegration';
import WhatsAppIntegration from './WhatsAppIntegration';
import EmailIntegration from './EmailIntegration';
import BackupIntegration from './BackupIntegration';
import MonitoringIntegration from './MonitoringIntegration';
import IntegrationTester from './IntegrationTester';
import APIValidator from './APIValidator';

const IntegrationTabs = () => {
  return (
    <Tabs defaultValue="social" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
        <TabsTrigger value="social">Redes Sociais</TabsTrigger>
        <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
        <TabsTrigger value="email">E-mail</TabsTrigger>
        <TabsTrigger value="backup">Backup</TabsTrigger>
        <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
        <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
        <TabsTrigger value="tester">Testes</TabsTrigger>
        <TabsTrigger value="validator">Validador</TabsTrigger>
      </TabsList>

      <TabsContent value="social">
        <SocialMediaIntegration />
      </TabsContent>

      <TabsContent value="whatsapp">
        <WhatsAppIntegration />
      </TabsContent>

      <TabsContent value="email">
        <EmailIntegration />
      </TabsContent>

      <TabsContent value="backup">
        <BackupIntegration />
      </TabsContent>

      <TabsContent value="monitoring">
        <MonitoringIntegration />
      </TabsContent>

      <TabsContent value="chatbot">
        <div className="text-center py-8">
          <h3 className="text-lg font-medium mb-2">Integração de Chatbot</h3>
          <p className="text-gray-600">Sistema de chatbot em desenvolvimento</p>
        </div>
      </TabsContent>

      <TabsContent value="tester">
        <IntegrationTester />
      </TabsContent>

      <TabsContent value="validator">
        <APIValidator />
      </TabsContent>
    </Tabs>
  );
};

export default IntegrationTabs;
