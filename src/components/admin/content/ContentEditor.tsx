
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ContentForm from './ContentForm';

interface ContentEditorProps {
  activeContent: string;
  onSave: () => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ activeContent, onSave }) => {
  const getContentTitle = () => {
    switch (activeContent) {
      case 'institucional': return 'Página Institucional';
      case 'escolas': return 'Gerenciamento de Escolas';
      case 'projetos': return 'Gerenciamento de Projetos';
      case 'contato': return 'Informações de Contato';
      default: return 'Editor de Conteúdo';
    }
  };

  const getContentDescription = () => {
    switch (activeContent) {
      case 'institucional': return 'Edite as informações da página institucional';
      case 'escolas': return 'Adicione, edite ou remova escolas da rede municipal';
      case 'projetos': return 'Adicione e gerencie projetos educacionais';
      case 'contato': return 'Edite as informações de contato da secretaria';
      default: return 'Gerencie o conteúdo das páginas';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getContentTitle()}</CardTitle>
        <CardDescription>{getContentDescription()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ContentForm activeContent={activeContent} />
        
        <Button onClick={onSave} className="bg-education-primary hover:bg-education-dark">
          {activeContent === 'escolas' ? 'Adicionar Escola' : 
           activeContent === 'projetos' ? 'Salvar Projeto' : 'Salvar Alterações'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContentEditor;
