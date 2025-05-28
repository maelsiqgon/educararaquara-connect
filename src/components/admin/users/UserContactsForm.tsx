
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Trash2, Plus } from "lucide-react";
import { formatPhone } from "@/utils/cpfValidator";

interface UserContact {
  id?: string;
  contact_type: 'phone' | 'mobile' | 'whatsapp' | 'email';
  contact_value: string;
  is_primary: boolean;
}

interface UserContactsFormProps {
  contacts: UserContact[];
  onContactsChange: (contacts: UserContact[]) => void;
}

const UserContactsForm: React.FC<UserContactsFormProps> = ({ contacts, onContactsChange }) => {
  const addContact = () => {
    const newContact: UserContact = {
      contact_type: 'phone',
      contact_value: '',
      is_primary: contacts.length === 0
    };
    onContactsChange([...contacts, newContact]);
  };

  const removeContact = (index: number) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    onContactsChange(newContacts);
  };

  const updateContact = (index: number, field: keyof UserContact, value: any) => {
    const newContacts = [...contacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    
    // Se marcou como principal, desmarcar os outros
    if (field === 'is_primary' && value) {
      newContacts.forEach((contact, i) => {
        if (i !== index) contact.is_primary = false;
      });
    }
    
    onContactsChange(newContacts);
  };

  const contactTypes = [
    { value: 'phone', label: 'Telefone Fixo' },
    { value: 'mobile', label: 'Celular' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'email', label: 'E-mail' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">Contatos</Label>
        <Button type="button" onClick={addContact} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Contato
        </Button>
      </div>
      
      {contacts.map((contact, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label>Tipo de Contato</Label>
              <Select
                value={contact.contact_type}
                onValueChange={(value) => updateContact(index, 'contact_type', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {contactTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Valor do Contato</Label>
              <Input
                value={contact.contact_value}
                onChange={(e) => {
                  let value = e.target.value;
                  // Formatar telefones brasileiros
                  if (['phone', 'mobile', 'whatsapp'].includes(contact.contact_type)) {
                    value = formatPhone(value);
                  }
                  updateContact(index, 'contact_value', value);
                }}
                placeholder={
                  contact.contact_type === 'email' 
                    ? 'email@exemplo.com' 
                    : '(11) 99999-9999'
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={contact.is_primary}
                  onCheckedChange={(checked) => updateContact(index, 'is_primary', checked)}
                />
                <Label className="text-sm">Principal</Label>
              </div>
              
              {contacts.length > 1 && (
                <Button
                  type="button"
                  onClick={() => removeContact(index)}
                  size="sm"
                  variant="ghost"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserContactsForm;
