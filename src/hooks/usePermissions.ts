
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Sistema simplificado de permissões
export const usePermissions = () => {
  const [permissions, setPermissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      // Sistema simplificado - apenas buscar perfis
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('name');

      if (error) throw error;
      
      setPermissions(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Erro ao carregar permissões:', err);
    } finally {
      setLoading(false);
    }
  };

  const hasPermission = (userId: string, permission: string) => {
    const user = permissions.find(p => p.id === userId);
    if (!user) return false;
    
    // Verificação simplificada baseada no role
    if (user.role === 'super_admin') return true;
    if (user.role === 'admin' && permission !== 'super_admin') return true;
    
    return false;
  };

  const getUserRoles = (userId: string) => {
    const user = permissions.find(p => p.id === userId);
    return user ? [user.role] : [];
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  return {
    permissions,
    loading,
    error,
    fetchPermissions,
    hasPermission,
    getUserRoles
  };
};
