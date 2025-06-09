
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
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const saveContacts = async (userId: string, contactsData: UserContact[]) => {
    try {
      const { error: deleteError } = await supabase
        .from('user_contacts')
        .delete()
        .eq('user_id', userId);

      if (deleteError) throw deleteError;

      if (contactsData.length > 0) {
        const contactsToInsert = contactsData.map(contact => ({
          user_id: userId,
          contact_type: contact.contact_type,
          contact_value: contact.contact_value,
          is_primary: contact.is_primary
        }));

        const { error: insertError } = await supabase
          .from('user_contacts')
          .insert(contactsToInsert);

        if (insertError) throw insertError;
      }

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
