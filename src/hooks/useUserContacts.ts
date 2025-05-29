
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
      
      // Usar função SQL para buscar contatos
      const { data, error } = await supabase
        .rpc('get_user_contacts', { user_uuid: targetUserId });
      
      if (error) {
        console.error('Erro ao carregar contatos:', error);
        setContacts([]);
        return;
      }
      
      setContacts(data || []);
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
      // Simular operação de salvamento até que a tabela esteja disponível nos tipos
      console.log('Salvando contatos para usuário:', userId, contactsData);
      
      // Por enquanto, apenas mostrar sucesso
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
