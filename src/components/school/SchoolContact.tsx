
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { School } from '@/hooks/useSchools';

interface SchoolContactProps {
  school: School;
}

const SchoolContact: React.FC<SchoolContactProps> = ({ school }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações de Contato</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {school.director && (
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-3 text-gray-500" />
              <div>
                <div className="font-medium">Diretor(a)</div>
                <div className="text-sm text-gray-600">{school.director}</div>
              </div>
            </div>
          )}

          {school.address && (
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
              <div>
                <div className="font-medium">Endereço</div>
                <div className="text-sm text-gray-600">{school.address}</div>
              </div>
            </div>
          )}

          {school.contacts && school.contacts.length > 0 && (
            <div className="space-y-3">
              <div className="font-medium">Contatos</div>
              {school.contacts.map((contact) => (
                <div key={contact.id} className="flex items-center">
                  {contact.type === 'email' ? (
                    <Mail className="h-4 w-4 mr-3 text-gray-500" />
                  ) : (
                    <Phone className="h-4 w-4 mr-3 text-gray-500" />
                  )}
                  <div>
                    {contact.label && (
                      <div className="text-xs text-gray-500 uppercase tracking-wide">
                        {contact.label}
                      </div>
                    )}
                    <div className="text-sm">{contact.value}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações Gerais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Tipo de Ensino</span>
            <Badge variant="outline">{school.type}</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status</span>
            <Badge variant={school.active ? "default" : "destructive"}>
              {school.active ? "Ativa" : "Inativa"}
            </Badge>
          </div>

          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <div>
              <div className="text-xs text-gray-500">Cadastrada em</div>
              <div className="text-sm">
                {new Date(school.created_at).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolContact;
