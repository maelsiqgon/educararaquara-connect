
import React from "react";
import { Calendar, School, ListCheck } from "lucide-react";
import DailyActivitiesModule from "./infantil/DailyActivitiesModule";
import DigitalAlbumModule from "./infantil/DigitalAlbumModule";
import DevelopmentReportModule from "./infantil/DevelopmentReportModule";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InfantilEducationTab = () => {
  return (
    <Tabs defaultValue="activities" className="space-y-6">
      <TabsList className="bg-white">
        <TabsTrigger value="activities" className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-pink-500" />
          Diário de Atividades
        </TabsTrigger>
        <TabsTrigger value="album" className="flex items-center">
          <School className="h-4 w-4 mr-2 text-purple-500" />
          Álbum Digital
        </TabsTrigger>
        <TabsTrigger value="reports" className="flex items-center">
          <ListCheck className="h-4 w-4 mr-2 text-cyan-500" />
          Relatórios
        </TabsTrigger>
      </TabsList>

      <TabsContent value="activities">
        <DailyActivitiesModule />
      </TabsContent>

      <TabsContent value="album">
        <DigitalAlbumModule />
      </TabsContent>

      <TabsContent value="reports">
        <DevelopmentReportModule />
      </TabsContent>
    </Tabs>
  );
};

export default InfantilEducationTab;
