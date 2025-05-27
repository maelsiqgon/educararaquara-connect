
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'super_admin' | 'admin' | 'director' | 'coordinator' | 'teacher' | 'staff' | 'parent' | 'student';

export interface Permission {
  module: string;
  action: string;
  allowed: boolean;
}

export interface UserPermissions {
  role: UserRole;
  schoolId?: string;
  permissions: Permission[];
}

export const usePermissions = () => {
  const [userPermissions, setUserPermissions] = useState<UserPermissions | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserPermissions = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setUserPermissions(null);
        return;
      }

      const { data: roles, error } = await supabase
        .from('user_school_roles')
        .select('*')
        .eq('user_id', user.id)
        .eq('active', true);

      if (error) throw error;

      if (roles && roles.length > 0) {
        const primaryRole = roles[0];
        const permissions = getPermissionsForRole(primaryRole.role as UserRole);
        
        setUserPermissions({
          role: primaryRole.role as UserRole,
          schoolId: primaryRole.school_id,
          permissions
        });
      } else {
        setUserPermissions(null);
      }
    } catch (error) {
      console.error('Error fetching permissions:', error);
      setUserPermissions(null);
    } finally {
      setLoading(false);
    }
  };

  const getPermissionsForRole = (role: UserRole): Permission[] => {
    const allModules = ['schools', 'news', 'users', 'media', 'agenda', 'councils', 'chatbot'];
    const allActions = ['create', 'read', 'update', 'delete'];

    const permissions: Permission[] = [];

    allModules.forEach(module => {
      allActions.forEach(action => {
        permissions.push({
          module,
          action,
          allowed: hasPermission(role, module, action)
        });
      });
    });

    return permissions;
  };

  const hasPermission = (role: UserRole, module: string, action: string): boolean => {
    // Super admin has all permissions
    if (role === 'super_admin') return true;

    // Admin has most permissions except user management
    if (role === 'admin') {
      if (module === 'users' && (action === 'create' || action === 'delete')) return false;
      return true;
    }

    // Director has school-specific permissions
    if (role === 'director') {
      if (module === 'users' && action === 'delete') return false;
      if (module === 'schools' && action === 'delete') return false;
      return ['schools', 'news', 'media', 'agenda'].includes(module);
    }

    // Coordinator has limited permissions
    if (role === 'coordinator') {
      if (action === 'delete') return false;
      return ['news', 'media', 'agenda'].includes(module);
    }

    // Teacher has read and limited write permissions
    if (role === 'teacher') {
      if (action === 'delete') return false;
      if (action === 'create' && !['news', 'media'].includes(module)) return false;
      return ['news', 'media', 'agenda'].includes(module);
    }

    // Staff has mostly read permissions
    if (role === 'staff') {
      return action === 'read' && ['schools', 'news', 'agenda'].includes(module);
    }

    // Parents and students have read-only access to limited modules
    if (role === 'parent' || role === 'student') {
      return action === 'read' && ['schools', 'news'].includes(module);
    }

    return false;
  };

  const canAccess = (module: string, action: string = 'read'): boolean => {
    if (!userPermissions) return false;
    
    const permission = userPermissions.permissions.find(
      p => p.module === module && p.action === action
    );
    
    return permission?.allowed || false;
  };

  const isAdmin = (): boolean => {
    return userPermissions?.role === 'super_admin' || userPermissions?.role === 'admin';
  };

  const isSuperAdmin = (): boolean => {
    return userPermissions?.role === 'super_admin';
  };

  useEffect(() => {
    fetchUserPermissions();
  }, []);

  return {
    userPermissions,
    loading,
    fetchUserPermissions,
    canAccess,
    isAdmin,
    isSuperAdmin,
    hasPermission: (module: string, action: string) => canAccess(module, action)
  };
};
