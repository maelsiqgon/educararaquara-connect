
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type ContactType = 'phone' | 'email' | 'whatsapp' | 'website';

export interface SchoolContact {
  id: string;
  school_id: string;
  type: ContactType;
  value: string;
  label?: string;
  primary_contact: boolean;
  created_at: string;
}

export const useSchoolContacts = () => {
  const [loading, setLoading] = useState(false);

  const createContacts = async (
    schoolId: string, 
    contacts: Omit<SchoolContact, 'id' | 'school_id' | 'created_at'>[]
  ): Promise<SchoolContact[]> => {
    try {
      setLoading(true);
      
      const contactsWithSchoolId = contacts.map(contact => ({
        ...contact,
        school_id: schoolId,
        created_at: new Date().toISOString()
      }));

      const { data, error } = await supabase
        .from('school_contacts')
        .insert(contactsWithSchoolId)
        .select();

      if (error) throw error;
      
      toast.success('Contatos criados com sucesso!');
      return data as SchoolContact[];
    } catch (err: any) {
      toast.error('Erro ao criar contatos: ' + err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateContact = async (
    id: string, 
    updates: Partial<Omit<SchoolContact, 'id' | 'school_id' | 'created_at'>>
  ): Promise<SchoolContact> => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('school_contacts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Contato atualizado com sucesso!');
      return data as SchoolContact;
    } catch (err: any) {
      toast.error('Erro ao atualizar contato: ' + err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id: string): Promise<void> => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('school_contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Contato removido com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao remover contato: ' + err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getSchoolContacts = async (schoolId: string): Promise<SchoolContact[]> => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('school_contacts')
        .select('*')
        .eq('school_id', schoolId);

      if (error) throw error;
      
      return data as SchoolContact[];
    } catch (err: any) {
      toast.error('Erro ao buscar contatos: ' + err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createContacts,
    updateContact,
    deleteContact,
    getSchoolContacts
  };
};
