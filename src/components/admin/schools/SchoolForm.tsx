import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, Upload } from "lucide-react";
import { School, useSchools } from '@/hooks/useSchools';
import { useSchoolContacts, ContactType } from '@/hooks/useSchoolContacts';
import { useMediaLibrary } from '@/hooks/useMediaLibrary';

interface SchoolFormProps {
  school?: School;
  onSave?: (school: School) => void;
  onCancel?: () => void;
}

interface ContactForm {
  type: ContactType;
  value: string;
  label: string;
  primary_contact: boolean;
}

const SchoolForm: React.FC<SchoolFormProps> = ({ school, onSave, onCancel }) => {
  const { createSchool, updateSchool } = useSchools();
  const { createContacts } = useSchoolContacts();
  const { uploadFile } = useMediaLibrary();
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'EMEF' as 'EMEI' | 'EMEF' | 'CEMEI' | 'Creche',
    address: '',
    director: '',
    description: '',
    image_url: '',
    students: 0,
    teachers: 0,
    classes: 0,
    active: true
  });

  const [contacts, setContacts] = useState<ContactForm[]>([
    { type: 'phone', value: '', label: 'Telefone Principal', primary_contact: true }
  ]);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (school) {
      setFormData({
        name: school.name,
        type: school.type,
        address: school.address || '',
        director: school.director || '',
        description: school.description || '',
        image_url: school.image_url || '',
        students: school.students,
        teachers: school.teachers,
        classes: school.classes,
        active: school.active
      });

      if (school.contacts && school.contacts.length > 0) {
        setContacts(school.contacts.map(contact => ({
          type: contact.type,
          value: contact.value,
          label: contact.label || '',
          primary_contact: contact.primary_contact
        })));
      }
    }
  }, [school]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addContact = () => {
    setContacts(prev => [...prev, {
      type: 'email',
      value: '',
      label: '',
      primary_contact: false
    }]);
  };

  const updateContact = (index: number, field: keyof ContactForm, value: any) => {
    setContacts(prev => prev.map((contact, i) => 
      i === index ? { ...contact, [field]: value } : contact
    ));
  };

  const removeContact = (index: number) => {
    setContacts(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const uploadedFile = await uploadFile(file, 'school-images', {
        alt_text: `Imagem da escola ${formData.name}`,
        description: `Foto da ${formData.name}`
      });

      if (uploadedFile) {
        handleInputChange('image_url', uploadedFile.file_path);
        toast.success('Imagem enviada com sucesso!');
      }
    } catch (error) {
      toast.error('Erro ao enviar imagem');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Nome da escola é obrigatório');
      return;
    }

    try {
      setSaving(true);
      
      let savedSchool: School;
      
      if (school) {
        await updateSchool(school.id, formData);
        savedSchool = { ...school, ...formData };
      } else {
        savedSchool = await createSchool(formData);
      }

      // Create contacts if not editing or if contacts changed
      if (contacts.length > 0 && savedSchool) {
        const validContacts = contacts.filter(contact => 
          contact.value.trim() && contact.type
        );

        if (validContacts.length > 0) {
          await createContacts(savedSchool.id, validContacts);
        }
      }

      toast.success(school ? 'Escola atualizada com sucesso!' : 'Escola criada com sucesso!');
      onSave?.(savedSchool);
    } catch (error) {
      console.error('Error saving school:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary">
          {school ? 'Editar Escola' : 'Nova Escola'}
        </CardTitle>
        <CardDescription>
          {school ? 'Modifique as informações da escola' : 'Adicione uma nova escola à rede municipal'}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="school-name">Nome da Escola *</Label>
              <Input
                id="school-name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="border-gray-300 focus-visible:ring-education-primary"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="school-type">Tipo de Escola</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleInputChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue />
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

          <div className="space-y-2">
            <Label htmlFor="school-address">Endereço</Label>
            <Input
              id="school-address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="border-gray-300 focus-visible:ring-education-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="school-director">Diretor(a)</Label>
            <Input
              id="school-director"
              value={formData.director}
              onChange={(e) => handleInputChange('director', e.target.value)}
              className="border-gray-300 focus-visible:ring-education-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="school-description">Descrição</Label>
            <Textarea
              id="school-description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="border-gray-300 focus-visible:ring-education-primary h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="school-students">Número de Alunos</Label>
              <Input
                id="school-students"
                type="number"
                value={formData.students}
                onChange={(e) => handleInputChange('students', parseInt(e.target.value) || 0)}
                className="border-gray-300 focus-visible:ring-education-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="school-teachers">Número de Professores</Label>
              <Input
                id="school-teachers"
                type="number"
                value={formData.teachers}
                onChange={(e) => handleInputChange('teachers', parseInt(e.target.value) || 0)}
                className="border-gray-300 focus-visible:ring-education-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="school-classes">Número de Turmas</Label>
              <Input
                id="school-classes"
                type="number"
                value={formData.classes}
                onChange={(e) => handleInputChange('classes', parseInt(e.target.value) || 0)}
                className="border-gray-300 focus-visible:ring-education-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Imagem da Escola</Label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border-gray-300 focus-visible:ring-education-primary"
              />
              <Button type="button" disabled={uploading} variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? 'Enviando...' : 'Enviar'}
              </Button>
            </div>
            {formData.image_url && (
              <div className="mt-2">
                <img 
                  src={formData.image_url} 
                  alt="Preview" 
                  className="h-32 w-32 object-cover rounded border"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">Contatos</Label>
              <Button type="button" variant="outline" onClick={addContact}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Contato
              </Button>
            </div>
            
            {contacts.map((contact, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-2 p-4 border rounded">
                <div>
                  <Select 
                    value={contact.type} 
                    onValueChange={(value: ContactType) => updateContact(index, 'type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phone">Telefone</SelectItem>
                      <SelectItem value="email">E-mail</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="cellphone">Celular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Input
                    placeholder="Valor do contato"
                    value={contact.value}
                    onChange={(e) => updateContact(index, 'value', e.target.value)}
                  />
                </div>
                
                <div>
                  <Input
                    placeholder="Rótulo (opcional)"
                    value={contact.label}
                    onChange={(e) => updateContact(index, 'label', e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={contact.primary_contact}
                    onChange={(e) => updateContact(index, 'primary_contact', e.target.checked)}
                  />
                  <Label className="text-sm">Principal</Label>
                </div>
                
                <div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeContact(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={saving}
              className="bg-education-primary hover:bg-education-dark"
            >
              {saving ? 'Salvando...' : school ? 'Atualizar' : 'Criar'} Escola
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SchoolForm;
