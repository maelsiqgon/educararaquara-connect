import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SchoolBasicInfo } from '@/types/school';
import ImageUploader from '../ImageUploader';

interface SchoolBasicInfoFormProps {
  formData: SchoolBasicInfo;
  setFormData: (data: SchoolBasicInfo) => void;
}

const SchoolBasicInfoForm: React.FC<SchoolBasicInfoFormProps> = ({ formData, setFormData }) => {
  const updateField = (field: keyof SchoolBasicInfo, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="school-name">Nome da Escola *</Label>
          <Input
            id="school-name"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Digite o nome da escola"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="school-type">Tipo *</Label>
          <Select value={formData.type} onValueChange={(value) => updateField('type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EMEI">EMEI - Escola Municipal de Educação Infantil</SelectItem>
              <SelectItem value="EMEF">EMEF - Escola Municipal de Ensino Fundamental</SelectItem>
              <SelectItem value="CEMEI">CEMEI - Centro Municipal de Educação Infantil</SelectItem>
              <SelectItem value="Creche">Creche Municipal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="school-director">Diretor(a)</Label>
          <Input
            id="school-director"
            value={formData.director}
            onChange={(e) => updateField('director', e.target.value)}
            placeholder="Nome do diretor"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="school-address">Endereço</Label>
          <Input
            id="school-address"
            value={formData.address}
            onChange={(e) => updateField('address', e.target.value)}
            placeholder="Endereço completo"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="school-description">Descrição</Label>
        <Textarea
          id="school-description"
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Descrição da escola..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="school-students">Número de Alunos</Label>
          <Input
            id="school-students"
            type="number"
            value={formData.students}
            onChange={(e) => updateField('students', parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="school-teachers">Número de Professores</Label>
          <Input
            id="school-teachers"
            type="number"
            value={formData.teachers}
            onChange={(e) => updateField('teachers', parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="school-classes">Número de Salas</Label>
          <Input
            id="school-classes"
            type="number"
            value={formData.classes}
            onChange={(e) => updateField('classes', parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Imagem da Escola</Label>
        <ImageUploader
          initialImage={formData.image_url}
          onImageChange={(url) => updateField('image_url', url)}
        />
      </div>
    </div>
  );
};

export default SchoolBasicInfoForm;
