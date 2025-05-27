
import { supabase } from '@/integrations/supabase/client';
import { UserRole } from './types';

export const fetchUserRoles = async (userId: string): Promise<UserRole[]> => {
  try {
    console.log('Fetching roles for user:', userId);
    
    // Try direct query first with proper error handling
    const { data, error } = await supabase
      .from('user_school_roles')
      .select(`
        id,
        user_id,
        school_id,
        role,
        active,
        created_at,
        school:schools(id, name)
      `)
      .eq('user_id', userId)
      .eq('active', true);

    if (!error && data) {
      console.log('User roles fetched successfully:', data);
      // Transform the data to match UserRole interface
      const roles: UserRole[] = data.map(role => ({
        id: role.id,
        school_id: role.school_id,
        role: role.role,
        active: role.active,
        created_at: role.created_at,
        school: role.school
      }));
      return roles;
    }
    
    console.log('Direct query failed, error:', error);
    
    // Fallback to RPC function if available
    try {
      const { data: rpcData, error: rpcError } = await supabase
        .rpc('get_user_roles', { user_uuid: userId });
      
      if (!rpcError && rpcData) {
        console.log('User roles fetched via RPC:', rpcData);
        return rpcData;
      }
      
      console.log('RPC failed, error:', rpcError);
    } catch (rpcErr) {
      console.log('RPC not available or failed:', rpcErr);
    }
    
    // Final fallback to edge function
    try {
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
        console.log('User roles fetched via Edge Function:', data);
        return data || [];
      } else {
        console.error('Edge function failed with status:', response.status);
      }
    } catch (edgeErr) {
      console.error('Edge function error:', edgeErr);
    }
    
    console.error('All methods failed to fetch user roles');
    return [];
  } catch (error) {
    console.error('Error fetching user roles:', error);
    return [];
  }
};

export const isSuperAdmin = (userRoles: UserRole[]): boolean => {
  const result = userRoles.some(role => role.role === 'super_admin');
  console.log('isSuperAdmin check:', { userRoles, result });
  return result;
};

export const hasRole = (userRoles: UserRole[], schoolId: string, roles: string[]): boolean => {
  return userRoles.some(role => 
    role.school_id === schoolId && 
    roles.includes(role.role)
  );
};
