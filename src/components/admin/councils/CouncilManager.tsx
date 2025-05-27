
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, Calendar, Gavel } from "lucide-react";
import CouncilContent from './CouncilContent';

interface Council {
  id: string;
  name: string;
  description: string;
  type: 'fundeb' | 'cae' | 'other';
}

const CouncilManager = () => {
  const [councils] = useState<Council[]>([
    {
      id: 'fundeb-cacs',
      name: 'FUNDEB-CACS',
      description: 'Conselho de Acompanhamento e Controle Social do FUNDEB',
      type: 'fundeb'
    },
    {
      id: 'cae',
      name: 'CAE',
      description: 'Conselho de Alimentação Escolar',
      type: 'cae'
    },
    {
      id: 'cme',
      name: 'CME',
      description: 'Conselho Municipal de Educação',
      type: 'other'
    }
  ]);

  const [selectedCouncil, setSelectedCouncil] = useState<string>('fundeb-cacs');

  const getCouncilIcon = (type: string) => {
    switch (type) {
      case 'fundeb': return <FileText className="h-5 w-5" />;
      case 'cae': return <Users className="h-5 w-5" />;
      default: return <Gavel className="h-5 w-5" />;
    }
  };

  const getCouncilColor = (type: string) => {
    switch (type) {
      case 'fundeb': return 'bg-blue-100 text-blue-800';
      case 'cae': return 'bg-green-100 text-green-800';
      default: return 'bg-purple-100 text-purple-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-soft">
        <CardHeader className="bg-education-light rounded-t-lg">
          <CardTitle className="text-education-primary flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Gestão de Conselhos
          </CardTitle>
          <CardDescription>
            Gerencie conselhos municipais de educação e programas
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {councils.map((council) => (
              <Card 
                key={council.id} 
                className={`cursor-pointer transition-all border-2 ${
                  selectedCouncil === council.id ? 'border-education-primary bg-education-light' : 'border-gray-200 hover:border-education-primary'
                }`}
                onClick={() => setSelectedCouncil(council.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    {getCouncilIcon(council.type)}
                    <h3 className="font-semibold text-education-primary">{council.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{council.description}</p>
                  <Badge className={getCouncilColor(council.type)}>
                    {council.type === 'fundeb' ? 'FUNDEB' : council.type === 'cae' ? 'Alimentação' : 'Educação'}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedCouncil && (
        <CouncilContent 
          councilId={selectedCouncil} 
          councilName={councils.find(c => c.id === selectedCouncil)?.name || ''} 
        />
      )}
    </div>
  );
};

export default CouncilManager;
