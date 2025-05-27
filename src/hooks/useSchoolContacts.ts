
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SchoolContact } from '@/hooks/useSchools';

export const useSchoolContacts = () => {
  const [loading, setLoading] = useState(false);

  const createContact = async (schoolId: string, contact: Omit<SchoolContact, 'id' | 'school_id'>): Promise<SchoolContact | null> => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('school_contacts')
        .insert([{
          school_id: schoolId,
          ...contact
        }])
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Contato adicionado com sucesso!');
      return data;
    } catch (err: any) {
      toast.error('Erro ao adicionar contato: ' + err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateContact = async (contactId: string, updates: Partial<Omit<SchoolContact, 'id' | 'school_id'>>): Promise<boolean> => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('school_contacts')
        .update(updates)
        .eq('id', contactId);

      if (error) throw error;
      
      toast.success('Contato atualizado com sucesso!');
      return true;
    } catch (err: any) {
      toast.error('Erro ao atualizar contato: ' + err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (contactId: string): Promise<boolean> => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('school_contacts')
        .delete()
        .eq('id', contactId);

      if (error) throw error;
      
      toast.success('Contato removido com sucesso!');
      return true;
    } catch (err: any) {
      toast.error('Erro ao remover contato: ' + err.message);
      return false;
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
        .eq('school_id', schoolId)
        .order('primary_contact', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err: any) {
      toast.error('Erro ao carregar contatos: ' + err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    createContact,
    updateContact,
    deleteContact,
    getSchoolContacts,
    loading
  };
};
