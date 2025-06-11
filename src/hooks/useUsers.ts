
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { User } from '@/types/user';

export type { User } from '@/types/user';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('name');

      if (error) throw error;
      
      // Garantir que os tipos estejam corretos
      const typedUsers: User[] = (data || []).map(profile => ({
        id: profile.id,
        email: profile.email,
        name: profile.name,
        role: profile.role as 'super_admin' | 'admin' | 'user',
        active: profile.active,
        created_at: profile.created_at,
        updated_at: profile.updated_at
      }));
      
      setUsers(typedUsers);
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
    role?: string;
    active?: boolean;
  }) => {
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: 'temp123456',
        email_confirm: true,
        user_metadata: {
          name: userData.name
        }
      });

      if (error) throw error;

      if (data.user) {
        await supabase
          .from('profiles')
          .update({
            name: userData.name,
            role: userData.role || 'user',
            active: userData.active !== false
          })
          .eq('id', data.user.id);
      }
      
      await fetchUsers();
      toast.success('Usuário criado com sucesso!');
      return data;
    } catch (err: any) {
      toast.error('Erro ao criar usuário: ' + err.message);
      throw err;
    }
  };

  const updateUser = async (id: string, userData: Partial<User>) => {
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
      const { error } = await supabase.auth.admin.deleteUser(id);
      if (error) throw error;
      
      await fetchUsers();
      toast.success('Usuário removido com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao remover usuário: ' + err.message);
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
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      return {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role as 'super_admin' | 'admin' | 'user',
        active: data.active,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
    } catch (err: any) {
      toast.error('Usuário não encontrado');
      return null;
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
    toggleUserStatus,
    getUserById
  };
};
