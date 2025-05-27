
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
import { Plus, Trash2, Phone, Mail, MessageCircle, MapPin } from 'lucide-react';

interface SchoolFormProps {
  school?: School;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const SchoolForm: React.FC<SchoolFormProps> = ({ school, onSuccess, onCancel }) => {
  const { createSchool, updateSchool } = useSchools();
  const { createContact, updateContact, deleteContact, getSchoolContacts } = useSchoolContacts();
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'EMEF' as const,
    director: '',
    address: '',
    description: '',
    students: 0,
    teachers: 0,
    classes: 0,
    image_url: '',
    active: true
  });

  const [contacts, setContacts] = useState<SchoolContact[]>([]);
  const [newContact, setNewContact] = useState({
    type: 'phone' as const,
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
        director: school.director || '',
        address: school.address || '',
        description: school.description || '',
        students: school.students,
        teachers: school.teachers,
        classes: school.classes,
        image_url: school.image_url || '',
        active: school.active
      });
      
      if (school.contacts) {
        setContacts(school.contacts);
      }
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
    if (!newContact.value.trim()) {
      toast.error('Preencha o valor do contato');
      return;
    }

    if (school?.id) {
      const result = await createContact(school.id, newContact);
      if (result) {
        setContacts(prev => [...prev, result]);
        setNewContact({
          type: 'phone',
          value: '',
          label: '',
          primary_contact: false
        });
      }
    } else {
      // Para escolas novas, adiciona temporariamente
      const tempContact: SchoolContact = {
        id: Date.now().toString(),
        school_id: '',
        ...newContact
      };
      setContacts(prev => [...prev, tempContact]);
      setNewContact({
        type: 'phone',
        value: '',
        label: '',
        primary_contact: false
      });
    }
  };

  const removeContact = async (contactId: string) => {
    if (school?.id && !contactId.startsWith('temp_')) {
      const success = await deleteContact(contactId);
      if (success) {
        setContacts(prev => prev.filter(c => c.id !== contactId));
      }
    } else {
      setContacts(prev => prev.filter(c => c.id !== contactId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (school?.id) {
        // Atualizar escola existente
        await updateSchool(school.id, formData);
      } else {
        // Criar nova escola
        const newSchool = await createSchool(formData);
        
        // Adicionar contatos se houver
        if (newSchool && contacts.length > 0) {
          for (const contact of contacts) {
            await createContact(newSchool.id, {
              type: contact.type,
              value: contact.value,
              label: contact.label,
              primary_contact: contact.primary_contact
            });
          }
        }
      }
      
      toast.success(school ? 'Escola atualizada com sucesso!' : 'Escola criada com sucesso!');
      onSuccess?.();
    } catch (error) {
      toast.error('Erro ao salvar escola');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'phone':
      case 'cellphone':
        return <Phone className="h-4 w-4" />;
      case 'whatsapp':
        return <MessageCircle className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Ex: EMEF Prof. João Silva"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="type">Tipo de Ensino *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EMEI">Educação Infantil (EMEI)</SelectItem>
                  <SelectItem value="EMEF">Ensino Fundamental (EMEF)</SelectItem>
                  <SelectItem value="CEMEI">Centro Municipal (CEMEI)</SelectItem>
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
              placeholder="Nome do diretor"
            />
          </div>

          <div>
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Endereço completo"
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descrição da escola"
              rows={3}
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
          {/* Lista de contatos existentes */}
          {contacts.length > 0 && (
            <div className="space-y-2">
              {contacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center space-x-3">
                    {getContactIcon(contact.type)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{contact.value}</span>
                        {contact.primary_contact && (
                          <Badge variant="secondary" className="text-xs">Principal</Badge>
                        )}
                      </div>
                      {contact.label && (
                        <span className="text-sm text-gray-500">{contact.label}</span>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
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
          )}

          <Separator />

          {/* Adicionar novo contato */}
          <div className="space-y-3">
            <h4 className="font-medium">Adicionar Contato</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Select
                value={newContact.type}
                onValueChange={(value: any) => setNewContact(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">Telefone</SelectItem>
                  <SelectItem value="cellphone">Celular</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Valor do contato"
                value={newContact.value}
                onChange={(e) => setNewContact(prev => ({ ...prev, value: e.target.value }))}
              />

              <Input
                placeholder="Descrição (opcional)"
                value={newContact.label}
                onChange={(e) => setNewContact(prev => ({ ...prev, label: e.target.value }))}
              />

              <Button type="button" onClick={addContact} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : school ? 'Atualizar' : 'Criar'} Escola
        </Button>
      </div>
    </form>
  );
};

export default SchoolForm;
