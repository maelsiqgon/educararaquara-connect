
import { supabase } from '@/integrations/supabase/client';
import { UserRole } from './types';

export const fetchUserRoles = async (userId: string): Promise<UserRole[]> => {
  try {
    console.log('Fetching roles for user:', userId);
    
    // Try direct query first
    const { data, error } = await supabase
      .from('user_school_roles')
      .select(`
        *,
        school:schools(id, name)
      `)
      .eq('user_id', userId)
      .eq('active', true);

    if (!error && data) {
      console.log('User roles fetched (direct query):', data);
      return data;
    }
    
    console.log('Direct query failed, trying RPC:', error);
    
    // Fallback to RPC function
    const { data: rpcData, error: rpcError } = await supabase
      .rpc('get_user_roles', { user_uuid: userId });
    
    if (!rpcError && rpcData) {
      console.log('User roles fetched (RPC):', rpcData);
      return rpcData;
    }
    
    console.log('RPC failed, trying edge function:', rpcError);
    
    // Final fallback to edge function
    const { data: authData } = await supabase.auth.getSession();
    const token = authData?.session?.access_token;
    
    const response = await fetch('https://epxmtbwmmptaricbiyjw.supabase.co/functions/v1/get-user-roles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || ''}`
      },
      body: JSON.stringify({ user_uuid: userId })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('User roles fetched (Edge Function):', data);
      return data || [];
    } else {
      console.error('All methods failed to fetch user roles');
      return [];
    }
  } catch (error) {
    console.error('Error fetching user roles:', error);
    return [];
  }
};

export const isSuperAdmin = (userRoles: UserRole[]): boolean => {
  return userRoles.some(role => role.role === 'super_admin');
};

export const hasRole = (userRoles: UserRole[], schoolId: string, roles: string[]): boolean => {
  return userRoles.some(role => 
    role.school_id === schoolId && 
    roles.includes(role.role)
  );
};
