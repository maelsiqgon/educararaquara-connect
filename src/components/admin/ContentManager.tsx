
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import WysiwygEditor from "./WysiwygEditor";
import ImageUploader from "./ImageUploader";

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
          <Tabs value={activeContent} onValueChange={setActiveContent}>
            <TabsList className="bg-white mb-6">
              <TabsTrigger value="institucional">Institucional</TabsTrigger>
              <TabsTrigger value="escolas">Escolas</TabsTrigger>
              <TabsTrigger value="projetos">Projetos</TabsTrigger>
              <TabsTrigger value="contato">Contato</TabsTrigger>
            </TabsList>

            <TabsContent value="institucional" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Página Institucional</CardTitle>
                  <CardDescription>Edite as informações da página institucional</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="inst-title">Título Principal</Label>
                    <Input 
                      id="inst-title" 
                      defaultValue="Secretaria de Educação" 
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="inst-subtitle">Subtítulo</Label>
                    <Input 
                      id="inst-subtitle" 
                      defaultValue="Compromisso com a educação de qualidade em Araraquara" 
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="inst-mission">Missão</Label>
                      <WysiwygEditor
                        initialValue="Promover uma educação de qualidade, inclusiva e transformadora..."
                        onChange={() => {}}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="inst-vision">Visão</Label>
                      <WysiwygEditor
                        initialValue="Ser referência em educação municipal..."
                        onChange={() => {}}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Imagem de Banner</Label>
                    <ImageUploader onImageChange={() => {}} />
                  </div>

                  <Button onClick={handleSave} className="bg-education-primary hover:bg-education-dark">
                    Salvar Alterações
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="escolas" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciamento de Escolas</CardTitle>
                  <CardDescription>Adicione, edite ou remova escolas da rede municipal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="school-name">Nome da Escola</Label>
                      <Input id="school-name" placeholder="Nome da escola" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="school-type">Tipo de Ensino</Label>
                      <select id="school-type" className="w-full p-2 border rounded-md">
                        <option value="">Selecione o tipo</option>
                        <option value="EMEI">Educação Infantil (EMEI)</option>
                        <option value="EMEF">Ensino Fundamental (EMEF)</option>
                        <option value="CEMEI">Centro Municipal (CEMEI)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="school-director">Diretor(a)</Label>
                      <Input id="school-director" placeholder="Nome do diretor" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="school-phone">Telefone</Label>
                      <Input id="school-phone" placeholder="(16) 3333-0000" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="school-address">Endereço</Label>
                    <Input id="school-address" placeholder="Endereço completo" />
                  </div>

                  <div className="space-y-2">
                    <Label>Imagem da Escola</Label>
                    <ImageUploader onImageChange={() => {}} />
                  </div>

                  <Button onClick={handleSave} className="bg-education-primary hover:bg-education-dark">
                    Adicionar Escola
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projetos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciamento de Projetos</CardTitle>
                  <CardDescription>Adicione e gerencie projetos educacionais</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-title">Título do Projeto</Label>
                    <Input id="project-title" placeholder="Nome do projeto" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-description">Descrição</Label>
                    <WysiwygEditor
                      initialValue=""
                      onChange={() => {}}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-status">Status</Label>
                      <select id="project-status" className="w-full p-2 border rounded-md">
                        <option value="Em andamento">Em andamento</option>
                        <option value="Concluído">Concluído</option>
                        <option value="Planejado">Planejado</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="project-progress">Progresso (%)</Label>
                      <Input id="project-progress" type="number" min="0" max="100" placeholder="0" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Imagem do Projeto</Label>
                    <ImageUploader onImageChange={() => {}} />
                  </div>

                  <Button onClick={handleSave} className="bg-education-primary hover:bg-education-dark">
                    Salvar Projeto
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contato" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                  <CardDescription>Edite as informações de contato da secretaria</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-address">Endereço</Label>
                      <Input 
                        id="contact-address" 
                        defaultValue="Av. Vicente Jerônimo Freire, 22"
                        placeholder="Endereço"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">Telefone</Label>
                      <Input 
                        id="contact-phone" 
                        defaultValue="(16) 3301-1900"
                        placeholder="Telefone"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">E-mail</Label>
                      <Input 
                        id="contact-email" 
                        defaultValue="educacao@araraquara.sp.gov.br"
                        placeholder="E-mail"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contact-hours">Horário de Funcionamento</Label>
                      <Input 
                        id="contact-hours" 
                        defaultValue="Segunda a Sexta: 8h às 17h"
                        placeholder="Horário"
                      />
                    </div>
                  </div>

                  <Button onClick={handleSave} className="bg-education-primary hover:bg-education-dark">
                    Salvar Informações
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManager;
