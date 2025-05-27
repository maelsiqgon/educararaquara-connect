
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface User {
  id: string;
  email: string;
  name: string;
  cpf: string | null;
  phone: string | null;
  address: string | null;
  registration: string | null;
  avatar_url: string | null;
  active: boolean;
  last_access: string | null;
  created_at: string;
  updated_at: string;
  roles?: UserRole[];
}

export interface UserRole {
  id: string;
  user_id: string;
  school_id: string;
  role: 'super_admin' | 'admin' | 'editor' | 'viewer';
  active: boolean;
  created_at: string;
  school?: {
    id: string;
    name: string;
  };
}

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
    password: string;
    name: string;
    cpf?: string;
    phone?: string;
    address?: string;
    registration?: string;
    roles?: { school_id: string; role: 'super_admin' | 'admin' | 'editor' | 'viewer' }[];
  }) => {
    try {
      // Create auth user
      const { data, error } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true,
        user_metadata: { name: userData.name }
      });

      if (error) throw error;

      // Update profile with additional data
      await supabase
        .from('profiles')
        .update({
          name: userData.name,
          cpf: userData.cpf,
          phone: userData.phone,
          address: userData.address,
          registration: userData.registration,
        })
        .eq('id', data.user.id);

      // Add roles if provided
      if (userData.roles && userData.roles.length > 0) {
        const roleInserts = userData.roles.map(role => ({
          user_id: data.user.id,
          school_id: role.school_id,
          role: role.role
        }));

        await supabase
          .from('user_school_roles')
          .insert(roleInserts);
      }

      await fetchUsers();
      toast.success('Usuário criado com sucesso!');
      return data.user;
    } catch (err: any) {
      toast.error('Erro ao criar usuário: ' + err.message);
      throw err;
    }
  };

  const updateUser = async (id: string, userData: Partial<Omit<User, 'id' | 'created_at' | 'updated_at' | 'roles'>>) => {
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

  const deactivateUser = async (id: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ active: false })
        .eq('id', id);

      if (error) throw error;
      
      await fetchUsers();
      toast.success('Usuário desativado com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao desativar usuário: ' + err.message);
      throw err;
    }
  };

  const activateUser = async (id: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ active: true })
        .eq('id', id);

      if (error) throw error;
      
      await fetchUsers();
      toast.success('Usuário ativado com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao ativar usuário: ' + err.message);
      throw err;
    }
  };

  const assignRole = async (userId: string, schoolId: string, role: 'super_admin' | 'admin' | 'editor' | 'viewer') => {
    try {
      // Check if role already exists
      const { data: existingRole } = await supabase
        .from('user_school_roles')
        .select('id')
        .eq('user_id', userId)
        .eq('school_id', schoolId)
        .single();

      if (existingRole) {
        // Update existing role
        const { error } = await supabase
          .from('user_school_roles')
          .update({ role, active: true })
          .eq('id', existingRole.id);

        if (error) throw error;
      } else {
        // Create new role
        const { error } = await supabase
          .from('user_school_roles')
          .insert([{ user_id: userId, school_id: schoolId, role }]);

        if (error) throw error;
      }
      
      await fetchUsers();
      toast.success('Permissão atribuída com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao atribuir permissão: ' + err.message);
      throw err;
    }
  };

  const removeRole = async (roleId: string) => {
    try {
      const { error } = await supabase
        .from('user_school_roles')
        .update({ active: false })
        .eq('id', roleId);

      if (error) throw error;
      
      await fetchUsers();
      toast.success('Permissão removida com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao remover permissão: ' + err.message);
      throw err;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (error) throw error;
      
      toast.success('Email de redefinição de senha enviado com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao enviar email de redefinição: ' + err.message);
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
    deactivateUser,
    activateUser,
    assignRole,
    removeRole,
    resetPassword
  };
};
