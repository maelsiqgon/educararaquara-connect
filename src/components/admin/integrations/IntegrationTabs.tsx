
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MicrosoftIntegration from "./MicrosoftIntegration";
import SocialMediaIntegration from "./SocialMediaIntegration";
import TeamsIntegration from "./TeamsIntegration";
import ChatAI from "../chat/ChatAI";
import ChatbotIntegration from "./ChatbotIntegration";
import WhatsAppIntegration from "./WhatsAppIntegration";
import EmailIntegration from "./EmailIntegration";
import BackupIntegration from "./BackupIntegration";
import MonitoringIntegration from "./MonitoringIntegration";

const IntegrationTabs = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-education-primary mb-6">Integrações e Automação</h2>
      
      <Tabs defaultValue="whatsapp" className="space-y-6">
        <TabsList className="bg-white shadow-sm border-0 p-1 rounded-lg flex-wrap h-auto">
          <TabsTrigger value="whatsapp" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            WhatsApp/Evolution API
          </TabsTrigger>
          <TabsTrigger value="email" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Sistema de E-mails
          </TabsTrigger>
          <TabsTrigger value="backup" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Backups Automatizados
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Monitoramento
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Chatbot & n8n
          </TabsTrigger>
          <TabsTrigger value="microsoft" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Microsoft 365 e Azure AD
          </TabsTrigger>
          <TabsTrigger value="teams" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Microsoft Teams
          </TabsTrigger>
          <TabsTrigger value="social" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Redes Sociais
          </TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Chat Inteligente e Tickets
          </TabsTrigger>
        </TabsList>

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
          <ChatbotIntegration />
        </TabsContent>
        
        <TabsContent value="microsoft">
          <MicrosoftIntegration />
        </TabsContent>
        
        <TabsContent value="teams">
          <TeamsIntegration />
        </TabsContent>
        
        <TabsContent value="social">
          <SocialMediaIntegration />
        </TabsContent>
        
        <TabsContent value="chat">
          <ChatAI />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationTabs;
