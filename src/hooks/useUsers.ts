
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User, UserRole } from '@/types/user';

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
          roles:user_school_roles(
            id,
            school_id,
            role,
            active,
            user_id,
            created_at,
            school:schools(id, name)
          )
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
  }) => {
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
  }>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(userData)
        .eq('id', id);

      if (error) throw error;
      
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
        .insert([{
          user_id: userId,
          school_id: schoolId,
          role,
          active: true
        }]);

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
    toggleUserStatus
  };
};
