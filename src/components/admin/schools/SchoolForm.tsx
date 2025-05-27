
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useSchools } from '@/hooks/useSchools';
import { useSchoolContacts, ContactType } from '@/hooks/useSchoolContacts';
import SchoolBasicInfoForm from './SchoolBasicInfoForm';
import SchoolContactsForm from './SchoolContactsForm';

interface SchoolFormData {
  name: string;
  type: 'EMEI' | 'EMEF' | 'CEMEI' | 'Creche';
  director: string;
  address: string;
  description: string;
  students: number;
  teachers: number;
  classes: number;
  image_url: string;
}

interface ContactForm {
  type: ContactType;
  value: string;
  label: string;
  primary_contact: boolean;
}

const SchoolForm = () => {
  const { createSchool, loading } = useSchools();
  const { createContacts } = useSchoolContacts();

  const [formData, setFormData] = useState<SchoolFormData>({
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
    { type: 'phone', value: '', label: 'Secretaria', primary_contact: true }
  ]);

  const [activeTab, setActiveTab] = useState('basic');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Nome da escola é obrigatório');
      return;
    }

    try {
      // Criar escola
      const school = await createSchool(formData);
      
      // Criar contatos se houver
      const validContacts = contacts.filter(contact => contact.value.trim());
      if (validContacts.length > 0) {
        await createContacts(school.id, validContacts);
      }

      toast.success('Escola criada com sucesso!');
      
      // Reset form
      setFormData({
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
      setContacts([
        { type: 'phone', value: '', label: 'Secretaria', primary_contact: true }
      ]);
      setActiveTab('basic');
      
    } catch (error) {
      console.error('Erro ao criar escola:', error);
    }
  };

  const isFormValid = formData.name.trim() !== '';

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary">Nova Escola</CardTitle>
        <CardDescription>
          Adicione uma nova escola à rede municipal de ensino
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
              <TabsTrigger value="contacts">Contatos</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <SchoolBasicInfoForm 
                formData={formData}
                setFormData={setFormData}
              />
            </TabsContent>

            <TabsContent value="contacts" className="space-y-4">
              <SchoolContactsForm 
                contacts={contacts}
                setContacts={setContacts}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
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
                setContacts([
                  { type: 'phone', value: '', label: 'Secretaria', primary_contact: true }
                ]);
                setActiveTab('basic');
              }}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !isFormValid}
              className="bg-education-primary hover:bg-education-dark"
            >
              {loading ? 'Criando...' : 'Criar Escola'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SchoolForm;
