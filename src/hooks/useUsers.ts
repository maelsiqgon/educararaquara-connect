import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { User, UserRole, UserContact } from '@/types/user';

export type { User, UserRole } from '@/types/user';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          userRoles:user_school_roles(
            id,
            school_id,
            role,
            active,
            user_id,
            created_at,
            school:schools(id, name)
          ),
          contacts:user_contacts(*)
        `)
        .order('name');

      if (error) throw error;
      setUsers(data || []);
    } catch (err: any) {
      setError(err.message);
      toast.error('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: {
    email: string;
    name: string;
    cpf?: string;
    phone?: string;
    address?: string;
    registration?: string;
    active?: boolean;
  }, contacts?: UserContact[]) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([{
          id: crypto.randomUUID(),
          ...userData,
          active: userData.active ?? true
        }])
        .select()
        .single();

      if (error) throw error;

      // Criar contatos se fornecidos
      if (contacts && contacts.length > 0) {
        const contactsToInsert = contacts.map(contact => ({
          user_id: data.id,
          contact_type: contact.contact_type,
          contact_value: contact.contact_value,
          is_primary: contact.is_primary
        }));

        const { error: contactsError } = await supabase
          .from('user_contacts')
          .insert(contactsToInsert);

        if (contactsError) {
          console.error('Erro ao criar contatos:', contactsError);
        }
      }
      
      await fetchUsers();
      toast.success('Usuário criado com sucesso!');
      return data;
    } catch (err: any) {
      toast.error('Erro ao criar usuário: ' + err.message);
      throw err;
    }
  };

  const updateUser = async (id: string, userData: Partial<{
    email: string;
    name: string;
    cpf?: string;
    phone?: string;
    address?: string;
    registration?: string;
    active?: boolean;
  }>, contacts?: UserContact[]) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(userData)
        .eq('id', id);

      if (error) throw error;

      // Atualizar contatos se fornecidos
      if (contacts) {
        // Primeiro, remover todos os contatos existentes
        await supabase
          .from('user_contacts')
          .delete()
          .eq('user_id', id);

        // Inserir novos contatos
        if (contacts.length > 0) {
          const contactsToInsert = contacts.map(contact => ({
            user_id: id,
            contact_type: contact.contact_type,
            contact_value: contact.contact_value,
            is_primary: contact.is_primary
          }));

          const { error: contactsError } = await supabase
            .from('user_contacts')
            .insert(contactsToInsert);

          if (contactsError) {
            console.error('Erro ao atualizar contatos:', contactsError);
          }
        }
      }
      
      await fetchUsers();
      toast.success('Usuário atualizado com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao atualizar usuário: ' + err.message);
      throw err;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchUsers();
      toast.success('Usuário removido com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao remover usuário: ' + err.message);
      throw err;
    }
  };

  const assignUserToSchool = async (userId: string, schoolId: string, role: UserRole['role']) => {
    try {
      const { error } = await supabase
        .from('user_school_roles')
        .insert({
          user_id: userId,
          school_id: schoolId,
          role,
          active: true
        });

      if (error) throw error;
      
      await fetchUsers();
      toast.success('Usuário vinculado à escola com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao vincular usuário à escola: ' + err.message);
      throw err;
    }
  };

  const removeUserFromSchool = async (userId: string, schoolId: string) => {
    try {
      const { error } = await supabase
        .from('user_school_roles')
        .delete()
        .eq('user_id', userId)
        .eq('school_id', schoolId);

      if (error) throw error;
      
      await fetchUsers();
      toast.success('Usuário removido da escola com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao remover usuário da escola: ' + err.message);
      throw err;
    }
  };

  const toggleUserStatus = async (id: string, active: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ active })
        .eq('id', id);

      if (error) throw error;
      
      await fetchUsers();
      toast.success(`Usuário ${active ? 'ativado' : 'desativado'} com sucesso!`);
    } catch (err: any) {
      toast.error('Erro ao alterar status do usuário: ' + err.message);
      throw err;
    }
  };

  const getUserById = async (id: string): Promise<User | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          userRoles:user_school_roles(
            id,
            school_id,
            role,
            active,
            user_id,
            created_at,
            school:schools(id, name)
          ),
          contacts:user_contacts(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err: any) {
      toast.error('Usuário não encontrado');
      return null;
    }
  };

  const bulkUpdateUsers = async (userIds: string[], updates: Partial<User>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .in('id', userIds);

      if (error) throw error;
      
      await fetchUsers();
      toast.success(`${userIds.length} usuários atualizados com sucesso!`);
    } catch (err: any) {
      toast.error('Erro ao atualizar usuários em lote: ' + err.message);
      throw err;
    }
  };

  const blockUser = async (id: string, reason?: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          active: false,
          last_access: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      await fetchUsers();
      toast.success('Usuário bloqueado com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao bloquear usuário: ' + err.message);
      throw err;
    }
  };

  const unblockUser = async (id: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ active: true })
        .eq('id', id);

      if (error) throw error;
      
      await fetchUsers();
      toast.success('Usuário desbloqueado com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao desbloquear usuário: ' + err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    assignUserToSchool,
    removeUserFromSchool,
    toggleUserStatus,
    getUserById,
    bulkUpdateUsers,
    blockUser,
    unblockUser
  };
};
