
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from 'lucide-react';
import { ContactForm } from '@/types/school';

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
        <Label className="text-base font-medium">Contatos</Label>
        <Button type="button" variant="outline" size="sm" onClick={addContact}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Contato
        </Button>
      </div>

      {contacts.map((contact, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`contact-type-${index}`}>Tipo</Label>
              <Select 
                value={contact.type} 
                onValueChange={(value) => updateContact(index, 'type', value)}
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

            <div className="space-y-2">
              <Label htmlFor={`contact-value-${index}`}>Valor</Label>
              <Input
                id={`contact-value-${index}`}
                value={contact.value}
                onChange={(e) => updateContact(index, 'value', e.target.value)}
                placeholder="Digite o contato"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`contact-label-${index}`}>Rótulo</Label>
              <Input
                id={`contact-label-${index}`}
                value={contact.label}
                onChange={(e) => updateContact(index, 'label', e.target.value)}
                placeholder="Ex: Secretaria"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={contact.primary_contact}
                  onCheckedChange={(checked) => updateContact(index, 'primary_contact', checked)}
                />
                <Label>Principal</Label>
              </div>
              
              {contacts.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeContact(index)}
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

export default SchoolContactsForm;
