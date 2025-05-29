
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useUsers, User } from '@/hooks/useUsers';
import { validateCPF, formatCPF } from '@/utils/cpfValidator';
import UserContactsForm from './UserContactsForm';
import type { UserContact } from '@/types/user';

interface UserFormProps {
  user?: User;
  onSuccess: () => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSuccess, onCancel }) => {
  const { createUser, updateUser } = useUsers();
  const [loading, setLoading] = useState(false);
  const [cpfError, setCpfError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    address: '',
    registration: '',
    active: true
  });

  const [contacts, setContacts] = useState<UserContact[]>([
    { 
      contact_type: 'phone' as const, 
      contact_value: '', 
      is_primary: true
    }
  ]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        cpf: user.cpf || '',
        phone: user.phone || '',
        address: user.address || '',
        registration: user.registration || '',
        active: user.active
      });

      if (user.contacts && user.contacts.length > 0) {
        setContacts(user.contacts);
      }
    }
  }, [user]);

  const handleCPFChange = (value: string) => {
    const formattedCPF = formatCPF(value);
    setFormData(prev => ({ ...prev, cpf: formattedCPF }));
    
    if (formattedCPF.length === 14) { // CPF completo formatado
      if (!validateCPF(formattedCPF)) {
        setCpfError('CPF inválido');
      } else {
        setCpfError('');
      }
    } else {
      setCpfError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      return;
    }

    if (formData.cpf && !validateCPF(formData.cpf)) {
      setCpfError('CPF inválido');
      return;
    }

    setLoading(true);
    try {
      if (user) {
        await updateUser(user.id, formData, contacts);
      } else {
        await createUser(formData, contacts);
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {user ? 'Editar Usuário' : 'Novo Usuário'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                value={formData.cpf}
                onChange={(e) => handleCPFChange(e.target.value)}
                placeholder="000.000.000-00"
              />
              {cpfError && <p className="text-red-500 text-sm">{cpfError}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="registration">Matrícula</Label>
              <Input
                id="registration"
                value={formData.registration}
                onChange={(e) => setFormData(prev => ({ ...prev, registration: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            />
          </div>

          <UserContactsForm 
            contacts={contacts}
            onContactsChange={setContacts}
          />

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
            />
            <Label>Usuário ativo</Label>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : (user ? 'Atualizar' : 'Criar')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
