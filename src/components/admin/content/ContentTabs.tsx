
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ContentTabsProps {
  activeContent: string;
  onContentChange: (value: string) => void;
}

const ContentTabs: React.FC<ContentTabsProps> = ({ activeContent, onContentChange }) => {
  return (
    <Tabs value={activeContent} onValueChange={onContentChange}>
      <TabsList className="bg-white mb-6">
        <TabsTrigger value="institucional">Institucional</TabsTrigger>
        <TabsTrigger value="escolas">Escolas</TabsTrigger>
        <TabsTrigger value="projetos">Projetos</TabsTrigger>
        <TabsTrigger value="contato">Contato</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ContentTabs;
