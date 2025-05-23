
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MicrosoftIntegration from "./MicrosoftIntegration";
import SocialMediaIntegration from "./SocialMediaIntegration";
import TeamsIntegration from "./TeamsIntegration";
import ChatAI from "../chat/ChatAI";

const IntegrationTabs = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-education-primary mb-6">Integrações Técnicas</h2>
      
      <Tabs defaultValue="microsoft" className="space-y-6">
        <TabsList className="bg-white shadow-sm border-0 p-1 rounded-lg">
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
