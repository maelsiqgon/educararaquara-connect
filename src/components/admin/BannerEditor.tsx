
import React from 'react';
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import WysiwygEditor from "./WysiwygEditor";
import ImageUploader from "./ImageUploader";

const BannerEditor = () => {
  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary">Editar Banner Principal</CardTitle>
        <CardDescription>
          Personalize o banner da página inicial
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="banner-title">Título</Label>
          <Input 
            id="banner-title" 
            defaultValue="Secretaria Municipal da Educação de Araraquara" 
            className="border-gray-300 focus-visible:ring-education-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="banner-subtitle">Subtítulo</Label>
          <Input 
            id="banner-subtitle" 
            defaultValue="Portal Educacional" 
            className="border-gray-300 focus-visible:ring-education-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="banner-description">Descrição</Label>
          <WysiwygEditor
            initialValue="Um ambiente digital integrado para alunos, professores, responsáveis e gestores educacionais da rede municipal de ensino."
          />
        </div>
        <div className="space-y-2">
          <Label>Imagem de Fundo</Label>
          <ImageUploader 
            initialImage="https://www.araraquara.sp.gov.br/imagens/WhatsApp-Image-2023-05-04-at-17.52.05.jpeg/@@images/image" 
          />
          <p className="text-xs text-gray-500 mt-1">Tamanho recomendado: 1920x1080px</p>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="stat-1-number">Estatística 1 - Número</Label>
            <Input 
              id="stat-1-number" 
              defaultValue="70+" 
              className="border-gray-300 focus-visible:ring-education-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stat-1-label">Estatística 1 - Label</Label>
            <Input 
              id="stat-1-label" 
              defaultValue="Escolas" 
              className="border-gray-300 focus-visible:ring-education-primary"
            />
          </div>
          <div className="flex items-end">
            <div className="flex items-center space-x-2">
              <Switch id="stat-1-active" defaultChecked />
              <Label htmlFor="stat-1-active">Ativo</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stat-2-number">Estatística 2 - Número</Label>
            <Input 
              id="stat-2-number" 
              defaultValue="2.500+" 
              className="border-gray-300 focus-visible:ring-education-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stat-2-label">Estatística 2 - Label</Label>
            <Input 
              id="stat-2-label" 
              defaultValue="Professores" 
              className="border-gray-300 focus-visible:ring-education-primary"
            />
          </div>
          <div className="flex items-end">
            <div className="flex items-center space-x-2">
              <Switch id="stat-2-active" defaultChecked />
              <Label htmlFor="stat-2-active">Ativo</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stat-3-number">Estatística 3 - Número</Label>
            <Input 
              id="stat-3-number" 
              defaultValue="30.000+" 
              className="border-gray-300 focus-visible:ring-education-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stat-3-label">Estatística 3 - Label</Label>
            <Input 
              id="stat-3-label" 
              defaultValue="Alunos" 
              className="border-gray-300 focus-visible:ring-education-primary"
            />
          </div>
          <div className="flex items-end">
            <div className="flex items-center space-x-2">
              <Switch id="stat-3-active" defaultChecked />
              <Label htmlFor="stat-3-active">Ativo</Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end w-full">
          <Button 
            className="bg-education-primary hover:bg-education-dark"
            onClick={() => toast.success("Banner atualizado com sucesso!")}
          >
            Salvar Alterações
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BannerEditor;
