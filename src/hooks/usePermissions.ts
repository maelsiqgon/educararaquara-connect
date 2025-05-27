
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserRole } from '@/hooks/useUsers';

export interface Permission {
  id: string;
  module: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'approve' | 'publish';
  role: UserRole['role'];
  school_id?: string;
}

export const usePermissions = () => {
  const [userPermissions, setUserPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

  const checkPermission = (module: string, action: Permission['action'], schoolId?: string): boolean => {
    return userPermissions.some(permission => 
      permission.module === module && 
      permission.action === action &&
      (!schoolId || !permission.school_id || permission.school_id === schoolId)
    );
  };

  const getUserPermissions = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setUserPermissions([]);
        return;
      }

      // Buscar roles do usuário
      const { data: roles, error } = await supabase
        .from('user_school_roles')
        .select('role, school_id')
        .eq('user_id', user.id)
        .eq('active', true);

      if (error) throw error;

      // Gerar permissões baseadas nos roles
      const permissions: Permission[] = [];
      
      roles?.forEach(role => {
        // Super admin tem todas as permissões
        if (role.role === 'super_admin') {
          const modules = ['schools', 'users', 'news', 'media', 'agenda', 'councils', 'reports'];
          const actions: Permission['action'][] = ['create', 'read', 'update', 'delete', 'approve', 'publish'];
          
          modules.forEach(module => {
            actions.forEach(action => {
              permissions.push({
                id: `${module}-${action}-${role.school_id || 'all'}`,
                module,
                action,
                role: role.role,
                school_id: role.school_id
              });
            });
          });
        }
        
        // Admin da escola
        else if (role.role === 'admin') {
          const modules = ['schools', 'users', 'news', 'media', 'agenda'];
          const actions: Permission['action'][] = ['create', 'read', 'update', 'delete', 'publish'];
          
          modules.forEach(module => {
            actions.forEach(action => {
              permissions.push({
                id: `${module}-${action}-${role.school_id}`,
                module,
                action,
                role: role.role,
                school_id: role.school_id
              });
            });
          });
        }
        
        // Diretor
        else if (role.role === 'director') {
          const modules = ['news', 'media', 'agenda'];
          const actions: Permission['action'][] = ['create', 'read', 'update', 'approve'];
          
          modules.forEach(module => {
            actions.forEach(action => {
              permissions.push({
                id: `${module}-${action}-${role.school_id}`,
                module,
                action,
                role: role.role,
                school_id: role.school_id
              });
            });
          });
        }
        
        // Professor e outros roles
        else {
          permissions.push({
            id: `news-read-${role.school_id}`,
            module: 'news',
            action: 'read',
            role: role.role,
            school_id: role.school_id
          });
        }
      });

      setUserPermissions(permissions);
    } catch (error) {
      console.error('Error fetching permissions:', error);
      setUserPermissions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserPermissions();
  }, []);

  return {
    userPermissions,
    loading,
    checkPermission,
    getUserPermissions
  };
};
