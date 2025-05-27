
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MessageCircle, Globe } from 'lucide-react';
import { SchoolContact as SchoolContactType } from '@/hooks/useSchools';

interface SchoolContactProps {
  contacts?: SchoolContactType[];
}

const SchoolContact: React.FC<SchoolContactProps> = ({ contacts = [] }) => {
  const getContactIcon = (type: string) => {
    switch (type) {
      case 'phone':
        return Phone;
      case 'email':
        return Mail;
      case 'whatsapp':
        return MessageCircle;
      case 'website':
        return Globe;
      default:
        return Phone;
    }
  };

  const getContactColor = (type: string) => {
    switch (type) {
      case 'phone':
        return 'text-blue-600 bg-blue-100';
      case 'email':
        return 'text-red-600 bg-red-100';
      case 'whatsapp':
        return 'text-green-600 bg-green-100';
      case 'website':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
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

  if (contacts.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-education-primary mb-4">Contatos</h3>
          <p className="text-gray-500">Nenhum contato disponível.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-education-primary mb-4">Contatos</h3>
        <div className="space-y-4">
          {contacts.map((contact) => {
            const Icon = getContactIcon(contact.type);
            return (
              <div key={contact.id} className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${getContactColor(contact.type)}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">
                    {contact.label || getContactTypeLabel(contact.type)}
                  </p>
                  <p className="text-gray-600">{contact.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolContact;
