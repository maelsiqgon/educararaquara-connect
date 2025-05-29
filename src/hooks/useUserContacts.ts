
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
      
      // Buscar contatos diretamente da tabela
      const { data, error } = await supabase
        .from('user_contacts')
        .select('*')
        .eq('user_id', targetUserId);
      
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
      // Deletar contatos existentes
      await supabase
        .from('user_contacts')
        .delete()
        .eq('user_id', userId);

      // Inserir novos contatos
      if (contactsData.length > 0) {
        const { error } = await supabase
          .from('user_contacts')
          .insert(contactsData.map(contact => ({
            ...contact,
            user_id: userId
          })));

        if (error) throw error;
      }
      
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
