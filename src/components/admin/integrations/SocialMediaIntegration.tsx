
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockSocialNetworks } from "../mockData";
import SocialMediaAccounts from "./social-media/SocialMediaAccounts";
import SocialMediaPublish from "./social-media/SocialMediaPublish";
import SocialMediaSchedule from "./social-media/SocialMediaSchedule";
import SocialMediaAnalytics from "./social-media/SocialMediaAnalytics";

// Update the followers type to string to match the expected type
type SocialNetwork = {
  id: number;
  platform: string;
  name: string;
  url: string;
  followers: string; // Changed from number to string
  connected: boolean;
  lastPost: string;
  scheduledPosts: number;
};

const SocialMediaIntegration = () => {
  // Convert followers to string in the initial state
  const [networks, setNetworks] = useState<SocialNetwork[]>(
    mockSocialNetworks.map(network => ({
      ...network,
      followers: network.followers.toString() // Convert number to string
    }))
  );
  
  return (
    <Card className="shadow-sm border-0">
      <CardHeader>
        <CardTitle>Integração com Redes Sociais</CardTitle>
        <CardDescription>
          Gerenciamento de redes sociais da Secretaria de Educação e escolas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="accounts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="accounts">Contas Conectadas</TabsTrigger>
            <TabsTrigger value="publish">Publicar</TabsTrigger>
            <TabsTrigger value="schedule">Agendamentos</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounts" className="space-y-4">
            <SocialMediaAccounts networks={networks} setNetworks={setNetworks} />
          </TabsContent>
          
          <TabsContent value="publish" className="space-y-4">
            <SocialMediaPublish networks={networks.filter(n => n.connected)} />
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-4">
            <SocialMediaSchedule />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <SocialMediaAnalytics />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SocialMediaIntegration;
