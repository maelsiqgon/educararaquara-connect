
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfantilEducationTab from "./education/InfantilEducationTab";
import FundamentalEducationTab from "./education/FundamentalEducationTab";
import ContraturnoEducationTab from "./education/ContraturnoEducationTab";

const EducationLevelTabs = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-education-primary mb-6">Funcionalidades por Nível de Ensino</h2>
      
      <Tabs defaultValue="infantil" className="space-y-6">
        <TabsList className="bg-white shadow-sm border-0 p-1 rounded-lg">
          <TabsTrigger value="infantil" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Educação Infantil
          </TabsTrigger>
          <TabsTrigger value="fundamental" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Ensino Fundamental
          </TabsTrigger>
          <TabsTrigger value="contraturno" className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
            Projetos de Contraturno
          </TabsTrigger>
        </TabsList>

        <TabsContent value="infantil" className="space-y-4">
          <InfantilEducationTab />
        </TabsContent>
        
        <TabsContent value="fundamental" className="space-y-4">
          <FundamentalEducationTab />
        </TabsContent>
        
        <TabsContent value="contraturno" className="space-y-4">
          <ContraturnoEducationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EducationLevelTabs;
