
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { UserContact } from '@/types/user';

export const useUserContacts = (userId?: string) => {
  const [contacts, setContacts] = useState<UserContact[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async (targetUserId: string) => {
    try {
      setLoading(true);
      
      // Por enquanto retornar dados mock já que a tabela user_contacts não existe
      const mockContacts: UserContact[] = [
        {
          id: '1',
          user_id: targetUserId,
          contact_type: 'email',
          contact_value: 'usuario@exemplo.com',
          is_primary: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      
      setContacts(mockContacts);
    } catch (err: any) {
      console.error('Erro ao carregar contatos:', err);
      toast.error('Erro ao carregar contatos');
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const saveContacts = async (userId: string, contactsData: UserContact[]) => {
    try {
      // Mock implementation - aguardando criação da tabela
      setContacts(contactsData);
      toast.success('Contatos salvos com sucesso!');
    } catch (err: any) {
      console.error('Erro ao salvar contatos:', err);
      toast.error('Erro ao salvar contatos: ' + err.message);
      throw err;
    }
  };

  useEffect(() => {
    if (userId) {
      fetchContacts(userId);
    }
  }, [userId]);

  return {
    contacts,
    loading,
    fetchContacts,
    saveContacts
  };
};
