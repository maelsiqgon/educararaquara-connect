
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import WysiwygEditor from "../WysiwygEditor";
import { FileText, Upload, Plus, Edit, Trash2, Download, Users, DollarSign } from "lucide-react";

interface CouncilContentProps {
  councilId: string;
  councilName: string;
}

const CouncilContent: React.FC<CouncilContentProps> = ({ councilId, councilName }) => {
  const [activeTab, setActiveTab] = useState("presentation");

  const handleSave = () => {
    toast.success("Conteúdo salvo com sucesso!");
  };

  const handleFileUpload = () => {
    toast.success("Arquivo enviado com sucesso!");
  };

  const tabs = [
    { id: "presentation", label: "Apresentação", icon: <FileText className="h-4 w-4" /> },
    { id: "minutes", label: "Atas", icon: <FileText className="h-4 w-4" /> },
    { id: "meetings", label: "Convocações", icon: <Users className="h-4 w-4" /> },
    { id: "edicts", label: "Editais", icon: <FileText className="h-4 w-4" /> },
    { id: "attributions", label: "Atribuições", icon: <Users className="h-4 w-4" /> },
    { id: "composition", label: "Composição", icon: <Users className="h-4 w-4" /> },
    { id: "contacts", label: "Contatos", icon: <Users className="h-4 w-4" /> },
    { id: "legislation", label: "Legislação", icon: <FileText className="h-4 w-4" /> },
    { id: "reports", label: "Relatórios", icon: <FileText className="h-4 w-4" /> },
    { id: "finances", label: "Receitas", icon: <DollarSign className="h-4 w-4" /> }
  ];

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary">
          Gestão de Conteúdo - {councilName}
        </CardTitle>
        <CardDescription>
          Gerencie todo o conteúdo e documentação do conselho
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white mb-6 flex-wrap h-auto">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="data-[state=active]:bg-education-light data-[state=active]:text-education-primary">
                <div className="flex items-center gap-2">
                  {tab.icon}
                  {tab.label}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="presentation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Apresentação do Conselho</CardTitle>
                <CardDescription>Edite as informações de apresentação</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="council-description">Descrição</Label>
                  <WysiwygEditor
                    initialValue={`O ${councilName} é um órgão de natureza consultiva e fiscalizadora...`}
                    onChange={() => {}}
                  />
                </div>
                <Button onClick={handleSave} className="bg-education-primary hover:bg-education-dark">
                  Salvar Apresentação
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="minutes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Atas por Ano</CardTitle>
                <CardDescription>Gerencie as atas das reuniões organizadas por ano</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Atas Disponíveis</h3>
                  <Button className="bg-education-primary hover:bg-education-dark">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Ata
                  </Button>
                </div>
                
                {[2025, 2024, 2023].map((year) => (
                  <Card key={year} className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{year}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          { id: 1, title: `Ata da Reunião Ordinária 001/${year}`, date: "15/01" },
                          { id: 2, title: `Ata da Reunião Ordinária 002/${year}`, date: "15/02" },
                          { id: 3, title: `Ata da Reunião Extraordinária 001/${year}`, date: "28/02" }
                        ].map((minute) => (
                          <div key={minute.id} className="flex justify-between items-center p-2 border rounded">
                            <div>
                              <p className="font-medium">{minute.title}</p>
                              <p className="text-sm text-gray-500">{minute.date}/{year}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meetings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Convocações de Reunião</CardTitle>
                <CardDescription>Gerencie convocações ordinárias e extraordinárias</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-blue-200">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="text-blue-800">Reuniões Ordinárias</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        {["Convocação 001/2025", "Convocação 002/2025", "Convocação 003/2025"].map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center p-2 border rounded">
                            <span>{item}</span>
                            <div className="flex space-x-1">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Nova Convocação Ordinária
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200">
                    <CardHeader className="bg-orange-50">
                      <CardTitle className="text-orange-800">Reuniões Extraordinárias</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        {["Convocação Ext. 001/2025", "Convocação Ext. 002/2025"].map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center p-2 border rounded">
                            <span>{item}</span>
                            <div className="flex space-x-1">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Nova Convocação Extraordinária
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="composition" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Composição dos Membros</CardTitle>
                <CardDescription>Gerencie a composição do conselho por anos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[2025, 2024, 2023].map((year) => (
                  <Card key={year} className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Composição {year}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Presidente</h4>
                          <p>Maria Silva Santos</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Vice-Presidente</h4>
                          <p>João Carlos Oliveira</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Secretário</h4>
                          <p>Ana Paula Costa</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Conselheiros</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Pedro Henrique Lima</li>
                            <li>• Carla Fernanda Silva</li>
                            <li>• Roberto Carlos Souza</li>
                          </ul>
                        </div>
                      </div>
                      <Button className="mt-4 bg-education-primary hover:bg-education-dark">
                        <Edit className="h-4 w-4 mr-2" />
                        Editar Composição
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finances" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Receitas por Ano e Mês</CardTitle>
                <CardDescription>Gerencie os valores das receitas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[2025, 2024].map((year) => (
                  <Card key={year} className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Receitas {year}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto"].map((month, idx) => (
                          <div key={month} className="border rounded p-3">
                            <h5 className="font-medium text-sm">{month}</h5>
                            <p className="text-lg font-bold text-green-600">
                              R$ {(150000 + idx * 5000).toLocaleString('pt-BR')}
                            </p>
                          </div>
                        ))}
                      </div>
                      <Button className="mt-4 bg-education-primary hover:bg-education-dark">
                        <Edit className="h-4 w-4 mr-2" />
                        Editar Receitas
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Outras abas seguem o mesmo padrão */}
          {tabs.slice(3, 9).map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{tab.label}</CardTitle>
                  <CardDescription>Gerencie o conteúdo de {tab.label.toLowerCase()}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Conteúdo</Label>
                    <WysiwygEditor
                      initialValue={`Conteúdo de ${tab.label}...`}
                      onChange={() => {}}
                    />
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Documentos Anexos</h4>
                    <div className="space-y-2">
                      <Button variant="outline" onClick={handleFileUpload}>
                        <Upload className="h-4 w-4 mr-2" />
                        Enviar Arquivo
                      </Button>
                    </div>
                  </div>
                  
                  <Button onClick={handleSave} className="bg-education-primary hover:bg-education-dark">
                    Salvar {tab.label}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CouncilContent;
