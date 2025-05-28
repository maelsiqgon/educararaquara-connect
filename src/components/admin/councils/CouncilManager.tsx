
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Settings, FileText, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import CouncilContent from "./CouncilContent";

interface Council {
  id: string;
  name: string;
  description: string;
  active: boolean;
  sections: string[];
  created_at: string;
}

interface CouncilSection {
  id: string;
  name: string;
  label: string;
  icon: string;
  order: number;
}

const defaultSections: CouncilSection[] = [
  { id: 'presentation', name: 'presentation', label: 'Apresentação', icon: 'FileText', order: 1 },
  { id: 'minutes', name: 'minutes', label: 'Atas', icon: 'FileText', order: 2 },
  { id: 'meetings', name: 'meetings', label: 'Convocações', icon: 'Users', order: 3 },
  { id: 'edicts', name: 'edicts', label: 'Editais', icon: 'FileText', order: 4 },
  { id: 'attributions', name: 'attributions', label: 'Atribuições', icon: 'Users', order: 5 },
  { id: 'composition', name: 'composition', label: 'Composição', icon: 'Users', order: 6 },
  { id: 'contacts', name: 'contacts', label: 'Contatos', icon: 'Users', order: 7 },
  { id: 'legislation', name: 'legislation', label: 'Legislação', icon: 'FileText', order: 8 },
  { id: 'reports', name: 'reports', label: 'Relatórios', icon: 'FileText', order: 9 },
  { id: 'finances', name: 'finances', label: 'Receitas', icon: 'DollarSign', order: 10 }
];

const CouncilManager: React.FC = () => {
  const [councils, setCouncils] = useState<Council[]>([
    {
      id: '1',
      name: 'Conselho de Alimentação Escolar',
      description: 'Órgão responsável pelo acompanhamento e fiscalização da alimentação escolar',
      active: true,
      sections: ['presentation', 'minutes', 'meetings', 'finances'],
      created_at: '2025-01-01'
    },
    {
      id: '2',
      name: 'Conselho do FUNDEB',
      description: 'Controle social dos recursos do Fundo de Desenvolvimento da Educação Básica',
      active: true,
      sections: ['presentation', 'minutes', 'meetings', 'finances', 'reports'],
      created_at: '2025-01-01'
    }
  ]);

  const [customSections, setCustomSections] = useState<CouncilSection[]>([]);
  const [selectedCouncil, setSelectedCouncil] = useState<Council | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showSectionDialog, setShowSectionDialog] = useState(false);
  const [editingCouncil, setEditingCouncil] = useState<Council | null>(null);
  const [newCouncilData, setNewCouncilData] = useState({
    name: '',
    description: '',
    sections: [] as string[]
  });
  const [newSectionData, setNewSectionData] = useState({
    name: '',
    label: '',
    icon: 'FileText'
  });

  const handleCreateCouncil = () => {
    if (!newCouncilData.name.trim()) {
      toast.error('Nome do conselho é obrigatório');
      return;
    }

    const newCouncil: Council = {
      id: Date.now().toString(),
      name: newCouncilData.name,
      description: newCouncilData.description,
      active: true,
      sections: newCouncilData.sections,
      created_at: new Date().toISOString()
    };

    setCouncils([...councils, newCouncil]);
    setNewCouncilData({ name: '', description: '', sections: [] });
    setShowCreateDialog(false);
    toast.success('Conselho criado com sucesso!');
  };

  const handleCreateSection = () => {
    if (!newSectionData.name.trim() || !newSectionData.label.trim()) {
      toast.error('Nome e rótulo da seção são obrigatórios');
      return;
    }

    const newSection: CouncilSection = {
      id: newSectionData.name.toLowerCase().replace(/\s+/g, '_'),
      name: newSectionData.name.toLowerCase().replace(/\s+/g, '_'),
      label: newSectionData.label,
      icon: newSectionData.icon,
      order: defaultSections.length + customSections.length + 1
    };

    setCustomSections([...customSections, newSection]);
    setNewSectionData({ name: '', label: '', icon: 'FileText' });
    setShowSectionDialog(false);
    toast.success('Seção criada com sucesso!');
  };

  const handleDeleteCouncil = (councilId: string) => {
    setCouncils(councils.filter(c => c.id !== councilId));
    toast.success('Conselho removido com sucesso!');
  };

  const allSections = [...defaultSections, ...customSections];

  if (selectedCouncil) {
    return (
      <div>
        <div className="mb-4">
          <Button 
            variant="outline" 
            onClick={() => setSelectedCouncil(null)}
            className="mb-4"
          >
            ← Voltar aos Conselhos
          </Button>
        </div>
        <CouncilContent 
          councilId={selectedCouncil.id} 
          councilName={selectedCouncil.name}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Gestão de Conselhos</CardTitle>
              <CardDescription>
                Gerencie todos os conselhos municipais e suas funcionalidades
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setShowSectionDialog(true)} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Nova Seção
              </Button>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Conselho
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {councils.map((council) => (
              <Card key={council.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{council.name}</CardTitle>
                    <Badge variant={council.active ? "default" : "secondary"}>
                      {council.active ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  <CardDescription>{council.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Seções ativas:</p>
                      <div className="flex flex-wrap gap-1">
                        {council.sections.map((sectionId) => {
                          const section = allSections.find(s => s.name === sectionId);
                          return section ? (
                            <Badge key={sectionId} variant="outline" className="text-xs">
                              {section.label}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button 
                        size="sm" 
                        onClick={() => setSelectedCouncil(council)}
                        className="flex-1"
                      >
                        <Settings className="h-4 w-4 mr-1" />
                        Gerenciar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setEditingCouncil(council)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteCouncil(council.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seções Disponíveis */}
      <Card>
        <CardHeader>
          <CardTitle>Seções Disponíveis</CardTitle>
          <CardDescription>
            Seções que podem ser ativadas nos conselhos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {allSections.map((section) => (
              <div key={section.id} className="border rounded-lg p-3 text-center">
                <FileText className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                <p className="text-sm font-medium">{section.label}</p>
                {customSections.find(s => s.id === section.id) && (
                  <Badge variant="secondary" className="mt-1 text-xs">
                    Personalizada
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog para criar conselho */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Criar Novo Conselho</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="council-name">Nome do Conselho</Label>
              <Input
                id="council-name"
                value={newCouncilData.name}
                onChange={(e) => setNewCouncilData({...newCouncilData, name: e.target.value})}
                placeholder="Ex: Conselho Municipal de Educação"
              />
            </div>
            <div>
              <Label htmlFor="council-description">Descrição</Label>
              <Textarea
                id="council-description"
                value={newCouncilData.description}
                onChange={(e) => setNewCouncilData({...newCouncilData, description: e.target.value})}
                placeholder="Breve descrição sobre o conselho..."
              />
            </div>
            <div>
              <Label>Seções Iniciais</Label>
              <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
                {allSections.map((section) => (
                  <label key={section.id} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={newCouncilData.sections.includes(section.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewCouncilData({
                            ...newCouncilData,
                            sections: [...newCouncilData.sections, section.name]
                          });
                        } else {
                          setNewCouncilData({
                            ...newCouncilData,
                            sections: newCouncilData.sections.filter(s => s !== section.name)
                          });
                        }
                      }}
                      className="rounded"
                    />
                    <span>{section.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateCouncil}>
              Criar Conselho
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para criar seção */}
      <Dialog open={showSectionDialog} onOpenChange={setShowSectionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Nova Seção</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="section-name">Nome da Seção</Label>
              <Input
                id="section-name"
                value={newSectionData.name}
                onChange={(e) => setNewSectionData({...newSectionData, name: e.target.value})}
                placeholder="Ex: documentos-oficiais"
              />
            </div>
            <div>
              <Label htmlFor="section-label">Rótulo de Exibição</Label>
              <Input
                id="section-label"
                value={newSectionData.label}
                onChange={(e) => setNewSectionData({...newSectionData, label: e.target.value})}
                placeholder="Ex: Documentos Oficiais"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSectionDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateSection}>
              Criar Seção
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CouncilManager;
