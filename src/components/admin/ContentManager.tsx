
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import ContentTabs from './content/ContentTabs';
import ContentEditor from './content/ContentEditor';

const ContentManager = () => {
  const [activeContent, setActiveContent] = useState("institucional");

  const handleSave = () => {
    toast.success("Conteúdo salvo com sucesso!");
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-soft">
        <CardHeader className="bg-education-light rounded-t-lg">
          <CardTitle className="text-education-primary">Gerenciamento de Conteúdo</CardTitle>
          <CardDescription>
            Edite e gerencie o conteúdo das páginas do portal
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ContentTabs 
            activeContent={activeContent} 
            onContentChange={setActiveContent} 
          />
          
          <TabsContent value={activeContent} className="space-y-4">
            <ContentEditor 
              activeContent={activeContent}
              onSave={handleSave}
            />
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManager;
