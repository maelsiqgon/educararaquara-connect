
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { ContactType } from '@/hooks/useSchoolContacts';

interface ContactForm {
  type: ContactType;
  value: string;
  label: string;
  primary_contact: boolean;
}

interface SchoolContactsFormProps {
  contacts: ContactForm[];
  setContacts: (contacts: ContactForm[]) => void;
}

const SchoolContactsForm: React.FC<SchoolContactsFormProps> = ({ contacts, setContacts }) => {
  const addContact = () => {
    setContacts([
      ...contacts,
      { type: 'phone', value: '', label: '', primary_contact: false }
    ]);
  };

  const removeContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const updateContact = (index: number, field: keyof ContactForm, value: any) => {
    const updatedContacts = contacts.map((contact, i) => 
      i === index ? { ...contact, [field]: value } : contact
    );
    setContacts(updatedContacts);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium">Contatos</Label>
        <Button type="button" variant="outline" size="sm" onClick={addContact}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Contato
        </Button>
      </div>
      
      {contacts.map((contact, index) => (
        <div key={index} className="border p-4 rounded-lg space-y-3">
          <div className="flex justify-between items-start">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
              <div>
                <Label htmlFor={`contact-type-${index}`}>Tipo</Label>
                <Select 
                  value={contact.type} 
                  onValueChange={(value) => updateContact(index, 'type', value as ContactType)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Telefone</SelectItem>
                    <SelectItem value="cellphone">Celular</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="email">E-mail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor={`contact-value-${index}`}>Valor</Label>
                <Input
                  id={`contact-value-${index}`}
                  value={contact.value}
                  onChange={(e) => updateContact(index, 'value', e.target.value)}
                  placeholder={contact.type === 'email' ? 'email@exemplo.com' : '(00) 00000-0000'}
                />
              </div>
              
              <div>
                <Label htmlFor={`contact-label-${index}`}>Descrição</Label>
                <Input
                  id={`contact-label-${index}`}
                  value={contact.label}
                  onChange={(e) => updateContact(index, 'label', e.target.value)}
                  placeholder="Ex: Secretaria, Direção..."
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <input
                type="checkbox"
                checked={contact.primary_contact}
                onChange={(e) => updateContact(index, 'primary_contact', e.target.checked)}
                className="rounded"
              />
              <Label className="text-sm">Principal</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeContact(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
      
      {contacts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Nenhum contato adicionado</p>
          <Button type="button" variant="outline" className="mt-2" onClick={addContact}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Primeiro Contato
          </Button>
        </div>
      )}
    </div>
  );
};

export default SchoolContactsForm;
