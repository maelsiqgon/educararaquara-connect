
import React from 'react';
import { Phone, Mail, MapPin, Globe, MessageCircle } from 'lucide-react';

export interface SchoolContact {
  id: string;
  type: 'phone' | 'email' | 'website' | 'address' | 'whatsapp' | 'cellphone';
  value: string;
  label?: string;
  primary_contact?: boolean;
}

export interface SchoolContactProps {
  contacts: SchoolContact[];
}

const SchoolContact: React.FC<SchoolContactProps> = ({ contacts }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'phone':
      case 'cellphone':
        return <Phone className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'website':
        return <Globe className="h-4 w-4" />;
      case 'address':
        return <MapPin className="h-4 w-4" />;
      case 'whatsapp':
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'phone':
        return 'Telefone';
      case 'cellphone':
        return 'Celular';
      case 'email':
        return 'E-mail';
      case 'website':
        return 'Site';
      case 'address':
        return 'Endereço';
      case 'whatsapp':
        return 'WhatsApp';
      default:
        return 'Contato';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-education-primary mb-4">Contatos</h3>
      
      <div className="space-y-3">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center space-x-3">
            <div className="text-education-primary">
              {getIcon(contact.type)}
            </div>
            <div>
              <div className="font-medium text-gray-700">
                {contact.label || getTypeLabel(contact.type)}
                {contact.primary_contact && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Principal
                  </span>
                )}
              </div>
              <div className="text-gray-600">{contact.value}</div>
            </div>
          </div>
        ))}
        
        {contacts.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            Nenhum contato cadastrado
          </p>
        )}
      </div>
    </div>
  );
};

export default SchoolContact;
