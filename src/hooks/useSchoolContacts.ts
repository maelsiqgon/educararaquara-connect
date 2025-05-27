
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type ContactType = 'phone' | 'email' | 'whatsapp' | 'cellphone';

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

  const createContacts = async (schoolId: string, contacts: Array<{
    type: ContactType;
    value: string;
    label: string;
    primary_contact: boolean;
  }>) => {
    try {
      setLoading(true);
      
      const contactsData = contacts.map(contact => ({
        school_id: schoolId,
        type: contact.type,
        value: contact.value,
        label: contact.label,
        primary_contact: contact.primary_contact
      }));

      const { error } = await supabase
        .from('school_contacts')
        .insert(contactsData);

      if (error) throw error;
      
      toast.success('Contatos criados com sucesso!');
      return true;
    } catch (err: any) {
      toast.error('Erro ao criar contatos: ' + err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateContacts = async (schoolId: string, contacts: Array<{
    id?: string;
    type: ContactType;
    value: string;
    label: string;
    primary_contact: boolean;
  }>) => {
    try {
      setLoading(true);
      
      // Delete existing contacts
      await supabase
        .from('school_contacts')
        .delete()
        .eq('school_id', schoolId);

      // Insert new contacts
      const contactsData = contacts.map(contact => ({
        school_id: schoolId,
        type: contact.type,
        value: contact.value,
        label: contact.label,
        primary_contact: contact.primary_contact
      }));

      const { error } = await supabase
        .from('school_contacts')
        .insert(contactsData);

      if (error) throw error;
      
      toast.success('Contatos atualizados com sucesso!');
      return true;
    } catch (err: any) {
      toast.error('Erro ao atualizar contatos: ' + err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (contactId: string) => {
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

  return {
    loading,
    createContacts,
    updateContacts,
    deleteContact
  };
};
