
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockSocialNetworks, mockSchools } from "../mockData";
import SocialMediaAccounts from "./social-media/SocialMediaAccounts";
import SocialMediaPublish from "./social-media/SocialMediaPublish";
import SocialMediaSchedule from "./social-media/SocialMediaSchedule";
import SocialMediaAnalytics from "./social-media/SocialMediaAnalytics";

type SocialNetwork = {
  id: number;
  platform: string;
  name: string;
  url: string;
  followers: string;
  connected: boolean;
  lastPost: string;
  scheduledPosts: number;
};

const SocialMediaIntegration = () => {
  const [selectedSchool, setSelectedSchool] = useState<string>("secretaria");
  const [networks, setNetworks] = useState<SocialNetwork[]>(
    mockSocialNetworks.map(network => ({
      ...network,
      followers: network.followers.toString()
    }))
  );

  const schoolOptions = [
    { id: "secretaria", name: "Secretaria de Educação" },
    ...mockSchools.map(school => ({ id: school.id.toString(), name: school.name }))
  ];
  
  return (
    <Card className="shadow-sm border-0">
      <CardHeader>
        <CardTitle>Integração com Redes Sociais</CardTitle>
        <CardDescription>
          Gerenciamento de redes sociais da Secretaria de Educação e escolas
        </CardDescription>
        
        <div className="mt-4">
          <Select value={selectedSchool} onValueChange={setSelectedSchool}>
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue placeholder="Selecione a instituição" />
            </SelectTrigger>
            <SelectContent>
              {schoolOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
