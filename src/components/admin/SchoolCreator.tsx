
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { School, MapPin, Phone, Mail, Users, Calendar } from "lucide-react";
import ImageUploader from './ImageUploader';

interface NewSchool {
  name: string;
  type: string;
  address: string;
  director: string;
  phone: string;
  email: string;
  description: string;
  established: string;
  image?: string;
  features: string[];
  initialUsers: {
    adminName: string;
    adminEmail: string;
    editorName?: string;
    editorEmail?: string;
  };
}

const SchoolCreator = () => {
  const [newSchool, setNewSchool] = useState<NewSchool>({
    name: "",
    type: "",
    address: "",
    director: "",
    phone: "",
    email: "",
    description: "",
    established: "",
    features: [],
    initialUsers: {
      adminName: "",
      adminEmail: "",
      editorName: "",
      editorEmail: ""
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableFeatures = [
    "Laboratório de Informática",
    "Quadra Poliesportiva",
    "Biblioteca",
    "Sala de Ciências",
    "Laboratório de Robótica",
    "Quadra Coberta",
    "Parque Infantil",
    "Brinquedoteca",
    "Horta",
    "Sala Multimídia",
    "Teatro",
    "Sala de Música",
    "Ateliê de Arte",
    "Berçário",
    "Lactário",
    "Horta Pedagógica",
    "Laboratório Sensorial",
    "Espaço Maker",
    "Auditório",
    "Piscina",
    "Quadra Adaptada",
    "Jardim Sensorial"
  ];

  const schoolTypes = [
    { value: "EMEI", label: "Educação Infantil (EMEI)" },
    { value: "EMEF", label: "Ensino Fundamental (EMEF)" },
    { value: "CEMEI", label: "Centro Municipal (CEMEI)" },
    { value: "EMEIEF", label: "Educação Infantil e Fundamental (EMEIEF)" }
  ];

  const handleFeatureToggle = (feature: string) => {
    setNewSchool(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular criação da escola
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Escola criada com sucesso! Usuários administrativos foram configurados e notificados por e-mail.");
      
      // Reset form
      setNewSchool({
        name: "",
        type: "",
        address: "",
        director: "",
        phone: "",
        email: "",
        description: "",
        established: "",
        features: [],
        initialUsers: {
          adminName: "",
          adminEmail: "",
          editorName: "",
          editorEmail: ""
        }
      });
    } catch (error) {
      toast.error("Erro ao criar escola. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary flex items-center">
          <School className="h-5 w-5 mr-2" />
          Cadastrar Nova Escola
        </CardTitle>
        <CardDescription>
          Adicione uma nova escola à rede municipal com configurações completas
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-education-primary">Informações Básicas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="school-name">Nome da Escola *</Label>
                <Input
                  id="school-name"
                  value={newSchool.name}
                  onChange={(e) => setNewSchool({...newSchool, name: e.target.value})}
                  placeholder="Ex: EMEF Exemplo"
                  className="border-gray-300 focus-visible:ring-education-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="school-type">Tipo de Ensino *</Label>
                <Select 
                  value={newSchool.type} 
                  onValueChange={(value) => setNewSchool({...newSchool, type: value})}
                >
                  <SelectTrigger className="border-gray-300 focus-visible:ring-education-primary">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {schoolTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="director-name">Diretor(a) *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="director-name"
                    value={newSchool.director}
                    onChange={(e) => setNewSchool({...newSchool, director: e.target.value})}
                    placeholder="Nome do diretor"
                    className="pl-10 border-gray-300 focus-visible:ring-education-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="established">Ano de Fundação</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="established"
                    value={newSchool.established}
                    onChange={(e) => setNewSchool({...newSchool, established: e.target.value})}
                    placeholder="Ex: 1985"
                    className="pl-10 border-gray-300 focus-visible:ring-education-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-education-primary">Informações de Contato</h3>
            
            <div className="space-y-2">
              <Label htmlFor="school-address">Endereço Completo *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
                <Textarea
                  id="school-address"
                  value={newSchool.address}
                  onChange={(e) => setNewSchool({...newSchool, address: e.target.value})}
                  placeholder="Endereço completo com CEP"
                  className="pl-10 border-gray-300 focus-visible:ring-education-primary"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="school-phone">Telefone *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="school-phone"
                    value={newSchool.phone}
                    onChange={(e) => setNewSchool({...newSchool, phone: e.target.value})}
                    placeholder="(16) 3333-0000"
                    className="pl-10 border-gray-300 focus-visible:ring-education-primary"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="school-email">E-mail Institucional *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="school-email"
                    type="email"
                    value={newSchool.email}
                    onChange={(e) => setNewSchool({...newSchool, email: e.target.value})}
                    placeholder="escola@educ.araraquara.sp.gov.br"
                    className="pl-10 border-gray-300 focus-visible:ring-education-primary"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Descrição e Imagem */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-education-primary">Descrição e Imagem</h3>
            
            <div className="space-y-2">
              <Label htmlFor="school-description">Descrição da Escola</Label>
              <Textarea
                id="school-description"
                value={newSchool.description}
                onChange={(e) => setNewSchool({...newSchool, description: e.target.value})}
                placeholder="Descreva a escola, sua história, missão e diferenciais..."
                className="border-gray-300 focus-visible:ring-education-primary h-24"
              />
            </div>

            <div className="space-y-2">
              <Label>Imagem da Escola</Label>
              <ImageUploader
                initialImage={newSchool.image}
                onImageChange={(image) => setNewSchool({...newSchool, image})}
              />
            </div>
          </div>

          {/* Infraestrutura */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-education-primary">Infraestrutura e Recursos</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableFeatures.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature}
                    checked={newSchool.features.includes(feature)}
                    onCheckedChange={() => handleFeatureToggle(feature)}
                  />
                  <Label 
                    htmlFor={feature} 
                    className="text-sm cursor-pointer"
                  >
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Usuários Administrativos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-education-primary">Usuários Administrativos Iniciais</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="admin-name">Nome do Administrador *</Label>
                <Input
                  id="admin-name"
                  value={newSchool.initialUsers.adminName}
                  onChange={(e) => setNewSchool({
                    ...newSchool, 
                    initialUsers: {...newSchool.initialUsers, adminName: e.target.value}
                  })}
                  placeholder="Nome completo"
                  className="border-gray-300 focus-visible:ring-education-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="admin-email">E-mail do Administrador *</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={newSchool.initialUsers.adminEmail}
                  onChange={(e) => setNewSchool({
                    ...newSchool, 
                    initialUsers: {...newSchool.initialUsers, adminEmail: e.target.value}
                  })}
                  placeholder="admin@escola.com"
                  className="border-gray-300 focus-visible:ring-education-primary"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editor-name">Nome do Editor (Opcional)</Label>
                <Input
                  id="editor-name"
                  value={newSchool.initialUsers.editorName || ""}
                  onChange={(e) => setNewSchool({
                    ...newSchool, 
                    initialUsers: {...newSchool.initialUsers, editorName: e.target.value}
                  })}
                  placeholder="Nome completo"
                  className="border-gray-300 focus-visible:ring-education-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="editor-email">E-mail do Editor (Opcional)</Label>
                <Input
                  id="editor-email"
                  type="email"
                  value={newSchool.initialUsers.editorEmail || ""}
                  onChange={(e) => setNewSchool({
                    ...newSchool, 
                    initialUsers: {...newSchool.initialUsers, editorEmail: e.target.value}
                  })}
                  placeholder="editor@escola.com"
                  className="border-gray-300 focus-visible:ring-education-primary"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-education-primary hover:bg-education-dark"
            >
              {isSubmitting ? "Criando Escola..." : "Criar Escola"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SchoolCreator;
