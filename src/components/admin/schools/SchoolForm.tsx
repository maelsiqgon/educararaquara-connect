
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSchools } from '@/hooks/useSchools';
import { School } from '@/types/school';
import { SchoolBasicInfo, ContactForm } from '@/types/school';
import SchoolBasicInfoForm from './SchoolBasicInfoForm';
import SchoolContactsForm from './SchoolContactsForm';

interface SchoolFormProps {
  school?: School;
  onSuccess: () => void;
  onCancel: () => void;
}

const SchoolForm: React.FC<SchoolFormProps> = ({ school, onSuccess, onCancel }) => {
  const { createSchool, updateSchool } = useSchools();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<SchoolBasicInfo>({
    name: '',
    type: 'EMEI',
    director: '',
    address: '',
    description: '',
    students: 0,
    teachers: 0,
    classes: 0,
    image_url: ''
  });

  const [contacts, setContacts] = useState<ContactForm[]>([
    { type: 'phone', value: '', label: 'Telefone Principal', primary_contact: true }
  ]);

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
        image_url: school.image_url || ''
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      return;
    }

    setLoading(true);
    try {
      if (school) {
        await updateSchool(school.id, formData);
      } else {
        await createSchool(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar escola:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {school ? 'Editar Escola' : 'Nova Escola'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <SchoolBasicInfoForm 
            formData={formData}
            setFormData={setFormData}
          />
          
          <SchoolContactsForm 
            contacts={contacts}
            setContacts={setContacts}
          />

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : (school ? 'Atualizar' : 'Criar')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SchoolForm;
