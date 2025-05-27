
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import FileUploadComponent from '@/components/admin/FileUploadComponent';
import { useSchools, School, SchoolContact } from '@/hooks/useSchools';
import { useSchoolContacts } from '@/hooks/useSchoolContacts';
import { toast } from 'sonner';
import { Save, Plus, Trash2 } from 'lucide-react';

interface SchoolFormProps {
  school?: School;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const SchoolForm: React.FC<SchoolFormProps> = ({ school, onSuccess, onCancel }) => {
  const { createSchool, updateSchool } = useSchools();
  const { createContact, updateContact, deleteContact } = useSchoolContacts();
  
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

  const [contacts, setContacts] = useState<SchoolContact[]>([]);
  const [newContact, setNewContact] = useState({
    type: 'phone' as 'phone' | 'email' | 'whatsapp' | 'website',
    value: '',
    label: '',
    primary_contact: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setContacts(school.contacts || []);
    }
  }, [school]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (result: { url: string; path: string }) => {
    setFormData(prev => ({
      ...prev,
      image_url: result.url
    }));
  };

  const addContact = async () => {
    if (!newContact.value.trim()) return;

    try {
      if (school?.id) {
        const createdContact = await createContact(school.id, newContact);
        if (createdContact) {
          setContacts(prev => [...prev, createdContact]);
        }
      } else {
        // Para escolas novas, adicionar temporariamente
        const tempContact: SchoolContact = {
          id: Date.now().toString(),
          school_id: '',
          ...newContact,
          created_at: new Date().toISOString()
        };
        setContacts(prev => [...prev, tempContact]);
      }
      
      setNewContact({
        type: 'phone',
        value: '',
        label: '',
        primary_contact: false
      });
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const removeContact = async (contactId: string) => {
    try {
      if (school?.id && !contactId.startsWith('temp_')) {
        await deleteContact(contactId);
      }
      setContacts(prev => prev.filter(c => c.id !== contactId));
    } catch (error) {
      console.error('Error removing contact:', error);
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error('Nome da escola é obrigatório');
      return;
    }

    setIsSubmitting(true);

    try {
      let savedSchool;
      
      if (school?.id) {
        await updateSchool(school.id, formData);
        savedSchool = { ...school, ...formData };
      } else {
        savedSchool = await createSchool(formData);
      }

      // Salvar contatos para escolas novas
      if (savedSchool && !school?.id && contacts.length > 0) {
        for (const contact of contacts) {
          await createContact(savedSchool.id, {
            type: contact.type,
            value: contact.value,
            label: contact.label,
            primary_contact: contact.primary_contact
          });
        }
      }
      
      toast.success(
        school?.id 
          ? 'Escola atualizada com sucesso!' 
          : 'Escola criada com sucesso!'
      );
      onSuccess?.();
    } catch (error) {
      toast.error('Erro ao salvar escola');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getContactTypeLabel = (type: string) => {
    const labels = {
      phone: 'Telefone',
      email: 'E-mail',
      whatsapp: 'WhatsApp',
      website: 'Website'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {school?.id ? 'Editar' : 'Criar'} Escola
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome da Escola *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Nome da escola"
                required
              />
            </div>

            <div>
              <Label htmlFor="type">Tipo de Ensino</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EMEI">EMEI - Educação Infantil</SelectItem>
                  <SelectItem value="EMEF">EMEF - Ensino Fundamental</SelectItem>
                  <SelectItem value="CEMEI">CEMEI - Centro Municipal</SelectItem>
                  <SelectItem value="Creche">Creche</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="director">Diretor(a)</Label>
            <Input
              id="director"
              value={formData.director}
              onChange={(e) => handleInputChange('director', e.target.value)}
              placeholder="Nome do diretor(a)"
            />
          </div>

          <div>
            <Label htmlFor="address">Endereço</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Endereço completo da escola"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descrição da escola, história, missão, etc."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="students">Número de Alunos</Label>
              <Input
                id="students"
                type="number"
                value={formData.students}
                onChange={(e) => handleInputChange('students', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>

            <div>
              <Label htmlFor="teachers">Número de Professores</Label>
              <Input
                id="teachers"
                type="number"
                value={formData.teachers}
                onChange={(e) => handleInputChange('teachers', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>

            <div>
              <Label htmlFor="classes">Número de Turmas</Label>
              <Input
                id="classes"
                type="number"
                value={formData.classes}
                onChange={(e) => handleInputChange('classes', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Imagem da Escola</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUploadComponent
            bucket="school-images"
            folder="schools"
            onUploadSuccess={handleImageUpload}
            accept="image/*"
            label="Imagem da Escola"
            description="Adicione uma foto da escola"
            initialPreview={formData.image_url}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contatos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <Select value={newContact.type} onValueChange={(value) => setNewContact(prev => ({ ...prev, type: value as any }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phone">Telefone</SelectItem>
                <SelectItem value="email">E-mail</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="website">Website</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Valor do contato"
              value={newContact.value}
              onChange={(e) => setNewContact(prev => ({ ...prev, value: e.target.value }))}
            />

            <Input
              placeholder="Rótulo (opcional)"
              value={newContact.label}
              onChange={(e) => setNewContact(prev => ({ ...prev, label: e.target.value }))}
            />

            <Button onClick={addContact} disabled={!newContact.value.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>

          <Separator />

          <div className="space-y-2">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">
                    {getContactTypeLabel(contact.type)}
                  </Badge>
                  <span className="font-medium">{contact.value}</span>
                  {contact.label && (
                    <span className="text-sm text-gray-500">({contact.label})</span>
                  )}
                  {contact.primary_contact && (
                    <Badge variant="default">Principal</Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeContact(contact.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        
        <Button
          type="button"
          onClick={handleSave}
          disabled={isSubmitting}
        >
          <Save className="h-4 w-4 mr-2" />
          {school?.id ? 'Atualizar' : 'Criar'} Escola
        </Button>
      </div>
    </div>
  );
};

export default SchoolForm;
