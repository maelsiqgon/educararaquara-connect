
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
      const { data, error } = await supabase
        .from('user_contacts')
        .select('*')
        .eq('user_id', targetUserId)
        .order('is_primary', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (err: any) {
      console.error('Erro ao carregar contatos:', err);
      toast.error('Erro ao carregar contatos');
    } finally {
      setLoading(false);
    }
  };

  const saveContacts = async (userId: string, contactsData: Omit<UserContact, 'id' | 'user_id' | 'created_at' | 'updated_at'>[]) => {
    try {
      // Primeiro, remover todos os contatos existentes
      await supabase
        .from('user_contacts')
        .delete()
        .eq('user_id', userId);

      // Inserir novos contatos
      if (contactsData.length > 0) {
        const contactsToInsert = contactsData.map(contact => ({
          user_id: userId,
          contact_type: contact.contact_type,
          contact_value: contact.contact_value,
          is_primary: contact.is_primary
        }));

        const { error } = await supabase
          .from('user_contacts')
          .insert(contactsToInsert);

        if (error) throw error;
      }

      await fetchContacts(userId);
      toast.success('Contatos atualizados com sucesso!');
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
