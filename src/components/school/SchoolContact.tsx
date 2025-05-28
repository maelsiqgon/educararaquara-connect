
import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { SchoolContact } from '@/types/school';

export interface SchoolContactProps {
  school: {
    contacts?: SchoolContact[];
  };
}

const SchoolContactComponent: React.FC<SchoolContactProps> = ({ school }) => {
  const getContactIcon = (type: string) => {
    switch (type) {
      case 'phone':
      case 'cellphone':
        return <Phone className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'whatsapp':
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
  };

  const getContactLabel = (type: string) => {
    switch (type) {
      case 'phone':
        return 'Telefone';
      case 'cellphone':
        return 'Celular';
      case 'email':
        return 'E-mail';
      case 'whatsapp':
        return 'WhatsApp';
      default:
        return 'Contato';
    }
  };

  if (!school.contacts || school.contacts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-education-primary mb-4">Contatos</h3>
      
      <div className="space-y-3">
        {school.contacts.map((contact) => (
          <div key={contact.id} className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-education-light rounded-full mr-3">
              {getContactIcon(contact.type)}
            </div>
            <div>
              <div className="font-medium text-gray-700">
                {contact.label || getContactLabel(contact.type)}
                {contact.primary_contact && (
                  <span className="ml-2 text-xs bg-education-primary text-white px-2 py-1 rounded">
                    Principal
                  </span>
                )}
              </div>
              <div className="text-gray-600">{contact.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolContactComponent;
