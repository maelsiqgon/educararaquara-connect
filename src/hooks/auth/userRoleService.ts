
import { supabase } from '@/integrations/supabase/client';
import { UserRole } from './types';

export const fetchUserRoles = async (userId: string): Promise<UserRole[]> => {
  try {
    console.log('🔍 Fetching roles for user:', userId);
    
    // First try using the new RPC function
    const { data: rpcData, error: rpcError } = await supabase
      .rpc('get_user_roles', { user_uuid: userId });
    
    if (!rpcError && rpcData) {
      console.log('✅ User roles fetched via RPC:', rpcData);
      return rpcData.map((role: any) => ({
        id: role.id,
        user_id: role.user_id,
        school_id: role.school_id,
        role: role.role,
        active: role.active,
        created_at: role.created_at,
        school_name: role.school_name,
        school_id_text: role.school_id_text
      }));
    }
    
    console.log('⚠️ RPC failed, trying direct query:', rpcError);
    
    // Fallback to direct query
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
      console.log('✅ User roles fetched via direct query:', data);
      return data.map(role => ({
        id: role.id,
        user_id: role.user_id,
        school_id: role.school_id,
        role: role.role,
        active: role.active,
        created_at: role.created_at,
        school: role.school
      }));
    }
    
    console.error('❌ All methods failed to fetch user roles:', error);
    return [];
  } catch (error) {
    console.error('❌ Error fetching user roles:', error);
    return [];
  }
};

export const isSuperAdmin = (userRoles: UserRole[]): boolean => {
  const result = userRoles.some(role => role.role === 'super_admin');
  console.log('🔍 isSuperAdmin check:', { userRoles, result });
  return result;
};

export const checkIsSuperAdminRPC = async (userId: string): Promise<boolean> => {
  try {
    console.log('🔍 Checking super admin via RPC for user:', userId);
    const { data, error } = await supabase
      .rpc('is_super_admin', { user_uuid: userId });
    
    if (!error) {
      console.log('✅ Super admin check result:', data);
      return data === true;
    }
    
    console.error('❌ RPC super admin check failed:', error);
    return false;
  } catch (error) {
    console.error('❌ Error checking super admin:', error);
    return false;
  }
};

export const hasRole = (userRoles: UserRole[], schoolId: string, roles: string[]): boolean => {
  return userRoles.some(role => 
    role.school_id === schoolId && 
    roles.includes(role.role)
  );
};
