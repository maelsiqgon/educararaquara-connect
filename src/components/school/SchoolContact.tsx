
import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { School } from '@/hooks/useSchools';

export interface SchoolContactProps {
  school: School;
}

const SchoolContact: React.FC<SchoolContactProps> = ({ school }) => {
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-education-primary mb-4">Contatos</h3>
      
      {school.contacts && school.contacts.length > 0 ? (
        <div className="space-y-3">
          {school.contacts.map((contact) => (
            <div key={contact.id} className="flex items-center space-x-3">
              {getContactIcon(contact.type)}
              <div>
                <div className="font-medium text-gray-700">
                  {contact.label || contact.type}
                </div>
                <div className="text-gray-600">{contact.value}</div>
              </div>
              {contact.primary_contact && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Principal
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Nenhum contato cadastrado.</p>
      )}
    </div>
  );
};

export default SchoolContact;
